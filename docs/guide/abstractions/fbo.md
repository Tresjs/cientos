# FBO <Badge type="warning" text="^3.5.0" />

An FBO (or Frame Buffer Object) is generally used to render to a texture. This is useful for post-processing effects like blurring, or for rendering to a texture that will be used as a texture in a later draw call.

Cientos provides both a `<Fbo />` component and a `useFBO` composable to make it easy to use FBOs in your application.

## Usage of `<Fbo />`

<DocsDemo>
  <FboDemo />
</DocsDemo>

```ts
import { Fbo } from '@tresjs/cientos'
```

```vue{4}
<template>
  <TresCanvas>
    <Fbo />
  </TresCanvas>
</template>
```
