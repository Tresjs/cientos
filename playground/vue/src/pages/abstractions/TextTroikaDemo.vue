<script setup lang="ts">
import { OrbitControls, TextTroika } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import type { ColorRepresentation } from 'three'
import { BasicShadowMap, Color, NoToneMapping, SRGBColorSpace } from 'three'
import { shallowRef } from 'vue'

const gl = {
  clearColor: 'green',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const fontURL = 'https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff'
const text = shallowRef(`Hello
world!`)

const lipsum = `Lorem ipsum dolor sit amet, consectetur
adipiscing elit. Donec eu fringilla metus. Nunc tincidunt
consequat lacinia. Quisque imperdiet suscipit mauris 
eu consequat. Aliquam rhoncus massa vel mollis ultricies. 

Nulla volutpat, nisl quis vehicula ultricies, eros mauris
pulvinar neque, at facilisis purus enim eget mauris. Nam 
ac felis libero. Donec ut nulla fringilla, imperdiet orci 
at, accumsan tellus. Aenean tristique non sapien non 
luctus. Ut tempus iaculis mauris ut iaculis. Phasellus 
sodales nibh ut tincidunt vestibulum. Pellentesque ut 
convallis felis, non condimentum ex. Integer vel 
tempus mauris.

Vivamus vel bibendum turpis. Maecenas a finibus massa, 
nec lacinia magna. Praesent quis purus elit. Curabitur 
placerat ex eget dui porttitor accumsan. Donec in 
placerat nunc. Nulla suscipit feugiat mi, ac feugiat urna 
ultricies eu. Vivamus vestibulum dolor non elit vehicula 
finibus. Mauris ut elit justo. Duis viverra ac sapien 
at finibus.
`
const color = shallowRef<ColorRepresentation>('red')
const outlineWidth = shallowRef(0)
const outlineColor = shallowRef<ColorRepresentation>('blue')
const anchorX = shallowRef<'center' | 'left'>('center')
const anchorY = shallowRef<'top' | 'middle'>('top')
const fontStyle = shallowRef<'italic' | 'normal'>('normal')
const lineHeight = shallowRef(1)

let intervalId: ReturnType<typeof setInterval>

let elapsed = 0
onMounted(() => {
  intervalId = setInterval(() => {
    elapsed += 1000 / 30
    text.value = Math.sin(elapsed * 0.001) > 0 ? text.value = lipsum : '¡hola!'
    color.value = Math.cos(elapsed * 0.0011) > 0 ? 'white' : new Color('gray')
    outlineColor.value = Math.cos(elapsed * 0.0017) > 0 ? 'blue' : new Color('orange')
    outlineWidth.value = Math.abs(Math.sin(elapsed * 0.01))
    anchorX.value = Math.sin(elapsed * 0.0013) > 0 ? 'center' : 'left'
    anchorY.value = Math.cos(elapsed * 0.0013) > 0 ? 'top' : 'middle'
    fontStyle.value = Math.cos(elapsed * 0.12) > 0 ? 'italic' : 'normal'
    lineHeight.value = (Math.cos(elapsed * 0.01) + 1) * 1
  }, 1000 / 30)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 0.5, 5]" />
    <OrbitControls />
    <Suspense>
      <TextTroika :font="fontURL" :font-style="fontStyle" :color="color" :anchor-x="anchorX" :anchor-y="anchorY" :text="text" :line-height="lineHeight" :outline-width="outlineWidth" :outline-color="outlineColor" />
    </Suspense>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
