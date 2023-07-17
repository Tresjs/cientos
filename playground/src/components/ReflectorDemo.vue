<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, MeshWobbleMaterial, Reflector, Stars } from '@tresjs/cientos'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

const gl = {
  clearColor: '#111',
  shadows: false,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
</script>

<template>
  <TresCanvas v-bind="gl" ref="context">
    <TresPerspectiveCamera :position="[3, 3, 6]" :look-at="[0, 0, 0]" />
    <Stars />
    <TresMesh v-log>
      <TresTorusGeometry />
      <MeshWobbleMaterial color="orange" :speed="1" :factor="2" />
    </TresMesh>
    <Reflector :rotation="[-Math.PI * 0.5, 0, 0]" :position-y="-2" :color="'#fff'">
      <!-- <TresSphereGeometry :args="[1, 16, 16]" /> -->
      <TresCircleGeometry :args="[10, 10]" />
    </Reflector>
    <TresAmbientLight :intensity="1" />
    <OrbitControls />
  </TresCanvas>
</template>
