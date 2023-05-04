<script setup lang="ts">
import { ref, watch } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { useGLTF, OrbitControls, GLTFModel, useFBX, FBXModel  } from '@cientos'
import { sRGBEncoding, NoToneMapping } from 'three'

const modelPath = 'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/aku-aku/AkuAku.gltf'
const modelPathFbx = 'https://raw.githubusercontent.com/Tresjs/assets/main/models/fbx/low-poly-truck/Jeep_done.fbx'

const { scene: model } = await useGLTF(
  modelPath,
  {
    draco: true,
  },
)

const modelFbx = await useFBX(modelPathFbx)

const akuAkuRef = ref(null)
const jeepRef = ref(null)

const gl = {
  clearColor: '#333',
  alpha: true,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
}

watch(akuAkuRef, value => {
  console.log('akuAkuRef', value)
})
watch(jeepRef, value => {
  console.log('jeepRef', value)
})
</script>

<template>
  <TresCanvas v-bind="gl" ref="canvas">
    <TresPerspectiveCamera :position="[0, 2, 10]" />
    <TresGridHelper :args="[10, 10]" />
    <OrbitControls make-default />
    <primitive :object="model" :position="[-3, -2, 0]" />
    <Suspense>
      <GLTFModel ref="akuAkuRef" :path=modelPath draco :position="[0, -2, 0]" name="Aku_aku" />
    </Suspense>
    <!-- FBX MODELS -->
    <primitive :object="modelFbx" :position="[6, 0, 0]" :scale="[0.01, 0.01, 0.01]" />
      <Suspense>
      <FBXModel ref="jeepRef" :path="modelPathFbx" :scale="0.01" :position="[0, -4, 0]" name="jeep_model" />
    </Suspense>
    <TresAmbientLight />
    <TresDirectionalLight />
  </TresCanvas>
</template>