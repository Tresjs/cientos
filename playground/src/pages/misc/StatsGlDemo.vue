<script setup lang="ts">
import { reactive, shallowRef, watch } from 'vue'
import { CameraControls, Stars, StatsGl } from '@tresjs/cientos'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import type { Points } from 'three'
import { NoToneMapping, SRGBColorSpace } from 'three'

const gl = {
  clearColor: '#000',
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
const options = reactive({
  size: 4,
  sizeAttenuation: true,
  count: 50000,
  depth: 50,
  radius: 1000,
})

const star = shallowRef()
const statsRef = shallowRef()
const { onBeforeLoop } = useRenderLoop()

watch(statsRef, (value) => {
  // eslint-disable-next-line no-console
  console.log('jaime ~ watch ~ value:', value.instance)
})

onBeforeLoop(() => {
  (star.value.instance as Points).rotation.y += 0.003
})
</script>

<template>
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <StatsGl ref="statsRef" />
    <Stars
      ref="star"
      :radius="options.radius"
      :depth="options.depth"
      :count="options.count"
      :size="options.size"
      :size-attenuation="options.sizeAttenuation"
    />
    <CameraControls :distance="500" />
  </TresCanvas>
</template>
