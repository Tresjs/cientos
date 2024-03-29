<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { MapControls, Sphere } from '@tresjs/cientos'
import { SRGBColorSpace, NoToneMapping } from 'three'

const gl = {
  clearColor: '#82DBC5',
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const controlsRef = shallowRef()

watch(controlsRef, () => {
  console.log('watch ~ controlsRef:', controlsRef.value.root)
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <MapControls ref="controlsRef" />
    <Sphere :scale="0.5">
      <TresMeshNormalMaterial />
    </Sphere>
    <TresGridHelper :args="[10, 10]" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
