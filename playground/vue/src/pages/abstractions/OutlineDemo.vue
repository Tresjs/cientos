<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Outline } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 0, 10]" />
    <OrbitControls />
    <TresMesh>
      <TresTorusKnotGeometry />
      <TresMeshBasicMaterial />
      <Outline :thickness="7.5" color="black" />
      <Outline :thickness="5" color="yellow" />
      <Outline :thickness="2.5" color="red" />
    </TresMesh>
  </TresCanvas>
</template>
