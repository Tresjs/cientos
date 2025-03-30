<script setup lang="ts">
import { onUnmounted, shallowRef, toRefs, watch } from 'vue'
import { MathUtils, Mesh } from 'three'
import { DecalGeometry } from 'three-stdlib'
import type { Decal, DecalAttributesItem, EnhancedTexture } from './types'

const props = withDefaults(defineProps<DecalAttributesItem>(), {
  properties: () => ({} as Decal),
  depthTest: true,
  depthWrite: false,
  polygonOffsetFactor: -10,
  order: () => Math.round(Math.random() * 100),
})

const { properties, depthTest, depthWrite, polygonOffsetFactor } = toRefs(props)

const meshRef = shallowRef<Mesh | null>(null)

defineExpose({
  instance: meshRef,
})

const makeGeometry = () => {
  const { parent, normal, position, size, orientation, map, scale, orientationZ } = properties.value
  const target = meshRef.value

  if (!parent || !target || !map) { return }

  const decalNormal = normal.clone()
  const decalPosition = position.clone()

  const aspectRatio = (map as EnhancedTexture).aspectRatio ?? 1

  const decalSize = size.clone()

  if ((map as EnhancedTexture).isPortrait) {
    decalSize.y = decalSize.x / ((map as EnhancedTexture).aspectRatio ?? 1)
  }
  else {
    decalSize.x = decalSize.y * ((map as EnhancedTexture).aspectRatio ?? 1)
  }

  decalSize.y = decalSize.x / aspectRatio
  decalSize.multiplyScalar(scale)

  const decalOrientation = orientation.clone()
  decalOrientation.z = decalOrientation.z + MathUtils.degToRad(orientationZ)

  target.position.copy(decalNormal).multiplyScalar(0.001)

  if (parent instanceof Mesh) {
    target.geometry = new DecalGeometry(parent, decalPosition, decalOrientation, decalSize)
  }
}

watch(
  () => [properties.value.orientation, properties.value.scale, properties.value.orientationZ],
  () => {
    makeGeometry()
  },
)

watch(meshRef, () => {
  makeGeometry()
})

onUnmounted(() => {
  meshRef.value?.geometry.dispose()
})
</script>

<template>
  <TresMesh
    ref="meshRef"
    v-bind="$attrs"
    material-transparent
    material-polygonOffset
    :material-polygonOffsetFactor="polygonOffsetFactor"
    :material-depthTest="depthTest"
    :material-depthWrite="depthWrite"
    :material-map="properties.map"
    :name="`decal-item decal-${properties.uid ?? 0}`"
    :properties="properties"
  >
    <slot></slot>
  </TresMesh>
</template>
