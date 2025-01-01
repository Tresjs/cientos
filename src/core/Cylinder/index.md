---
category: shapes
---

# Cylinder <Badge type="warning" text="^4.0.0" />

`<Cylinder />` is a shortcut for `Mesh` with a [`CylinderGeometry`](https://threejs.org/docs/?q=cylinder#api/en/geometries/CylinderGeometry) and a `MeshBasicMaterial`.

## Usage

```vue:demo
<script setup lang="ts">
import { Cylinder, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#fbb03b">
    <OrbitControls />
    <Cylinder :args="[1, 1, 1, 32, 1]">
      <TresMeshNormalMaterial />
    </Cylinder>
  </TresCanvas>
</template>
```
