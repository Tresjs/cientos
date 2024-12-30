<script setup lang="ts">
import { defineProps, onUnmounted, shallowRef, toRefs, watch, withDefaults } from 'vue'
import type { Mesh } from 'three'
import { MathUtils } from 'three'
import { DecalGeometry } from 'three-stdlib'
import type { CustomTexture, Decal } from './types'

export interface DecalProps {
  properties: Decal
  depthTest?: boolean
  depthWrite?: boolean
  polygonOffsetFactor?: number
  order?: number
}

const props = withDefaults(defineProps<DecalProps>(), {
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

  const aspectRatio = (map as CustomTexture).aspectRatio ?? 1

  const decalSize = size.clone()

  if ((map as CustomTexture).isPortrait) {
    decalSize.y = decalSize.x / ((map as CustomTexture).aspectRatio ?? 1)
  }
  else {
    decalSize.x = decalSize.y * ((map as CustomTexture).aspectRatio ?? 1)
  }

  decalSize.y = decalSize.x / aspectRatio
  decalSize.multiplyScalar(scale)

  const decalOrientation = orientation.clone()
  decalOrientation.z = decalOrientation.z + MathUtils.degToRad(orientationZ)

  target.position.copy(decalNormal).multiplyScalar(0.001)
  target.geometry = new DecalGeometry(parent as Mesh, decalPosition, decalOrientation, decalSize)
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
