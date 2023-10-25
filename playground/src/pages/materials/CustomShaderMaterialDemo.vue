<script setup lang="ts">
import { TresCanvas, useRenderLoop } from '@tresjs/core'

import { CustomShaderMaterial, StatsGl } from '@tresjs/cientos'

import { MeshBasicMaterial } from 'three'
import { shallowRef, onMounted, nextTick } from 'vue'

const { onLoop } = useRenderLoop()

const meshRef = shallowRef()
const materialRef = shallowRef()

const gl = {
  clearColor: '#82DBC5',
}

const materialProps = {
  baseMaterial: MeshBasicMaterial,
  fragmentShader: `
  varying float vWobble;

    void main() {
      csm_FragColor = mix(vec4(1.0, 1.0, 0.0, 1.0), vec4(1.0, 0.0, 1.0, 1.0), vWobble);
    }
  `,
  vertexShader: `
    uniform float u_Time;
    uniform float u_WobbleSpeed;
    uniform float u_WobbleAmplitude;

    varying float vWobble;

    void main() {
      float wobble = (sin(csm_Position.z * 7.0 + u_Time * u_WobbleSpeed) * 0.5 + 0.5);
      csm_Position *= 1.0 + wobble * u_WobbleAmplitude;

      vWobble = wobble;
    }
  `,
  uniforms: {
    u_Time: { value: 0 },
    u_WobbleSpeed: { value: 3 },
    u_WobbleAmplitude: { value: 0.3 },
  },
}

onMounted(async () => {
  await nextTick()

  onLoop(({ elapsed }) => {
    materialProps.uniforms.u_Time.value = elapsed
  })
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera
      :position="[0, 3, 3]"
      :look-at="[0, 0, 0]"
    />

    <TresMesh ref="meshRef">
      <TresTorusKnotGeometry :args="[0.6, 0.2, 256, 20]" />
      <CustomShaderMaterial
        ref="materialRef"
        v-bind="materialProps"
      />
    </TresMesh>

    <Suspense>
      <StatsGl />
    </Suspense>
  </TresCanvas>
</template>
