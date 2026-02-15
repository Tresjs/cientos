<script setup lang="ts">
import { Smoke } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { NoToneMapping, SRGBColorSpace } from 'three'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const { segments, opacity, speed, depth, color, depthTest, spreadY, spreadX, scale } = useControls({
  segments: {
    label: 'Segments',
    value: 5,
    min: 1,
    max: 20,
    step: 1,
  },
  opacity: {
    label: 'Opacity',
    value: 0.5,
    min: 0,
    max: 1,
    step: 0.1,
  },
  speed: {
    label: 'Speed',
    value: 0.4,
    min: 0,
    max: 1,
    step: 0.1,
  },
  depth: {
    label: 'Depth',
    value: 0.3,
    min: 0,
    max: 1,
    step: 0.1,
  },
  color: {
    type: 'color',
    label: 'Color',
    value: '#f7f7f7',
  },
  depthTest: {
    type: 'boolean',
    label: 'Depth Test',
    value: false,
  },
  spreadY: {
    label: 'Spread Y',
    value: 0.1,
    min: 0,
    max: 4,
    step: 0.1,
  },
  spreadX: {
    label: 'Spread X',
    value: 0.5,
    min: 0,
    max: 4,
    step: 0.1,
  },
  scale: {
    label: 'Scale',
    value: 1,
    min: 0.1,
    max: 4,
    step: 0.1,
  },
})

const gl = {
  clearColor: '#333',
  alpha: true,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
</script>

<template>
  <TresLeches class="important-top-[-2rem] important-left-0" />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[-0.5, 1, 5]" />
    <Suspense>
      <Smoke
        :segments="segments.value"
        :opacity="opacity.value"
        :speed="speed.value"
        :depth="depth.value"
        :color="color.value"
        :depth-test="depthTest.value"
        :spreadY="spreadY.value"
        :spreadX="spreadX.value"
        :scale="scale.value"
      />
    </Suspense>
    <TresGridHelper :args="[10, 10]" />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :intensity="1" :position="[2, 2, 2]" />
  </TresCanvas>
</template>
