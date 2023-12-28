<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Line2, AnimatedSprite } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'
import { TexturePackerFrameDataArray } from '../../../../src/core/abstractions/AnimatedSprite/Atlas'

const { anchorX, anchorY, fps } = useControls({
  anchorX: { value: 0.5, min: 0, max: 1, step: 0.1 },
  anchorY: { value: 0.5, min: 0, max: 1, step: 0.1 },
  fps: {value:5, min:0, max:30, step:1}
})

const anchorDemoAtlas: TexturePackerFrameDataArray = { frames: [] }
const anchorDemoImgData = (() => {
  const NUM_ROWS_COLS = 64
  const rects: { x: number, y: number, w: number, h: number }[] = []
  let h = 0
  for (let r = 0; r < NUM_ROWS_COLS; r += h) {
    let w = 0
    h++
    if (r + h >= NUM_ROWS_COLS) {
      continue
    }
    for (let c = 0; c < NUM_ROWS_COLS; c += w) {
      w++
      if (c + w >= NUM_ROWS_COLS) {
        continue
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
  rects.forEach((rect, i) => {
    const frame = { x: rect.x * COL_SIZE, y: rect.y * ROW_SIZE, w: rect.w * COL_SIZE, h: rect.h * ROW_SIZE }
    const { x, y, w, h } = frame
    anchorDemoAtlas.frames.push({ filename: 'rect_' + i.toString().padStart(4, '0'), frame })
    ctx.fillStyle = `#222`
    ctx.fillRect(x, y, w, h)

    ctx.fillStyle = '#999'
    ctx.fillRect(x + w * 0.5 - EDGE_ANCHOR_SIZE * 0.5, y + h * 0.5 - EDGE_ANCHOR_SIZE * 0.5, EDGE_ANCHOR_SIZE, EDGE_ANCHOR_SIZE)

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
  <TresLeches style="position:absolute; left:10px; top:10px;" />
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[5, 1, 5]" :look-at="[-2, 0, 0]" />
    <OrbitControls />
    <TresGroup :position-x="2">
      <Line2 :points="[[-0.25, 0, 0], [0.25, 0, 0]]" :line-width="1" color="#FF0000" />
      <Line2 :points="[[0, -0.25, 0], [0, 0.25, 0]]" :line-width="1" color="#00FF00" />
      <Line2 :points="[[0, 0, -0.25], [0, 0, 0.25]]" :line-width="1" color="#0000FF" />
   <Suspense>
        <AnimatedSprite :image="anchorDemoImgData" :atlas="anchorDemoAtlas" animation="rect"
          :anchor="[anchorX.value, anchorY.value]" :fps="fps.value" />
      </Suspense>
      <TresGridHelper :args="[10, 10]" />
    </TresGroup>
  </TresCanvas>
</template>
