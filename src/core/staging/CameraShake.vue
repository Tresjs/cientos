<script setup lang="ts">
import { useLoop, useTresContext } from '@tresjs/core'
import { useEventListener } from '@vueuse/core'
import { SimplexNoise } from 'three-stdlib'
import { onUnmounted, shallowRef, toRefs, watch } from 'vue'

/**
 * Props for CameraShake
 */
export interface CameraShakeProps {
  /**
   * The intensity of the shake.
   * @default 1
   * @type {number}
   */
  intensity?: number
  /**
   * If true, the intensity decays over time.
   * @default false
   * @type {boolean}
   */
  decay?: boolean
  /**
   * How fast the intensity decays when `decay` is true.
   * @default 0.65
   * @type {number}
   */
  decayRate?: number
  /**
   * Maximum yaw angle in radians.
   * @default 0.01
   * @type {number}
   */
  maxYaw?: number
  /**
   * Maximum pitch angle in radians.
   * @default 0.01
   * @type {number}
   */
  maxPitch?: number
  /**
   * Maximum roll angle in radians.
   * @default 0.01
   * @type {number}
   */
  maxRoll?: number
  /**
   * Frequency of yaw oscillation.
   * @default 0.1
   * @type {number}
   */
  yawFrequency?: number
  /**
   * Frequency of pitch oscillation.
   * @default 0.1
   * @type {number}
   */
  pitchFrequency?: number
  /**
   * Frequency of roll oscillation.
   * @default 0.1
   * @type {number}
   */
  rollFrequency?: number
}

const props = withDefaults(defineProps<CameraShakeProps>(), {
  intensity: 1,
  decay: false,
  decayRate: 0.65,
  maxYaw: 0.01,
  maxPitch: 0.01,
  maxRoll: 0.01,
  yawFrequency: 0.1,
  pitchFrequency: 0.1,
  rollFrequency: 0.1,
})

const {
  intensity,
  decay,
  decayRate,
  maxYaw,
  maxPitch,
  maxRoll,
  yawFrequency,
  pitchFrequency,
  rollFrequency,
} = toRefs(props)

const { camera, controls } = useTresContext()

let cleanUpFn: ReturnType<typeof useEventListener> | null = null

const currentIntensity = shallowRef(props.intensity)
const initialRotation = shallowRef(camera.activeCamera.value?.rotation.clone())

const yawNoise = new SimplexNoise()
const pitchNoise = new SimplexNoise()
const rollNoise = new SimplexNoise()

watch(intensity, (newVal) => {
  currentIntensity.value = newVal
})

function updateInitialRotation() {
  if (camera.activeCamera.value) {
    initialRotation.value = camera.activeCamera.value.rotation.clone()
  }
}

watch([camera.activeCamera, controls], () => {
  if (!camera.activeCamera.value) { return }

  updateInitialRotation()

  if (controls.value) {
    cleanUpFn = useEventListener(controls.value as any, 'change', updateInitialRotation)
  }
})

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed, delta }) => {
  if (!camera.activeCamera.value) { return }

  const shake = currentIntensity.value ** 2

  const yaw = maxYaw.value * shake * yawNoise.noise(elapsed * yawFrequency.value, 1)
  const pitch = maxPitch.value * shake * pitchNoise.noise(elapsed * pitchFrequency.value, 1)
  const roll = maxRoll.value * shake * rollNoise.noise(elapsed * rollFrequency.value, 1)

  camera.activeCamera.value.rotation.set(
    initialRotation.value.x + pitch,
    initialRotation.value.y + yaw,
    initialRotation.value.z + roll,
  )

  if (decay.value && currentIntensity.value > 0) {
    currentIntensity.value -= decayRate.value * delta
    if (currentIntensity.value < 0) { currentIntensity.value = 0 }
  }
})

onUnmounted(() => {
  cleanUpFn?.()
})
</script>

<template>
  <slot></slot>
</template>
