<script setup lang="ts">
import { shallowRef } from 'vue'
import { useTresContext } from '@tresjs/core'

import { CustomShaderMaterialImpl as CustomShaderMaterial } from './material'

const CustomShaderMaterialClass = shallowRef(null)

const { extend } = useTresContext()
extend({ CustomShaderMaterial })

defineExpose({ value: CustomShaderMaterialClass })
</script>

<template>
  <TresCustomShaderMaterial ref="CustomShaderMaterialClass" />
</template>
