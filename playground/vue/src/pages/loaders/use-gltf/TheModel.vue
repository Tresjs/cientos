<script setup lang="ts">
/* eslint-disable no-console */
import { useGLTF } from '@tresjs/cientos'

const { state: model } = useGLTF(
  '/blender-cube-draco.glb',
  { draco: true },
)

watch(model, (newVal) => {
  console.log(newVal)
}, { immediate: true })
</script>

<template>
  <primitive v-if="model?.scene" :object="model.scene" />
</template>
