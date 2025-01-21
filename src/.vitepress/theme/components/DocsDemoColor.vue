<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'

interface Props {
  value: string
  options?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  value: '#FF0000',
  options: () => getNOptions(24),
})

const emit = defineEmits<{
  (e: 'change', value: string): void
}>()

const hex = computed(() => normalizeHexString(props.value))
const active = ref(false)

function normalizeHexString(s: string) {
  if (!s.startsWith('#')) { s = `#${s}` }

  s = s.toUpperCase()
  const length = s.length
  if (length === 4) {
    const [_, a, b, c] = s.split('')
    return `#${a}${a}${b}${b}${c}${c}`
  }
  if (length === 7) {
    return s
  }

  return '#FF0000'
}

const keyCallbacks = {
  ArrowUp: prev,
  ArrowDown: next,
  ArrowLeft: prev,
  ArrowRight: next,
  KeyW: prev,
  KeyA: prev,
  KeyS: next,
  KeyD: next,
}

function next() {
  const next = props.options[props.options.indexOf(props.value) + 1]
  if (next && next !== props.value) { emit('change', next) }
}

function prev() {
  const prev = props.options[props.options.indexOf(props.value) - 1]
  if (prev && prev !== props.value) { emit('change', prev) }
}

function keydown(e: KeyboardEvent) {
  active.value = false
  if (e.key in keyCallbacks) { keyCallbacks[e.key as keyof typeof keyCallbacks](); e.stopPropagation(); e.preventDefault() }
  if (e.code in keyCallbacks) { keyCallbacks[e.code as keyof typeof keyCallbacks](); e.stopPropagation(); e.preventDefault() }
}

const canvas = ref()
const { elementX: canvasX, elementY: canvasY, elementWidth: canvasW } = useMouseInElement(canvas)

function pointermove(e: PointerEvent) {
  const r = canvasW.value * 0.5
  const x = (canvasX.value - r) / r
  const y = (canvasY.value - r) / r
  let rads = Math.atan2(y, x)
  while (rads < 0) { rads += Math.PI * 2 }
  const dist = Math.min(1, Math.sqrt(x * x + y * y))
  const hex = hslToHex(rads / (2 * Math.PI), dist, 0.5)
  emit('change', hex)
}

watch(canvas, (canvas) => {
  if (canvas) {
    const context = canvas.getContext('2d')
    const x = canvas.width / 2
    const y = canvas.height / 2
    const radius = canvas.width * 0.5
    const counterClockwise = false

    context.beginPath()
    context.arc(x, y, radius, 0, 2 * Math.PI, false)
    context.fillStyle = 'white'
    context.fill()

    for (let angle = 0; angle <= 360; angle += 1) {
      const startAngle = (angle - 2) * Math.PI / 180
      const endAngle = angle * Math.PI / 180
      context.beginPath()
      context.moveTo(x, y)
      context.arc(x, y, radius - 2, startAngle, endAngle, counterClockwise)
      context.closePath()
      const gradient = context.createRadialGradient(x, y, 0, x, y, radius)
      gradient.addColorStop(0, hslToHex(angle / 360, 0, 0.5))
      gradient.addColorStop(1, hslToHex(angle / 360, 1, 0.5))
      context.fillStyle = gradient
      context.fill()
    }
  }
})

function pointerdown(e: PointerEvent) { (e.target as HTMLElement).setPointerCapture(e.pointerId); active.value = true }
function pointerup(e: PointerEvent) { active.value = false }
</script>

<script lang="ts">
function getNOptions(n: number) {
  const result = ['#FFFFFF', '#000000']
  if (result.length >= n) { return result.slice(0, n) }

  const stride = 1 / n
  for (let i = 0; result.length < n; i++) {
    result.push(hslToHex(i * stride, 1, i % 2 ? 0.25 : 0.5))
  }
  return result
}

// NOTE: Source https://www.jameslmilner.com/posts/converting-rgb-hex-hsl-colors/
// All args in [0,1]
function hslToHex(h: number, s: number, l: number): string {
  const hDecimal = l
  const a = (s * Math.min(hDecimal, 1 - hDecimal))
  const f = (n: number) => {
    const k = (n + h * 12) % 12
    const color = hDecimal - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)

    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}
</script>

<template>
  <button
    type="button"
    class="flex place-content-start w-full gap-x-1 rounded-md bg-inherit relative"
    @pointerdown="pointerdown"
    @pointerup="pointerup"
    @pointermove="(e) => { if (active) { pointermove(e) } }"
    @keydown="keydown"
  >
    <div class="pl-1 block swatch" :style="{ color: hex }">&#9632;</div>
    <div v-if="!active" class="px-1.25">{{ hex }}</div>
    <div v-if="active" class="absolute">
      <canvas
        ref="canvas"
        class="relative -mt-100px -ml-100px z-100"
        height="200"
        width="200"
      ></canvas>
    </div>
  </button>
</template>

<style scoped>
.swatch {
  text-shadow:
    -1px -1px 0 var(--vp-input-border-color),
    1px -1px 0 var(--vp-input-border-color),
    -1px 1px 0 var(--vp-input-border-color),
    1px 1px 0 var(--vp-input-border-color);
}
</style>
