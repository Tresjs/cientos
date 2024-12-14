<script setup lang="ts">
import type { Object3D } from 'three'
import { shallowRef, watchEffect } from 'vue'
import { useHelper } from './useHelper'

type HelperConstructor = new (...args: any[]) => any

export interface HelperProps {
  type: HelperConstructor
  args?: any[]
}

const props = defineProps<HelperProps>()

const objRef = shallowRef<Object3D>()
const parentRef = shallowRef<Object3D>()

watchEffect(() => {
  if (objRef.value && objRef.value.parent) {
    parentRef.value = objRef.value.parent
  }
})

useHelper(parentRef, props.type, ...(props.args) ?? [])
</script>

<template>
  <TresObject3D ref="objRef" />
</template>
