<script setup>
import { TresCanvas } from '@tresjs/core'
import { ScreenQuad } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas
    window-size
    clear-color="#111"
  >
    <TresOrthographicCamera :args="[-1, 1, 1, -1, 0, 1000]" :position="[0, 0, 1]" :manual="true" />
    <ScreenQuad>
      <TresMeshBasicMaterial color="red" />
    </ScreenQuad>
  </TresCanvas>
</template>
