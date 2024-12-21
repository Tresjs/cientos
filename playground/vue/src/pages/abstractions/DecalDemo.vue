<script setup lang="ts">
import { TresCanvas, useTexture } from '@tresjs/core'
import { Box, Decal, Environment, OrbitControls, Sphere, useGLTF } from '@tresjs/cientos'
import { shallowRef } from 'vue'
import { TresLeches, useControls } from '@tresjs/leches'
import { SRGBColorSpace } from 'three'
import '@tresjs/leches/styles'
// import datas from '../../../public/decal/datas.json'
import { useDevicePixelRatio } from '@vueuse/core'

const { pixelRatio } = useDevicePixelRatio()

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  dpr: [1, 2],
  antialias: pixelRatio.value < 2,
}

const modelRef = shallowRef(null)
const boxRef = shallowRef(null)

const model = await useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/aku-aku/AkuAku.gltf', { draco: true })
modelRef.value = model.nodes.LeePerrySmith

useControls({})
</script>

<template>
  <TresLeches />

  <TresCanvas v-bind="gl" window-size>
    <TresPerspectiveCamera :position="[7.5, 5, 7.5]" />
    <OrbitControls make-default auto-rotate />

    <TresMesh ref="boxRef" :scale="1">
      <Suspense>
        <Decal debug :scale="1.5" :map="['/decal/tres-logo.png', '/decal/vuejs-logo.png', '/decal/twemoji.png', '/decal/tres-logo-rotate.png']">
          <TresMeshPhysicalMaterial
            :iridescence="1"
            :iridescenceIOR="1"
            :iridescenceThicknessRange="[0, 1400]"
            :roughness="1"
            :clearcoat="0.5"
            :metalness="0.75"
            :toneMapped="false"
          />
        </Decal>
      </Suspense>

      <TresMeshStandardMaterial color="white" />
      <TresBoxGeometry :args="[3, 3, 3]" />
    </TresMesh>

    <!-- <Sphere :args="[1.75, 32, 32]">
      <Suspense>
        <Decal debug :scale="1.5" :map="['/decal/tres-logo.png', '/decal/vuejs-logo.png', '/decal/twemoji.png', '/decal/tres-logo-rotate.png']" />
      </Suspense>

      <TresMeshPhysicalMaterial :roughness=".5" />
    </Sphere> -->

    <TresAmbientLight :intensity="1.25" />
    <TresDirectionalLight :intensity="1.5" :position="[2, 1.5, 2]" />

    <Suspense>
      <Environment preset="city" :blur="0.7" />
    </Suspense>

    <!-- BASIC EXAMPLE -->
    <!-- <Sphere :position="[0, 0, 0]" :args="[10, 32, 16]">
      <TresMeshPhysicalMaterial color="white" :roughness=".5" />

      <Decal debug :map="nuxtLogo" :size="[5, 5, 5]">
        <TresMeshPhysicalMaterial :roughness=".2" />
      </Decal>

      <Decal v-for="(decal, index) in datas.sphere" v-bind="decal" :key="`sphere-decal-${index}`">
        <TresMeshPhysicalMaterial :roughness=".2" :map="getTexture(index)" />
      </Decal>
    </Sphere> -->
    <!-- BASIC EXAMPLE -->

    <!-- EXAMPLE WITH A MODEL GLB -->
    <!-- <Suspense>
      <TresMesh :position="[-20, 0, -0]" :scale="[6, 6, 6]" :geometry="modelRef.geometry">
        <TresMeshPhysicalMaterial :roughness=".5" />

        <Decal v-bind="datas.glb" :map="nuxtLogo">
          <TresMeshPhysicalMaterial :roughness=".2" />
        </Decal>
      </TresMesh>
    </Suspense> -->
    <!-- EXAMPLE WITH A MODEL GLB -->

    <!-- EXAMPLE WITH THE MESH PROP -->
    <!-- <TresMesh ref="boxRef" :scale="1">
      <TresMeshPhysicalMaterial :roughness=".5" />
      <TresBoxGeometry :args="[10, 10, 10]" />
    </TresMesh>

    <Decal v-bind="datas.box" :mesh="boxRef">
      <TresMeshPhysicalMaterial :roughness=".2" :map="vueLogo" />
    </Decal> -->
    <!-- EXAMPLE WITH THE MESH PROP -->
  </TresCanvas>
</template>
