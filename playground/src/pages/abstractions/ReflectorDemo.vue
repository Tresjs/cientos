<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import { TresCanvas } from '@tresjs/core'
import {
  OrbitControls,
  MeshWobbleMaterial,
  MeshReflectorMaterial,
  Stars,
} from '@tresjs/cientos'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#111',
  shadows: false,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const circleRef = shallowRef()

watch(circleRef, (value) => {
  console.log('jaime ~ value:', value)
})

// const [clipBias, textureWidth, textureHeight, color] = useControls({
//   clipBias: { value: 1, min: 0, max: 1 },
//   textureWidth: { value: 1024, min: 0, max: 2056 },
//   textureHeight: { value: 1024, min: 0, max: 2056 },
//   color: '#333',
// })
</script>

<template>
  <TresLeches />
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :look-at="[0, 0, 0]"
      :position="[0, 3, 10]"
    />
    <Stars />
    <TresMesh>
      <TresTorusGeometry />
      <MeshWobbleMaterial
        color="orange"
        :speed="1"
        :factor="2"
      />
    </TresMesh>
    <TresMesh
      ref="circleRef"
      :position="[0, -2, 0]"
      :rotation="[-Math.PI * 0.5, 0, 0]"
    >
      <TresCircleGeometry :args="[10, 10]" />
      <MeshReflectorMaterial />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
    <OrbitControls />
  </TresCanvas>
</template>
