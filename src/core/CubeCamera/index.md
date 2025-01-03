---
category: abstractions
---

# CubeCamera

`<CubeCamera />` creates a `THREE.CubeCamera` and uses it to render an environment map of your scene. The environment map is then applied to component's children.

`<CubeCamera />` makes its children invisible while rendering to the internal buffer so that they are not included in the reflection.

## Usage

```vue demo
<script setup lang="ts">
import { CubeCamera, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { onMounted, onUnmounted, shallowRef } from 'vue'

const x = shallowRef(1)
const y0 = shallowRef(1)
const y1 = shallowRef(1)
let intervalId: ReturnType<typeof setInterval>

let elapsed = 0
onMounted(() => {
  intervalId = setInterval(() => {
    elapsed += 1000 / 30
    x.value = Math.cos(elapsed * 0.001) * 3
    y0.value = (Math.sin(elapsed * 0.001) + 1) * 2
    y1.value = (Math.sin(elapsed * 0.001 + Math.PI) + 1) * 2
  }, 1000 / 30)
})

onUnmounted(() => { clearInterval(intervalId) })
</script>

<template>
  <TresCanvas clear-color="#222">
    <TresPerspectiveCamera :position="[0, 5, 20]" />
    <OrbitControls />

    <CubeCamera :position-y="5" :resolution="128">
      <TresMesh :position="[-2, y0, 0]" :scale="2">
        <TresSphereGeometry />
        <TresMeshPhysicalMaterial :roughness="0" :metalness="1" />
      </TresMesh>
      <TresMesh :position="[2, y1, 0]" :scale="2">
        <TresSphereGeometry />
        <TresMeshPhysicalMaterial :roughness="0.25" :metalness="1" />
      </TresMesh>
    </CubeCamera>

    <TresMesh :position="[x, 1, 0]">
      <TresSphereGeometry />
      <TresMeshBasicMaterial color="#fbb03b" />
    </TresMesh>

    <TresGridHelper :args="[100, 10]" />
  </TresCanvas>
</template>
```

## Props

| Prop             | Description                                          | Default       |
| :--------------- | :--------------------------------------------------- | ------------- |
| `frames`         | Number of frames to render. Set to `1` for a static scene. `Infinity` to update continuously.  | `Infinity`    |
| `resolution`     | Resolution of the FBO                                | `255`         |
| `near`           | Camera near                                          | `0.1`         |
| `far`            | Camera far                                           | `1000`        |
| `envMap`         | Custom environment map that is temporarily set as the scene's background | |
| `fog`            | Custom fog that is temporarily set as the scene's fog | |
