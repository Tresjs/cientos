<script setup lang="ts">
import { CameraControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import { useGLTF } from '.'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
const modelPath = 'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/aku-aku/AkuAku.gltf'
const pokeballPath = 'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/realistic-pokeball/scene.gltf'
const { scene: model } = await useGLTF(modelPath, { draco: true })
const { scene: pokeball } = await useGLTF(pokeballPath, { draco: true })
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <CameraControls />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight
      :intensity="1"
      cast-shadow
      :position="[0, 10, 0]"
    />
    <TresGroup :scale="0.1">
      <primitive
        :object="model"
        :position="[-2, 0, 0]"
      />
      <primitive
        :object="pokeball"
        :position="[2, 0, 0]"
        :scale="0.2"
      />
    </TresGroup>
  </TresCanvas>
</template>
