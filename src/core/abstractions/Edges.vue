<script setup lang="ts">
import { computed, toRefs, watch, shallowRef, useSlots, ref } from 'vue'
import type { LineSegments, BufferGeometry } from 'three'
import { EdgesGeometry } from 'three'
import type { TresColor } from '@tresjs/core'

export interface EdgesProps {
  color?: TresColor
  threshold?: number
}

const props = withDefaults(defineProps<EdgesProps>(), {
  color: '#ff0000',
  threshold: 15,
})

const { color, threshold } = toRefs(props)

const lineSegmentsRef = shallowRef<LineSegments>()
const saveGeometry = ref<BufferGeometry | null>(null)
const saveThreshold = ref<number>(1)

const slots = useSlots()

const hasChildren = computed(() => !!slots.default)

defineExpose({
  root: lineSegmentsRef,
})

// Watch for changes in lineSegments, thresholdAngle, and color.
watch(
  () => [lineSegmentsRef.value, threshold.value],
  () => {    
    if (lineSegmentsRef.value) {
      const parent = lineSegmentsRef.value.parent

      if (parent) {
        const geometry = parent.geometry

        // Update geometry and threshold if necessary.
        if (
          geometry !== saveGeometry.value || threshold.value !== saveThreshold.value
        ) {
          saveGeometry.value = geometry
          saveThreshold.value = threshold.value
          
          lineSegmentsRef.value.geometry = new EdgesGeometry(geometry, threshold.value)
        }
      }
    }
  },
)
</script>

<template>
  <TresLineSegments
    ref="lineSegmentsRef"
    v-bind="$attrs"
  >
    <template v-if="hasChildren">
      <slot />
    </template>
    <template v-else>
      <TresLineBasicMaterial :color="color" />
    </template>
  </TresLineSegments>
</template>
