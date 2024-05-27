# Migration Guide from v3

This guide is intended to help you migrate from v3 to the newest versions of TresJS 🤩✨.

::: code-group

```bash [pnpm]
pnpm update @tresjs/cientos
```

```bash [npm]
npm update @tresjs/cientos
```

```bash [yarn]
yarn upgrade @tresjs/cientos
```

:::

## What's new?

### Updated defineExport properties

From the beginning we have started to export our components using `value` but this create a very ambiguos situation with some components, at the moment of access them using template Ref we end with something like:

```vue{6}
<script>
import { shallowRef } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { Stars } from '@tresjs/cientos'

const starsRef = shallowRef()

watch(starsRef, () => {
  // to access here we have a nested `value` here so
  console.log(starsRef.value.value)
  // Wrong ❌

})

</script>
<template>
  <TresCanvas>
    ...
    <Stars ref="starsRef" />
    ...
  </TresCanvas>
</template>
```

This create confusion, and was not a good DX unfortunately to fix this a breaking change have to be introduced, and this is the right moment

Now the implementation is very similar but instead of two confusing `values` we standarized all our component with `instance`, so to access the component will be:

```js
// Correct ✅
console.log(starsRef.value.instance);
```

### Remove tweakPane from deps

After some iteration we decided to drop the instance of `useTweakPane` some of the reasons are:

- no compatibility with the v4 of TweakPane
- Massive bundle size
- Not so intuitive
- Support for the upcoming pkg [Leches](https://tresleches.tresjs.org/)

### Move directives to core

The use of Directives start as a experiment to see if was a valuable option for the ecosystem, since we have a good reception, 
we decided that the most appropriated is that the `directives` lives under the core pkg [Directives section](https://docs.tresjs.org/directives/v-log.html)

So now, you have to import your directives from the core
// Correct ✅
import { vLog } from '@tresjs/core'

```

instead of
// Wrong ❌
import { Stars } from '@tresjs/cientos'
```

*Since the addition of the new `useLoop` method, `vAlwaysLookAt` and `vRotate` has been temporarily remove.

### Changes in KeyboardControls

The implementation of `KeyboardControls` has been change, since this Component doesn't provide the right setup for what was originally developed,
we take the decision to adopt a floating controls similar to Unreal Engine 5 which make more sense to the name of this component.

We have also introduce the `PointLockControls`, so you don't have to do it manually

