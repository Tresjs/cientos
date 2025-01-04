<script setup lang="ts">
import { GLTF, useGLTF } from '@tresjs/cientos'

const { scene: model } = await useGLTF(modelPath, { draco: true })
const { scene: pokeball } = await useGLTF(pokeballPath, { draco: true })
</script>

<template>
  <TresGroup>
    <primitive
      :object="model"
      :position="[-3, 0, 0]"
    />
    <primitive
      :object="pokeball"
    />
  </TresGroup>
</template>
