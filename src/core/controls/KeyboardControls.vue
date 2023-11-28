<script setup lang="ts">
import { ref, shallowRef, toRefs, watch } from 'vue'
import { useRenderLoop, useTresContext } from '@tresjs/core'
import { PointerLockControls } from 'three-stdlib'
import { onKeyStroke, onKeyDown, onKeyUp, useMagicKeys } from '@vueuse/core'

export interface HeadBobbingOptions {
  speed?: number
  amplitude?: number
}
export interface Actions {
  keys?: string[] | string
  action?: Function
}

export interface KeyboardControlsProps {
  /**
   * Keys to go forward.
   * @type {string[]}
   * @default '[w, W]'
   * @memberof KeyboardControlsProps
   *
   **/
  forward?: string[] | string
  /**
   * Keys to go back.
   * @type {string[]}
   * @default '[s, S]'
   * @memberof KeyboardControlsProps
   *
   **/
  back?: string[] | string
  /**
   * Keys to go left.
   * @type {string[]}
   * @default '[a, A]'
   * @memberof KeyboardControlsProps
   *
   **/
  left?: string[] | string
  /**
   * Keys to go right.
   * @type {string[]}
   * @default '[d, D]'
   * @memberof KeyboardControlsProps
   *
   **/
  right?: string[] | string
  /**
   * Key to go up (only without PointerLockControls).
   * @type {string}
   * @default 'Shift+w'
   * @memberof KeyboardControlsProps
   *
   **/
  up?: string
  /**
   * Key to go down (only without PointerLockControls).
   * @type {string}
   * @default 'Shift+s'
   * @memberof KeyboardControlsProps
   *
   **/
  down?: string
  /**
   * Simple callback for an optional primary action.
   * @type {Actions}
   * @default '{ keys: [e, E], action: () => {}}'
   * @memberof KeyboardControlsProps
   *
   **/
  primaryAction?: Actions
  /**
   * Simple callback for an optional secondary action.
   * @type {Actions}
   * @default '{keys: [f, F], action: () => {}}'
   * @memberof KeyboardControlsProps
   *
   **/
  secondaryAction?: Actions
  /**
   * Key to jump (only with PointerLockControls).
   * @type {string[]}
   * @default 'space'
   * @memberof KeyboardControlsProps
   *
   **/
  jump?: string[] | string
  /**
   * Gravity value for the jump.
   * @type {number}
   * @default 9.8
   * @memberof KeyboardControlsProps
   *
   **/
  gravity?: number
  /**
   * Speed movement.
   * @type {number}
   * @default 0.1
   * @memberof KeyboardControlsProps
   *
   **/
  moveSpeed?: number
  /**
   * Activate/deactivate headBobbing effect (only with PointerLockControls).
   * @type {boolean}
   * @default false
   * @memberof KeyboardControlsProps
   *
   **/
  headBobbing?: boolean
  /**
   * Indicates if the forward movement is in the Z axis or Y axis.
   * @type {boolean}
   * @default false
   * @memberof KeyboardControlsProps
   *
   **/
  headBobbingOptions?: HeadBobbingOptions
}

const props = withDefaults(defineProps<KeyboardControlsProps>(), {
  forward: () => ['w', 'W'],
  back: () => ['s', 'S'],
  left: () => ['a', 'A'],
  right: () => ['d', 'D'],
  up: () => 'Shift+w',
  down: () => 'Shift+s',
  primaryAction: () => ({ keys: ['e', 'E'], action: () => {} }),
  secondaryAction: () => ({ keys: ['f', 'F'], action: () => {} }),
  moveSpeed: 0.1,
  jump: ' ',
  gravity: 9.8,
  headBobbing: false,
  headBobbingOptions: () => ({
    speed: 5,
    amplitude: 0.3,
  }),
})

const emit = defineEmits(['change'])

const {
  forward,
  back,
  left,
  right,
  up,
  down,
  jump,
  primaryAction,
  secondaryAction,
  gravity,
  moveSpeed,
  headBobbing,
  headBobbingOptions,
} = toRefs(props)

const { camera: activeCamera, controls } = useTresContext()

// General options
const xMove = ref(0)
const zMove = ref(0)
const yMove = ref(0)
const wrapperRef = shallowRef()
const initCameraPos = activeCamera?.value?.position?.y ?? 0
const isMoving = ref(false)

onKeyDown(
  primaryAction.value.keys,
  () => primaryAction.value.action(),
)
onKeyDown(
  secondaryAction.value.keys,
  () => primaryAction.value.action(),
)
// HeadBobbing options
const headBobbingSpeed = headBobbingOptions.value.speed ?? 5
const headBobbingSpeedAmplitude = headBobbingOptions.value.amplitude ?? 0.3
const headBobbingMov = (elapsedTime: number) => isMoving.value
  ? Math.sin(elapsedTime * headBobbingSpeed) * headBobbingSpeedAmplitude + initCameraPos
  : initCameraPos

// Jump options
const isJumping = ref(false)
const jumpDistance = ref(0)
const jumpGravity = gravity.value ?? 9.8
const initJumpTime = ref(0)

const getJumpTime = () => ((Date.now() - initJumpTime.value) / 1000) * 3
const getJumpDistance = (jumpTime: number) => initCameraPos + 6 * jumpTime - 0.5 * jumpGravity * jumpTime ** 2
const getJump = () => {
  if (isJumping.value) {
    jumpDistance.value = getJumpDistance(getJumpTime())
    if (jumpDistance.value <= initCameraPos) {
      stopMovement()
      isJumping.value = false
    }
    return jumpDistance.value
  }
  return 0
}
//JUMP BUTTON
onKeyStroke(jump.value, () => {
  if (controls.value instanceof PointerLockControls) {
    if (!isJumping.value) initJumpTime.value = Date.now()
    startMovement()
    isJumping.value = true
  }
})

// UP/DOWN DIRECTION MOVEMENTS
const keys = useMagicKeys()
const combinationUp = keys[up.value]
const combinationDown = keys[down.value]

watch(combinationUp, (v) => {
  if (v) {
    startMovement()
    yMove.value = moveSpeed.value
  }
  else {
    yMove.value = 0
    stopMovement()
  }
})
watch(combinationDown, (v) => {
  if (v) {
    startMovement()
    yMove.value = -moveSpeed.value
  }
  else {
    yMove.value = 0
    stopMovement()
  }
})

// FORWARD DIRECTION MOVEMENTS
onKeyDown(
  forward.value,
  () => {
    if (yMove.value) return
    startMovement()
    zMove.value = moveSpeed.value
  },
)
onKeyDown(
  back.value,
  () => {
    if (yMove.value) return
    startMovement()
    zMove.value = -moveSpeed.value
  },
)
onKeyUp(
  [...forward.value, ...back.value],
  () => {
    zMove.value = 0
    stopMovement()
  },
)
// X DIRECTION MOVEMENTS
onKeyDown(
  left.value,
  () => {
    startMovement()
    xMove.value = -moveSpeed.value
  },
)
onKeyDown(
  right.value,
  () => {
    startMovement()
    xMove.value = moveSpeed.value
  },
)
onKeyUp(
  [...left.value, ...right.value],
  () => {
    xMove.value = 0
    stopMovement()
  },
)

const startMovement = () => {
  isMoving.value = true
  emit('change', true)
}

const stopMovement = () => {
  if (zMove.value === 0 && xMove.value === 0) {
    isMoving.value = false
    emit('change', false)
  }
}

const { onLoop } = useRenderLoop()

onLoop(({ elapsed }) => {
  // has PointerLockControls?
  if (controls.value instanceof PointerLockControls && controls.value?.isLocked) {
    controls.value.moveForward(zMove.value)
    controls.value.moveRight(xMove.value)
    if (activeCamera?.value?.position) {
      activeCamera.value.position.y = headBobbing.value ? headBobbingMov(elapsed) : initCameraPos
      activeCamera.value.position.y += getJump()
    }
  }
  else if (wrapperRef.value.children.length > 0) {
    wrapperRef.value.position.x += xMove.value
    wrapperRef.value.position.y += yMove.value
    wrapperRef.value.position.z += -zMove.value
  }
})
</script>

<template>
  <TresGroup ref="wrapperRef">
    <slot />
  </TresGroup>
</template>
