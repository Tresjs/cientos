<script setup lang="ts">
import { Html, PresentationControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { NoToneMapping, SRGBColorSpace } from 'three'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'
import { gsap } from 'gsap'

const gl = {
  clearColor: '#ff0000',
  alpha: true,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const { cursor, enabled, snap, speed, damping, zoom } = useControls({
  enabled: { value: true, type: 'boolean', label: 'Enabled' },
  cursor: { value: true, type: 'boolean', label: 'Cursor' },
  snap: { value: false, type: 'boolean', label: 'Snap' },
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

const controllerRef = ref(null)

const easeOutExpoGSAP = gsap.parseEase('expo.out')
console.log('easeOutExpoGSAP', easeOutExpoGSAP, typeof easeOutExpoGSAP)

const easeOutExpo = (x: number): number => {
  return x === 1 ? 1 : 1 - 2 ** (-10 * x)
}
console.log('easeOutExpo', easeOutExpo)
</script>

<template>
  <TresLeches />

  <div ref="controllerRef" class="controller"></div>

  <TresCanvas
    v-bind="gl"
    window-size
  >
    <TresPerspectiveCamera :position="[0, 0, 10]" />

    <PresentationControls :enabled="enabled.value" :customEase="easeOutExpo" :cursor="cursor.value" :global="true" :snap="snap.value" :damping="damping.value" :zoom="zoom.value" :speed="speed.value">
      <TresMesh>
        <TresBoxGeometry :args="[2.5, 2.5, 2.5]" />
        <TresMeshStandardMaterial :color="0x00FF00" wireframe />
        <Html transform center><p style="user-select: none; pointer-events: none;">Hello World!</p></Html>
      </TresMesh>
    </PresentationControls>
  </TresCanvas>
</template>

<style scoped>
.controller {
  position: fixed;
  bottom: 50px;
  left: 50%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  width: 8.5vw;
  height: 8.5vw;
  border-radius: 50%;
  transform: translate(-50%, 0);
  display: none;
}
</style>
