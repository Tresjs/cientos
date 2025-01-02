---
category: shapes
---

# Box <Badge type="warning" text="^1.6.0" />

`<Box />` is a shortcut for `Mesh` with a [`BoxGeometry`](https://threejs.org/docs/?q=box#api/en/geometries/BoxGeometry) and a `MeshBasicMaterial`.

## Usage

```vue demo
<script setup lang="ts">
import { Box, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#fbb03b">
    <OrbitControls />
    <Box>
      <TresMeshNormalMaterial />
    </Box>
  </TresCanvas>
</template>
```
