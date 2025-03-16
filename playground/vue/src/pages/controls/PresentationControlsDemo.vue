<script setup lang="ts">
import { PresentationControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import '@tresjs/leches/styles'
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 0, 10]" :fov="25" />
    <PresentationControls
      :global="true"
      :snap="0.1"
      :rotation="[0, 0.3, 0]"
      :polar="[-Math.PI / 1.4, Math.PI / 3]"
      :azimuth="[-Math.PI / 1.4, Math.PI / 2]"
      :dampingFactor="0.8"
    >
      <TresMesh>
        <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
        <TresMeshStandardMaterial color="#4169E1" :metalness="0.7" :roughness="0.3" />
      </TresMesh>
      <TresGridHelper :args="[10, 10]" />
    </PresentationControls>
    <TresAmbientLight :intensity="0.5" />
    <TresSpotLight
      :position="[10, 10, 10]"
      :angle="0.15"
      :penumbra="1"
      :shadow-mapSize="2048"
      castShadow
    />
  </TresCanvas>
</template>
