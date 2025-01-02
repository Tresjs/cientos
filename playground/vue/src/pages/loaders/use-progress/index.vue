<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import Experiment from './UseProgressDemo.vue'
import '@tresjs/leches/styles'
import { useProgress } from '@tresjs/cientos'

useControls('fpsgraph')

const { hasFinishLoading, progress } = await useProgress()
</script>

<template>
  <OverlayInfo>
    <h1>useProgress</h1>
    <p>This is a demo of the useProgress hook. It shows the progress of the GLTFModel loading.</p>
  </OverlayInfo>
  <Transition
    name="fade-overlay"
    enter-active-class="opacity-1 transition-opacity duration-200"
    leave-active-class="opacity-0 transition-opacity duration-200"
  >
    <div
      v-show="!hasFinishLoading"
      class="absolute bg-grey-600 t-0 l-0 w-full h-full z-20 flex justify-center items-center text-black font-mono"
    >
      <div class="w-200px">
        Loading... {{ progress }} %
      </div>
    </div>
  </Transition>
  <TresLeches />
  <TresCanvas clear-color="#000000">
    <Experiment />
  </TresCanvas>
</template>
