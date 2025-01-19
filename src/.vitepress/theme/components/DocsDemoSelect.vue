<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

interface Props {
  value: string
  options: string[]
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  options: () => [],
})

const emit = defineEmits<{
  (e: 'change', value: string): void
}>()

const active = ref(false)
function close() { active.value = false }

const target = ref(null)
onClickOutside(target, close)
</script>

<template>
  <div class="relative block text-right w-full bg-inherit">
    <div>
      <button
        id="menu-button"
        type="button"
        class="flex place-content-end w-full text-base gap-x-1.5 rounded-md px-3 py-2 bg-inherit shadow-sm"
        aria-expanded="true"
        aria-haspopup="true"
        @click="active = !active"
      >
        {{ value }}
        <svg class="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
          <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    <div
      v-if="active"
      ref="target"
      class="absolute right-0 z-10 mt-2 w-56 text-left origin-top-left rounded-md shadow-lg bg-inherit"
      style="background-color: var(--vp-c-bg); border: 1px solid var(--vp-c-divider)"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex="-1"
    >
      <div class="py-1" role="none">
        <a
          v-for="option, i of options"
          :id="`menu-item-${i}`"
          :key="i"
          class="block px-4 py-2 bg-inherit !font-normal"
          role="menuitem"
          tabindex="-1"
          @click="() => { emit('change', option); close() }"
        >{{ option }}</a>
      </div>
    </div>
  </div>
</template>
