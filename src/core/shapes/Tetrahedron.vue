<script setup lang="ts">
import { shallowRef, toRefs } from 'vue'
import type { TresColor } from '@tresjs/core'
import type { TetrahedronGeometry } from 'three'

export interface TetrahedronProps {
  /**
   * The radius and detail of the tetrahedron.
   * @default [1, 0]
   * @type {number[]}
   * @memberof TetrahedronProps
   * @see https://threejs.org/docs/#api/en/geometries/TetrahedronGeometry
   */
  args?: ConstructorParameters<typeof TetrahedronGeometry>
  /**
   * The color of the tetrahedron.
   * @default 0xffffff
   * @type {TresColor}
   * @memberof TetrahedronProps
   * @see https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
   */
  color?: TresColor
}

const props = withDefaults(defineProps<TetrahedronProps>(), { args: () => [1, 0], color: '#ffffff' })
const { args, color } = toRefs(props)
const tetrahedronRef = shallowRef()

defineExpose({
  instance: tetrahedronRef,
})
</script>

<template>
  <TresMesh
    ref="tetrahedronRef"
    :rotation="[-Math.PI / 2, 0, 0]"
    v-bind="$attrs"
  >
    <TresTetrahedronGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
