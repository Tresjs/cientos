<script setup lang="ts">
import { GLTFModel } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[5.3, 2.45, 9.3]" :look-at="[0, 0, 0]" />
    <Suspense>
      <GLTFModel path="https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb" />
    </Suspense>
    <TresMesh
      :rotate-x="Math.PI * -0.5"
      :position-y="-2"
      receive-shadow
    >
      <TresPlaneGeometry :args="[40, 40]" />
      <TresMeshStandardMaterial :color="0xF7F7F7" />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight
      :intensity="1"
      cast-shadow
      :position="[0, 10, 0]"
    />
  </TresCanvas>
</template>
