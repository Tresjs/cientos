<script setup lang="ts">
import { TresCanvas, useTexture } from '@tresjs/core'
import { OrbitControls, Decal, Sphere, Box, useGLTF } from '@tresjs/cientos'
import { shallowRef } from 'vue'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'
import datas from '../../../public/decal/datas.json'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
}

const modelRef = shallowRef(null);
const boxRef = shallowRef(null);

const vuejsLogo = await useTexture(['/decal/vuejs-logo.png'])
const nuxtjsLogo = await useTexture(['/decal/nuxtjs-logo.png'])
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

const decalsDatas = {
  "three": {
    "position": [
      1.5363168804445717,
      0.8187995145707163,
      0.0078670324629595
    ],
    "orientation": [
      -1.38857623306136,
      1.072949621353386,
      1.3640708211183215
    ],
    "size": [
      2.25,
      2.25,
      2.25
    ],
    "normal": [
      0.8786128709632215,
      0.46962857716986595,
      0.08653567173814952
    ]
  },
  "vue": {
    "position": [
      -1.157967479791258,
      -0.21184063027023203,
      1.2757945122548344
    ],
    "orientation": [
      0.12612618734468,
      -0.6833155391591204,
      0.07988657730313918
    ],
    "size": [
      2,
      2,
      2
    ],
    "normal": [
      -0.6313676359983956,
      -0.09754968296024379,
      0.7693237079202443
    ]
  }
}


useControls({})
</script>

<template>
  <TresLeches />

  <TresCanvas v-bind="gl">

    <TresPerspectiveCamera :position="[5, 2.5, 5]" />
    <OrbitControls make-default auto-rotate />

    <Sphere :args="[1.75, 32, 16]">
      <Decal v-bind="decalsDatas.three" :map="threejsLogo" />
      <Decal v-bind="decalsDatas.vue" :map="vuejsLogo" />
      <Decal debug :map="nuxtjsLogo" />
    </Sphere>

    <TresAmbientLight :intensity="1.25" />
    <TresDirectionalLight :intensity="1.5" :position="[-2, -1.5, 2]" />
    <TresDirectionalLight :intensity="1.5" :position="[2, 1.5, 2]" />

    <!-- <TresPerspectiveCamera :position="[10, 10, 40]" />
    <OrbitControls auto-rotate make-default /> -->

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

    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :intensity="2" :position="[1, 5, 1]" />
  </TresCanvas>
</template>
