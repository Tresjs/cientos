<script setup lang="ts">
import { onUnmounted, reactive, ref, toRefs, watch } from 'vue'
import { MathUtils } from 'three'
import { useRenderLoop, useTresContext } from '@tresjs/core'
import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'
import { easing } from 'maath'
import { useGesture } from '@vueuse/gesture'

// TODO: Add the ability (Add props) to change the easing of the return animation (elastic, bounce, etc.).

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

const rPolar: [number, number] = [
  props.rotation[0] + props.polar[0],
  props.rotation[0] + props.polar[1],
]

const rAzimuth: [number, number] = [
  props.rotation[1] + props.azimuth[0],
  props.rotation[1] + props.azimuth[1],
]

const rInitial: [number, number, number] = [
  MathUtils.clamp(props.rotation[0], rPolar[0], rPolar[1]),
  MathUtils.clamp(props.rotation[1], rAzimuth[0], rAzimuth[1]),
  props.rotation[2],
]

const animation = reactive({
  rotation: [...rInitial] as [number, number, number],
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
      // Future feature of useGesture?
      if (!hovering) {
        animation.scale = 1
        animation.rotation = rInitial
        gestureHandler.reset()
      }
    },
    onDrag: ({ down, delta: [dx, dy], memo }) => {
      const [oldX, oldY] = memo || [...animation.rotation] || rInitial

      if (!enabled.value) { return [dy, dx] }

      if (cursor.value) { explDomElement.style.cursor = down ? 'grabbing' : 'grab' }

      const newX = MathUtils.clamp(oldX + (dx / sizes.width.value) * Math.PI * speed.value, ...rAzimuth)
      const newY = MathUtils.clamp(oldY + (dy / sizes.height.value) * Math.PI * speed.value, ...rPolar)

      animation.rotation = snap.value && !down ? rInitial : [newY, newX, 0]
      animation.scale = down && newY > rPolar[1] / 2 ? zoom.value : 1
      animation.damping = snap.value && !down && typeof snap.value !== 'boolean' ? (snap.value as number) : damping.value

      return [newX, newY]
    },
  },
  {
    domTarget: domElement.value || global.value ? explDomElement : undefined,
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
