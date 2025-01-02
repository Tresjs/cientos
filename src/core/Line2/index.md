---
category: shapes
---

# Line2

`<Line2 />` is a component for creating 3-D lines. It wraps [Three.js's `Line2`](https://github.com/mrdoob/three.js/blob/e2bcdfff6427c2f106cb819b18d88d1e13aa508a/examples/jsm/lines/Line2.js).

## Usage

```vue demo
<script setup lang="ts">
import { Line2, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#4f4f4f">
    <OrbitControls />
    <Line2
      :points="[
        [-0.5, 0, 0],
        [0.5, 0, 0],
        [0, 0.8660, 0],
        [-0.5, 0, 0]
      ]"
      :line-width="10"
      color="#82dbc5"
    />
    <TresGridHelper />
  </TresCanvas>
</template>
```

### Points

The points prop has the following type:

`Array<Vector3 | Vector2 | [number, number, number] | [number, number] | number>`

The passed array is converted to `Array<number>` – i.e., a series of x, y, z vertex coordinates. This is done array entry by array entry, as follows:

| Entry type                   | Interpretation                                                                   |
| ---------------------------- | -------------------------------------------------------------------------------- |
| `Vector3`                    | Insert the vector's x, y, z into the result array                                |
| <nobr>`[number, number, number]`</nobr> | Insert the array values into the result array                         |
| `Vector2`                    | Insert the vector's x, y, then 0 into the result array                           |
| `[number, number]`           | Insert the array values, then 0 into the result array                            |
| `number`                     | Insert the number into the result array                                          |

:::warning
If you pass "bare" numbers in the points array, ensure that you pass "triplets" – groups of three numbers. Otherwise, you'll corrupt the coordinates that follow.

::: code-group
```vue [Wrong]
//        ✅     ❌     ✅
:points="[[1,1], 2, 2, [3,3]]"
// result: (1,1,0) (2,2,3) (3,0,❌)
```

```vue [Right]
//        ✅     ✅        ✅
:points="[[1,1], 2, 2, 0, [3,3]]"
// result: (1,1,0) (2,2,0) (3,3,0)
```
The component, like Three.js, will not keep you from shooting yourself in the foot.
:::
