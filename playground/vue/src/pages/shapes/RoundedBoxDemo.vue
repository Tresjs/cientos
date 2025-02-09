<script setup lang="ts">
import { OrbitControls, RoundedBox } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { shallowRef, watch } from 'vue'

const boxRef = shallowRef()

watch(boxRef, (box) => {
  // eslint-disable-next-line no-console
  console.log(box)
})

const rx = shallowRef(0)
const ry = shallowRef(0)
const rz = shallowRef(0)
let intervalId: ReturnType<typeof setInterval>

onMounted(() => intervalId = setInterval(() => {
  rx.value += 0.01
  ry.value += 0.03
  rz.value += 0.02
}, 1000 / 30))

onUnmounted(() => clearInterval(intervalId))
</script>

<template>
  <TresCanvas
    window-size
    clear-color="#111"
  >
    <TresPerspectiveCamera
      :position="[0, 0, 7]"
      :fov="45"
      :aspect="1"
      :near="0.1"
      :far="1000"
    />
    <OrbitControls />
    <RoundedBox
      ref="boxRef"
      :rotation="[rx, ry, rz]"
    >
      <TresMeshBasicMaterial
        :color="0x00FF00"
        wireframe
      />
    </RoundedBox>
    <TresDirectionalLight
      :position="[0, 2, 4]"
      :intensity="2"
    />
    <TresAmbientLight />
  </TresCanvas>
</template>
