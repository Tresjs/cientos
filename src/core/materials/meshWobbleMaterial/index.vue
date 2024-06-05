<script setup lang="ts">
import { shallowRef } from 'vue'
import { useLoop, useTresContext } from '@tresjs/core'

import { WobbleMaterialImpl as MeshWobbleMaterial } from './material'

const props = withDefaults(
  defineProps<{
    speed?: number
    factor?: number
  }>(),
  {
    speed: 1,
    factor: 1,
  },
)

const { render } = useTresContext()

const materialRef = shallowRef()

const { extend } = useTresContext()
extend({ MeshWobbleMaterial })

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed, invalidate }) => {
  if (materialRef.value) {
    materialRef.value.time = elapsed * props?.speed

    if (render.mode.value === 'on-demand') {
      invalidate()
    }
  }
})

defineExpose({ instance: materialRef })
</script>

<template>
  <TresMeshWobbleMaterial
    ref="materialRef"
    :factor="factor"
    v-bind="$attrs"
  />
</template>
