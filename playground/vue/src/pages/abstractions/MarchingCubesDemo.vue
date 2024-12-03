<script setup lang="ts">
import { MarchingCube, MarchingCubes, MarchingPlane, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { NoToneMapping } from 'three'

const r0 = shallowRef()
const r1 = shallowRef()
const r2 = shallowRef()
const r3 = shallowRef()
const r4 = shallowRef()
const r5 = shallowRef()
const r6 = shallowRef()
const r7 = shallowRef()
const r8 = shallowRef()
const r9 = shallowRef()

let time = 0
setInterval(() => {
  time += 1 / 30
  let i = 0
  for (const r of [r0, r1, r2, r3, r4, r5, r6, r7, r8, r9]) {
    if (!r.value) { return }
    const p = r.value.instance.position
    p.x = Math.sin(i + 1.26 * time * (1.03 + 0.5 * Math.cos(0.21 * i))) * 0.27
    p.y = Math.abs(Math.cos(i + 1.12 * time * Math.cos(1.22 + 0.1424 * i))) * 0.77 // dip into the floor
    p.z = Math.cos(i + 1.32 * time * 0.1 * Math.sin((0.92 + 0.53 * i))) * 0.27
    i++
  }
}, 1000 / 30)
</script>

<template>
  <TresCanvas clear-color="#82DBC5" :tone-mapping="NoToneMapping">
    <TresPerspectiveCamera :position="[0, 0.5, 5]" />
    <OrbitControls />
    <TresGridHelper :args="[10, 10]" />
    <MarchingCubes :enable-colors="true" :resolution="40" :max-poly-count="40000">
      <MarchingCube ref="r0" color="#ff00ff" :strength="0.5" :subtract="12" />
      <MarchingCube ref="r1" color="#ffff00" :strength="0.5" :subtract="12" />
      <MarchingCube ref="r2" color="#ff00ff" :strength="0.5" :subtract="12" />
      <MarchingCube ref="r3" color="#ffff00" :strength="0.5" :subtract="12" />
      <MarchingCube ref="r4" color="#ff00ff" :strength="0.5" :subtract="12" />
      <MarchingCube ref="r5" color="#ffff00" :strength="0.5" :subtract="12" />
      <MarchingCube ref="r6" color="#ff00ff" :strength="0.5" :subtract="12" />
      <MarchingCube ref="r7" color="#ffff00" :strength="0.5" :subtract="12" />
      <MarchingCube ref="r8" color="#ffff00" :strength="0.5" :subtract="12" />
      <MarchingCube ref="r9" color="#ffff00" :strength="0.5" :subtract="12" />

      <MarchingPlane plane-type="x" />
      <MarchingPlane plane-type="y" />
      <MarchingPlane plane-type="z" />

      <TresMeshPhongMaterial specular="#ffffff" :shininess="10" color="black" />
    </MarchingCubes>
    <TresAxesHelper />
    <TresAmbientLight :intensity="1" />
    <TresPointLight :intensity="3.14" :position="[2, 2, 3]" />
    <OrbitControls :enable-pan="false" :zoom-speed="0.5" />
  </TresCanvas>
</template>
