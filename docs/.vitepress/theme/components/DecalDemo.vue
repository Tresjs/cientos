<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Decal, OrbitControls } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'
import { SRGBColorSpace } from 'three'

useControls({})

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  dpr: [1, 2] as [number, number],
}

useControls({})
</script>

<template>
  <TresLeches style="position:absolute; left:initial; right:20px; top:10px;" />

  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[7.5, 5, 7.5]" />
    <OrbitControls make-default />

    <TresMesh :scale="3">
      <TresMeshStandardMaterial color="white" />
      <TresBoxGeometry :args="[1, 1, 1]" />

      <Suspense>
        <Decal debug :scale="2" :map="['/decal/tres-logo.png', '/decal/vuejs-logo.png']" />
      </Suspense>
    </TresMesh>

    <TresAmbientLight :intensity="2" />
    <TresDirectionalLight :intensity="3" :position="[2, 1.5, 2]" />
  </TresCanvas>
</template>
