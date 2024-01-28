<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping, Vector3 } from 'three'
import { PointerLockControls, KeyboardControls, StatsGl, Sky, Box } from '@tresjs/cientos'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  toneMapping: NoToneMapping,
}

const isActive = (state: boolean) => console.log(state)
const hasChange = (state: any) => console.log('change', state)
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 3, 10]" />
    <StatsGl />
    <Sky />
    <KeyboardControls
      @change="state => hasChange(state)"
      @is-lock="state => isActive(state)"
    />
    <Box />
    <Box :position="[15, 0, 0]" />
    <Box :position="[-15, 0, 0]" />

    <TresAxesHelper
      :args="[10]"
      :position-y="5"
    />
    <TresGridHelper :args="[100, 100]" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>

