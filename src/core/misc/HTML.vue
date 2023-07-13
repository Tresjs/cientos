<script setup lang="ts">
import { DoubleSide, Group, PlaneGeometry, PointsMaterial, ShaderMaterial, Vector3 } from 'three'
import { computed, createVNode, shallowRef, toRefs } from 'vue'
import { useCientos } from '../useCientos'
import { Mutable } from '@vueuse/core'
import { watchEffect, h } from 'vue'
import { TresCamera, TresObject3D } from '@tresjs/core'
import { render } from 'vue'

const v1 = new Vector3()

function calculatePosition(el: TresObject3D, camera: TresCamera, size: { width: number; height: number }) {
  const objectPos = v1.setFromMatrixPosition(el.matrixWorld)
  objectPos.project(camera)
  const widthHalf = size.width / 2
  const heightHalf = size.height / 2
  return [objectPos.x * widthHalf + widthHalf, -(objectPos.y * heightHalf) + heightHalf]
}

export interface HTMLProps {
  geometry?: any
  material?: any
  as?: string
  transform?: boolean
  portal?: Mutable<HTMLElement>
  wrapperClass?: string
}

const props = withDefaults(defineProps<HTMLProps>(), {
  geometry: new PlaneGeometry(),
  material: new ShaderMaterial({
    side: DoubleSide,
  }),
  as: 'div',
  transform: false,
})

const slots = defineSlots()

const groupRef = shallowRef<Group>()

const { geometry, material, as, transform, portal } = toRefs(props)

const { state } = useCientos()

const el = computed(() => document.createElement(as.value))

const root = computed(() => state.appContext.appContext.app)

watchEffect(() => {
  if (state.renderer && groupRef.value) {
    const target = portal?.value || state.renderer.domElement
    state.scene?.updateMatrixWorld()
    if (transform.value) {
      el.value.style.cssText = `position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;`
    } else {
      const vec = calculatePosition(groupRef.value, state.camera, {
        width: state.renderer.domElement.width,
        height: state.renderer.domElement.height,
      })
      el.value.style.cssText = `position:absolute;top:0;left:0;transform:translate3d(${vec[0]}px,${vec[1]}px,0);transform-origin:0 0;`
    }

    if (target) {
      target.parentNode?.appendChild(el.value)
    }

    const vnode = createVNode('div', { ref: 'el' }, slots.default?.())
    render(vnode, el.value)
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
      <primitive :object="material" :vertex-shader="shaders.vertexShader" :fragment-shader="shaders.fragmentShader" />
    </TresMesh>
  </TresGroup>
</template>
