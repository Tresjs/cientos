<script setup lang="ts">
import DocsDemoRange from './DocsDemoRange.vue'

interface Props {
  value: [number, number, number]
  min: number
  max: number
  step?: number
}

const props = withDefaults(defineProps<Props>(), {
  value: () => [0, 0, 0],
  min: 0,
  max: 1,
  step: 0.01,
})

const emit = defineEmits<{
  (e: 'change', value: [number, number, number]): void
}>()
</script>

<template>
  <div
    class="grid grid-cols-3 gap-4"
  >
    <div v-for="i of [0, 1, 2]" :key="i">
      <DocsDemoRange
        :value="value[i]"
        :min="min"
        :max="max"
        :step="step"
        @change="(n: number) => {
          const v = [... props.value]
          v[i] = n
          emit('change', v as [number, number, number])
        }"
      />
    </div>
  </div>
</template>
