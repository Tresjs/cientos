<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { AnimatedSprite, OrbitControls } from '@tresjs/cientos'
</script>

<template>
  <TresLeches />
  <TresCanvas clear-color="#82DBC5">
    <OrbitControls />
    <TresPerspectiveCamera :position="[0, 0, 5]" />
    <Suspense>
      <AnimatedSprite
        image="https://raw.githubusercontent.com/Tresjs/assets/main/textures/animated-sprite/namedAnimationsTexture.png"
        atlas="https://raw.githubusercontent.com/Tresjs/assets/main/textures/animated-sprite/namedAnimationsAtlas.json"
        animation="yes"
        :fps="10"
        :loop="true"
      />
    </Suspense>
  </TresCanvas>
</template>
