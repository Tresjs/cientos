<script setup lang="ts">
import { TresCanvas, useTexture } from '@tresjs/core'
import { OrbitControls, Dodecahedron, Tetrahedron, Decal, Sphere, Torus, Cone, Box, GLTFModel, useGLTF } from '@tresjs/cientos'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping, Vector3, Euler } from 'three'
import { shallowRef, shallowReactive } from 'vue'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const modelRef = shallowRef(null);

const texture = await useTexture(['/decal/vuejs-logo.png'])
const texturebis = await useTexture(['/decal/nuxtjs-logo.png'])
const model = await useGLTF('/decal/LeePerrySmith.glb')

modelRef.value = model.nodes.LeePerrySmith
// console.log(model)
// console.log(modelRef.value)

useControls({})

</script>

<template>
  <TresLeches />

  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[35, 11, 70]" />
    <OrbitControls :enable-damping="true" make-default />

    <!-- 
    <Dodecahedron :args="[10, 0]" :position="[10, 0, -0]">
      <TresMeshNormalMaterial wireframe />
      <Decal :map="texture" debug :scale="new Vector3(5, 5, 5)" />
      <Decal :map="texture" :rotation="new Euler(-1.017222013725818, 0, 0)" :position="new Vector3(-2.930609056916019,
        3.947917618871017, 7.530507562733906)" :scale="new Vector3(3, 3, 3)" />
    </Dodecahedron> -->

    <Suspense>
      <TresMesh :position="[50, 0, -0]" :scale="[6, 6, 6]" :geometry="modelRef.geometry">
        <TresMeshNormalMaterial />
        <Decal :map="texture" debug :scale="[5, 5, 5]" />
      </TresMesh>
    </Suspense>

    <Suspense>
      <TresMesh :position="[-10, 0, -0]" :scale="[6, 6, 6]" :geometry="modelRef.geometry">
        <TresMeshNormalMaterial />
        <Decal :map="texture" :rotation="new Euler(-0.21887339457828184, 1.1551680262780277, 0.2007578384863383)"
          :position="[-2.0693223613820395, 16.600586851315583, 4.175786740084341]" :scale="[5, 5, 5]" />
      </TresMesh>
    </Suspense>

    <!-- <Sphere :position="[-10, 0, -0]" :args="[10, 32, 16]">
      <TresMeshNormalMaterial />
      <Decal :map="texture" debug :scale="new Vector3(10, 10, 10)" />
    </Sphere> -->

    <!-- <Torus :args="[10, 3, 16, 80]" :position="[-15, 0, -20]">
      <TresMeshNormalMaterial />
      <Decal :map="texture" debug :scale="new Vector3(3, 3, 3)" />
    </Torus> -->

    <!-- <Cone :args="[10, 2, 8]" :position="[20, 0, 20]">
      <TresMeshNormalMaterial />
      <Decal :map="texture" debug :scale="new Vector3(5, 5, 5)" />
    </Cone> -->

    <!-- <Box :args="[10, 10, 10]" :position="[30, 0, -20]">
      <TresMeshNormalMaterial />
      <Decal :map="texture" debug :scale="new Vector3(5, 5, 5)" />
    </Box> -->

    <!-- <TresGridHelper :args="[100, 100]" /> -->
    <TresAmbientLight :intensity="1" />

    <TresSpotLight :decay="0" :position="[10, 10, 10]" :angle="0.15" />
  </TresCanvas>
</template>
