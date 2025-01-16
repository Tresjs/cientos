---
category: shapes
---

# Box <Badge type="warning" text="^1.6.0" />

`<Box />` is a shortcut for `Mesh` with a [`BoxGeometry`](https://threejs.org/docs/?q=box#api/en/geometries/BoxGeometry) and a `MeshBasicMaterial`.

## Usage

```vue demo
<!-- demo-control
value: true
selector: TresCanvas Box v-if
-->

<!-- demo-control
value: false
selector: TresCanvas Box color
-->

<!-- demo-control
label: 'Canvas clear-color'
value: '#FFF'
selector: TresCanvas clear-color
-->

<script setup lang="ts">
import { Box, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#fbb03b">
    <OrbitControls v-if="false" />
    <Box v-if="true" color="#F00">
      <TresMeshNormalMaterial />
    </Box>
  </TresCanvas>
</template>
```
