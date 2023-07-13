<script setup lang="ts">
import { computed, createVNode, shallowRef, toRefs, render, watchEffect, ref, watch } from 'vue'
import { DoubleSide, Group, OrthographicCamera, PerspectiveCamera, PlaneGeometry, ShaderMaterial, Vector3 } from 'three'
import { TresCamera, TresObject3D, useRenderLoop } from '@tresjs/core'
import { useCientos } from '../useCientos'
import { Mutable } from '@vueuse/core'
import { nextTick } from 'vue'

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
}

const props = withDefaults(defineProps<HTMLProps>(), {
  geometry: new PlaneGeometry(),
  material: new ShaderMaterial({
    side: DoubleSide,
  }),
  as: 'div',
  transform: false,
  eps: 0.0001,
})

const slots = defineSlots()

const groupRef = shallowRef<TresObject3D>()

const { geometry, material, as, transform, portal, wrapperClass, eps, distanceFactor, fullscreen, center, style } =
  toRefs(props)

const { state } = useCientos()

const el = computed(() => document.createElement(as.value))

const previousPosition = ref([0, 0])
const previousZoom = ref(0)

const styles = computed(() => {
  if (transform.value) {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: state.renderer?.domElement.width,
      height: state.renderer?.domElement.height,
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
        width: state.container.value.offsetWidth,
        height: state.container.value.offsetHeight,
      }),
      ...style?.value,
    }
  }
})

watch(
  () => [groupRef.value, state.renderer],
  ([group, renderer]) => {
    if (group && renderer) {
      const target = portal?.value || renderer.domElement
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

      let vnode: any

      if (transform.value) {
        el.value.style.width = `${geometry.value.parameters.width}px`
        el.value.style.height = `${geometry.value.parameters.height}px`
      } else {
        vnode = createVNode('div', { ref: 'el', style: styles.value }, slots.default?.())
      }
      render(vnode, el.value)
    }
  },
)

watchEffect(() => {
  if (wrapperClass?.value) {
    el.value.className = wrapperClass.value
  }
})

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
      if (transform.value) {
      } else {
        const scale =
          distanceFactor?.value === undefined ? 1 : objectScale(groupRef.value, state.camera) * distanceFactor?.value
        el.value.style.transform = `translate3d(${vector[0]}px,${vector[1]}px,0) scale(${scale})`
      }
    }

    previousPosition.value = vector
    previousZoom.value = state.camera.zoom
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
</script>
<template>
  <TresGroup ref="groupRef">
    <TresMesh :geometry="geometry">
      <primitive :object="material" :fragment-shader="shaders.fragmentShader" />
    </TresMesh>
  </TresGroup>
</template>
