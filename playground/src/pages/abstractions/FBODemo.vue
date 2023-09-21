<script setup lang="ts">
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { OrbitControls, UseFBO } from '@tresjs/cientos'
import { SRGBColorSpace, ACESFilmicToneMapping } from 'three'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

const fboRef = shallowRef(null)
const torusRef = shallowRef(null)
const capsuleRef = shallowRef(null)

const { onLoop } = useRenderLoop()

onLoop(({ elapsed }) => {
  torusRef.value.rotation.x = elapsed * 0.745
  torusRef.value.rotation.y = elapsed * 0.361

  capsuleRef.value.rotation.x = elapsed * 0.471
  capsuleRef.value.rotation.z = elapsed * 0.632
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 0.5, 5]" />
    <OrbitControls />

    <TresGridHelper :args="[10, 10]" />

    <UseFBO
      ref="fboRef"
      :depth="false"
      :width="1024"
      :height="1024"
      :samples="1"
    />

    <TresMesh>
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshBasicMaterial
        :color="0xff8833"
        :map="fboRef?.texture || null"
      />
    </TresMesh>

    <TresMesh
      ref="torusRef"
      :position="[3, 0, 0]"
    >
      <TresTorusGeometry :args="[1, 0.5, 16, 100]" />
      <TresMeshNormalMaterial />
    </TresMesh>

    <TresMesh
      ref="capsuleRef"
      :position="[-2, 0, 0]"
    >
      <TresCapsuleGeometry :args="[0.4, 1, 4, 8]" />
      <TresMeshNormalMaterial />
    </TresMesh>
  </TresCanvas>
</template>
