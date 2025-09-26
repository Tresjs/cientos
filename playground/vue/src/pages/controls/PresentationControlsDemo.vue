<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { PresentationControls } from '@tresjs/cientos'
import '@tresjs/leches/styles'
import {
  NoToneMapping,
  SRGBColorSpace,
} from 'three'

const gl = {
  clearColor: '#82DBC5',
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
</script>

<template>
  <div style="width: 100vw; height: 100vh">
    <TresCanvas v-bind="gl">
      <TresPerspectiveCamera
        :position="[0, 0, 5]"
      />
      <PresentationControls
        :global="true"
        :config="{ mass: 2, tension: 500 }"
        :snap="{ mass: 4, tension: 1500 }"
        :rotation="[0, 0.3, 0]"
        :polar="[-Math.PI / 3, Math.PI / 3]"
        :azimuth="[-Math.PI / 1.4, Math.PI / 2]"
      >
        <TresMesh>
          <TresBoxGeometry
            :args="[1.5, 1.5, 1.5]"
          />
          <TresMeshStandardMaterial
            color="#4169E1"
            :metalness="0.7"
            :roughness="0.3"
          />
        </TresMesh>
      </PresentationControls>
      <TresGridHelper :args="[10, 10]" />
      <TresAmbientLight :intensity="0.7" />
      <TresDirectionalLight
        :position="[5, 5, 5]"
        :intensity="1"
      />
    </TresCanvas>
  </div>
</template>
