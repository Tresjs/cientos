<script setup lang="ts">
import type { Material } from 'three'
import { MarchingCubes as MarchingCubesImpl } from 'three-stdlib'
import { computed, provide } from 'vue'
import { useLoop } from '@tresjs/core'
import { MARCHING_CUBES_PROVIDE_KEY } from './const'

export interface MarchingCubesProps {
  resolution?: number
  maxPolyCount?: number
  enableUvs?: boolean
  enableColors?: boolean
}

const props = withDefaults(defineProps<MarchingCubesProps>(), {
  resolution: 28,
  maxPolyCount: 10000,
  enableUvs: false,
  enableColors: false,
})

const marchingCubes = computed(() => new MarchingCubesImpl(props.resolution, null as unknown as Material, props.enableUvs, props.enableColors, props.maxPolyCount))
const api = { parent: marchingCubes }

export type MarchingCubesApi = typeof api

provide(MARCHING_CUBES_PROVIDE_KEY, api)

marchingCubes.value.reset()

useLoop().onBeforeRender(() => {
  marchingCubes.value.update()
  marchingCubes.value.reset()
})

defineExpose({ instance: marchingCubes })
</script>

<template>
  <primitive :object="marchingCubes">
    <slot></slot>
  </primitive>
</template>
