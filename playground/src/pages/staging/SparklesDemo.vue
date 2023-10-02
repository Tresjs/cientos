<script setup lang="ts">
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { OrbitControls, Sparkles, Box, TorusKnot, Icosahedron, StatsGl, Levioso } from '@tresjs/cientos'
import { SRGBColorSpace, NoToneMapping, Vector3 } from 'three'
import { useMouse, useWindowSize } from '@vueuse/core'
import { useTresContext } from '@tresjs/core';

const gl = {
  clearColor: '#333',
  alpha: true,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const z = shallowRef(0)
const directionalLightRef = shallowRef()

let cooldown = 1
useRenderLoop().onLoop(({ elapsed, delta }) => {
  cooldown -= delta
  while (cooldown < 0) {
    colors.values = colors.values[0] === 'red' ? ['blue'] : ['red', 'red', 'purple', 'blue']
    cooldown += 1
  }

})

const { height, width } = useWindowSize()
const { x:mouseX, y:mouseY } = useMouse()
const x = computed(() => -0.5 + mouseX.value / width.value)
const y = computed(() => 0.5 + -mouseY.value / height.value)
const colors = reactive({
  values: ['blue']
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 0, 5]" />
    <Levioso>
      <TorusKnot :args="[1, 0.25, 256, 32]">
        <TresMeshPhongMaterial :shininess="1000" color="#222" />
        <Sparkles :directional-light="directionalLightRef" />
      </TorusKnot>
    </Levioso>
    <TresDirectionalLight ref="directionalLightRef" :intensity="2" :position="[6 * x, 6 * y, 1]">
      <StatsGl />
      <Icosahedron :args="[1, 10]" :scale="0.1">
        <TresMeshBasicMaterial color="white" />
      </Icosahedron>
    </TresDirectionalLight>
    <OrbitControls />
  </TresCanvas>
</template>
