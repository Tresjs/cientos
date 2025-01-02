<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import Model from './Model.vue'
</script>

<template>
  <TresPerspectiveCamera :position="[5, 5, 5]" />
  <Suspense>
    <template v-if="true">
      <Model />
      <Model />
      <Model />
      <Model />
      <Model />
      <Model />
      <Model />
      <Model />
      <Model />
      <Model />
      <Model />
      <Model />
      <Model />
      <Model />
    </template>
  </Suspense>
  <TresGridHelper />
  <TresAmbientLight :intensity="1" />
  <OrbitControls />
</template>
