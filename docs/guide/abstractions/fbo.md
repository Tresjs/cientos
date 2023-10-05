# FBO <Badge type="warning" text="^3.5.0" />

An FBO (or Frame Buffer Object) is generally used to render to a texture. This is useful for post-processing effects like blurring, or for rendering to a texture that will be used as a texture in a later draw call.

Cientos provides both a `<Fbo />` component and a `useFBO` composable to make it easy to use FBOs in your application.

## Usage of `<Fbo />`

<DocsDemo>
  <FboDemo />
</DocsDemo>

```ts
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { OrbitControls, Fbo } from '@tresjs/cientos'
import { SRGBColorSpace, ACESFilmicToneMapping } from 'three'
import { ref, shallowRef, shallowReactive, onMounted, nextTick } from 'vue'

const gl = {
	clearColor: '#82DBC5',
	shadows: true,
	alpha: false,
	outputColorSpace: SRGBColorSpace,
	toneMapping: ACESFilmicToneMapping,
}

const fboRef = ref(null)
const torusRef = shallowRef(null)
const capsuleRef = shallowRef(null)

const { onLoop } = useRenderLoop()

const state = shallowReactive({
	depth: false,
	settings: {
		samples: 1,
	},
})

onMounted(async () => {
	await nextTick()

	onLoop(({ elapsed }) => {
		torusRef.value.rotation.x = elapsed * 0.745
		torusRef.value.rotation.y = elapsed * 0.361

		capsuleRef.value.rotation.x = elapsed * 0.471
		capsuleRef.value.rotation.z = elapsed * 0.632
	})
})
```

```vue{8,14}
<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 0.5, 5]" />
    <OrbitControls />

    <TresGridHelper :args="[10, 10]" />

    <Fbo ref="fboRef" v-bind="state" />

    <TresMesh>
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshBasicMaterial
        :color="0xffffff"
        :map="fboRef?.value.texture ?? null"
      />
    </TresMesh>

    <TresMesh ref="torusRef" :position="[3, 0, 0]">
      <TresTorusGeometry :args="[1, 0.5, 16, 100]" />
      <TresMeshNormalMaterial />
    </TresMesh>

    <TresMesh ref="capsuleRef" :position="[-2, 0, 0]">
      <TresCapsuleGeometry :args="[0.4, 1, 4, 8]" />
      <TresMeshNormalMaterial />
    </TresMesh>
  </TresCanvas>
</template>
```
