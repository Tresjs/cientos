---
category: shapes
---

# Icosahedron <Badge type="warning" text="^1.6.0" />

`<Icosahedron />` is a shortcut for a `Mesh` with an [`IcosahedronGeometry`](https://threejs.org/docs/?q=ico#api/en/geometries/IcosahedronGeometry) and a `MeshBasicMaterial`.

## Usage

```vue:demo
<script setup lang="ts">
import { Icosahedron, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#fbb03b">
    <OrbitControls />
    <Icosahedron>
      <TresMeshNormalMaterial />
    </Icosahedron>
  </TresCanvas>
</template>
```
