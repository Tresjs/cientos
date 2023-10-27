<script setup lang="ts">
import { Color } from 'three'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { OrbitControls, Superformula } from '@tresjs/cientos'

const { sin } = Math

const numArmsA = shallowRef(1)
const numArmsB = shallowRef(1)
const expA1 = shallowRef(1)
const expA2 = shallowRef(1)
const expA3 = shallowRef(1)
const expB1 = shallowRef(1)
const expB2 = shallowRef(1)
const expB3 = shallowRef(1)

const color = shallowRef('blue')

const widthSegments = shallowRef(64)
const heightSegments = shallowRef(64)

useRenderLoop().onLoop(({ elapsed }) => {
  const p = sin(elapsed) * 0.5 + 1.5
  numArmsA.value = (p) * 8
  numArmsB.value = sin(elapsed) * 8
  expA1.value = (sin(elapsed * 0.1) + 1.1 ) * 5 
  expA2.value = (sin(elapsed * Math.PI * 0.1) + 1.1) * 2
  expA3.value = (sin(elapsed * 7 / 11) + 1.1) * 3
  expB1.value = (sin(elapsed * 0.1) + 1.1 ) * 40
  expB2.value = (sin(elapsed * Math.PI * 0.1) + 1.1) * 40
  expB3.value = (sin(elapsed * 3 / 11) + 1.1) * 40

  color.value = sin(elapsed) > 0 ? 'blue' : 'red'

})
</script>

<template>
  <TresCanvas clear-color="#777">
    <TresDirectionalLight
      :position="[3, 2, 1]"
      :intensity="8"
    />
    <TresAmbientLight
      :position="[3, 2, 1]"
      :intensity="1"
      :color="new Color('pink')"
    />
    <Superformula
      :width-segments="widthSegments"
      :height-segments="heightSegments" 
      :num-arms-a="numArmsA"
      :exp-a1="expA1"
      :exp-a2="expA2"
      :exp-a3="expA3"
      :num-arms-b="numArmsB"
      :exp-b1="expB1"
      :exp-b2="expB2"
      :exp-b3="expB3"
    >
      <TresMeshNormalMaterial />
    </Superformula> 
    <TresGridHelper />
    <OrbitControls />
  </TresCanvas>
</template>
