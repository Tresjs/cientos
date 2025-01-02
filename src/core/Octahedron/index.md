---
category: shapes
---

# Octahedron <Badge type="warning" text="^1.6.0" />

`<Octahedron />` is a shortcut for a `Mesh` with an [`OctahedronGeometry`](https://threejs.org/docs/?q=octa#api/en/geometries/OctahedronGeometry) and a `MeshBasicMaterial`.

## Usage

```vue demo
<script setup lang="ts">
import { Octahedron, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#fbb03b">
    <OrbitControls />
    <Octahedron>
      <TresMeshNormalMaterial />
    </Octahedron>
  </TresCanvas>
</template>
```
