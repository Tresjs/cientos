---
category: shapes
---

# Cone <Badge type="warning" text="^1.6.0" />

`<Cone />` is a shortcut for a `Mesh` with a [`ConeGeometry`](https://threejs.org/docs/?q=cone#api/en/geometries/ConeGeometry) and a `MeshBasicMaterial`.

## Usage

```vue:demo
<script setup lang="ts">
import { Cone, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#fbb03b">
    <OrbitControls />
    <Cone :args="[1, 2, 8]">
      <TresMeshNormalMaterial />
    </Cone>
  </TresCanvas>
</template>
```
