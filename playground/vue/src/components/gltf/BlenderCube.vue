<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'
import type { TresObject } from '@tresjs/core'

const { state } = useGLTF(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb',
  { draco: true },
)

const modelRef = shallowRef<TresObject | null>(null)

const model = computed(() => state.value?.nodes?.Cube)
</script>

<template>
  <primitive v-if="model" ref="modelRef" :object="model" />
</template>
