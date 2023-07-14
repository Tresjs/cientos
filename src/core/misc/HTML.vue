<script setup lang="ts">
import { computed, createVNode, shallowRef, toRefs, render, watchEffect, ref, watch, useAttrs, Ref } from 'vue'
import {
  DoubleSide,
  Group,
  Matrix4,
  OrthographicCamera,
  PerspectiveCamera,
  PlaneGeometry,
  Raycaster,
  ShaderMaterial,
  Vector3,
} from 'three'
import { TresCamera, TresObject3D, useRenderLoop } from '@tresjs/core'
import { useCientos } from '../useCientos'
import { Mutable } from '@vueuse/core'
import { VNode } from 'vue'
import { isRef } from 'vue'

const v1 = new Vector3(0, 0, 0)
const v2 = new Vector3(0, 0, 0)
const v3 = new Vector3(0, 0, 0)

function calculatePosition(instance: TresObject3D, camera: TresCamera, size: { width: number; height: number }) {
  const objectPos = v1.setFromMatrixPosition(instance.matrixWorld)
  objectPos.project(camera)
  const widthHalf = size.width / 2
  const heightHalf = size.height / 2
  return [
    (Number.isNaN(objectPos.x) ? 0 : objectPos.x) * widthHalf + widthHalf,
    -(objectPos.y * heightHalf) + heightHalf,
  ]
}

function isObjectBehindCamera(el: TresObject3D, camera: TresCamera) {
  const objectPos = v1.setFromMatrixPosition(el.matrixWorld)
  const cameraPos = v2.setFromMatrixPosition(camera.matrixWorld)
  const deltaCamObj = objectPos.sub(cameraPos)
  const camDir = camera.getWorldDirection(v3)
  return deltaCamObj.angleTo(camDir) > Math.PI / 2
}

function isObjectVisible(el: TresObject3D, camera: TresCamera, raycaster: Raycaster, occlude: TresObject3D[]) {
  const elPos = v1.setFromMatrixPosition(el.matrixWorld)
  const screenPos = elPos.clone()
  screenPos.project(camera)
  raycaster.setFromCamera(screenPos, camera)
  const intersects = raycaster.intersectObjects(occlude, true)
  console.log(intersects)
  if (intersects.length > 0) {
    const intersectionDistance = intersects[0].distance
    const pointDistance = elPos.distanceTo(raycaster.ray.origin)
    return pointDistance < intersectionDistance
  }
  return true
}

function objectScale(el: TresObject3D, camera: TresCamera) {
  if (camera instanceof OrthographicCamera) {
    return camera.zoom
  } else if (camera instanceof PerspectiveCamera) {
    const objectPos = v1.setFromMatrixPosition(el.matrixWorld)
    const cameraPos = v2.setFromMatrixPosition(camera.matrixWorld)
    const vFOV = (camera.fov * Math.PI) / 180
    const dist = objectPos.distanceTo(cameraPos)
    const scaleFOV = 2 * Math.tan(vFOV / 2) * dist
    return 1 / scaleFOV
  } else {
    return 1
  }
}

function objectZIndex(el: TresObject3D, camera: TresCamera, zIndexRange: Array<number>) {
  if (camera instanceof PerspectiveCamera || camera instanceof OrthographicCamera) {
    const objectPos = v1.setFromMatrixPosition(el.matrixWorld)
    const cameraPos = v2.setFromMatrixPosition(camera.matrixWorld)
    const dist = objectPos.distanceTo(cameraPos)
    const A = (zIndexRange[1] - zIndexRange[0]) / (camera.far - camera.near)
    const B = zIndexRange[1] - A * camera.far
    return Math.round(A * dist + B)
  }
  return undefined
}

const epsilon = (value: number) => (Math.abs(value) < 1e-10 ? 0 : value)

function getCSSMatrix(matrix: Matrix4, multipliers: number[], prepend = '') {
  let matrix3d = 'matrix3d('
  for (let i = 0; i !== 16; i++) {
    matrix3d += epsilon(multipliers[i] * matrix.elements[i]) + (i !== 15 ? ',' : ')')
  }
  return prepend + matrix3d
}

const getCameraCSSMatrix = ((multipliers: number[]) => {
  return (matrix: Matrix4) => getCSSMatrix(matrix, multipliers)
})([1, -1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1])

const getObjectCSSMatrix = ((scaleMultipliers: (n: number) => number[]) => {
  return (matrix: Matrix4, factor: number) => getCSSMatrix(matrix, scaleMultipliers(factor), 'translate(-50%,-50%)')
})((f: number) => [1 / f, 1 / f, 1 / f, 1, -1 / f, -1 / f, -1 / f, -1, 1 / f, 1 / f, 1 / f, 1, 1, 1, 1, 1])

type PointerEventsProperties =
  | 'auto'
  | 'none'
  | 'visiblePainted'
  | 'visibleFill'
  | 'visibleStroke'
  | 'visible'
  | 'painted'
  | 'fill'
  | 'stroke'
  | 'all'
  | 'inherit'

export interface HTMLProps {
  geometry?: any
  material?: any
  as?: string
  transform?: boolean
  portal?: Mutable<HTMLElement>
  wrapperClass?: string
  eps?: number
  distanceFactor?: number
  fullscreen?: boolean
  center?: boolean
  pointerEvents?: PointerEventsProperties
  sprite?: boolean
  zIndexRange?: Array<number>

  // Occlusion based off work by Jerome Etienne and James Baicoianu
  // https://www.youtube.com/watch?v=ScZcUEDGjJI
  // as well as Joe Pea in CodePen: https://codepen.io/trusktr/pen/RjzKJx
  occlude?: Ref<TresObject3D>[] | boolean | 'raycast' | 'blending'
}

const emits = defineEmits(['onOcclude'])

const props = withDefaults(defineProps<HTMLProps>(), {
  geometry: new PlaneGeometry(),
  zIndexRange: () => [16777271, 0],
  as: 'div',
  transform: false,
  eps: 0.0001,
  pointerEvents: 'auto',
  sprite: false,
})

const attrs = useAttrs()

const slots = defineSlots()

const groupRef = ref<TresObject3D>()
const meshRef = ref<TresObject3D>()

const {
  geometry,
  material,
  as,
  transform,
  portal,
  wrapperClass,
  eps,
  distanceFactor,
  fullscreen,
  center,
  pointerEvents,
  sprite,
  occlude,
  zIndexRange,
} = toRefs(props)

const { state } = useCientos()

const el = computed(() => document.createElement(as.value))

const previousPosition = ref([0, 0])
const previousZoom = ref(0)
const vnode = ref<VNode>()

const styles = computed(() => {
  if (transform.value) {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: state.container.value.offsetWidth + 'px',
      height: state.container.value.offsetHeight + 'px',
      transformStyle: 'preserve-3d',
      pointerEvents: 'none',
    }
  } else {
    return {
      position: 'absolute',
      transform: center.value ? 'translate3d(-50%,-50%,0)' : 'none',
      ...(fullscreen.value && {
        top: -state.container.value.offsetHeight / 2,
        left: -state.container.value.offsetWidth / 2,
        width: state.container.value.offsetWidth + 'px',
        height: state.container.value.offsetHeight + 'px',
      }),
      ...attrs.style,
    }
  }
})

const transformInnerStyles = computed(() => ({
  position: 'absolute',
  pointerEvents: pointerEvents.value,
}))

// Occlussion
const occlusionMeshRef = ref(null!)
const isMeshSizeSet = ref(false)

const isRayCastOcclusion = computed(
  () =>
    (occlude?.value && occlude?.value !== 'blending') ||
    (Array.isArray(occlude?.value) && occlude?.value.length && isRef(occlude.value[0])),
)

watch(
  () => occlude,
  value => {
    if (value && value === 'blending') {
      el.value.style.zIndex = `${Math.floor(zIndexRange.value[0] / 2)}`
      el.value.style.position = 'absolute'
      el.value.style.pointerEvents = 'none'
    } else {
      el.value.style.zIndex = null!
      el.value.style.position = null!
      el.value.style.pointerEvents = null!
    }
  },
)

watch(
  () => [groupRef.value, state.renderer],
  ([group, renderer]) => {
    if (group && renderer) {
      const target = portal?.value || renderer?.domElement
      state.scene?.updateMatrixWorld()

      if (transform.value) {
        el.value.style.cssText = `position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;`
      } else {
        const vector = calculatePosition(group, state.camera, {
          width: state.container.value.offsetWidth,
          height: state.container.value.offsetHeight,
        })
        el.value.style.cssText = `position:absolute;top:0;left:0;transform:translate3d(${vector[0]}px,${vector[1]}px,0);transform-origin:0 0;`
      }

      if (target) {
        target.parentNode?.appendChild(el.value)
      }

      if (transform.value) {
        vnode.value = createVNode('div', { id: 'outer', style: styles.value }, [
          createVNode('div', { id: 'inner', style: transformInnerStyles.value }, [
            createVNode('div', { id: state?.scene?.uuid, class: attrs.class, style: attrs.style }, slots.default?.()),
          ]),
        ])
      } else {
        vnode.value = createVNode('div', { id: state?.scene?.uuid, style: styles.value }, slots.default?.())
      }
      render(vnode.value, el.value)
    }
  },
)

watchEffect(() => {
  if (wrapperClass?.value) {
    el.value.className = wrapperClass.value
  }
})

const visible = ref(true)

const { onLoop } = useRenderLoop()

onLoop(() => {
  if (groupRef.value && state.camera && state.renderer) {
    state?.camera?.updateMatrixWorld()
    groupRef.value.updateWorldMatrix(true, false)

    const vector = transform.value
      ? previousPosition.value
      : calculatePosition(groupRef.value, state.camera, {
          width: state.container.value.offsetWidth,
          height: state.container.value.offsetHeight,
        })

    if (
      transform.value ||
      Math.abs(previousZoom.value - state.camera.zoom) > eps.value ||
      Math.abs(previousPosition.value[0] - vector[0]) > eps.value ||
      Math.abs(previousPosition.value[1] - vector[1]) > eps.value
    ) {
      const isBehindCamera = isObjectBehindCamera(groupRef.value, state.camera)
      let raytraceTarget: null | undefined | boolean | TresObject3D[] = false

      if (isRayCastOcclusion.value) {
        if (occlude?.value !== 'blending') {
          raytraceTarget = [state.scene]
        } else if (Array.isArray(occlude)) {
          raytraceTarget = occlude.value.map(item => item.value) as TresObject3D[]
        }
      }

      const previouslyVisible = visible.value
      if (raytraceTarget) {
        const isVisible = isObjectVisible(groupRef.value, state.camera, state.raycaster, raytraceTarget)
        visible.value = isVisible && !isBehindCamera
      } else {
        visible.value = !isBehindCamera
      }

      if (previouslyVisible !== visible.value) {
        emits('onOcclude', !visible.value)
        el.value.style.display = visible.value ? 'block' : 'none'
      }

      const halfRange = Math.floor(zIndexRange.value[0] / 2)
      const zRange = occlude?.value
        ? isRayCastOcclusion.value //
          ? [zIndexRange.value[0], halfRange]
          : [halfRange - 1, 0]
        : zIndexRange

      el.value.style.zIndex = `${objectZIndex(groupRef.value, state.camera, zRange)}`

      if (transform.value) {
        const [widthHalf, heightHalf] = [state.container.value.offsetWidth / 2, state.container.value.offsetHeight / 2]
        const fov = state.camera.projectionMatrix.elements[5] * heightHalf
        const { isOrthographicCamera, top, left, bottom, right } = state.camera as OrthographicCamera
        const cameraMatrix = getCameraCSSMatrix(state.camera.matrixWorldInverse)
        const cameraTransform = isOrthographicCamera
          ? `scale(${fov})translate(${epsilon(-(right + left) / 2)}px,${epsilon((top + bottom) / 2)}px)`
          : `translateZ(${fov}px)`
        let matrix = groupRef.value.matrixWorld
        if (sprite.value) {
          matrix = state.camera.matrixWorldInverse.clone().transpose().copyPosition(matrix).scale(groupRef.value.scale)
          matrix.elements[3] = matrix.elements[7] = matrix.elements[11] = 0
          matrix.elements[15] = 1
        }
        el.value.style.width = state.container.value.offsetWidth + 'px'
        el.value.style.height = state.container.value.offsetHeight + 'px'
        el.value.style.perspective = isOrthographicCamera ? '' : `${fov}px`

        if (vnode.value?.el && vnode.value?.children) {
          vnode.value.el.style.transform = `${cameraTransform}${cameraMatrix}translate(${widthHalf}px,${heightHalf}px)`
          vnode.value.children[0].el.style.transform = getObjectCSSMatrix(
            matrix,
            1 / ((distanceFactor?.value || 10) / 400),
          )
        }
      } else {
        const scale =
          distanceFactor?.value === undefined ? 1 : objectScale(groupRef.value, state.camera) * distanceFactor?.value
        el.value.style.transform = `translate3d(${vector[0]}px,${vector[1]}px,0) scale(${scale})`
      }
    }

    previousPosition.value = vector
    previousZoom.value = state.camera.zoom
  }

  if (!isRayCastOcclusion.value && meshRef.value && !isMeshSizeSet.value) {
    if (transform.value) {
      if (vnode.value?.el && vnode.value?.children) {
        const el = vnode.value?.children[0]

        if (el?.clientWidth && el?.clientHeight) {
          const { isOrthographicCamera } = state.camera as OrthographicCamera

          if (isOrthographicCamera || geometry) {
            if (attrs.scale) {
              if (!Array.isArray(attrs.scale)) {
                meshRef.value.scale.setScalar(1 / (attrs.scale as number))
              } else if (attrs.scale instanceof Vector3) {
                meshRef.value.scale.copy(attrs.scale.clone().divideScalar(1))
              } else {
                meshRef.value.scale.set(1 / attrs.scale[0], 1 / attrs.scale[1], 1 / attrs.scale[2])
              }
            }
          } else {
            const ratio = (distanceFactor?.value || 10) / 400
            const w = el.clientWidth * ratio
            const h = el.clientHeight * ratio

            meshRef.value.scale.set(w, h, 1)
          }

          isMeshSizeSet.value = true
        }
      }
    } else {
      const ele = el.value.children[0]

      if (ele?.clientWidth && ele?.clientHeight) {
        const ratio = 1 / 1
        const w = ele.clientWidth * ratio
        const h = ele.clientHeight * ratio

        meshRef.value.scale.set(w, h, 1)

        isMeshSizeSet.value = true
      }

      occlusionMeshRef.value.lookAt(state.camera.position)
    }
  }
})

const shaders = computed(() => ({
  vertexShader: transform.value
    ? undefined
    : /* glsl */ `/*
    This shader is from the THREE's SpriteMaterial.
    We need to turn the backing plane into a Sprite
    (make it always face the camera) if "transfrom"
    is false.
  */
  #include <common>

  void main() {
    vec2 center = vec2(0., 1.);
    float rotation = 0.0;

    // This is somewhat arbitrary, but it seems to work well
    // Need to figure out how to derive this dynamically if it even matters
    float size = 0.03;

    vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
    vec2 scale;
    scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
    scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

    bool isPerspective = isPerspectiveMatrix( projectionMatrix );
    if ( isPerspective ) scale *= - mvPosition.z;

    vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale * size;
    vec2 rotatedPosition;
    rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
    rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
    mvPosition.xy += rotatedPosition;

    gl_Position = projectionMatrix * mvPosition;
  }
  `,
  fragmentShader: /* glsl */ `
  void main() {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
  }
  `,
}))

const shaderMaterial = computed(() => {
  const shader = shaders.value
  return (
    material.value ||
    new ShaderMaterial({
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader,
      side: DoubleSide,
    })
  )
})
</script>
<template>
  <TresGroup ref="groupRef">
    <TresMesh ref="meshRef" :geometry="geometry" :material="shaderMaterial"> </TresMesh>
  </TresGroup>
</template>
