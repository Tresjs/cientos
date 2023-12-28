<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { AnimatedSprite } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[0, 0, 5]"/>
    <Suspense>
      <AnimatedSprite 
        image="https://raw.githubusercontent.com/Tresjs/assets/6c0b087768a0a2b76148c99fc87d7e6ddc3c6d66/textures/animated-sprite/textureWithoutAtlas.png"
        :atlas="16" 
        :animation="[0,15]"
        :fps="10"
        />
    </Suspense>
  </TresCanvas>
</template>
