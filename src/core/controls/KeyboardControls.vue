<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import { PointerLockControls } from 'three-stdlib'
import { onKeyStroke } from '@vueuse/core'
import { useCientos } from '../../core/useCientos'

export type KeyboardControlsProps = {
  /**
   * Keys to go forward.
   * @type {string[]}
   * @default '[w, W, ArrowUp]'
   * @memberof KeyboardControlsProps
   *
   **/
  forward?: string[] | string
  /**
   * Keys to go back.
   * @type {string[]}
   * @default '[s, S, ArrowDown]'
   * @memberof KeyboardControlsProps
   *
   **/
  back?: string[] | string
  /**
   * Keys to go left.
   * @type {string[]}
   * @default '[a, A, ArrowLeft]'
   * @memberof KeyboardControlsProps
   *
   **/
  left?: string[] | string
  /**
   * Keys to go right.
   * @type {string[]}
   * @default '[d, D, ArrowRight]'
   * @memberof KeyboardControlsProps
   *
   **/
  right?: string[] | string
  /**
   * Key to jump (only with PointerLockControls).
   * @type {string[]}
   * @default '[space]'
   * @memberof KeyboardControlsProps
   *
   **/
  jump?: string[] | string
  /**
   * Default gravity number for jump.
   * @type {number}
   * @default 9.8
   * @memberof KeyboardControlsProps
   *
   **/
  gravity?: number
  /**
   * The?? .
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
}
// TODO: remove disable once eslint is updated to support vue 3.3
// eslint-disable-next-line vue/no-setup-props-destructure
const {
  forward = ['w', 'W', 'ArrowUp'],
  back = ['s', 'S', 'ArrowDown'],
  left = ['a', 'A', 'ArrowLeft'],
  right = ['d', 'D', 'ArrowRight'],
  jump = [' '],
  gravity = 9.8,
  moveSpeed = 0.1,
  headBobbing = false,
  // 2D
} = defineProps<KeyboardControlsProps>()

const { state } = useCientos()
const initCameraPos: number = state?.camera?.position.y || 0
const xMove = ref(0)
const zMove = ref(0)
const isHeadBobbing = ref(false)
const isJumping = ref(false)
const HBSpeed = 5
const jumpSpeed = 6
const HBAmplitude = 0.3
const initJumpTime = ref(0)
const wrapperRef = shallowRef()

// limpiar loop
// 1 mover press functions
// 2 mover helper functions
// 3 add jump to slot

// FORWARD DIRECTION MOVEMENTS
onKeyStroke(
  forward,
  () => {
    isHeadBobbing.value = true
    zMove.value = moveSpeed
  },
  { eventName: 'keydown' },
)
onKeyStroke(
  back,
  () => {
    isHeadBobbing.value = true
    zMove.value = -moveSpeed
  },
  { eventName: 'keydown' },
)
onKeyStroke(
  [...forward, ...back],
  () => {
    isHeadBobbing.value = false
    zMove.value = 0
  },
  { eventName: 'keyup' },
)
// X DIRECTION MOVEMENTS
onKeyStroke(
  left,
  () => {
    isHeadBobbing.value = true
    xMove.value = -moveSpeed
  },
  { eventName: 'keydown' },
)
onKeyStroke(
  right,
  () => {
    isHeadBobbing.value = true
    xMove.value = moveSpeed
  },
  { eventName: 'keydown' },
)
onKeyStroke(
  [...left, ...right],
  () => {
    isHeadBobbing.value = false
    xMove.value = 0
  },
  { eventName: 'keyup' },
)
//JUMP BUTTON
onKeyStroke(jump, () => {
  if (!isJumping.value) initJumpTime.value = Date.now()
  isJumping.value = true
})

// HEAD BOBBING
const headBobbingMov = (elapsedTime: number) => {
  return isHeadBobbing.value ? Math.sin(elapsedTime * HBSpeed) * HBAmplitude + initCameraPos : initCameraPos
}
// JUMP
const getJumpTime = () => ((Date.now() - initJumpTime.value) / 1000) * 3
const getJumpDistance = (jumpTime: number) => {
  return initCameraPos + jumpSpeed * jumpTime - 0.5 * gravity * Math.pow(jumpTime, 2)
}

const getJump = () => {
  if (isJumping.value) {
    const jumpDistance = getJumpDistance(getJumpTime())
    if (jumpDistance <= initCameraPos) isJumping.value = false
    return jumpDistance
  }
  return 0
}

const { onLoop } = useRenderLoop()

onLoop(({ elapsed }) => {
  // has PointerLockControls?
  if (state.controls instanceof PointerLockControls && state?.controls?.isLocked) {
    state.controls.moveForward(zMove.value)
    state.controls.moveRight(xMove.value)
    if (state.camera?.position) {
      state.camera.position.y = headBobbing ? headBobbingMov(elapsed) : initCameraPos
      state.camera.position.y += getJump()
    }
  } else if (wrapperRef.value.children.length > 0 && !(state.controls instanceof PointerLockControls)) {
    wrapperRef.value.position.x += xMove.value
    wrapperRef.value.position.z += -zMove.value
  }
})
</script>
<template>
  <TresGroup ref="wrapperRef">
    <slot />
  </TresGroup>
</template>
