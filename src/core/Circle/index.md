---
category: shapes
---

# Circle

`<Circle />` is a shortcut for a `Mesh` with a `CircleGeometry` and a `MeshBasicMaterial`.

```vue:demo
<script setup lang="ts">
import { Circle, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#fbb03b">
    <TresPerspectiveCamera :position="[0, 0, 5]" />
    <OrbitControls />
    <Circle>
      <TresMeshNormalMaterial />
    </Circle>
  </TresCanvas>
</template>
```
