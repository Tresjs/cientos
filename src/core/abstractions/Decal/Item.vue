<script setup lang="ts">
import { computed, defineProps, onUnmounted, reactive, ref, shallowReactive, shallowRef, type ShallowRef, toRaw, toRefs, watch, watchEffect, withDefaults } from 'vue'
import type { Mesh } from 'three'
import { Euler, Vector3 } from 'three'
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
  const { parent, normal, position, size, orientation, map } = properties.value
  const target = meshRef.value

  if (!parent || !target) { return }

  const decalNormal = new Vector3().fromArray(normal)
  const decalPosition = new Vector3(...position)

  const aspectRatio = map.aspectRatio

  const decalSize = new Vector3(...size)

  if (map.isPortrait) {
    decalSize.y = decalSize.x / map.aspectRatio
  }
  else {
    decalSize.x = decalSize.y * map.aspectRatio
  }

  decalSize.y = decalSize.x / aspectRatio

  const decalOrientation = new Euler(...orientation)

  target.position.copy(decalNormal).multiplyScalar(0.01)
  target.geometry = new DecalGeometry(parent, decalPosition, decalOrientation, decalSize)
}

watch(
  () => properties.value.orientation,
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
