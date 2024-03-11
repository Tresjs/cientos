<script setup lang="ts">
import { TresCanvas, useTexture } from '@tresjs/core'
import { OrbitControls, Decal, Sphere, Box, useGLTF } from '@tresjs/cientos'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping, } from 'three'
import { shallowRef } from 'vue'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'
import datas from '../../../public/decal/datas.json'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const modelRef = shallowRef(null);
const boxRef = shallowRef(null);

const vueLogo = await useTexture(['/decal/vuejs-logo.png'])
const nuxtLogo = await useTexture(['/decal/nuxtjs-logo.png'])
const threejsLogo = await useTexture(['/decal/threejs-logo.png'])

const model = await useGLTF('/decal/LeePerrySmith.glb')
modelRef.value = model.nodes.LeePerrySmith

const getTexture = (index: number) => {
  switch (index) {
    case 0:
    case 2:
    case 6:
      return vueLogo
      break;
    case 1:
    case 3:
      return nuxtLogo
      break;
    case 4:
    case 5:
      return threejsLogo
      break;
    default:
      return vueLogo
      break;
  }
}

useControls({})
</script>

<template>
  <TresLeches />

  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[10, 10, 40]" />
    <OrbitControls auto-rotate :enable-damping="true" make-default />

    <!-- BASIC EXAMPLE -->
    <Sphere :position="[0, 0, 0]" :args="[10, 32, 16]">
      <TresMeshPhysicalMaterial color="white" :roughness=".5" />

      <Decal debug :map="nuxtLogo" :size="[5, 5, 5]">
        <TresMeshPhysicalMaterial :roughness=".2" />
      </Decal>

      <Decal v-for="(decal, index) in datas.sphere" v-bind="decal" :key="`sphere-decal-${index}`">
        <TresMeshPhysicalMaterial :roughness=".2" :map="getTexture(index)" />
      </Decal>
    </Sphere>
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

    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :intensity="2" :position="[1, 5, 1]" />
  </TresCanvas>
</template>
