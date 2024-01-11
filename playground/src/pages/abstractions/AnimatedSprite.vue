<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, AnimatedSprite } from '@tresjs/cientos'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { shallowReactive } from 'vue'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'
import type { TexturePackerFrameDataArray } from '../../../../src/core/abstractions/AnimatedSprite/Atlas'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const animationState = shallowReactive({
  fps: 10,
  animation: 'yes',
  flipX: false,
  asSprite: false,
  loop: true,
  reversed: false,
  resetOnEnd: false,
  anchorX: 0.5,
  anchorY: 0.5,
})

const { fps, animation, flipX, asSprite, loop, reversed, resetOnEnd, anchorX, anchorY } = useControls({
  fps: { value: animationState.fps, min: 0, max: 120, step: 1 },
  animation: { label: 'Suzanne animation', value: animationState.animation, options: ['yes', 'no'] },
  flipX: animationState.flipX,
  asSprite: animationState.asSprite,
  loop: animationState.loop,
  reversed: animationState.reversed,
  resetOnEnd: animationState.resetOnEnd,
  anchorX: { value: animationState.anchorX, min: 0, max: 1, step: 0.01 },
  anchorY: { value: animationState.anchorY, min: 0, max: 1, step: 0.01 },
})

const anchorDemoAtlas: TexturePackerFrameDataArray = { frames: [] }
const anchorDemoImgData = (() => {
  const NUM_ROWS_COLS = 32
  const rects: { x: number; y: number; w: number; h: number }[] = []
  let h = 1
  for (let r = 0; r < NUM_ROWS_COLS; r += h) {
    let w = 1
    for (let c = 0; c < NUM_ROWS_COLS; c += w) {
      if (Math.random() > 0.6) {
        w++
      }
      if (c + w >= NUM_ROWS_COLS) {
        w = NUM_ROWS_COLS - c
      }
      if (Math.random() > 0.9) {
        h++
      }
      if (r + h >= NUM_ROWS_COLS) {
        h = NUM_ROWS_COLS - r
      }
      rects.push({ x: c, y: r, w, h })
    }
  }

  const canvas = document.createElement('canvas')
  const IMG_SIZE = 2048
  const COL_SIZE = IMG_SIZE / NUM_ROWS_COLS
  const ROW_SIZE = IMG_SIZE / NUM_ROWS_COLS
  canvas.width = IMG_SIZE
  canvas.height = IMG_SIZE
  document.body.append(canvas)
  const ctx = canvas.getContext('2d')!
  const EDGE_ANCHOR_SIZE = 6
  const CENTER_ANCHOR_SIZE = COL_SIZE
  rects.forEach((rect, i) => {
    const frame = { x: rect.x * COL_SIZE, y: rect.y * ROW_SIZE, w: rect.w * COL_SIZE, h: rect.h * ROW_SIZE }
    const { x, y, w, h } = frame
    anchorDemoAtlas.frames.push({ filename: `rect_${i.toString().padStart(4, '0')}`, frame })
    ctx.fillStyle = `hsl(${360 * i / rects.length}, 100%, 50%)`
    ctx.fillRect(x, y, w, h)

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    ctx.fillRect(
      x + w * 0.5 - CENTER_ANCHOR_SIZE * 0.5, 
      y + h * 0.5 - CENTER_ANCHOR_SIZE * 0.5, 
      CENTER_ANCHOR_SIZE, 
      CENTER_ANCHOR_SIZE)

    ctx.fillStyle = '#FFF'
    ctx.textAlign = 'center'
    ctx.font = '12px monospace'
    ctx.textBaseline = 'middle'
    ctx.fillText(`Frame ${i}`, x + w * 0.5, y + h * 0.5)

    ctx.fillStyle = '#FFF'
    ctx.fillRect(x, y, EDGE_ANCHOR_SIZE, EDGE_ANCHOR_SIZE)
    ctx.fillRect(x + w * 0.5 - EDGE_ANCHOR_SIZE * 0.5, y, EDGE_ANCHOR_SIZE, EDGE_ANCHOR_SIZE)
    ctx.fillRect(x + w - EDGE_ANCHOR_SIZE, y, EDGE_ANCHOR_SIZE, EDGE_ANCHOR_SIZE)

    ctx.fillRect(x, y + h * 0.5 - EDGE_ANCHOR_SIZE * 0.5, EDGE_ANCHOR_SIZE, EDGE_ANCHOR_SIZE)
    ctx.fillRect(x + w - EDGE_ANCHOR_SIZE, y + h * 0.5 - EDGE_ANCHOR_SIZE * 0.5, EDGE_ANCHOR_SIZE, EDGE_ANCHOR_SIZE)

    ctx.fillRect(x, y + h - EDGE_ANCHOR_SIZE, EDGE_ANCHOR_SIZE, EDGE_ANCHOR_SIZE)
    ctx.fillRect(x + w * 0.5 - EDGE_ANCHOR_SIZE * 0.5, y + h - EDGE_ANCHOR_SIZE, EDGE_ANCHOR_SIZE, EDGE_ANCHOR_SIZE)
    ctx.fillRect(x + w - EDGE_ANCHOR_SIZE, y + h - EDGE_ANCHOR_SIZE, EDGE_ANCHOR_SIZE, EDGE_ANCHOR_SIZE)

  })
  const imgData = canvas.toDataURL()
  canvas.parentElement?.removeChild(canvas)
  return imgData
})()
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />
    <Suspense>
      <AnimatedSprite
        :image="anchorDemoImgData"
        :atlas="anchorDemoAtlas"
        animation="rect"
        :flip-x="flipX.value"
        :fps="fps.value"
        :loop="loop.value"
        :reset-on-end="resetOnEnd.value"
        :anchor="[anchorX.value, anchorY.value]"
        :as-sprite="asSprite.value"
        :reversed="reversed.value"
      />
    </Suspense>
    <Suspense>
      <AnimatedSprite 
        :position="[4, 0, 0]" 
        image="https://raw.githubusercontent.com/Tresjs/assets/main/textures/animated-sprite/namedAnimationsTexture.png"
        atlas="https://raw.githubusercontent.com/Tresjs/assets/main/textures/animated-sprite/namedAnimationsAtlas.json"
        :animation="animation.value" 
        :flip-x="flipX.value" 
        :fps="fps.value" 
        :loop="loop.value" 
        :reset-on-end="resetOnEnd.value"
        :anchor="[anchorX.value, anchorY.value]" 
        :as-sprite="asSprite.value"
        :reversed="reversed.value"
      />
    </Suspense>
    <Suspense>
      <AnimatedSprite 
        :position="[-4, 0, 0]" 
        image="https://raw.githubusercontent.com/Tresjs/assets/main/textures/animated-sprite/textureWithoutAtlas.png"
        :atlas="16"
        :animation="[0, 15]"
        :flip-x="flipX.value" 
        :fps="fps.value" 
        :loop="loop.value" 
        :reset-on-end="resetOnEnd.value"
        :anchor="[anchorX.value, anchorY.value]" 
        :as-sprite="asSprite.value"
        :reversed="reversed.value"
      />
    </Suspense>
    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
