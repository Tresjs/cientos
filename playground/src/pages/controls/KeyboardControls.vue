<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping } from 'three'
import { Box, KeyboardControls, StatsGl } from '@tresjs/cientos'
import { useState } from '../../composables/state'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  toneMapping: NoToneMapping,
}

const isActive = (state: boolean) => {
  // eslint-disable-next-line no-console
  console.log(state)
}
const hasChange = (state: any) => {

  /* console.log('change', state) */
}

// For testing render mode on-demand,

const { renderingTimes } = useState()

function onRender() {
  renderingTimes.value = 1
}
</script>

<template>
  <GraphPane />
  <TresCanvas render-mode="on-demand" v-bind="gl" @render="onRender">
    <TresPerspectiveCamera :position="[0, 3, 10]" />
    <StatsGl />
    <!-- <Sky /> -->
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
