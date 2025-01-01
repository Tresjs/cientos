---
category: shapes
---

# CatmullRomCurve3

`<CatmullRomCurve3 />` makes smooth(ish) 3D lines.

It wraps [Three.js's `CatmullRomCurve3`](https://threejs.org/docs/index.html?q=catmu#api/en/extras/curves/CatmullRomCurve3) functionality, but applies it to Cientos' `<Line2 />` under the hood, meaning you can use all the props from `<Line2 />`.

## Usage

```vue:demo
<script setup lang="ts">
import { CatmullRomCurve3, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#222222">
    <OrbitControls />
    <CatmullRomCurve3
      :points="[[-1.5, 0, 0], [-0.5, 1, 0], [0.5, 0, 0], [1.5, 1, 0]]"
      :segments="40"
      :line-width="10"
      color="#fbb03b"
    />
    <TresGridHelper />
  </TresCanvas>
</template>
```
