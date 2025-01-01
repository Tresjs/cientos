---
category: shapes
---

# Tetrahedron <Badge type="warning" text="^1.6.0" />

`<Tetrahedron />` is a shortcut for a `Mesh` with a [`TetrahedronGeometry`](https://threejs.org/docs/?q=tetr#api/en/geometries/TetrahedronGeometry) and a `MeshBasicMaterial`.

## Usage

```vue:demo
<script setup lang="ts">
import { OrbitControls, Tetrahedron } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#fbb03b">
    <OrbitControls />
    <Tetrahedron :rotation-x="0.75">
      <TresMeshNormalMaterial />
    </Tetrahedron>
  </TresCanvas>
</template>
```
