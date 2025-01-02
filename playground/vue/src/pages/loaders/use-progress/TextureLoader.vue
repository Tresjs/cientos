<script setup lang="ts">
import { useTexture } from '@tresjs/core'

const props = defineProps<{
  texturePath: string
}>()

const texture = await useTexture({
  map: props.texturePath,
})
console.log(texture)
</script>

<template>
  <TresMesh>
    <TresPlaneGeometry :args="[40, 40]" />
    <TresMeshStandardMaterial :map="texture.map" />
  </TresMesh>
</template>
