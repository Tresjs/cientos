<script setup lang="ts">
import { TresCanvas, useTexture } from '@tresjs/core'
import { Decal, OrbitControls, Sphere } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import decalsDatas from '../assets/decal/basicDatas.json'
import '@tresjs/leches/styles'

const vueLogo = await useTexture(['/cientos/decal/vuejs-logo.png'])
const threejsLogo = await useTexture(['/cientos/decal/threejs-logo.png'])
const nuxtjsLogo = await useTexture(['/cientos/decal/nuxtjs-logo.png'])

useControls({})
</script>

<template>
  <TresLeches class="top-0 important-left-4" />

  <TresCanvas clearColor="#82DBC5">
    <TresPerspectiveCamera :position="[5, 2.5, 5]" />
    <OrbitControls make-default auto-rotate />

    <Sphere :args="[1.75, 32, 16]">
      <Decal v-bind="decalsDatas.three" :map="threejsLogo" />
      <Decal v-bind="decalsDatas.vue" :map="vueLogo" />
      <Decal debug :map="nuxtjsLogo" />
    </Sphere>

    <TresAmbientLight :intensity="1.25" />
    <TresDirectionalLight :intensity="1.5" :position="[-2, -1.5, 2]" />
    <TresDirectionalLight :intensity="1.5" :position="[2, 1.5, 2]" />
  </TresCanvas>
</template>
