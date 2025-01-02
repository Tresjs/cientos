---
category: abstractions
related: ['AccumulativeShadows', 'ContactShadows']
---

# ExampleComponent

This is a test component.

## Usage

```vue demo{5-8,10}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#fbb03b">
    <TresMesh>
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
  </TresCanvas>
</template>
```

## Basic material

```vue demo
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#000">
    <TresMesh>
      <TresSphereGeometry />
      <TresMeshBasicMaterial color="red" />
    </TresMesh>
  </TresCanvas>
</template>
```
