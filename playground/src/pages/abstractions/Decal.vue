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
const sphereRef = shallowRef(null);
const boxRef = shallowRef(null);

const texture = await useTexture(['/decal/vuejs-logo.png'])
const texturebis = await useTexture(['/decal/nuxtjs-logo.png'])
const model = await useGLTF('/decal/LeePerrySmith.glb')

modelRef.value = model.nodes.LeePerrySmith
// console.log(model)
// console.log(modelRef.value)

useControls({})

const test = {
  position: [
    -17.036271607544222,
    12.35183464935706,
    12.404844135796221
  ],
  orientation: [
    0.13442852192904298,
    0.35471728559334925,
    -0.04693921397594417
  ],
  size: [
    5,
    5,
    5
  ],
  normal: [
    0.34732526517757834,
    -0.1256803083877293,
    0.9292844668092167
  ]
}

const testbis = {
  position: [
    -13.54854422606721,
    18.384044556860996,
    6.358383097269183
  ],
  orientation: [
    -0.6272934257338958,
    0.9807035105497516,
    0.5421646053685236
  ],
  size: [
    5,
    5,
    5
  ],
  normal: [
    0.8308890361799289,
    0.3266044944856527,
    0.4505029564140062
  ]
}

const testbisbis = {
  position: [
    -24.360274492997206,
    14.27841303828771,
    12.504588629870966
  ],
  orientation: [
    -0.22625016445836482,
    -0.4797976989345884,
    -0.10585908275043364
  ],
  size: [
    6,
    6,
    6
  ],
  normal: [
    -0.46159972607549143,
    0.1989959465002787,
    0.8644803677143221
  ]
}

const testbisbisbisbis = {
  position: [
    -18.23250718893303,
    18.012825563779273,
    11.58538499478573
  ],
  orientation: [
    -0.5048476017665725,
    0.26353195612257646,
    -0.7471485322126188
  ],
  size: [
    5,
    5,
    5
  ],
  normal: [
    0.2604921882941604,
    0.46697567469996426,
    0.8450310876389299
  ]
}

const sphereDecalVue = {
  position: [
    11.601403219996051,
    2.9632520393805795,
    9.343035939756625
  ],
  orientation: [
    -0.2945244793017058,
    0.09397273450939825,
    0.02845671339093826
  ],
  size: [
    10,
    10,
    10
  ],
  normal: [
    0.09383448532391567,
    0.28900404647064387,
    0.9527180855256134
  ]
}

const boxDecalVue = {
  position: [
    -0.3328145803203455,
    5,
    -0.03354545117475283
  ],
  orientation: [
    -1.57069632679523,
    0,
    0
  ],
  size: [
    5,
    5,
    5
  ],
  normal: [
    0,
    1,
    0
  ]
}

</script>

<template>
  <TresLeches />

  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[35, 11, 70]" />
    <OrbitControls :enable-damping="true" make-default />

    <!-- <Suspense>
      <TresMesh :position="[30, 0, -0]" :scale="[5, 5, 5]" :geometry="modelRef.geometry">
        <TresMeshNormalMaterial />
        <Decal :map="texturebis" debug :scale="[5, 5, 5]" />
      </TresMesh>
    </Suspense> -->

    <!-- With External Model -->
    <Suspense>
      <TresMesh :position="[-20, 0, -0]" :scale="[6, 6, 6]" :geometry="modelRef.geometry">
        <TresMeshPhysicalMaterial :roughness=".5" />

        <Decal debug v-bind="test" :map="texture" />

        <Decal v-bind="testbis" :map="texturebis">
          <TresMeshPhysicalMaterial :roughness=".2" />
        </Decal>

        <Decal v-bind="testbisbis" :map="texturebis" />
        <Decal v-bind="testbisbisbisbis" :map="texture" />
      </TresMesh>
    </Suspense>
    <!-- With External Model -->

    <Sphere :position="[10, 0, -0]" :args="[10, 32, 16]">
      <TresMeshPhysicalMaterial :roughness=".5" />
      <Decal v-bind="sphereDecalVue">
        <TresMeshPhysicalMaterial :roughness=".2" :map="texture" />
      </Decal>
    </Sphere>

    <!-- Example with mesh binded into a ref -->
    <TresMesh ref="boxRef" :scale="1">
      <TresMeshPhysicalMaterial :roughness=".5" />
      <TresBoxGeometry :args="[10, 10, 10]" />
    </TresMesh>

    <Decal v-bind="boxDecalVue" :mesh="boxRef">
      <TresMeshPhysicalMaterial :roughness=".2" :map="texture" />
    </Decal>

    <Decal debug :mesh="boxRef" :size="[6, 6, 6]">
      <TresMeshPhysicalMaterial :roughness=".2" :map="texturebis" />
    </Decal>
    <!-- Example with mesh binded into a ref -->

    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :intensity="2" :position="[1, 7.5, 1]" />
  </TresCanvas>
</template>
