---
category: shapes
---

# Sphere <Badge type="warning" text="^1.6.0" />

`<Sphere />` is a shortcut for a `Mesh` with a [`SphereGeometry`](https://threejs.org/docs/?q=sphere#api/en/geometries/SphereGeometry) and a `MeshBasicMaterial`.

## Usage

```vue demo
<script setup lang="ts">
import { OrbitControls, Sphere } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#fbb03b">
    <OrbitControls />
    <Sphere :scale="0.5">
      <TresMeshNormalMaterial />
    </Sphere>
  </TresCanvas>
</template>
```
