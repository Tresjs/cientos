<script setup lang="ts">
import { computed, ref } from 'vue'

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
    class="flex place-content-start w-full gap-x-1 rounded-md bg-inherit"
    @pointerenter="active = true"
    @pointerleave="active = false"
    @keydown="keydown"
  >
    <div class="pl-1 block swatch" :style="{ color: hex }">&#9632;</div>
    <div v-if="!active">{{ hex }}</div>
    <div v-if="active">
      <div v-for="h, i of options" :key="i" class="swatch" :style="{ display: 'inline-block', color: h }" @pointerup="() => emit('change', h)">&#9632;</div>
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
