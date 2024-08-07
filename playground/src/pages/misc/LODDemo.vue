<script setup lang="ts">
import { Box, CameraControls, LOD, Sphere } from '@tresjs/cientos'
import { shallowRef, watch } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { NoToneMapping, SRGBColorSpace } from 'three'

const gl = {
  clearColor: '#111',
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const lodRef = shallowRef()

watch(lodRef, (value) => {
  // eslint-disable-next-line no-console
  console.log('jaime ~ LOD LEVELS ~ value:', value.instance)
})
</script>

<!-- <Sphere name="sphere" :args="[1, 16]" :position="[-1, 0, 0]">
  <TresMeshNormalMaterial wireframe />
</Sphere> -->
<!-- -->
<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <CameraControls :distance="50" />
    <LOD ref="lodRef" :distance="0" name="high">
      <Sphere name="sphere" :args="[1, 16]" :position="[-1, 0, 0]">
        <TresMeshNormalMaterial wireframe />
      </Sphere>
      <TresMesh name="box" :position="[1, 0, 0]">
        <TresBoxGeometry :args="[1, 1, 1, 10, 10, 10]" />
        <TresMeshBasicMaterial wireframe :color="0xFF0000" />
      </TresMesh>
    </LOD>
    <LOD :distance="15" name="medium">
      <Sphere name="sphere" :args="[1, 8]" :position="[-1, 0, 0]">
        <TresMeshNormalMaterial wireframe />
      </Sphere>
    </LOD>

    <LOD :distance="30" name="low">
      <Sphere name="sphere" :args="[1, 4]" :position="[-1, 0, 0]">
        <TresMeshNormalMaterial wireframe />
      </Sphere>
      <TresMesh name="box" :position="[1, 0, 0]">
        <TresBoxGeometry :args="[1, 1, 1]" />
        <TresMeshBasicMaterial wireframe :color="0xFF0000" />
      </TresMesh>
    </LOD>
  </TresCanvas>
</template>
