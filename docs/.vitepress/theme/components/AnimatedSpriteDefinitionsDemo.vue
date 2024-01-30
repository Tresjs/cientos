<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { AnimatedSprite } from '@tresjs/cientos'

const ASSETS_URL = 'https://raw.githubusercontent.com/andretchen0/tresjs_assets/'
  + '462ad0f669f78d2c5ed7007b5134b419f646efad/textures/animated-sprite/'
</script>

<template>
  <TresCanvas clear-color="#666">
    <TresPerspectiveCamera :position="[0, 0, 15]" />
    <Suspense>
      <AnimatedSprite
        :image="`${ASSETS_URL}cientosTexture.png`"
        :atlas="`${ASSETS_URL}cientosAtlas.json`"
        animation="idle"
        :definitions="{
          idle: '0-5, 0(10), 1-2, 3(20), 4-5, 0-5(3)',
        }"
        :fps="15" 
        :loop="true"
      />
    </Suspense>
  </TresCanvas>
</template>
