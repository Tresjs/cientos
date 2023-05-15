import { defineComponent, ref } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import { PointerLockControls } from 'three-stdlib'
import { onKeyStroke } from '@vueuse/core'
import { useCientos } from '/@/core/useCientos'

export interface KeyboardControlsProps {
  /**
   * Keys to go forward.
   * @type {string[]}
   * @default '[w, W, ArrowUp]'
   * @memberof KeyboardControlsProps
   *
   **/
  forward?: string[]
  /**
   * Keys to go back.
   * @type {string[]}
   * @default '[s, S, ArrowDown]'
   * @memberof KeyboardControlsProps
   *
   **/
  back?: string[]
  /**
   * Keys to go left.
   * @type {string[]}
   * @default '[a, A, ArrowLeft]'
   * @memberof KeyboardControlsProps
   *
   **/
  left?: string[]
  /**
   * Keys to go right.
   * @type {string[]}
   * @default '[d, D, ArrowRight]'
   * @memberof KeyboardControlsProps
   *
   **/
  right?: string[]
  /**
   * Key to jump (only with PointerLockControls).
   * @type {string[]}
   * @default '[space]'
   * @memberof KeyboardControlsProps
   *
   **/
  jump?: string[]
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
   * @default true
   * @memberof KeyboardControlsProps
   *
   **/
  headBobbing?: boolean
}

export const KeyboardControls = defineComponent<KeyboardControlsProps>({
  name: 'KeyboardControls',
  props: {
    forward: {
      type: Array,
      required: false,
      default: ['w', 'W', 'ArrowUp'],
    },
    back: {
      type: Array,
      required: false,
      default: ['s', 'S', 'ArrowDown'],
    },
    left: {
      type: Array,
      required: false,
      default: ['a', 'A', 'ArrowLeft'],
    },
    right: {
      type: Array,
      required: false,
      default: ['d', 'D', 'ArrowRight'],
    },
    jump: {
      type: Array,
      required: false,
      default: [' '],
    },
    gravity: {
      type: Number,
      required: false,
      default: 9.8,
    },
    moveSpeed: {
      type: Number,
      required: false,
      default: 0.1,
    },
    headBobbing: {
      type: Boolean,
      required: false,
      default: true,
    },
  } as unknown as undefined,
  setup(props, { slots }) {
    const { state } = useCientos()

    const { onLoop } = useRenderLoop()

    const initCameraPos: number = state?.camera?.position.y || 0
    const xMove = ref(0)
    const zMove = ref(0)
    const isHeadBobbing = ref(false)
    const isJumping = ref(false)
    const HBSpeed = 5
    const jumpSpeed = 6
    const HBAmplitude = 0.3
    const gravity = props.gravity || 9.8
    const initJumpTime = ref(0)

    // FORWARD DIRECTION MOVEMENTS
    onKeyStroke(
      props.forward || ['w', 'W', 'ArrowUp'],
      () => {
        isHeadBobbing.value = true
        zMove.value = props.moveSpeed
      },
      { eventName: 'keydown' },
    )
    onKeyStroke(
      props.back || ['s', 'S', 'ArrowDown'],
      () => {
        isHeadBobbing.value = true
        zMove.value = -props.moveSpeed
      },
      { eventName: 'keydown' },
    )
    onKeyStroke(
      [...props.forward, ...props.back] || ['w', 'W', 'ArrowUp', 's', 'S', 'ArrowDown'],
      () => {
        isHeadBobbing.value = false
        zMove.value = 0
      },
      { eventName: 'keyup' },
    )
    // X DIRECTION MOVEMENTS
    onKeyStroke(
      props.left || ['a', 'A', 'ArrowLeft'],
      () => {
        isHeadBobbing.value = true
        xMove.value = -props.moveSpeed
      },
      { eventName: 'keydown' },
    )
    onKeyStroke(
      props.right || ['d', 'D', 'ArrowRight'],
      () => {
        isHeadBobbing.value = true
        xMove.value = props.moveSpeed
      },
      { eventName: 'keydown' },
    )
    onKeyStroke(
      [...props.left, ...props.right] || ['d', 'D', 'ArrowRight', 'a', 'A', 'ArrowLeft'],
      () => {
        isHeadBobbing.value = false
        xMove.value = 0
      },
      { eventName: 'keyup' },
    )
    //JUMP BUTTON
    onKeyStroke(' ', () => {
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

    onLoop(({ elapsed }) => {
      if (state.controls instanceof PointerLockControls && state?.controls?.isLocked) {
        state.controls.moveForward(zMove.value)
        state.controls.moveRight(xMove.value)
        if (state.camera?.position) {
          state.camera.position.y = props.headBobbing ? headBobbingMov(elapsed) : initCameraPos
          state.camera.position.y += getJump()
        }
      } else {
        if (state.camera?.position && !(state.controls instanceof PointerLockControls)) {
          state.camera.position.x += xMove.value
          state.camera.position.y += zMove.value
        }
      }
    })
    return () => (slots.default ? slots.default() : null)
  },
})
