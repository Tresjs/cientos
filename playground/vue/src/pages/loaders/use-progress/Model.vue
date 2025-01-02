<script setup lang="ts">
import { useTexture } from '@tresjs/core'
import { useGLTF } from '@tresjs/cientos'
import { DoubleSide, MeshBasicMaterial } from 'three'

const { nodes } = await useGLTF('https://raw.githubusercontent.com/Tresjs/lab/main/public/models/potions-classroom/wizard-potions-classroom.glb', {
  draco: true,
})

console.log(nodes)

const tableTexture = await useTexture(['https://raw.githubusercontent.com/Tresjs/lab/main/public/models/potions-classroom/table.png'])
tableTexture.flipY = false
const roomTexture = await useTexture(['https://raw.githubusercontent.com/Tresjs/lab/main/public/models/potions-classroom/room.png'])
roomTexture.flipY = false

const roomMaterial = new MeshBasicMaterial({
  map: roomTexture,
  side: DoubleSide,
})

nodes.Room.material = roomMaterial
nodes.Floor.material = roomMaterial
</script>

<template>
  <primitive :object="nodes.Room" />
  <primitive :object="nodes.Floor" />
</template>
