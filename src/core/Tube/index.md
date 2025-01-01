---
category: shapes
---

# Tube <Badge type="warning" text="^1.6.0" />

`<Tube />` is a shortcut for a `Mesh` with a [`TubeGeometry`](https://threejs.org/docs/?q=tube#api/en/geometries/TubeGeometry) and a `MeshBasicMaterial`.

## Usage

```vue:demo
<script setup lang="ts">
import { OrbitControls, Tube } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { CubicBezierCurve3, Vector3 } from 'three'

const tubePath = new CubicBezierCurve3(
  new Vector3(-1, 0, 0),
  new Vector3(-0.5, -1, 0),
  new Vector3(0.5, 1, 0),
  new Vector3(1, 0, 0),
)
</script>

<template>
  <TresCanvas clear-color="#fbb03b">
    <OrbitControls />
    <Tube :args="[tubePath, 20, 0.2, 8, false]">
      <TresMeshNormalMaterial />
    </Tube>
  </TresCanvas>
</template>
```
