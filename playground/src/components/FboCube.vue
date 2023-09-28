<script setup lang="ts">
import { useFBO } from '@tresjs/cientos'

const materialRef = ref(null)

const fboTarget = useFBO({
  depth: true,
  samples: 1,
})
</script>

<template>
  <TresMesh>
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshBasicMaterial
      ref="materialRef"
      :color="0xff8833"
      :map="fboTarget?.texture ?? null"
    />
  </TresMesh>
</template>