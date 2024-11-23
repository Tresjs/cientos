<script setup lang="ts">
import { shallowRef } from 'vue'
import { Outline, TorusKnot } from '@tresjs/cientos'
import SkinnedMesh from './SkinnedMesh.vue'
import { useLoop } from '@tresjs/core'

const knotRef = shallowRef()
const visibleRef = shallowRef(true)
useLoop().onBeforeRender(({ elapsed }) => {
  if (Math.random() > 0.99) {
    visibleRef.value = !visibleRef.value
  }
  if (knotRef.value?.instance) {
    knotRef.value.instance.rotation.x = elapsed
  }
})
</script>

<template>
  <TresGroup>
    <TresAmbientLight :intensity="3.14" />
    <TorusKnot ref="knotRef" :position="[1, 0.5, -0.1]" :scale="0.2">
      <TresMeshBasicMaterial />
      <Outline :thickness="7.5" color="black" />
      <Outline :thickness="5" color="yellow" />
      <Outline :thickness="2.5" color="red" />
    </TorusKnot>
    <Suspense>
      <SkinnedMesh />
    </Suspense>
  </TresGroup>
</template>
