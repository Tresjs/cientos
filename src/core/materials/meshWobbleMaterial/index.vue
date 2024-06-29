<script setup lang="ts">
import { shallowRef } from 'vue'
import { useLoop, useTresContext } from '@tresjs/core'
import { useOnDemandInvalidation } from '../../../composables/useOnDemandInvalidation'

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

const { invalidateOnDemand } = useOnDemandInvalidation(props)

const materialRef = shallowRef()

const { extend } = useTresContext()
extend({ MeshWobbleMaterial })

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  if (materialRef.value) {
    materialRef.value.time = elapsed * props?.speed
    invalidateOnDemand()
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
