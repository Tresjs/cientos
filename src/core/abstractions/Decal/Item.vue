<script setup lang="ts">
import { defineProps, onUnmounted, shallowRef, toRefs, watch, withDefaults } from 'vue'
import type { Mesh } from 'three'
import { MathUtils } from 'three'
import { DecalGeometry } from 'three-stdlib'

export interface DecalProps {
  properties: object
  depthTest?: boolean
  depthWrite?: boolean
  polygonOffsetFactor?: number
  order?: number
}

const props = withDefaults(defineProps<DecalProps>(), {
  properties: () => {},
  depthTest: true,
  depthWrite: false,
  polygonOffsetFactor: -10,
  order: () => Math.round(Math.random() * 100),
})

const { properties, depthTest, depthWrite, polygonOffsetFactor, order } = toRefs(props)

const meshRef = shallowRef<Mesh | null>(null)

defineExpose({
  instance: meshRef,
})

const makeGeometry = () => {
  const { parent, normal, position, size, orientation, map, scale, orientationZ } = properties.value
  const target = meshRef.value

  if (!parent || !target) { return }

  const decalNormal = normal.clone()
  const decalPosition = position.clone()

  const aspectRatio = map.aspectRatio

  const decalSize = size.clone()

  if (map.isPortrait) {
    decalSize.y = decalSize.x / map.aspectRatio
  }
  else {
    decalSize.x = decalSize.y * map.aspectRatio
  }

  decalSize.y = decalSize.x / aspectRatio
  decalSize.multiplyScalar(scale)

  const decalOrientation = orientation.clone()
  decalOrientation.z = decalOrientation.z + MathUtils.degToRad(orientationZ)

  target.position.copy(decalNormal).multiplyScalar(0.001)
  target.geometry = new DecalGeometry(parent, decalPosition, decalOrientation, decalSize)
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
    :name="`decal-item decal-${properties.index}`"
  >
    <slot></slot>
  </TresMesh>
</template>
