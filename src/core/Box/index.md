---
category: shapes
---

# Box <Badge type="warning" text="^1.6.0" />

`<Box />` is a shortcut for `Mesh` with a [`BoxGeometry`](https://threejs.org/docs/?q=box#api/en/geometries/BoxGeometry) and a `MeshBasicMaterial`.

## Usage

```vue demo
<script setup lang="ts">
import { Box, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <!-- demo-control clear-color
  value: blue
  options: red blue green
  -->
  <TresCanvas :clear-color="0xFBB03B">
    <OrbitControls />
    <!-- demo-control color
    value: '#F00'
    -->
    <!-- demo-control v-if
    value: true
    -->
    <!-- demo-control rotation-x
    value: 0
    min: -Math.PI
    max: Math.PI
    step: 0.1
    -->
    <!-- demo-control name
    value: hello, world
    -->
    <Box v-if="true" name="hi" :rotation-x="0" color="#F00" />
  </TresCanvas>
</template>
```
