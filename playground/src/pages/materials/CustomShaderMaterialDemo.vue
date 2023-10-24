<script setup lang="ts">
import { TresCanvas, useRenderLoop } from '@tresjs/core'

import { CustomShaderMaterial, StatsGl } from '@tresjs/cientos'

import { MeshBasicMaterial } from 'three'
import { shallowRef, onMounted, nextTick } from 'vue'

const { onLoop } = useRenderLoop()

const meshRef = shallowRef()
const materialRef = shallowRef()

const gl = {
  clearColor: '#82DBC5',
}

const materialProps = {
  baseMaterial: MeshBasicMaterial,
  color: '#ffff00',
}

onMounted(async () => {
  await nextTick()

  onLoop(({ elapsed }) => {
    /* console.log(
      materialRef.value.value.userData.tres__name,
      materialRef.value.value.color,
    ) */

    meshRef.value.rotation.x = elapsed / 7
    meshRef.value.rotation.y = elapsed / 2
  })
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera
      :position="[0, 3, 3]"
      :look-at="[0, 0, 0]"
    />

    <TresMesh ref="meshRef">
      <TresTorusKnotGeometry :args="[0.6, 0.2, 256, 20]" />
      <CustomShaderMaterial
        ref="materialRef"
        v-bind="materialProps"
      />
    </TresMesh>
    <TresDirectionalLight :position="[0, 1, 0]" />
    <Suspense>
      <StatsGl />
    </Suspense>
  </TresCanvas>
</template>
