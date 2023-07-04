<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { PointerLockControls, Sphere, KeyboardControls } from '@tresjs/cientos'
import { BasicShadowMap, NoToneMapping } from 'three'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  toneMapping: NoToneMapping,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 2, 10]" />
    <PointerLockControls make-default  />
    <KeyboardControls head-bobbing >
    </KeyboardControls>
    <!-- <KeyboardControls forward="i" back="k" left="j" right="l">
    </KeyboardControls> -->
    <TresGridHelper :position="[0,-4,0]" :args="[100, 100]" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
