<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, useSampler } from '@tresjs/cientos'
import { SRGBColorSpace, ACESFilmicToneMapping } from 'three'
import type { Mesh } from 'three'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
}

const torusRef = ref<Mesh>()
const instancesRef = ref<Mesh>()

watch(torusRef, (value) => {
  useSampler(value, 50, instancesRef.value, 'color')
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 0.5, 5]" />
    <OrbitControls />

    <TresMesh
      ref="torusRef"
    >
      <TresTorusGeometry />
    </TresMesh>

    <TresInstancedMesh
      ref="instancesRef"
      :args="[null!, null!, 1_000]"
    >
      <TresSphereGeometry
        :args="[0.1, 32, 32]"
      />
      <TresMeshNormalMaterial />
    </TresInstancedMesh>

    <TresGridHelper
      :args="[10, 10]"
    />
  </TresCanvas>
</template>
