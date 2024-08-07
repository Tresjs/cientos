<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { LOD, OrbitControls, Sphere } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 2, 4]" />
    <OrbitControls :enablePan="false" :enableDamping="false" :enableRotate="false" />
    <LOD :distance="0" name="high">
      <Sphere name="sphere" :args="[1, 16]" :position="[-1, 0, 0]">
        <TresMeshNormalMaterial wireframe />
      </Sphere>
    </LOD>

    <LOD :distance="5" name="medium">
      <Sphere name="sphere" :args="[1, 8]" :position="[-1, 0, 0]">
        <TresMeshNormalMaterial wireframe />
      </Sphere>
    </LOD>

    <LOD :distance="10" name="low">
      <Sphere name="sphere" :args="[1, 4]" :position="[-1, 0, 0]">
        <TresMeshNormalMaterial wireframe />
      </Sphere>
    </LOD>
  </TresCanvas>
</template>
