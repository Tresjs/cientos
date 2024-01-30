<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { AnimatedSprite } from '@tresjs/cientos'
import { ref } from 'vue'

const ASSETS_URL = 'https://raw.githubusercontent.com/andretchen0/tresjs_assets/' +
  '462ad0f669f78d2c5ed7007b5134b419f646efad/textures/animated-sprite/'

const animations = ref(['idle', 'blink', 'walk'])
</script>

<template>
  <TresCanvas clear-color="#82DBC5" 
  @click="() => {
    animations.push(animations.shift() as string)
  }"
  >
    <TresPerspectiveCamera :position="[0, 0, 15]" />
    <Suspense>
      <AnimatedSprite
        :image="ASSETS_URL + 'cientosTexture.png'"
        :atlas="ASSETS_URL + 'cientosAtlas.json'"
        :animation="animations[0]"
        :fps="15" 
        :loop="true"
      />
    </Suspense>
  </TresCanvas>
</template>
