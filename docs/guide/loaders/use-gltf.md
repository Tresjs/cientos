# useGLTF

<DocsDemo>
  <UseGLTFDemo />
</DocsDemo>

A composable that allows you to easily load glb/glTF models into your **TresJS** scene.

## Usage

::: code-group
```vue{2,6} [TheModel.vue]
<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

const path = './blender-cube.glb'
const { state } = useGLTF(path, { draco: true })
</script>

<template>
  <primitive v-if="state" :object="state?.scene" />
</template>
```
```vue [app.vue]
<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import TheModel from './TheModel.vue'
</script>

<template>
  <TresCanvas clear-color="#F78B3D">
    <TresPerspectiveCamera :position="[3, 2, 5]" />
    <OrbitControls />
    <TheModel />
    <TresDirectionalLight
      :intensity="2"
      :position="[3, 3, 3]"
    />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
```

:::

An advantage of using `useGLTF`is that you can pass a `draco` prop to enable [Draco compression](https://threejs.org/docs/index.html?q=drac#examples/en/loaders/DRACOLoader) for the model. This will reduce the size of the model and improve performance.

```ts
import { useGLTF } from '@tresjs/cientos'

const { scene } = useGLTF('/models/AkuAku.gltf', { draco: true })
```

## Options

| Name            | Type      | Default     | Description                          |
| :-------------- | --------- | ----------- | ------------------------------------ |
| **draco**       | `boolean` | `false`     | Whether to enable Draco compression. |
| **decoderPath** | `string`  | `undefined` | Local path to the Draco decoder.     |
