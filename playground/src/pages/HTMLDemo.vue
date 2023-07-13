<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

import '@tresjs/leches/styles'
import { OrbitControls, Html } from '@tresjs/cientos'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const state = reactive({
  wrapperClass: 'wrapper',
  as: 'div',
  transform: false,
  center: true,
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 0, 4]" />
    <OrbitControls />

    <TresMesh :position="[1, 1, 1]">
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
      <Html v-bind="state">
        <h1 class="awiwi" style="background: #008080; color: #fff; padding: 1rem; border-radius: 0.5rem">Box</h1>
      </Html>
    </TresMesh>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
