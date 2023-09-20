# v-distance-to

¿Have you tried to calculate the distance between two object with ThreeJs?

With the new directive `v-distance-to` it's easier than ever, you should only indicate the target object to perform the measure and the result will appear in your console.

In addition an arrowHelper between the two object will be created to indicate which are the object you're measure the distance

```vue{3}
<script setup lang="ts">
import { OrbitControls, Sphere, vLog } from '@tresjs/cientos'
</script>
<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <Sphere
      ref="sphere1Ref"
      :position="[-2, slider, 0]"
      :scale="0.5"
    />
    <Sphere
      v-distance-to="sphere1Ref"
      :position="[2, 0, 0]"
      :scale="0.5"
    />
    <TresGridHelper :args="[10, 10]" />
    <OrbitControls />
  </TresCanvas>
</template>
```

The use of `v-distance-to` is reactive, that's mean work perfect with `@tres/leches` 🍰.

::: warning
`v-distance-to` will not measure object in movement within the renderLoop.
:::
