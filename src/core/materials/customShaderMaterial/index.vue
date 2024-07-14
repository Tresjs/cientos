<script setup lang="ts">
import { shallowRef } from 'vue'
import { useTresContext } from '@tresjs/core'

import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import type { Fn } from '@vueuse/core'

interface CustomShaderMaterialProps {
  baseMaterial: Fn
  vertexShader?: string
  fragmentShader?: string
  silent?: boolean
  uniforms?: { [uniform: string]: any }
}

const props = defineProps<CustomShaderMaterialProps>()

const customShaderMaterialClass = shallowRef(null)

const { extend } = useTresContext()
extend({ CustomShaderMaterial })

defineExpose({ instance: customShaderMaterialClass })
</script>

<template>
  <TresCustomShaderMaterial
    ref="customShaderMaterialClass"
    :args="[props]"
  />
</template>
