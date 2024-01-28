<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue'
import { TresVector2, normalizeVectorFlexibleParam, useRenderLoop } from '@tresjs/core'
import { DoubleSide, Vector2 } from 'three'
import type { AtlasFrame, AtlasPage, Atlasish } from './Atlas'
import { getAtlasPageAsync, getFrames, getNullFrame } from './Atlas'

export interface AnimatedSpriteProps {
  /** URL of the image texture or an image dataURL. */
  image: string
  /** If `string`, URL of the JSON atlas or a JSON atlas (first character must be a '{' or '['). 
   * If `number`, number of columns in the texture. 
   * If `[number, number]`, number of columns/rows in the texture. 
   * If `string[]`, animation names for each column in the texture. 
   * If `AtlasData`, atlas as a JS object.
   **/
  atlas: Atlasish
  /** Specify playback frame order and repeated frames (delays). `definitions` is a record where keys are atlas animation names and values are strings containing an animation definition.
  * A "animation definition" comma-separated string of frame numbers with optional parentheses-surrounded durations.
  * Here is how various definition strings convert to arrays of frames for playback:
  * * "0,2,1" - [0,2,1], i.e., play frame 0, 2, then 1.
  * * "2(10)" - [2,2,2,2,2,2,2,2,2,2], i.e., play from 2 10 times.
  * * "1-4" - [1,2,3,4]
  * * "10-5(2)" - [10,10,9,9,8,8,7,7,6,6,5,5]
  * * "1-4(3),10(2)" - [1,1,1,2,2,2,3,3,3,4,4,4,10,10]
   */
  definitions?: Record<string, string>
  /** Desired frames per second of the animation. */
  fps?: number
  /** Whether or not the animation should loop. */
  loop?: boolean
  /** If `string`, name of the animation to play. If `[number, number]`, start and end frames of the animation. If `number`, frame number to display. */
  animation?: string | [number, number] | number
  /** Event callback when the animation ends. */
  paused?: boolean
  /** Whether to play the animation in reverse. */
  reversed?: boolean
  /** Whether the sprite should be flipped, left to right. */
  flipX?: boolean
  /** For a non-looping animation, when the animation ends, whether to display the zeroth frame. */
  resetOnEnd?: boolean
  /** Alpha test value for the material. [See THREE.Material.alphaTest](https://threejs.org/docs/#api/en/materials/Material.alphaTest) */
  alphaTest?: number
  /** Origin of the object. [0, 0] is left, top. [1, 1] is right, bottom. */
  center?: TresVector2
}

const props = withDefaults(defineProps<AnimatedSpriteProps>(), {
  fps: 60,
  loop: true,
  animation: 0,
  paused: false,
  reversed: false,
  flipX: false,
  alphaTest: 0.0,
  resetOnEnd: false,
  asSprite: false,
  center: () => new Vector2(0.5, 0.5),
})

const emit = defineEmits<{
  (e: 'frame', frameName: string): void
  (e: 'end', frameName: string): void
  (e: 'loop', frameName: string): void
  (e: 'click', value: Object3D): void
}>()

const scaleX = ref(0)
const scaleY = ref(0)
const positionX = ref(0)
const positionY = ref(0)
const NOMINAL_PX_TO_WORLD_UNITS = 0.01

const page: AtlasPage = await getAtlasPageAsync(props.atlas, props.image, props.definitions)

let frame: AtlasFrame = getNullFrame()
let frameNum = 0
let cooldown = 1
let animation: AtlasFrame[] = getFrames(page, props.animation, props.reversed)
let frameHeldOnLoopEnd = false
let center:number[] = normalizeVectorFlexibleParam(props.center)

updateFrame(animation[frameNum])

useRenderLoop().onLoop(({ delta }) => {
  if (props.paused || frameHeldOnLoopEnd) return

  cooldown -= delta * props.fps

  while (cooldown <= 0) {
    cooldown++
    frameNum++

    if (props.loop) {
      if (frameNum >= animation.length) emit('loop', frame.name)
      frameNum %= animation.length
    }
    else {
      if (frameNum >= animation.length) {
        frameHeldOnLoopEnd = true
        frameNum = props.resetOnEnd ? 0 : animation.length - 1
        emit('end', frame.name)
      }
    }
  }

  updateFrame(animation[frameNum])
})

function updateFrame(newFrame: AtlasFrame) {
  if (newFrame !== frame) {
    frame = newFrame
    emit('frame', frame.name)
    render()
  }
}

function render() {
  if (!page.texture) {
    return
  }

  page.texture.offset.x = frame.offsetX + (props.flipX ? frame.repeatX : 0)
  page.texture.offset.y = frame.offsetY
  page.texture.repeat.x = frame.repeatX * (props.flipX ? -1 : 1)
  page.texture.repeat.y = frame.repeatY

  page.texture.updateMatrix()

  scaleX.value = frame.width * NOMINAL_PX_TO_WORLD_UNITS
  scaleY.value = frame.height * NOMINAL_PX_TO_WORLD_UNITS

    positionX.value = -(center[0] - 0.5) * frame.width * NOMINAL_PX_TO_WORLD_UNITS
    positionY.value = -(center[1] - 0.5) * frame.height * NOMINAL_PX_TO_WORLD_UNITS
};

watch(() => props.animation, (newValue, oldValue) => {
  if (JSON.stringify(newValue) === JSON.stringify(oldValue)) {
    return
  }
  animation = getFrames(page, props.animation, props.reversed)
  frameNum = 0
  cooldown = 1
  updateFrame(animation[frameNum])
  frameHeldOnLoopEnd = false
}, { immediate: true })

watch(() => props.paused, () => {
  frameHeldOnLoopEnd = false
})

watch(() => props.loop, () => {
  if (frameHeldOnLoopEnd && props.loop) frameHeldOnLoopEnd = false
})

watch(() => props.resetOnEnd, () => {
  if (frameHeldOnLoopEnd) {
    frameNum = props.resetOnEnd ? 0 : animation.length - 1
    updateFrame(animation[frameNum])
  }
})

watch(() => props.reversed, () => {
  frameNum = (animation.length - frameNum - 1) % animation.length
  animation = getFrames(page, props.animation, props.reversed)
  if (frameHeldOnLoopEnd) {
    frameNum = props.resetOnEnd ? 0 : animation.length - 1
    updateFrame(animation[frameNum])
  }
})

watch(() => [props.flipX, props.asSprite], render)

watch(() => [props.center], () => {
  center = normalizeVectorFlexibleParam(props.center)
  render()
})

</script>

<template>
  <TresGroup>
    <TresMesh :scale="[scaleX, scaleY, 1]" :position="[positionX, positionY, 0]" @click="e => emit('click', e)">
      <TresPlaneGeometry :args="[1, 1]" />
      <TresMeshBasicMaterial :toneMapped="false" :side="DoubleSide" :map="page.texture" :transparent="true"
        :alphaTest="props.alphaTest" />
    </TresMesh>
  </TresGroup>
</template>
