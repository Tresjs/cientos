<script setup lang="ts">
import { ref } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import { useGLTF, GLTFModel, useFBX, FBXModel, Text3D } from '@tresjs/cientos'
import { NoToneMapping } from 'three'

const modelPath = 'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/aku-aku/AkuAku.gltf'
const modelPathFbx = 'https://raw.githubusercontent.com/Tresjs/assets/main/models/fbx/low-poly-truck/Jeep_done.fbx'
const fontPath = 'https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json'

const { scene: model } = await useGLTF(modelPath, {
  draco: true,
})

const modelFbx = await useFBX(modelPathFbx)

const akuAkuRef = ref(null)
const akuAkuRef2 = ref(null)
const jeepRef = ref(null)

const gl = {
  clearColor: '#333',
  alpha: true,
  toneMapping: NoToneMapping,
}

const { onLoop } = useRenderLoop()

onLoop(() => {
  if (akuAkuRef.value) {
    akuAkuRef.value.value.rotation.y += 0.01
  }
  if (jeepRef.value) {
    jeepRef.value.value.rotation.y -= 0.01
  }
})

const moveMask = () => {
  if (akuAkuRef2.value) {
    akuAkuRef2.value.value.position.z += 0.1
  }
}
</script>

<template>
  <TresGroup>
    <primitive
      :object="model"
      :position="[-3, 0, 0]"
    />
    <Suspense>
      <GLTFModel
        ref="akuAkuRef"
        :path="modelPath"
        draco
        :position="[0, -2, 2]"
        :rotation-x="0.5"
        name="Aku_aku"
        cast-shadow
      />
    </Suspense>
    <Suspense>
      <Text3D
        text="Click to move mask"
        :size="0.3"
        :font="fontPath"
        center
        :need-updates="true"
        :position="[0, 6.4, 2]"
      />
    </Suspense>
    <Suspense>
      <GLTFModel
        ref="akuAkuRef2"
        :path="modelPath"
        draco
        :position="[0, 1, 2]"
        name="Aku_aku"
        cast-shadow
      />
    </Suspense>
    <TresMesh
      :position="[0, 3.4, 2]"
      @click="(intersection) => {
        const object = intersection.object as THREE.Mesh;
        object.position.z += 0.1;
        moveMask();
      }"
    >
      <TresBoxGeometry :args="[2, 3, 1]" />
      <TresMeshBasicMaterial 
        color="white" 
        :opacity="0" 
        :transparent="true" 
      />
    </TresMesh>
    <!-- FBX MODELS -->
    <primitive
      :object="modelFbx"
      :position="[6, 0, 2]"
      :scale="[0.01, 0.01, 0.01]"
    />
    <Suspense>
      <FBXModel
        ref="jeepRef"
        :path="modelPathFbx"
        :scale="0.01"
        :position="[0, -1, -2]"
        name="jeep_model"
        cast-shadow
      />
    </Suspense>
  </TresGroup>
</template>
