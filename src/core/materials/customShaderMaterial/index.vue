<script setup lang="ts">
import { shallowRef } from 'vue'
import { useTresContext } from '@tresjs/core'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import { useOnDemandInvalidation } from '../../../composables/useOnDemandInvalidation'

interface CustomShaderMaterialProps {
  baseMaterial: Function
  vertexShader?: string
  fragmentShader?: string
  silent?: boolean
  uniforms?: { [uniform: string]: any }
}

const props = defineProps<CustomShaderMaterialProps>()

useOnDemandInvalidation(props)

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
