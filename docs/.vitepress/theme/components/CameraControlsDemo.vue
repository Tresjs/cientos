<script setup lang="ts">
import { Box, CameraControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { reactive } from 'vue'

const controlsState = reactive({
  minDistance: 0,
  maxDistance: 100,
})
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[5, 5, 5]" />
    <CameraControls
      v-bind="controlsState"
      make-default
    />
    <TresGridHelper :position="[0, -1, 0]" />
    <Box :scale="2">
      <TresMeshToonMaterial color="orange" />
    </Box>
    <TresAmbientLight />
    <TresDirectionalLight :position="[0, 2, 4]" />
  </TresCanvas>
</template>
