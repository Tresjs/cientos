---
category: shapes
---

# Torus <Badge type="warning" text="^1.6.0" />

`<Torus />` is a shortcut for a `Mesh` with a [`TorusGeometry`](https://threejs.org/docs/?q=torus#api/en/geometries/TorusGeometry) and a `MeshBasicMaterial` with a `Mesh` object.

## Usage

```vue:demo
<script setup lang="ts">
import { OrbitControls, Torus } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#fbb03b">
    <OrbitControls />
    <Torus :scale="0.6">
      <TresMeshNormalMaterial />
    </Torus>
  </TresCanvas>
</template>
```
