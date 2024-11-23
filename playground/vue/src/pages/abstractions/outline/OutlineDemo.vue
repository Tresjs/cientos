<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos';
import TheExperience from './TheExperience.vue'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera />
    <OrbitControls />
    <Suspense>
      <TheExperience />
    </Suspense>
  </TresCanvas>
</template>

