<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { AnimatedSprite } from '@tresjs/cientos'
import { shallowRef } from 'vue'

const ASSETS_URL = 'https://raw.githubusercontent.com/andretchen0/tresjs_assets/' +
  '462ad0f669f78d2c5ed7007b5134b419f646efad/textures/animated-sprite/'

const animationNames = ['idle', 'blink', 'walk']
const animation = shallowRef(animationNames[0])
</script>

<template>
  <TresCanvas clear-color="#82DBC5" 
  @click="() => {
    animation = animationNames.shift() || 'walk'; 
    animationNames.push(animation)
  }"
  >
    <TresPerspectiveCamera :position="[0, 0, 15]" />
    <Suspense>
      <AnimatedSprite
        :image="ASSETS_URL + 'cientosTexture.png'"
        :atlas="ASSETS_URL + 'cientosAtlas.json'"
        :animation="animation"
        :fps="15" 
        :loop="true"
      />
    </Suspense>
  </TresCanvas>
</template>
