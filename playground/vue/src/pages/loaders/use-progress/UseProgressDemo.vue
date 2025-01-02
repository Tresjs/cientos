<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import TextureLoader from './TextureLoader.vue'
</script>

<template>
  <TresPerspectiveCamera :position="[5, 5, 5]" />
  <Suspense>
    <template v-if="true">
      <TextureLoader texturePath="https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg" />
    </template>
  </Suspense>
  <TresGridHelper />
  <TresAmbientLight :intensity="1" />
  <OrbitControls />
</template>
