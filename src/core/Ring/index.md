---
category: shapes
---

# Ring <Badge type="warning" text="^1.6.0" />

`<Ring />` is a shortcut for a `Mesh` with a [`RingGeometry`](https://threejs.org/docs/?q=ring#api/en/geometries/RingGeometry) and a `MeshBasicMaterial`.

## Usage

```vue:demo
<script setup lang="ts">
import { Ring, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#fbb03b">
    <OrbitControls />
    <Ring>
      <TresMeshNormalMaterial />
    </Ring>
  </TresCanvas>
</template>
```
