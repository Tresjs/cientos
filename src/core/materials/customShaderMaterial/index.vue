<script setup lang="ts">
import { shallowRef } from 'vue'
import { useTresContext } from '@tresjs/core'

import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import type { Material } from 'three'

interface CustomShaderMaterialProps {
  baseMaterial: Material
  vertexShader?: string
  fragmentShader?: string
  silent?: boolean
  uniforms?: { [uniform: string]: any }
  flatShading?: boolean
  color?: string | number
}

const props = defineProps<CustomShaderMaterialProps>()

const customShaderMaterialClass = shallowRef(null)

const { extend } = useTresContext()
extend({ CustomShaderMaterial })

defineExpose({ value: customShaderMaterialClass })
</script>

<template>
  <TresCustomShaderMaterial
    ref="customShaderMaterialClass"
    :args="[props]"
  />
</template>
