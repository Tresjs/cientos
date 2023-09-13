<script setup lang="ts">
import { useRenderLoop } from '@tresjs/core'
import { MathUtils } from 'three'
import { shallowRef } from 'vue'

const props = withDefaults(
  defineProps<{
    speed: number
    rotationFactor?: number
    floatFactor?: number
    range?: [number, number]
  }>(),
  {
    speed: 1,
    rotationFactor: 1,
    floatFactor: 1,
    range: () => [-0.1, 0.1],
  },
)

const groupRef = shallowRef()

defineExpose({
  value: groupRef,
})

const { onLoop } = useRenderLoop()

const offset = Math.random() * 10000
let elapsed = offset
const SPEED_SCALE = 0.25
onLoop(({ delta }) => {
  if (!groupRef.value) return

  elapsed += delta * props.speed * SPEED_SCALE
  const theta = elapsed
  groupRef.value.rotation.x = (Math.cos(theta) / 8) * props.rotationFactor
  groupRef.value.rotation.y = (Math.sin(theta) / 8) * props.rotationFactor
  groupRef.value.rotation.z = (Math.sin(theta) / 20) * props.rotationFactor
  let yPosition = Math.sin(theta) / 10
  yPosition = MathUtils.mapLinear(yPosition, -0.1, 0.1, props.range?.[0] ?? -0.1, props.range?.[1] ?? 0.1)
  groupRef.value.position.y = yPosition * props.floatFactor
})
</script>

<template>
  <TresGroup
    v-bind="$attrs"
    ref="groupRef"
  >
    <slot />
  </TresGroup>
</template>
