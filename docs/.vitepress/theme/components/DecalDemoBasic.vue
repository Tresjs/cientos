<script setup lang="ts">
import { TresCanvas, useTexture } from '@tresjs/core'
import { Decal, OrbitControls, Sphere } from '@tresjs/cientos'
import decalsDatas from '../assets/decal/basicDatas.json'

const vueLogo = await useTexture(['/cientos/decal/vuejs-logo.png'])
const threejsLogo = await useTexture(['/cientos/decal/threejs-logo.png'])
</script>

<template>
  <TresCanvas clearColor="#82DBC5">
    <TresPerspectiveCamera :position="[5, 2.5, 5]" />
    <OrbitControls make-default auto-rotate />

    <Sphere :args="[1.75, 32, 16]">
      <Decal v-bind="decalsDatas.three" :map="threejsLogo" />
      <Decal v-bind="decalsDatas.vue" :map="vueLogo" />
    </Sphere>
  </TresCanvas>
</template>
