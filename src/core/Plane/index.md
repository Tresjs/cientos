---
category: shapes
---

# Plane <Badge type="warning" text="^1.5.0" />

`<Plane />` is a shortcut for a `Mesh` with a [`PlaneGeometry`](https://threejs.org/docs/?q=plane#api/en/geometries/PlaneGeometry) and a `MeshBasicMaterial`.

::: info
A convenient default rotation is applied to the _x-axis_ of the plane (`-Math.PI / 2`), so that it is facing up (along the Y axis).
:::

## Usage

```vue demo
<script setup lang="ts">
import { Plane, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#fbb03b">
    <OrbitControls />
    <Plane>
      <TresMeshNormalMaterial />
    </Plane>
  </TresCanvas>
</template>
