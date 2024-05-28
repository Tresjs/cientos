# Migration Guide from v3

This guide is intended to help you migrate from v3 to the newest version of Cientos 🤩✨.

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

Since the beginning we have exported our components using `value` but this creates a very ambiguos situation with some components, when we access them using `template ref`, we end up with something like:

```vue{6}
<script>
import { shallowRef, watch } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { Stars } from '@tresjs/cientos'

const starsRef = shallowRef()

watch(starsRef, () => {
  // to access the instance we have a nested `value.value`
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

This creates confusion, and was not a good DX. Unfortunately, to fix this, a breaking change needed to be introduced, and we felt this was the right moment.

Now the implementation is very similar but instead of two confusing `values` we have standardized all our components with `instance`, so to access the components now use:

```js
// Correct ✅
console.log(starsRef.value.instance);
```

### Remove tweakPane from deps

After some iteration, we decided to drop the instance of `useTweakPane` some of the reasons are:

- No compatibility with the v4 of [TweakPane](https://tweakpane.github.io/docs/)
- Massive bundle size
- Not so intuitive, lot of code repetition
- Support for the upcoming pkg [Leches](https://tresleches.tresjs.org/)

### Move directives to core

The use of `directives` started as a experiment to see how valuable it would be for the ecosystem, since it has had a good reception, we have decided that it is appropriate for the `directives` to live under the core pkg [Directives section](https://docs.tresjs.org/directives/v-log.html).

So now you have to import your directives from the core:
```
Correct ✅
import { vLog } from '@tresjs/core'
```

Instead of:
```
Wrong ❌
import { vLog } from '@tresjs/cientos'
```

*Since the addition of the new `useLoop` method, `vAlwaysLookAt` and `vRotate` have been temporarily remove.

### Changes in KeyboardControls

The implementation of `KeyboardControls` has been change, since this component doesn't provide the right setup for what was originally developed. We took the decision to adopt a floating controls similar to Unreal Engine 5, which make more sense for the name of this component.

We have also brought the `PointLockControls` inside `KeyboardControls`, so you don't have to set it up manually.

Check it out with a live example [here](https://cientos.tresjs.org/guide/controls/keyboard-controls.html).

