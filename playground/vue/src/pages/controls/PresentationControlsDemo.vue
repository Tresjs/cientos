<script setup lang="ts">
import { Html, PresentationControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { NoToneMapping, SRGBColorSpace } from 'three'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#ff0000',
  alpha: true,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const { cursor, enabled, snap, speed, damping, zoom } = useControls({
  enabled: { value: true, type: 'boolean', label: 'Enabled' },
  cursor: { value: true, type: 'boolean', label: 'Cursor' },
  snap: { value: true, type: 'boolean', label: 'Snap' },
  damping: {
    label: 'Damping',
    value: 0.15,
    min: 0,
    max: 1,
    step: 0.01,
  },
  zoom: {
    label: 'Zoom',
    value: 1.25,
    min: 0,
    max: 10,
    step: 0.01,
  },
  speed: {
    label: 'Speed',
    value: 1,
    min: 0,
    max: 2,
    step: 0.01,
  },
})

const paragraphRef = ref(null)
</script>

<template>
  <TresLeches />

  <h1 ref="paragraphRef" style="padding: 30px; background-color: blue; position: fixed;z-index: 1;">Coucou à tous</h1>

  <TresCanvas
    v-bind="gl"
    window-size
  >
    <TresPerspectiveCamera :position="[0, 0, 10]" />

    <PresentationControls :enabled="enabled.value" :cursor="cursor.value" :global="false" :snap="snap.value" :damping="damping.value" :zoom="zoom.value" :speed="speed.value">
      <TresMesh>
        <TresBoxGeometry :args="[2.5, 2.5, 2.5]" />
        <TresMeshStandardMaterial :color="0x00FF00" wireframe />
        <Html transform center><p style="user-select: none; pointer-events: none;">Hello World!</p></Html>
      </TresMesh>
    </PresentationControls>
  </TresCanvas>
</template>
