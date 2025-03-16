<script setup lang="ts">
import { useRenderLoop, useTresContext } from '@tresjs/core'
import { easing } from 'maath'
import type { Group } from 'three'
import { MathUtils } from 'three'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useEventListener } from '@vueuse/core'

interface PresentationControlsProps {
  snap?: boolean | number
  global?: boolean
  cursor?: boolean
  speed?: number
  zoom?: number
  rotation?: [number, number, number]
  polar?: [number, number]
  azimuth?: [number, number]
  damping?: number
  enabled?: boolean
  domElement?: HTMLElement
}

const props = withDefaults(defineProps<PresentationControlsProps>(), {
  enabled: true,
  cursor: true,
  speed: 1,
  rotation: () => [0, 0, 0],
  zoom: 1,
  polar: () => [0, Math.PI / 2],
  azimuth: () => [-Infinity, Infinity],
  damping: 0.25,
})

const three = useTresContext()
const renderer = three.renderer.value
const sizes = three.sizes
const explDomElement = props.domElement || renderer?.domElement

const rPolar = computed<[number, number]>(() => [
  props.rotation[0] + props.polar[0],
  props.rotation[0] + props.polar[1],
])

const rAzimuth = computed<[number, number]>(() => [
  props.rotation[1] + props.azimuth[0],
  props.rotation[1] + props.azimuth[1],
])

const rInitial = computed<[number, number, number]>(() => [
  MathUtils.clamp(props.rotation[0], ...rPolar.value),
  MathUtils.clamp(props.rotation[1], ...rAzimuth.value),
  props.rotation[2],
])

const groupRef = ref<Group | null>(null)
let isDragging = false
const animation = {
  scale: 1,
  rotation: rInitial.value,
  damping: props.damping,
}

watch(() => [props.global, props.cursor, props.enabled], ([global, cursor, enabled]) => {
  if (global && cursor && enabled && explDomElement) {
    explDomElement.style.cursor = 'grab'
    if (renderer?.domElement) {
      renderer.domElement.style.cursor = ''
    }
  }
}, { immediate: true })

watch(() => rInitial.value, (newValue) => {
  if (!isDragging) {
    animation.rotation = newValue
  }
}, { immediate: true })

const { onLoop } = useRenderLoop()
onLoop(({ delta }) => {
  if (!groupRef.value) { return }
  const adjustedDelta = delta * 2.5
  easing.damp3(groupRef.value.scale, animation.scale, animation.damping, adjustedDelta)
  easing.dampE(groupRef.value.rotation, animation.rotation, animation.damping, adjustedDelta)
})

let lastPosition = { x: 0, y: 0 }
let memo: [number, number] = [0, 0]

const handlePointerDown = (event: PointerEvent) => {
  if (!props.enabled) { return }
  isDragging = true
  lastPosition = { x: event.clientX, y: event.clientY }
  memo = [animation.rotation[0], animation.rotation[1]]
  if (props.cursor && explDomElement) {
    explDomElement.style.cursor = 'grabbing'
  }
}

const handlePointerMove = (event: PointerEvent) => {
  if (!isDragging || !props.enabled || !sizes) { return }

  if (props.cursor) {
    explDomElement.style.cursor = isDragging ? 'grabbing' : 'grab'
  }

  const deltaX = event.clientX - lastPosition.x
  const deltaY = event.clientY - lastPosition.y

  const width = typeof sizes.width.value === 'number' ? sizes.width.value : Number(sizes.width.value)
  const height = typeof sizes.height.value === 'number' ? sizes.height.value : Number(sizes.height.value)

  const movementMultiplier = 2.5
  const x = MathUtils.clamp(
    memo[1] + (deltaX / width) * Math.PI * props.speed * movementMultiplier,
    rAzimuth.value[0],
    rAzimuth.value[1],
  )
  const y = MathUtils.clamp(
    memo[0] + (deltaY / height) * Math.PI * props.speed * movementMultiplier,
    rPolar.value[0],
    rPolar.value[1],
  )

  animation.scale = isDragging && y > rPolar.value[1] / 2 ? props.zoom : 1
  animation.rotation = [y, x, 0]
  animation.damping = props.damping * 0.1

  memo = [y, x]
  lastPosition = { x: event.clientX, y: event.clientY }
}

const handlePointerUp = () => {
  isDragging = false
  if (props.cursor && explDomElement) {
    explDomElement.style.cursor = 'grab'
  }

  animation.damping = props.damping * 0.01

  if (props.snap) {
    animation.scale = 1
    animation.rotation = rInitial.value
    animation.damping = typeof props.snap === 'number' ? props.snap : props.damping * 0.01
  }

  setTimeout(() => {
    animation.damping = props.damping
  }, 500)
}

const handleHover = (event: MouseEvent) => {
  if (props.cursor && !props.global && props.enabled && explDomElement) {
    explDomElement.style.cursor = event.type === 'mouseleave' ? 'auto' : 'grab'
  }
}

onMounted(() => {
  if (props.global) {
    const target = props.domElement || renderer?.domElement || window
    useEventListener(target, 'pointerdown', handlePointerDown)
    useEventListener(window, 'pointermove', handlePointerMove)
    useEventListener(window, 'pointerup', handlePointerUp)
    useEventListener(target, 'mouseenter', handleHover)
    useEventListener(target, 'mouseleave', handleHover)
  }
})

onUnmounted(() => {
  if (explDomElement) {
    explDomElement.style.cursor = 'default'
  }
  if (renderer?.domElement) {
    renderer.domElement.style.cursor = 'default'
  }
})
</script>

<template>
  <TresGroup
    v-if="!global"
    ref="groupRef"
    @pointerdown="handlePointerDown"
    @pointermove="handlePointerMove"
    @pointerup="handlePointerUp"
    @mouseenter="handleHover"
    @mouseleave="handleHover"
  >
    <slot></slot>
  </TresGroup>
  <TresGroup
    v-else
    ref="groupRef"
  >
    <slot></slot>
  </TresGroup>
</template>
