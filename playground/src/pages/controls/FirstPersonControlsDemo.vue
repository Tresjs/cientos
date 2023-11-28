<script setup lang="ts">
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

// const isActive = (state: boolean) => console.log(state)
// const hasChange = (state: any) => console.log('change', state)
const keyChange = (e: Boolean) => console.log('k', e)
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 3, 10]" />
    <Stats />
    <Sky />
    <PointerLockControls />
    <!-- @is-lock="state => isActive(state)"
      @change="state => hasChange(state)" -->
    <KeyboardControls
      head-bobbing
      :primary-action="{ action: () => console.log('primary') }"
      @change="e => keyChange(e)"
    >
      <TresMesh>
        <TresBoxGeometry />
      </TresMesh>
    </KeyboardControls>

    <TresGridHelper :args="[100, 100]" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>

