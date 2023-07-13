<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

import { OrbitControls, Html } from '@tresjs/cientos'

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
    <TresPerspectiveCamera :position="[0, 0, 4]" />
    <OrbitControls />
    <Html>
      <div class="awiwi" style="background: #000; color: #fff; padding: 1rem; border-radius: 0.5rem">Hello, world!</div>
    </Html>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
