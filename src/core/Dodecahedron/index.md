---
category: shapes
---

# Dodecahedron <Badge type="warning" text="^1.6.0" />

`<Dodecahedron />` is a shortcut for a `Mesh` with a [`DodecahedronGeometry`](https://threejs.org/docs/?q=dode#api/en/geometries/DodecahedronGeometry) and a `MeshBasicMaterial`.

## Usage

```vue demo
<script setup lang="ts">
import { Dodecahedron, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#fbb03b">
    <OrbitControls />
    <Dodecahedron>
      <TresMeshNormalMaterial />
    </Dodecahedron>
  </TresCanvas>
</template>
```
