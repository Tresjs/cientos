<script setup lang="ts">
import { nextTick, onMounted, shallowRef } from 'vue'
import { useSeek, useTresContext } from '@tresjs/core'
import { LOD } from 'three'

export interface LODProps {
  /**
   * The distance at which to display this level of detail.
   *
   * @default 0
   * @type {number}
   * @memberof LODProps
   * @see https://threejs.org/docs/index.html?q=lod#api/en/objects/LOD
   */
  distance: number
  /**
   *  Threshold used to avoid flickering at LOD boundaries, as a fraction of distance.
   *
   * @default 0
   * @type {number}
   * @memberof LODProps
   * @see https://threejs.org/docs/index.html?q=lod#api/en/objects/LOD
   */
  hysteresis?: number
}

const props = withDefaults(defineProps<LODProps>(), {
  hysteresis: 0,
})

const { seek } = useSeek()
const { scene } = useTresContext()

const LODInstance = shallowRef()
const wrapperRef = shallowRef()

LODInstance.value = seek(scene.value, 'type', 'LOD')

if (!LODInstance.value) {
  LODInstance.value = new LOD()
  scene.value.add(LODInstance.value)
}

onMounted(async () => {
  await nextTick()
  LODInstance.value.addLevel(wrapperRef.value, props.distance, props.hysteresis)
})

defineExpose({
  instance: LODInstance,
})
</script>

<template>
  <TresGroup ref="wrapperRef">
    <slot></slot>
  </TresGroup>
</template>
