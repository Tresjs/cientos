<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  value: boolean
}

const props = withDefaults(defineProps<Props>(), {
  value: true,
})

const emit = defineEmits<{
  (e: 'change', value: boolean): void
}>()

const v = ref(props.value)
watch(() => props.value, (value) => { v.value = value })
</script>

<template>
  <div class="relative block text-right w-full bg-inherit">
    <button
      id="menu-button"
      type="button"
      class="flex place-content-end w-full text-base gap-x-1.5 rounded-md px-3 py-2 bg-inherit shadow-sm"
      @click="() => { v = !v; emit('change', v) }"
    >
      {{ v }}
      <svg class="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
        <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</template>
