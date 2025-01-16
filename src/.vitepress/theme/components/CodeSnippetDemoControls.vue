<script setup lang="ts">
import { useSlots } from 'vue'

interface DemoControlBase {
  type: string
  selector: string
  label: string
}

type DemoControlRange = DemoControlBase & {
  type: 'range'
  selector: string
  min: number
  max: number
  step?: number
  initial: number
}

type DemoControlSelect = DemoControlBase & {
  type: 'select'
  selector: string
  options: string[]
  initial: string
}

type DemoControlCheckbox = DemoControlBase & {
  type: 'checkbox'
  selector: string
  initial: boolean
}

type DemoControl = DemoControlRange | DemoControlSelect | DemoControlCheckbox

const props = withDefaults(defineProps<{ controls: DemoControl[] }>(), { controls: () => [] })

</script>

<template>
  <ClientOnly>
    <div
      class="relative aspect-video"
      style=" height: auto; margin: 2rem 0; border-radius: 8px; overflow:hidden;"
    >
      <Suspense>
        <slot></slot>
      </Suspense>
    </div>
  </ClientOnly>
</template>
