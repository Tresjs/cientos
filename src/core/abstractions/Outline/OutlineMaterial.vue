<script setup lang="ts">
import { shallowRef } from 'vue'
import { extend } from '@tresjs/core'
import OutlineMaterial from './OutlineMaterialImpl'

extend({ OutlineMaterial })

const materialRef = shallowRef()

defineExpose({ instance: materialRef })
</script>

<template>
  <TresOutlineMaterial ref="materialRef" />
</template>
