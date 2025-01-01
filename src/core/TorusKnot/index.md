---
category: shapes
---

# TorusKnot <Badge type="warning" text="^1.6.0" />

`<TorusKnot />` is a shortcut for a `Mesh` with a [`TorusKnotGeometry`](https://threejs.org/docs/?q=torus#api/en/geometries/TorusKnotGeometry) and a `MeshBasicMaterial`.

## Usage

```vue:demo
<script setup lang="ts">
import { OrbitControls, TorusKnot } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#fbb03b">
    <OrbitControls />
    <TorusKnot :args="[0.6, 0.2, 64, 8]" :rotation-y="0.5">
      <TresMeshNormalMaterial />
    </TorusKnot>
  </TresCanvas>
</template>
```
