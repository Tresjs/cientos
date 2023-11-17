<!-- eslint-disable max-len -->
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { InstancedMesh, Mesh } from 'three'
import type { useSamplerProps } from '.'
import { useSampler } from '.'

const props = defineProps<useSamplerProps>()

const samplerRef = ref()
const instancedRef = ref()
const meshToSampleRef = ref()

watchEffect(() => {
  instancedRef.value = props.instanceMesh ?? samplerRef.value?.children.find((c: any ) => c.hasOwnProperty('instanceMatrix')) as InstancedMesh

  meshToSampleRef.value = props.mesh ?? (samplerRef.value?.children.find((c: any) => c.type === 'Mesh') as Mesh)

  useSampler(meshToSampleRef.value, props.count, instancedRef.value, props.weight, props.transform)
})

defineExpose({
  samplerRef,
})
</script>

<template>
  <TresGroup ref="samplerRef">
    <slot />
  </TresGroup>
</template>
