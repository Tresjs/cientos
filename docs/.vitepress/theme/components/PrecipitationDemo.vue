<script setup lang="ts">
import { shallowRef } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { Precipitation } from '@tresjs/cientos'
import { SRGBColorSpace, NoToneMapping } from 'three'

const gl = {
  clearColor: '#333',
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const precipitationRef = shallowRef()
</script>

<template>
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera :position="[0, 2, 15]" />
    <Precipitation
      ref="precipitationRef"
    />
    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
