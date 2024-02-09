<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

import { OrbitControls, useProgress, Environment, TorusKnot } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const environmentFiles = ['/px.jpg', '/nx.jpg', '/py.jpg', '/ny.jpg', '/pz.jpg', '/nz.jpg']

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const { background, blur, preset } = useControls({
  background: true,
  blur: {
    value: 0,
    min: 0,
    max: 1,
    step: 0.01,
  },
  preset: {
    options: [
      'sunset',
      'studio',
      'city',
      'umbrellas',
      'night',
      'forest',
      'snow',
      'dawn',
      'hangar',
      'urban',
      'modern',
      'shangai',
    ],
    value: 'sunset',
  },
})

const environmentRef = ref(null)

watchEffect(() => {
  console.log('background', background.value)
})

watchEffect(() => {
  console.log('environmentRef', environmentRef.value?.root)
})

const { progress, hasFinishLoading } = await useProgress()
</script>

<template>
  <Transition
    name="fade-overlay"
    enter-active-class="opacity-1 transition-opacity duration-200"
    leave-active-class="opacity-0 transition-opacity duration-200"
  >
    <div
      v-show="!hasFinishLoading"
      class="absolute bg-white t-0 l-0 w-full h-full z-20 flex justify-center items-center text-black font-mono"
    >
      <div class="w-200px">
        Loading... {{ progress }} %
        <i class="i-ic-twotone-catching-pokemon animate-rotate-in" />
      </div>
    </div>
  </Transition>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[10, 10, 10]" />
    <OrbitControls />
    <Suspense>
      <Environment
        ref="environmentRef"
        :background="background.value"
        :files="environmentFiles"
        :blur="blur.value"
        path="https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap"
      />
      <!-- <Environment
        ref="environmentRef"
        :background="background.value"
        :blur="blur.value"
        :preset="preset.value"
      /> -->
    </Suspense>
    <TorusKnot>
      <TresMeshStandardMaterial
        color="yellow"
        :roughness="0"
        :metalness="0.5"
      />
    </TorusKnot>
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
