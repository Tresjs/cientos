<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Decal, Html, OrbitControls } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import { SRGBColorSpace } from 'three'
import '@tresjs/leches/styles'
import decalsData from '../../assets/decal.json'
import { useDevicePixelRatio } from '@vueuse/core'

const { pixelRatio } = useDevicePixelRatio()

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  dpr: [1, 2] as [number, number],
  antialias: pixelRatio.value < 2,
}

const paragraphRef = ref<HTMLElement | null>(null)
const paragraphRefBis = ref<HTMLElement | null>(null)
const paragraphRefBisBis = ref<HTMLElement | null>(null)
const paragraphRefBisBisBis = ref<HTMLElement | null>(null)
const paragraphRefBisBisBisBis = ref<HTMLElement | null>(null)
const paragraphRefBisBisBisBisBis = ref<HTMLElement | null>(null)

onMounted(() => {
  console.log('mounted', paragraphRefBis.value)
})

watch(paragraphRefBis, () => {
  console.log('watch', paragraphRefBis.value)
})

useControls({})
</script>

<template>
  <TresLeches style="position:absolute; left:initial; right:20px; top:10px;" />
  <div id="late-div"></div>

  <TresCanvas v-bind="gl" window-size>
    <TresPerspectiveCamera :position="[7.5, 5, 7.5]" />
    <OrbitControls make-default />

    <!-- <TresMesh :scale="3">
      <TresMeshStandardMaterial color="white" />
      <TresBoxGeometry :args="[1, 1, 1]" />

      <Suspense>
        <Decal :data="decalsData" debug :scale="2" :map="['/decal/tres-logo.png', '/decal/vuejs-logo.png', '/decal/twemoji.png', '/decal/tres-logo-rotate.png']" />
      </Suspense>
    </TresMesh> -->

    <Html center>
      <p ref="paragraphRef">Decal Demo</p>
    </Html>

    <Html center>
      <p ref="paragraphRefBis">Decal Demo</p>
      <p ref="paragraphRefBisBis">Decal Demo</p>

      <div ref="paragraphRefBisBisBis">
        <p ref="paragraphRefBisBisBisBis">Decal Demo</p>
        <p ref="paragraphRefBisBisBisBisBis">Decal Demo 2</p>
      </div>
    </Html>

    <!-- <Sphere :args="[1.75, 32, 32]">
      <Suspense>
        <Decal debug :scale="1.5" :map="['/decal/tres-logo.png', '/decal/vuejs-logo.png', '/decal/twemoji.png', '/decal/tres-logo-rotate.png']" />
      </Suspense>

      <TresMeshPhysicalMaterial :roughness=".5" />
    </Sphere> -->

    <TresAmbientLight :intensity="2" />
    <TresDirectionalLight :intensity="3" :position="[2, 1.5, 2]" />

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
      <TresMesh :scale="[12.5, 12.5, 12.5]" :geometry="model.geometry">
        <TresMeshStandardMaterial />

        <Decal debug :scale="1" :map="['/decal/tres-logo.png', '/decal/vuejs-logo.png', '/decal/twemoji.png', '/decal/tres-logo-rotate.png']">
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
