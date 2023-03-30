<script setup lang="ts">
import { onMounted } from 'vue';
import { TresCanvas, useTres } from '@tresjs/core'
import {  OrbitControls } from '@cientos'
import { BasicShadowMap, sRGBEncoding, NoToneMapping } from 'three'
import TheExperiment from '../components/gltf/TheExperiment.vue';

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
}
const fontPath = 'https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json'

onMounted(()=> {
  console.log(useTres().scene?.value)
})
</script>

<template>
  <TheExperiment />
  <!-- <TresCanvas v-bind="gl">
    <OrbitControls />
    <TresPerspectiveCamera name="camerasss" :position="[3, 3, 3]" />
    <TresGridHelper :args="[10, 10]" />
    <TresAmbientLight :intensity="1" />
    <Suspense>
    </Suspense>

  </TresCanvas> -->
</template>