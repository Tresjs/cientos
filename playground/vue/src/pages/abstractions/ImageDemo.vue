<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Image, OrbitControls } from '@tresjs/cientos'
import { Color, NoToneMapping } from 'three'

const URLS = [
  'https://upload.wikimedia.org/wikipedia/commons/1/13/20220713-great-tit.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/0/00/Friendly_Robin.jpg',
]
const opacity = shallowRef(1)
const url = shallowRef(URLS[0])

let elapsed = 0
setInterval(() => {
  elapsed += 0.01
  opacity.value = Math.abs(Math.sin(elapsed))
  url.value = Math.sin(elapsed) > 0 ? URLS[0] : URLS[1]
}, 1000 / 30)
</script>

<template>
  <TresCanvas :tone-mapping="NoToneMapping">
    <TresPerspectiveCamera />
    <OrbitControls />
    <Image
      :url="url"
      :radius="opacity"
      :color="new Color('white')"
    >
      <TresBoxGeometry />
    </Image>
    <Image
      :position-y="2"
      :scale="0.5"
      :tone-mapped="true"
      :url="url"
    />
    <Image
      :position-x="2"
      :scale="[2, 1]"
      :url="url"
    />
    <Image
      :position-y="-2"
      :url="url"
      :radius="opacity"
    >
      <TresCircleGeometry />
    </Image>

    <Image
      :position-x="-2"
      :url="url"
      :radius="opacity"
      :transparent="true"
    />
  </TresCanvas>
</template>
