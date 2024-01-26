<script setup lang="ts">
import { reactive, shallowRef } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { CameraControls, Sphere, vLightHelper, vAlwaysLookAt } from '@tresjs/cientos'
import { SRGBColorSpace, NoToneMapping } from 'three'
import { TresLeches, useControls } from '@tresjs/leches'

const gl = {
  clearColor: '#111',
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const directionalLightRef = shallowRef()
const pointLightRef = shallowRef()
const spotLightRef = shallowRef()

const { onLoop } = useRenderLoop()

onLoop(({ elapsed }) => {
  if (directionalLightRef.value ) {
    directionalLightRef.value.position.y = Math.sin(elapsed) * 1.5 + 2

  }
  if (pointLightRef.value) {
    const lightAngle = elapsed * 0.5
    pointLightRef.value.position.x = Math.cos(lightAngle) * 4
    pointLightRef.value.position.z = Math.sin(lightAngle) * 4
  }
})

const { spotLight, dirLight, pointLight, hemiLight, rectAreaLight } = useControls({
  spotLight: false,
  dirLight: true,
  pointLight: false,
  hemiLight: true,
  rectAreaLight: false,
})
</script>

<template>
  <TresLeches
    class="top-0 important-left-4"
  />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <Sphere
      v-light-helper
      :scale="0.5"
    >
      <TresMeshStandardMaterial :color="0x222" />
    </Sphere>
    <TresAmbientLight :color="0xffffff" />
    <TresDirectionalLight
      v-if="dirLight.value"
      ref="directionalLightRef"
      v-light-helper:shadowCamera
      :color="0xffffff"
      :intensity="5"
      :position="[0, 2, 4]"
    />
    <TresPointLight
      v-if="pointLight.value"
      ref="pointLightRef"
      v-light-helper:shadowCamera
      :color="0xff0000"
      :intensity="100"
      :position="[0, 1, 1]"
    />
    <TresSpotLight
      v-if="spotLight.value"
      ref="spotLightRef"
      v-light-helper:shadowCamera
      :color="0x00ff00"
      :intensity="10"
      :position="[0, 1, 1]"
    />

    <TresHemisphereLight
      v-if="hemiLight.value"
      v-light-helper:shadowCamera
      :color="0xaaaaff"
      :ground-color="0x00ffff"
      :intensity="50"
    /> 
    <TresRectAreaLight
      v-if="rectAreaLight.value"
      v-light-helper
      v-always-look-at="[0, 0, 0]"
      :args="[0xffff00, 100, 1, 1]"
      :position="[2.5, 0, 2.5]"
    />
    <TresGridHelper :args="[10, 10]" />
    <CameraControls />
  </TresCanvas>
</template>
