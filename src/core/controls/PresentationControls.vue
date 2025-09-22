<script lang="ts" setup>
import { useEventListener } from '@vueuse/core'
import { useLoop, useTres } from '@tresjs/core'
import { MathUtils } from 'three'
import type { Group } from 'three'
import {
  computed,
  onUnmounted,
  reactive,
  ref,
  shallowRef,
  toRefs,
  watchEffect,
} from 'vue'

type EulerArray = [number, number, number]
type RangeTuple = [number, number]

export interface PresentationControlsProps {
  enabled?: boolean
  snap?: boolean | number | { mass?: number, tension?: number }
  /**
   * Spring configuration while dragging
   * @default { mass: 2, tension: 500 }
   */
  config?: { mass?: number, tension?: number }
  global?: boolean
  cursor?: boolean
  speed?: number
  zoom?: number
  rotation?: EulerArray
  polar?: RangeTuple
  azimuth?: RangeTuple
  damping?: number
  domElement?: HTMLElement
}

const props = withDefaults(
  defineProps<PresentationControlsProps>(),
  {
    enabled: true,
    snap: undefined,
    config: () => ({ mass: 2, tension: 500 }),
    global: false,
    cursor: true,
    speed: 1,
    rotation: () => [0, 0, 0],
    zoom: 1,
    polar: () => [0, Math.PI / 2],
    azimuth: () => [
      Number.NEGATIVE_INFINITY,
      Number.POSITIVE_INFINITY,
    ],
    damping: 0.25,
  },
)

const {
  enabled,
  snap,
  global,
  cursor,
  speed,
  rotation,
  zoom,
  polar,
  azimuth,
  damping,
  config,
  domElement,
} = toRefs(props)

const { sizes, renderer, invalidate } = useTres()

const explDomElement = computed<
  HTMLElement | undefined
>(() => domElement.value || renderer.domElement)

// Derived ranges and initial rotation (clamped)
const rPolar = computed<RangeTuple>(() => [
  rotation.value[0] + polar.value[0],
  rotation.value[0] + polar.value[1],
])
const rAzimuth = computed<RangeTuple>(() => [
  rotation.value[1] + azimuth.value[0],
  rotation.value[1] + azimuth.value[1],
])
const rInitial = computed<EulerArray>(() => [
  MathUtils.clamp(
    rotation.value[0],
    rPolar.value[0],
    rPolar.value[1],
  ),
  MathUtils.clamp(
    rotation.value[1],
    rAzimuth.value[0],
    rAzimuth.value[1],
  ),
  rotation.value[2],
])

// Animation target state
const animation = reactive({
  scale: 1,
  rotation: rInitial.value.slice() as EulerArray,
  damping: damping.value,
})

// Spring velocities for scale and rotation components
const velocity = reactive({
  scale: 0,
  rotation: [0, 0, 0] as EulerArray,
})

// 3D group ref
const groupRef = shallowRef<Group | null>(null)

// Drag handling (declare before render loop to satisfy linter ordering)
const isDragging = ref(false)
let startX = 0
let startY = 0
let startRotX = rInitial.value[1] // azimuth (around y)
let startRotY = rInitial.value[0] // polar (around x)

// Initialize once and integrate spring motion per-frame
const initialized = ref(false)
const { onBeforeRender } = useLoop()
onBeforeRender(({ delta }) => {
  const group = groupRef.value
  if (!group) { return }

  if (!initialized.value) {
    group.rotation.set(rInitial.value[0], rInitial.value[1], rInitial.value[2])
    group.scale.set(1, 1, 1)
    initialized.value = true
  }

  const dt = Math.max(0.000001, Math.min(0.05, delta))

  // Choose config depending on dragging/snap state
  const isSnapping = (!isDragging.value) && !!snap.value
  const baseConfig = isSnapping
    ? (typeof snap.value === 'object' ? (snap.value as any) : {})
    : (config.value || {})
  const mass = Math.max(0.0001, Number(baseConfig.mass ?? (isSnapping ? 4 : 2)))
  const tension = Math.max(0, Number(baseConfig.tension ?? (isSnapping ? 1500 : 500)))
  const dampingRatio = (typeof snap.value === 'number' && isSnapping)
    ? Math.max(0, Number(snap.value))
    : Math.max(0, Number(animation.damping))
  const c = 2 * Math.sqrt(tension * mass) * dampingRatio

  function stepScalar(current: number, target: number, v: number): [number, number] {
    const a = (-(tension / mass) * (current - target)) - ((c / mass) * v)
    const nv = v + a * dt
    const nx = current + nv * dt
    return [nx, nv]
  }

  // Scale spring (uniform)
  const [nx, nv] = stepScalar(group.scale.x, animation.scale, velocity.scale)
  const clampedScale = Math.max(0.001, nx)
  group.scale.set(clampedScale, clampedScale, clampedScale)
  velocity.scale = nv

  // Rotation springs per axis
  const rTargets = animation.rotation
  const rCurr = [group.rotation.x, group.rotation.y, group.rotation.z] as EulerArray
  const newRot: EulerArray = [0, 0, 0]
  const newVel: EulerArray = [0, 0, 0]
  for (let i = 0; i < 3; i++) {
    const [nr, nrv] = stepScalar(rCurr[i], rTargets[i], velocity.rotation[i])
    newRot[i] = nr
    newVel[i] = nrv
  }
  group.rotation.set(newRot[0], newRot[1], newRot[2])
  velocity.rotation = newVel as EulerArray
})

// Cursor management for global mode
watchEffect((onCleanup) => {
  const el = explDomElement.value
  if (!el) {
    return
  }
  if (
    global.value
    && cursor.value
    && enabled.value
  ) {
    const original = el.style.cursor
    el.style.cursor = 'grab'
    onCleanup(() => {
      el.style.cursor = original || 'default'
    })
  }
})

function beginDrag(
  clientX: number,
  clientY: number,
) {
  if (!enabled.value) {
    return
  }
  isDragging.value = true
  startX = clientX
  startY = clientY
  const current = (animation.rotation
    || rInitial.value) as EulerArray
  startRotY = current[0]
  startRotX = current[1]
  if (cursor.value && explDomElement.value) {
    explDomElement.value.style.cursor
      = 'grabbing'
  }
}

function updateDrag(
  clientX: number,
  clientY: number,
) {
  if (!enabled.value || !isDragging.value) {
    return
  }
  const dx = clientX - startX
  const dy = clientY - startY
  const width = Math.max(1, sizes.width.value)
  const height = Math.max(1, sizes.height.value)
  let nextX
    = startRotX
      + (dx / width) * Math.PI * speed.value
  let nextY
    = startRotY
      + (dy / height) * Math.PI * speed.value
  nextX = MathUtils.clamp(
    nextX,
    rAzimuth.value[0],
    rAzimuth.value[1],
  )
  nextY = MathUtils.clamp(
    nextY,
    rPolar.value[0],
    rPolar.value[1],
  )

  animation.scale
    = nextY > rPolar.value[1] / 2 ? zoom.value : 1
  animation.rotation = [nextY, nextX, 0]
  animation.damping = damping.value
  invalidate()
}

function endDrag() {
  if (!enabled.value) {
    return
  }
  isDragging.value = false
  animation.scale = 1
  if (cursor.value && explDomElement.value) {
    explDomElement.value.style.cursor = 'grab'
  }
  if (snap.value) {
    animation.rotation
      = rInitial.value.slice() as EulerArray
  }
  animation.damping
    = typeof snap.value === 'number'
      ? snap.value
      : damping.value
  invalidate()
}

// Local (non-global) pointer handlers – early-return if global mode
function onPointerEnter() {
  if (global.value || !enabled.value) {
    return
  }
  if (cursor.value && explDomElement.value) {
    explDomElement.value.style.cursor = 'grab'
  }
}
function onPointerLeave() {
  if (global.value || !enabled.value) {
    return
  }
  if (
    cursor.value
    && explDomElement.value
    && !isDragging.value
  ) {
    explDomElement.value.style.cursor = 'auto'
  }
}
function onPointerDown(e: PointerEvent) {
  if (global.value) {
    return
  }
  beginDrag(e.clientX, e.clientY)
}
function onPointerMove(e: PointerEvent) {
  if (global.value) {
    return
  }
  updateDrag(e.clientX, e.clientY)
}
function onPointerUp() {
  if (global.value) {
    return
  }
  endDrag()
}

// Global listeners when global=true
watchEffect((onCleanup) => {
  if (!global.value || !explDomElement.value) {
    return
  }
  const el = explDomElement.value
  const down = (e: PointerEvent) =>
    beginDrag(e.clientX, e.clientY)
  const move = (e: PointerEvent) =>
    updateDrag(e.clientX, e.clientY)
  const up = () => endDrag()
  const leave = () => {
    if (!isDragging.value) {
      if (cursor.value) {
        el.style.cursor = 'grab'
      }
    }
  }
  useEventListener(el, 'pointerdown', down)
  useEventListener(el, 'pointermove', move)
  useEventListener(el, 'pointerup', up)
  useEventListener(el, 'pointerleave', leave)
  onCleanup(() => {
    // listeners auto-removed by useEventListener's scope disposal
  })
})

onUnmounted(() => {
  // Reset cursor if we changed it
  const el = explDomElement.value
  if (el && cursor.value) {
    el.style.cursor = 'default'
  }
})

defineExpose({ instance: groupRef })
</script>

<template>
  <TresGroup
    ref="groupRef"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
  >
    <slot></slot>
  </TresGroup>
</template>
