<script setup lang="ts">
import { Outline, useAnimations, useGLTF } from '@tresjs/cientos'

const loaded = shallowRef(false)
const { scene, nodes, materials, animations } = await useGLTF('/Michelle.glb')
loaded.value = true
const { actions } = useAnimations(animations, scene)
actions.SambaDance.play()
</script>

<template>
    <TresGroup>
    <TresSkinnedMesh v-if="loaded" castShadow receiveShadow :geometry="nodes.Ch03.geometry" :material="materials.Ch03_Body" :skeleton="nodes.Ch03.skeleton">
        <Outline :thickness="0.001" color="black" />
    </TresSkinnedMesh>
    </TresGroup>
</template>