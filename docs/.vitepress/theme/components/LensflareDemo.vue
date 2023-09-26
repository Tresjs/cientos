<script setup lang="ts">
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { Lensflare, Torus, OrbitControls } from '@tresjs/cientos'
import { shallowRef } from 'vue'

const [x, z] = [shallowRef(0), shallowRef(0)]
useRenderLoop().onLoop(({ elapsed }) => {
  x.value = Math.cos(elapsed * 0.5) * 2
  z.value = Math.sin(elapsed)
})
</script>

<template>
  <TresCanvas clear-color="#333">
    <OrbitControls />
    <TresPointLight :position="[x, 0, z]">
      <Lensflare
        :seed="1028"
        :scale="0.33"
      />
    </TresPointLight>
    <Torus
      v-for="n in [-2, 0, 2]"
      :key="n"
      :args="[0.7, 0.15]"
      :position-x="n"
    >
      <TresMeshPhongMaterial color="#888" />
    </Torus>
    <TresGridHelper :position="[0,-1,0]" />
  </TresCanvas>
</template>
