<script setup lang="ts">
import {
  CustomShaderMaterial,
  OrbitControls,

  useTexture,
} from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { MeshMatcapMaterial } from 'three'
import { reactive, ref, watch } from 'vue'

import '@tresjs/leches/styles'

const gl = {
  clearColor: '#82DBC5',
}

const { state: texture01 } = useTexture('/matcap_01.png')

// Create a reactive object for material properties
const materialProps = reactive({
  baseMaterial: MeshMatcapMaterial,
  matcap: texture01.value,
  fragmentShader: `
  varying float vWobble;

  uniform float u_Time;

  void main() {
    float wobble = vWobble * 0.5 + 0.5;
    vec4 csm_DiffuseColor2 = mix(vec4(0.0, 0.0, 0.0, 1.0), vec4(1.0, 0.0, 2.0, 1.0), wobble);
    csm_DiffuseColor = mix(csm_DiffuseColor, csm_DiffuseColor2, wobble);
  }
`,
  vertexShader: `
  uniform float u_Time;
  uniform float u_WobbleSpeed;
  uniform float u_WobbleAmplitude;
  uniform float u_WobbleFrequency;

  varying float vWobble;

  void main() {
    float wobble = sin(csm_Position.z * u_WobbleFrequency + u_Time * u_WobbleSpeed);
    csm_Position += normal * wobble * u_WobbleAmplitude;

    vWobble = wobble;
  }
`,
  uniforms: {
    u_Time: { value: 0 },
    u_WobbleSpeed: { value: 3 },
    u_WobbleAmplitude: { value: 0.07 },
    u_WobbleFrequency: { value: 3 },
  },
})

// Create controls for the editable parameters
const { speed, amplitude, frequency } = useControls({
  speed: {
    value: materialProps.uniforms.u_WobbleSpeed.value,
    min: 0,
    max: 10,
    step: 0.1,
  },
  amplitude: {
    value: materialProps.uniforms.u_WobbleAmplitude.value,
    min: 0,
    max: 0.2,
    step: 0.01,
  },
  frequency: {
    value: materialProps.uniforms.u_WobbleFrequency.value,
    min: 1,
    max: 30,
    step: 1,
  },
})

// Watch for changes in controls and update the reactive object directly
watch([speed, amplitude, frequency], ([newSpeed, newAmplitude, newFrequency]) => {
  materialProps.uniforms.u_WobbleSpeed.value = newSpeed
  materialProps.uniforms.u_WobbleAmplitude.value = newAmplitude
  materialProps.uniforms.u_WobbleFrequency.value = newFrequency
})

// Watch for texture changes and update the reactive object
watch(texture01, (newTexture) => {
  materialProps.matcap = newTexture
})

const onLoop = () => {
  materialProps.uniforms.u_Time.value += 0.01 * materialProps.uniforms.u_WobbleSpeed.value
}
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl" @loop="onLoop">
    <TresPerspectiveCamera
      :position="[0, 2, 4]"
      :look-at="[0, 0, 0]"
    />

    <OrbitControls />

    <TresMesh>
      <TresTorusKnotGeometry :args="[1, 0.3, 512, 32]" />
      <CustomShaderMaterial v-if="texture01" v-bind="materialProps" />
    </TresMesh>
  </TresCanvas>
</template>
