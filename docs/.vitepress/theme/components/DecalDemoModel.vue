<script setup lang="ts">
import { shallowRef } from 'vue'
import { TresCanvas, useTexture } from '@tresjs/core'
import { Decal, OrbitControls, useGLTF } from '@tresjs/cientos'
import modelDatas from '../assets/decal/modelDatas.json'

const modelRef = shallowRef(null);

const model = await useGLTF('/cientos/decal/LeePerrySmith.glb')
modelRef.value = model.nodes.LeePerrySmith

const vueLogo = await useTexture(['/cientos/decal/vuejs-logo.png'])
</script>

<template>
  <TresCanvas clearColor="#82DBC5">
    <TresPerspectiveCamera :position="[1.5, 2.5, 6.5]" />
    <OrbitControls make-default />

    <Suspense>
      <TresMesh :scale="[.65, .65, .65]" :geometry="modelRef.geometry">
        <TresMeshPhysicalMaterial :roughness=".5" />

        <Decal v-bind="modelDatas" :map="vueLogo">
          <TresMeshPhysicalMaterial :roughness=".2" />
        </Decal>
      </TresMesh>
    </Suspense>

    <TresAmbientLight :intensity="1.25" />
    <TresDirectionalLight :intensity="1.5" :position="[2, 1.5, 2]" />
  </TresCanvas>
</template>
