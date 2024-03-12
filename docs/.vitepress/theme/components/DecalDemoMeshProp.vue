<script setup lang="ts">
import { shallowRef } from 'vue'
import { TresCanvas, useTexture } from '@tresjs/core'
import { Decal, OrbitControls, Sphere } from '@tresjs/cientos'
import decalsDatas from '../assets/decal/basicDatas.json'

const sphereRef = shallowRef(null);

const vueLogo = await useTexture(['/cientos/decal/vuejs-logo.png'])
const threejsLogo = await useTexture(['/cientos/decal/threejs-logo.png'])
</script>

<template>
  <TresCanvas clearColor="#82DBC5">
    <TresPerspectiveCamera :position="[5, 2.5, 5]" />
    <OrbitControls make-default auto-rotate />

    <TresMesh ref="sphereRef">
      <TresSphereGeometry :args="[1.75, 32, 16]" />
    </TresMesh>

    <Decal v-bind="decalsDatas.three" :mesh="sphereRef" :map="threejsLogo" />
    <Decal v-bind="decalsDatas.vue" :mesh="sphereRef" :map="vueLogo" />
  </TresCanvas>
</template>
