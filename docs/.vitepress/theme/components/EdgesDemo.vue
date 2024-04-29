<script setup lang="ts">
import { TresCanvas, useSeek } from '@tresjs/core'
import { OrbitControls, Edges, Box, ContactShadows } from '@tresjs/cientos'
import { gsap } from 'gsap'

const gl = {
  clearColor: '#f6f6f6',
  alpha: false,
}

const dataBoxes = [{
  color: '#82DBC5',
  edgeColor: '#292929', 
}, 
{
  color: '#505050',
  edgeColor: '#292929', 
}, 
{
  color: '#F6B03B',
  edgeColor: '#292929', 
}]

const { seek } = useSeek()

function onPointerEnter(ev) {
  const object = ev.object
  const edge = seek(object, 'type', 'LineSegments')

  gsap.to(object.position, {
    y: .25,
    duration: 1,
    overwrite: true,
    ease: 'elastic.out(1,0.4)',
  })
  
  gsap.to(edge?.scale, {
    x: 1.1,
    y: 1.1,
    z: 1.1,
    duration: 1,
    overwrite: true,
    ease: 'elastic.out(1,0.4)',
  })
}

function onPointerLeave(ev) {
  const object = ev
  const edge = seek(object, 'type', 'LineSegments')

  gsap.to(object.position, {
    y: 0,
    duration: .25,
    overwrite: true,
    ease: 'power3.out',
  })

  gsap.to(edge?.scale, {
    x: 1,
    y: 1,
    z: 1, 
    duration: .25,
    overwrite: true,
    ease: 'power3.out',
  })
}
</script>

<template>
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <OrbitControls
      make-default
      auto-rotate
      :auto-rotate-speed="1"
    />

    <Box
      v-for="(x, index) in [-1.5, 0, 1.5]"
      :key="`docs-edges-demo-box-${index}`"
      :position="[x, 0, 0]"
      @pointer-enter="onPointerEnter"
      @pointer-leave="onPointerLeave"
    >
      <TresMeshBasicMaterial
        :color="dataBoxes[index].color"
      />
      <Edges :color="dataBoxes[index].edgeColor" />
    </Box>

    <ContactShadows
      :blur="2"
      :resolution="512"
      :opacity=".25"
      :position-y="-1"
    />
  </TresCanvas>
</template>