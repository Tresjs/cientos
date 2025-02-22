<script setup lang="ts">
import { computed, onUnmounted, reactive, ref, toRefs, watch } from 'vue'
import { MathUtils } from 'three'
import { useRenderLoop, useTresContext } from '@tresjs/core'
import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'
import { easing } from 'maath'
import { useGesture } from '@vueuse/gesture'

// TODO: Add (props) the ability to change the easing of the return animation (elastic, bounce, etc.).

const props = withDefaults(
  defineProps<{
    enabled?: boolean // good
    snap?: boolean | number // good
    global?: boolean // ⚠️ not reactive // good
    cursor?: boolean // good
    speed?: number // good
    zoom?: number // good
    damping?: number // good
    rotation?: [number, number, number]
    polar?: [number, number]
    azimuth?: [number, number]
    domElement?: HTMLElement | null // good
  }>(),
  {
    enabled: true,
    snap: true,
    global: true,
    cursor: true,
    speed: 1,
    zoom: 1,
    damping: 0.25,
    rotation: () => [0, 0, 0],
    polar: () => [-Math.PI / 2, Math.PI / 2],
    azimuth: () => [-Infinity, Infinity],
  },
)

const { speed, enabled, snap, damping, zoom, global, domElement, cursor } = toRefs(props)

gsap.registerPlugin(CustomEase)

const easeOutExpoGSAP = gsap.parseEase('expo.out')
console.log('easeOutExpoGSAP', easeOutExpoGSAP)

const easeOutExpo = (x: number): number => {
  return x === 1 ? 1 : 1 - 2 ** (-10 * x)
}
console.log('easeOutExpo', easeOutExpo)

const { onLoop } = useRenderLoop()

const rPolar = computed<[number, number]>(() => [
  props.rotation[0] + props.polar[0],
  props.rotation[0] + props.polar[1],
])

const rAzimuth = computed<[number, number]>(() => [
  props.rotation[1] + props.azimuth[0],
  props.rotation[1] + props.azimuth[1],
])

const rInitial = computed<[number, number, number]>(() => [
  MathUtils.clamp(props.rotation[0], rPolar.value[0], rPolar.value[1]),
  MathUtils.clamp(props.rotation[1], rAzimuth.value[0], rAzimuth.value[1]),
  props.rotation[2],
])

const animation = reactive({
  rotation: [...rInitial.value] as [number, number, number],
  scale: 1,
  damping: damping.value,
})

const groupRef = ref()

const { sizes, renderer } = useTresContext()

const explDomElement = domElement.value || renderer.value.domElement

const gestureHandler = useGesture(
  {
    onHover: ({ hovering }) => {
      if (enabled.value && cursor.value && !global.value) {
        explDomElement.style.cursor = hovering ? 'grab' : 'auto'
      }

      // Prevent the onDrag canceling when `global` value is `false` and the mouse leaves the model.
      // (Future feature of useGesture?)
      if (!hovering) {
        animation.scale = 1
        animation.rotation = rInitial.value
        gestureHandler.reset()
      }
    },
    onDrag: ({ down, delta: [dx, dy], memo }) => {
      const [oldX, oldY] = memo || [...animation.rotation] || rInitial.value

      if (!enabled.value) { return [dy, dx] }

      if (cursor.value) { explDomElement.style.cursor = down ? 'grabbing' : 'grab' }

      const newX = MathUtils.clamp(oldX + (dx / sizes.width.value) * Math.PI * speed.value, ...rAzimuth.value)
      const newY = MathUtils.clamp(oldY + (dy / sizes.height.value) * Math.PI * speed.value, ...rPolar.value)

      animation.rotation = snap.value && !down ? rInitial.value : [newY, newX, 0]
      animation.scale = down && newY > rPolar.value[1] / 2 ? zoom.value : 1
      animation.damping = snap.value && !down && typeof snap.value !== 'boolean' ? (snap.value as number) : damping.value

      return [newX, newY]
    },
  },
  {
    domTarget: global.value ? explDomElement : undefined,
  },
)

watch([global, enabled, cursor], () => {
  if (enabled.value && cursor.value) {
    explDomElement.style.cursor = global.value ? 'grab' : 'auto'
  }

  if (!enabled.value || !cursor.value) {
    explDomElement.style.cursor = 'auto'
  }
}, { immediate: true })

onLoop(({ delta }) => {
  if (!enabled.value && !groupRef.value) { return }

  easing.damp3(groupRef.value.scale, animation.scale, animation.damping, delta, undefined, easeOutExpoGSAP)
  easing.dampE(groupRef.value.rotation, animation.rotation, animation.damping, delta, undefined, easeOutExpoGSAP)
})

onUnmounted(() => {
  explDomElement.style.cursor = 'default'
  gestureHandler?.clean()
})
</script>

<template>
  <TresGroup ref="groupRef" v-bind="domElement === null || !global ? gestureHandler.bind() : undefined">
    <slot></slot>
  </TresGroup>
</template>
