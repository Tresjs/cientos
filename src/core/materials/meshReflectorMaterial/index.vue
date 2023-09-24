<script setup lang="ts">
import { useTresContext } from '@tresjs/core'
import { MeshReflectorMaterialImpl as MeshReflectorMaterial } from './material'

const { extend } = useTresContext()

extend({ MeshReflectorMaterial })

defineExpose({ MeshReflectorMaterial })
</script>

<template>
  <TresMeshReflectorMaterial />
</template>
