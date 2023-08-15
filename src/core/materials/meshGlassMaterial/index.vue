<script setup lang="ts">
import { shallowRef } from 'vue'
import { useTresContext } from '@tresjs/core'

import MeshGlassMaterial from './material'

const materialRef = shallowRef()

const { extend } = useTresContext()

extend({ MeshGlassMaterial })

defineExpose({ materialRef })
</script>
<template>
  <TresMeshGlassMaterial ref="materialRef" v-bind="$attrs" />
</template>
