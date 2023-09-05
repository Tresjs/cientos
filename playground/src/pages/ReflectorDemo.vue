<script setup lang="ts">
import { shallowRef, reactive, watch } from 'vue'
import { TresCanvas } from '@tresjs/core'
import {
  OrbitControls,
  MeshWobbleMaterial,
  Reflector,
  Stars,
  useTweakPane,
} from '@tresjs/cientos'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

const gl = {
  clearColor: '#111',
  shadows: false,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const reflectorRef = shallowRef()

watch(reflectorRef, (value) => {
  console.log(value)
})
const customShader = {
  name: 'customShader',

  fragmentShader: /* glsl */ `
		uniform vec3 color;
		uniform sampler2D tDiffuse;
		varying vec4 vUv;

		#include <logdepthbuf_pars_fragment>

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3(
                blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) 
                );

		}

		void main() {

			#include <logdepthbuf_fragment>

			vec4 base = texture2DProj( tDiffuse, vUv );
			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`,
}

const options = reactive({
  color: '#f7f7f7',
  clipBias: 1,
  textureWidth: 1024,
})

// const { pane } = useTweakPane()

// pane.addInput(options, 'color', { label: 'MirrorColor' })
// pane.addInput(options, 'clipBias', {
//   label: 'clipBias',
//   min: 0,
//   max: 1,
//   step: 0.001,
// })
</script>

<template>
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[3, 3, 6]"
      :look-at="[0, 0, 0]"
    />
    <Stars />
    <TresMesh>
      <TresTorusGeometry />
      <MeshWobbleMaterial
        color="orange"
        :speed="1"
        :factor="2"
      />
    </TresMesh>
    <Reflector
      ref="reflectorRef"
      :rotation="[-Math.PI * 0.5, 0, 0]"
      :position="[0, -2, 0]"
      :color="options.color"
      :shader="customShader"
      :clip-bias="options.clipBias"
      :texture-width="options.textureWidth"
    >
      <TresCircleGeometry :args="[10, 10]" />
    </Reflector>
    <!-- <TresBoxGeometry :args="[10, 10]" /> -->
    <TresAmbientLight :intensity="1" />
    <OrbitControls />
  </TresCanvas>
</template>
