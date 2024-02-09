<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, NoToneMapping } from 'three'
import { PointerLockControls, KeyboardControls, Stats, Sky } from '@tresjs/cientos'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  toneMapping: NoToneMapping,
}

const isActive = (state: boolean) => console.log(state)
const hasChange = (state: any) => console.log('change', state)

const controlsRef = shallowRef()

watch(controlsRef, () => {
  console.log('watch ~ controlsRef:', controlsRef.value.root)
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 3, 10]" />
    <Stats />
    <Sky />
    <PointerLockControls
      ref="controlsRef"
      make-default
      @is-lock="state => isActive(state)"
      @change="state => hasChange(state)"
    />
    <KeyboardControls head-bobbing />

    <TresGridHelper :args="[100, 100]" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>

