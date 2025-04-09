<script setup lang="ts">
import { shallowRef, toRefs, useSlots } from 'vue'
import type { Group } from 'three'
import { useWiggle } from '.'

export interface WiggleProps {
  debug?: boolean
  basic?: boolean | object
  spring?: boolean | object
}

const props = withDefaults(defineProps<WiggleProps>(), {
  debug: false,
})

const { debug, basic, spring } = toRefs(props)

const mainRef = shallowRef<Group>()
const slots = useSlots()

const model = slots.default?.({})?.[0]?.props?.object

useWiggle(model, { debug: debug.value, ...(basic.value ? { basic } : { spring }) })

defineExpose({
  instance: mainRef,
})
</script>

<template>
  <TresGroup ref="mainRef">
    <slot></slot>
  </TresGroup>
</template>
