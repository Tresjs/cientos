<script setup lang="ts">
import {
  MeshWobbleMaterial,
  OrbitControls,
  Reflector,
  Stars,
} from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#111',
  shadows: false,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const options = {
  clipBias: 0,
  textureWidth: 1024,
  textureHeight: 1024,
}

const { color } = useControls({
  color: { value: '#f7f7f7', type: 'color', label: 'Color' },
})
</script>

<template>
  <TresLeches />
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
      :rotation="[-Math.PI * 0.5, 0, 0]"
      :position="[0, -2, 0]"
      :color="color"
      :clip-bias="options.clipBias"
      :texture-width="options.textureWidth"
      :texture-height="options.textureHeight"
    />
    <TresAmbientLight :intensity="1" />
    <OrbitControls />
  </TresCanvas>
</template>
