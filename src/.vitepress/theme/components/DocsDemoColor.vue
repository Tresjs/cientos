<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  value: string
}

const props = withDefaults(defineProps<Props>(), {
  value: '#FFFFFF',
})

const emit = defineEmits<{
  (e: 'change', value: string): void
}>()

const hex = computed(() => {
  if (props.value.length === 7) { return props.value }
  if (props.value.length === 4) {
    const [_, a, b, c] = props.value
    return `#${a}${a}${b}${b}${c}${c}`
  }
  return '#FF0000'
})
</script>

<template>
  <div
    type="button"
    class="flex place-content-start w-full gap-x-1 rounded-md bg-inherit shadow-sm"
  >
    <input class="cursor-pointer" style="right:0; opacity:0; width:100%; position:absolute;" type="color" value="v" @change="(e) => { const n = (e.target as HTMLInputElement).value; emit('change', n) }" />
    <div class="pl-1 block" :style="{ color: hex }">&#9679;</div>
    <div>{{ hex }}</div>
  </div>
</template>
