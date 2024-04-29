# Edges

<DocsDemo>
  <EdgesDemo />
</DocsDemo>

The `cientos` package provides an abstraction of [EdgesGeometry](https://threejs.org/docs/#api/en/geometries/EdgesGeometry) Three.js, `<Edges>` is specifically designed for rendering visible edges of objects in a scene graph. This enhances the visual quality by highlighting contours and providing a stylized appearance which contributes to the artistic aspect of 3D visualizations.

## Usage

The `<Edges>` component is easy to set up as it automatically derives geometry from its parent. You can simply wrap it around any [Object3D](https://threejs.org/docs/#api/en/core/Object3D), [Mesh](https://threejs.org/docs/#api/en/objects/Mesh), or [primitive](https://docs.tresjs.org/advanced/primitive.html) to automatically apply edge rendering.

```vue
<script setup lang="ts">
import { Edges, Box } from '@tresjs/cientos'
</script>

<template>
  <Box>
    <TresMeshBasicMaterial
      color="#0000FF"
    />
    <Edges color="#FF0000" />
  </Box>
</template>
```

Parler du material de base et ceux qu'on peux rajouter

## Props

| Prop              | Description                                          | Default                   |
| :---------------- | :--------------------------------------------------- | ------------------------- |
| **url**        | `string` - **required** — The path or URL to the file. |                    |
| **helper**        | `boolean` — Selects whether helper mode is enabled. <br> *(Useful for visualising the angle of sound propagation)*  | `false`                   |
| **distance**        | `number` — The distance at which the volume reduction starts taking effect. ***A non-negative number.***  | `1`                   |
| **ready**        | `boolean` — Tells `<PositionalAudio>` that `AudioContext` is authorised because an user gesture has been made on the page. This is imperative, as `autoplay` cannot be activated if no user gesture has been made previously (https://goo.gl/7K7WLu). <br> | `false`                   |
| **autoplay**        | `boolean` — Selects whether the audio is launched automatically. Please refer to the `ready` prop for a better understanding of how to use autoplay.  | `false`                   |
| **loop**        | `boolean` — Specifies whether the audio should loop. |      `false`              |
| **innerAngle**        | `number` —  A parameter for directional audio sources, this is an angle, inside of which there will be no volume reduction. |      `360`              |
| **outerAngle**        | `number` —  A parameter for directional audio sources, this is an angle, outside of which the volume will be reduced to a constant value of `outerGain` prop. |      `0`              |
| **outerGain**        | `number` —  A parameter for directional audio sources, this is the amount of volume reduction outside of the `outerAngle` prop. When the value is `0` no sound can be heard. |      `0`              |

## Exposed properties

| Event       | Description                                                      |
| :---------- | :--------------------------------------------------------------- |
| `root` | Root component — Inheritance of [LineSegments](https://threejs.org/docs/#api/en/objects/LineSegments).|


```typescript{1}
const edgesRef = shallowRef(null)
```

```vue{2}
<template>
    <Edges ref="edgesRef" />
</template>
```

