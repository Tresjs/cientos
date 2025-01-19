<script setup lang="ts">
import { ref, watchEffect } from 'vue'

interface Props {
  value: string
}

const props = withDefaults(defineProps<Props>(), {
  value: '#FFFFFF',
})

const emit = defineEmits<{
  (e: 'change', value: string): void
}>()

const hex = ref(props.value)
watchEffect(() => {
  if (props.value.length === 7) { hex.value = props.value }
  else if (props.value.length === 4) { const [_, a, b, c] = props.value; hex.value = `#${a}${a}${b}${b}${c}${c}`}
  else { hex.value = '#FF0000' }
})
</script>

<template>
  <div class="relative block text-right py-2 w-full bg-inherit">
    <input class="cursor-pointer" style="right:0;opacity:0;width:100%;position:absolute;" type="color" value="v" @change="(e) => { hex = e.target!.value; emit('change', hex) }" />
    <div class="pr-8">{{ hex }}</div>
    <div class="absolute right-0 top-2.5 block mr-2 rounded-full ring-1" :style="{ 'height': '20px', 'width': '20px', 'overflow': 'hidden', 'background-color': hex }"></div>
  </div>
</template>
