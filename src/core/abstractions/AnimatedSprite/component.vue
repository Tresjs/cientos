<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import type { Group, Mesh, MeshBasicMaterial, Sprite, SpriteMaterial } from 'three'
import { DoubleSide } from 'three'
import type { AtlasFrame, AtlasPage, Atlasish } from './Atlas'
import { getAtlasPageAsync, getFrames, getNullFrame } from './Atlas'

export interface AnimatedSpriteProps {
  /** The URL of the image texture or an image dataURL. */
  image: string
  /** If `string`, the URL of the JSON atlas or a JSON atlas (first character must be a '{' or '['). 
   * If `number`, the number of columns in the texture. 
   * If `[number, number]`, the number of columns/rows in the texture. 
   * If `string[]`, the animation names for each column in the texture. 
   * If `AtlasData` the atlas as a JS object.
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
  /** The desired frames per second of the animation. */
  fps?: number
  /** Whether or not the animation should loop. */
  loop?: boolean
  /** If a string, the name of the animation to play. If `[number, number]`, the start and end frames of the animation. If `number` the frame number to display. */
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
  /** Whether to display the object as a THREE.Sprite. [See THREE.Sprite](https://threejs.org/docs/?q=sprite#api/en/objects/Sprite) */
  asSprite?: boolean
  /** The origin of the object. [0, 0] is left, top. [1, 1] is right, bottom. */
  center?: [number, number]
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
  center: () => [0.5, 0.5],
})

const emit = defineEmits<{
  (e: 'frame', frameName: string): void
  (e: 'end', frameName: string): void
  (e: 'loop', frameName: string): void
}>()

const animatedSpriteGroupRef = ref<InstanceType<typeof Group> | null>()
const animatedSpriteSpriteRef = ref<InstanceType<typeof Mesh> | InstanceType<typeof Sprite> | null>()
const animatedSpriteMaterialRef = ref<InstanceType<typeof SpriteMaterial | typeof MeshBasicMaterial> | null>()
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

updateFrame(animation[frameNum])

useRenderLoop().onLoop(({ delta }) => {
  if (!animatedSpriteSpriteRef.value || props.paused || frameHeldOnLoopEnd) return
  
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
  if (!animatedSpriteMaterialRef.value) {
    return
  }

  page.texture.offset.x = frame.offsetX + (props.flipX ? frame.repeatX : 0)
  page.texture.offset.y = frame.offsetY
  page.texture.repeat.x = frame.repeatX * (props.flipX ? -1 : 1)
  page.texture.repeat.y = frame.repeatY

  page.texture.updateMatrix()

  scaleX.value = frame.width * NOMINAL_PX_TO_WORLD_UNITS
  scaleY.value = frame.height * NOMINAL_PX_TO_WORLD_UNITS

  positionX.value = (0.5-props.center[0]) * frame.width * NOMINAL_PX_TO_WORLD_UNITS
  positionY.value = (0.5-props.center[1]) * frame.height * NOMINAL_PX_TO_WORLD_UNITS
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

watch(() => [props.flipX, props.center, animatedSpriteSpriteRef], render)
</script>

<template>
  <TresGroup ref="animatedSpriteGroupRef" v-bind="$attrs">
    <Suspense :fallback="null">
      <template v-if="props.asSprite">
        <TresSprite ref="animatedSpriteSpriteRef" :scale="[scaleX, scaleY, 1]" :position="[positionX, positionY, 0]">
          <TresSpriteMaterial ref="animatedSpriteMaterialRef" :toneMapped="false" :map="page.texture" :transparent="true"
            :alphaTest="props.alphaTest" />
        </TresSprite>
      </template>
      <template v-else>
        <TresMesh ref="animatedSpriteSpriteRef" :scale="[scaleX, scaleY, 1]" :position="[positionX, positionY, 0]">
          <TresPlaneGeometry :args="[1, 1]" />
          <TresMeshBasicMaterial ref="animatedSpriteMaterialRef" :toneMapped="false" :side="DoubleSide"
            :map="page.texture" :transparent="true" :alphaTest="props.alphaTest" />
        </TresMesh>
      </template>
    </Suspense>
    {children}
  </TresGroup>
</template>
