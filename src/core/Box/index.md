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
    <!-- demo-control position-x
    value: 0
    min: -5
    max: 5
    step: 0.1
    -->
    <!-- demo-control scale
    value:
    - 1
    - 1
    - 1
    min: -2
    max: 2
    step: 0.1
    -->
    <!-- demo-control name
    value: hello, world
    -->
    <Box v-if="true" :position-x="0" name="hi" :scale="[1, 1, 1]" color="#F00" />
  </TresCanvas>
</template>
```
