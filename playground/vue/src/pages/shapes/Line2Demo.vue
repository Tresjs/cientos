<script setup lang="ts">
import { Line2, OrbitControls } from '@tresjs/cientos'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { Vector3 } from 'three'
import { ref } from 'vue'

const POINTS = Array.from({ length: 256 * 3 }).fill(0).map((_, i) => {
  const ii = Math.floor(i / 3)
  if (i % 3 === 0) { return Math.cos(ii * 2 * Math.PI / 256) }
  if (i % 3 === 2) { return Math.sin(ii * 2 * Math.PI / 256) }
  return 0
})

const pointsVariableLengthRef = ref([1, 1, 1, 0, 0, 0])

const pointsFlatArrayRef = ref(Array.from({ length: 300 * 3 * 6 }).fill(0).map((_, i) => {
  const ii = Math.floor(i / 3)
  if (i % 3 === 0) { return Math.cos(ii * 0.01) }
  if (i % 3 === 1) { return ii * 0.001 }
  return Math.sin(ii * 0.01)
}) as number[] | [number, number, number][])

const points2DArrayRef = ref(Array.from({ length: 300 * 6 }).fill(0).map((_, i) => {
  return [
    Math.cos(i * 0.01),
    i * 0.001,
    Math.sin(i * 0.01),
  ]
}) as [number, number, number][])

const pointsVector3Ref = ref(Array.from({ length: 300 * 6 }).fill(0).map((_, i) =>
  new Vector3(
    Math.cos(i * 0.01),
    i * 0.001,
    Math.sin(i * 0.01),
  ),
) as Vector3[] | [number, number, number][])

const pointsDefault2DArray = (Array.from({ length: 10 }).fill(0).map((_, i) => [i * 0.1, 0, 0])) as [number, number, number][]

const pointsFlatArrayReactive = reactive(Array.from({ length: 300 * 3 * 6 }).fill(0).map((_, i) => {
  const ii = Math.floor(i / 3)
  if (i % 3 === 0) { return Math.cos(ii * 0.01) }
  if (i % 3 === 1) { return ii * 0.001 }
  return Math.sin(ii * 0.01)
}))
const pointsFlatArray = shallowRef(pointsFlatArrayReactive as number[] | [number, number, number][])

const points2DArrayReactive = reactive(Array.from({ length: 300 * 6 }).fill(0).map((_, i) => {
  return [
    Math.cos(i * 0.01),
    i * 0.001,
    Math.sin(i * 0.01),
  ]
}) as [number, number, number][])
const points2DArray = shallowRef(points2DArrayReactive as [number, number, number][])

const pointsVec3Reactive = reactive(Array.from({ length: 300 * 6 }).fill(0).map((_, i) =>
  new Vector3(
    Math.cos(i * 0.01),
    i * 0.001,
    Math.sin(i * 0.01),
  ),
))
const pointsVec3 = shallowRef(pointsVec3Reactive as Vector3[] | [number, number, number][])

const colors = reactive([
  [1.0, 0.0, 0.0],
  [0.9, 0.1, 0.0],
  [0.8, 0.2, 0.0],
  [0.7, 0.3, 0.0],
  [0.6, 0.4, 0.0],
  [0.5, 0.5, 0.0],
  [0.4, 0.6, 0.0],
  [0.3, 0.7, 0.0],
  [0.2, 0.8, 0.0],
  [0.1, 0.9, 0.0],
  [0.0, 1.0, 0.0],
  [0.0, 0.9, 0.1],
  [0.0, 0.8, 0.2],
  [0.0, 0.7, 0.3],
  [0.0, 0.6, 0.4],
  [0.0, 0.5, 0.5],
  [0.0, 0.4, 0.6],
  [0.0, 0.3, 0.7],
  [0.0, 0.2, 0.8],
  [0.0, 0.1, 0.9],
  [0.0, 0.0, 1.0],
  [0.1, 0.0, 0.9],
  [0.2, 0.0, 0.8],
  [0.3, 0.0, 0.7],
  [0.4, 0.0, 0.6],
  [0.5, 0.0, 0.5],
  [0.6, 0.0, 0.4],
  [0.7, 0.0, 0.3],
  [0.8, 0.0, 0.2],
  [0.9, 0.0, 0.1],
] as [number, number, number][])

const lineWidth = ref(5)
const dashed = ref(true)
const dashScale = ref(50)

useRenderLoop().onLoop(({ elapsed }) => {
  const c = colors.pop() as [number, number, number]
  colors.unshift(c)

  dashed.value = Math.sin(elapsed * 0.5) < 0
  dashScale.value = 5 + 5 * Math.sin(elapsed)
  lineWidth.value = 0.1 * (Math.sin(elapsed) + 1) + 0.1

  const r = Math.abs(Math.sin(elapsed))

  const len = Math.abs(Math.ceil(Math.sin(elapsed) * (POINTS.length / 3))) * 3
  pointsVariableLengthRef.value.length = Math.max(3, len)
  for (let i = 0; i < pointsVariableLengthRef.value.length; i++) {
    pointsVariableLengthRef.value[i] = POINTS[i]
  }

  for (let i = 0; i < pointsFlatArrayRef.value.length; i += 3) {
    const ii = Math.floor(i / 3)
    pointsFlatArrayRef.value[i] = Math.cos(ii * 0.01) * r
    pointsFlatArrayRef.value[i + 2] = Math.sin(ii * 0.01) * r
  }

  for (let i = 0; i < points2DArrayRef.value.length; i++) {
    points2DArrayRef.value[i][0] = Math.cos(i * 0.01) * r
    points2DArrayRef.value[i][2] = Math.sin(i * 0.01) * r
  }

  for (let i = 0; i < pointsVector3Ref.value.length; i++) {
    (pointsVector3Ref.value[i] as Vector3).x = Math.cos(i * 0.01) * r;
    (pointsVector3Ref.value[i] as Vector3).z = Math.sin(i * 0.01) * r
  }

  for (let i = 0; i < pointsFlatArrayReactive.length; i += 3) {
    const ii = Math.floor(i / 3)
    pointsFlatArrayReactive[i] = Math.cos(ii * 0.01) * r
    pointsFlatArrayReactive[i + 2] = Math.sin(ii * 0.01) * r
  }

  for (let i = 0; i < points2DArrayReactive.length; i++) {
    points2DArrayReactive[i][0] = Math.cos(i * 0.01) * r
    points2DArrayReactive[i][2] = Math.sin(i * 0.01) * r
  }

  for (let i = 0; i < pointsVec3Reactive.length; i++) {
    pointsVec3Reactive[i].x = Math.cos(i * 0.01) * r
    pointsVec3Reactive[i].z = Math.sin(i * 0.01) * r
  }

  pointsFlatArray.value = Math.sin(elapsed) > 0 ? pointsDefault2DArray : pointsFlatArrayReactive
  points2DArray.value = Math.sin(elapsed) > 0 ? pointsDefault2DArray : points2DArrayReactive
  pointsVec3.value = Math.sin(elapsed) > 0 ? pointsDefault2DArray : pointsVec3Reactive
})
</script>

<template>
  <TresCanvas clear-color="#777">
    <Line2
      name="circle-variable-length"
      :scale="5"
      :points="pointsVariableLengthRef"
      :world-units="true"
      :line-width="lineWidth"
    />

    <Line2
      name="squiggle-white-flat-array"
      :position-x="-2"
      :position-z="-2"
      :points="pointsFlatArrayRef"
      :world-units="true"
      :line-width="lineWidth"
      :dashed="dashed"
      :dash-scale="dashScale"
    />
    <Line2
      name="squiggle-white-2d-array"
      :position-x="-2"
      :points="points2DArrayRef"
      :world-units="true"
      :line-width="lineWidth"
      :dashed="dashed"
      :dash-scale="dashScale"
    />
    <Line2
      name="squiggle-white-vec3-array"
      :position-x="-2"
      :position-z="2"
      :points="pointsVector3Ref"
      :world-units="true"
      :line-width="lineWidth"
      :dashed="dashed"
      :dash-scale="dashScale"
    />

    <Line2
      name="squiggle-vertex-colors-flat-array-flat-array"
      :position-z="-2"
      :points="pointsFlatArray"
      :vertex-colors="colors"
      :world-units="true"
      :line-width="lineWidth"
      :dashed="dashed"
      :dash-scale="dashScale"
    />
    <Line2
      name="squiggle-vertex-colors-2d-array-2d-array"
      :points="points2DArray"
      :vertex-colors="colors"
      :world-units="true"
      :line-width="lineWidth"
      :dashed="dashed"
      :dash-scale="dashScale"
    />
    <Line2
      name="squiggle-vertex-colors-2d-array-vec3-array"
      :position-z="2"
      :points="pointsVec3"
      :vertex-colors="colors"
      :world-units="true"
      :line-width="lineWidth"
      :dashed="dashed"
      :dash-scale="dashScale"
    />

    <Line2
      name="squiggle-white-2d-array-flat-array"
      :position-x="2"
      :position-z="-2"
      :points="pointsFlatArray"
      :world-units="true"
      :line-width="lineWidth"
      :dashed="dashed"
      :dash-scale="dashScale"
    />
    <Line2
      name="squiggle-white-2d-array-2d-array"
      :position-x="2"
      :points="points2DArray"
      :world-units="true"
      :line-width="lineWidth"
      :dashed="dashed"
      :dash-scale="dashScale"
    />
    <Line2
      name="squiggle-white-2d-array-vec3-array"
      :position-x="2"
      :position-z="2"
      :points="pointsVec3"
      :world-units="true"
      :line-width="lineWidth"
      :dashed="dashed"
      :dash-scale="dashScale"
    />
    <TresGridHelper />
    <OrbitControls />
  </TresCanvas>
</template>
