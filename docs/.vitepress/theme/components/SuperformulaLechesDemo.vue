<script setup lang="ts">
import { AmbientLight, Color, DirectionalLight, MeshPhongMaterial } from 'three'
import { TresCanvas } from '@tresjs/core'
import { Superformula } from '@tresjs/cientos'
import { useControls, TresLeches } from '@tresjs/leches'
import '@tresjs/leches/styles'

const { numArmsA, numArmsB, expA1, expA2, expA3, expB1, expB2, expB3 } = useControls({
  numArmsA: { value: 1, min: 1, max: 40, step: 1 },
  numArmsB: { value: 1, min: 1, max: 40, step: 0.1 },
  expA1: { value: 8, min: 4, max: 40, step: 0.01 },
  expB3: { value: 8, min: 4, max: 40, step: 0.01 },
})

const material = new MeshPhongMaterial({ color: '#fbb03b', shininess: 1000 })
const directionalLight = new DirectionalLight('white', 4)
directionalLight.position.set(1, 1, 1)
const ambientLight = new AmbientLight('pink', 1)
</script>

<template>
  <TresLeches class="important-top-4 important-left-4" />
  <TresCanvas clear-color="#777">
    <primitive :object="directionalLight" />
    <primitive :object="ambientLight" />
    <Superformula 
      :position="[1.5, 0.7, 0]"
      :width-segments="128"
      :height-segments="128"
      :num-arms-a="numArmsA.value"
      :num-arms-b="numArmsB.value"
      :exp-a1="expA1.value"
      :exp-a2="8"
      :exp-a3="0"
      :exp-b1="2"
      :exp-b2="1"
      :exp-b3="expB3.value"
      color="orange"
    >
      <primitive :object="material" />
    </Superformula>
  </TresCanvas>
</template>
