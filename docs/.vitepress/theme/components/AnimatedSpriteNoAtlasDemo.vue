<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { AnimatedSprite } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[0, 0, 5]" />
    <Suspense>
      <AnimatedSprite 
        image="https://raw.githubusercontent.com/Tresjs/assets/main/textures/animated-sprite/textureWithoutAtlas.png"
        :atlas="16" 
        :animation="[0, 15]"
        :fps="10"
      />
    </Suspense>
  </TresCanvas>
</template>
