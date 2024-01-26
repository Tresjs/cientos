# v-light-helper 🔆

With the new directive v-light-helper provided by **TresJS**, you can add fast the respective helper to your lights with just one line of code 😍.

## Usage

```vue{2,8,11,14,17}
<script setup lang="ts">
import { OrbitControls, Sphere, vLightHelper } from '@tresjs/cientos'
</script>
<template>
    <TresCanvas >
      <TresPerspectiveCamera :position="[0, 2, 5]" />
      <TresDirectionalLight
        v-light-helper
      />
      <TresPointLight
        v-light-helper
      />
      <TresSpotLight
        v-light-helper
      />
      <TresHemisphereLight
        v-light-helper
      />
  </TresCanvas>
</template>
```
### shadowCamera

Using the `shadowCamera` argument you can also instantiate the helper for the current `shadow-camera` this only works in lights that generate shadows.

```vue{2,8,11}
<script setup lang="ts">
import { OrbitControls, Sphere, vLightHelper } from '@tresjs/cientos'
</script>
<template>
    <TresCanvas >
      <TresPerspectiveCamera :position="[0, 2, 5]" />
      <TresDirectionalLight
        v-light-helper:shadowCamera
      />
      <TresHemisphereLight
        v-light-helper:shadowCamera // This won't work, hemisphereLight doesn't generate shadows
      />
  </TresCanvas>
</template>
```


::: warning
This directive just work with the following lights:DirectionalLight,PointLight, SpotLight, HemisphereLight and RectAreaLight.
By this way you can't tweaks the props of the helper, if you need to do that, please use the normal helper instance
:::
