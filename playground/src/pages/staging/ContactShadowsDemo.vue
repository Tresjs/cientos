<script setup lang="ts">
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { OrbitControls, ContactShadows, Box, Plane, Icosahedron } from '@tresjs/cientos'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { reactive, shallowRef, watch } from 'vue'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#fff',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const shadowRef = shallowRef()

watch(shadowRef, () => {
  console.log('jaime ~ watch ~ shadowRef:', shadowRef.value.root)
  
})

const state = reactive({
  blur: 3.5,
  opacity: 1,
  resolution: 512,
  color: '#0000ff',
  helper: true,
})

const { blur, opacity, resolution, color, helper } = useControls({
  blur: {
    value: state.blur,
    step: 0.1,
    min: 0,
    max: 10,
  },
  opacity: {
    value: state.opacity,
    step: 0.1,
    min: 0,
    max: 1,
  },
  resolution: {
    value: state.resolution,
    step: 1,
    min: 0,
    max: 1024,
  },
  color: {
    type: 'color',
    value: state.color,
  },
  helper: state.helper,
})

watch([blur.value, opacity.value, resolution.value, color.value, helper.value ], () => {
  state.blur = blur.value.root
  state.opacity = opacity.value.root
  state.resolution = resolution.value.root
  state.color = color.value.root
  state.helper = helper.value.root
})

const boxRef = shallowRef()
const icoRef = shallowRef()

const { onLoop } = useRenderLoop()

onLoop(() => {
  if (boxRef.value) {
    boxRef.value.root.rotation.y += 0.02
    boxRef.value.root.rotation.x += 0.01
  }
  if (icoRef.value) {
    icoRef.value.root.rotation.y += 0.02
    icoRef.value.root.rotation.x += 0.01
  }
})
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[5, 5, 5]" />

    <OrbitControls />
    <Box
      ref="boxRef"
      :args="[0.4, 0.4, 0.4]"
      :position="[0, 1, 0]"
    >
      <TresMeshNormalMaterial />
    </Box>
    <Icosahedron
      ref="icoRef"
      :args="[0.3]"
      :position="[1, 1, 1]"
    >
      <TresMeshNormalMaterial />
    </Icosahedron>
    <ContactShadows
      ref="shadowRef"
      :blur="state.blur"
      :resolution="state.resolution"
      :opacity="state.opacity"
      :color="state.color"
      :helper="state.helper"
    />
    <Plane
      :args="[10, 10, 10]"
      :position="[0, -0.02, 0]"
    >
      <TresMeshBasicMaterial color="#ffffff" />
    </Plane>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
