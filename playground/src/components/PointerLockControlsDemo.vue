<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { PointerLockControls, Sphere, KeyboardControls, OrbitControls } from '@cientos'
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
    <TresPerspectiveCamera :position="[0, 1, 10]" />
    <!-- <OrbitControls make-default />  -->
    <KeyboardControls :head-bobbing="false" :jump="['x']">
      <!-- <PointerLockControls make-default  /> -->
      <Sphere>
        <TresMeshNormalMaterial />
      </Sphere>
    </KeyboardControls>
    <TresGridHelper :args="[10, 10]" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
