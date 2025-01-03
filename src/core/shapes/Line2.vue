<script setup lang="ts">
import { normalizeColor, useTresContext } from '@tresjs/core'
import { Vector2, Vector3 } from 'three'
import { Line2 } from 'three/examples/jsm/lines/Line2'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { isReactive, onUnmounted, shallowRef, watch } from 'vue'
import type { TresColor } from '@tresjs/core'
import type { Color } from 'three'

type Point = Vector3 | Vector2 | [number, number, number] | [number, number]
type Points = (Point | number)[]
type VertexColors = Array<TresColor>

export interface LineProps {
  points: Points
  vertexColors?: VertexColors
  color?: TresColor
  lineWidth?: number
  worldUnits?: boolean
  alphaToCoverage?: boolean
  dashed?: boolean
  dashSize?: number
  gapSize?: number
  dashScale?: number
  dashOffset?: number
}

const props = withDefaults(defineProps<LineProps>(), {
  vertexColors: () => [],
  color: 'white',
  lineWidth: 1,
  worldUnits: false,
  alphaToCoverage: false,
  dashed: false,
  dashSize: 1,
  gapSize: 1,
  dashScale: 1,
  dashOffset: 0,
})

type PropsType = typeof props

function getInterpolatedVertexColors(vertexColors: VertexColors, numPoints: number): Color[] {
  if (!vertexColors || vertexColors.length === 0) {
    return Array.from({ length: numPoints }).fill(normalizeColor(props.color)) as Color[]
  }
  if (vertexColors.length === 1) {
    return Array.from({ length: numPoints }).fill(normalizeColor(vertexColors[0])) as Color[]
  }
  if (vertexColors.length === numPoints) {
    return vertexColors.map(normalizeColor)
  }

  const numSegments = numPoints - 1
  const mappedColors = vertexColors.map(normalizeColor)
  if (closed) { mappedColors.push(mappedColors[0].clone()) }

  const iColors: Color[] = [mappedColors[0]]
  const divisions = numSegments / (mappedColors.length - 1)
  for (let i = 1; i < numSegments; i++) {
    const alpha = (i % divisions) / divisions
    const colorIndex = Math.floor(i / divisions)
    iColors.push(mappedColors[colorIndex].clone().lerp(mappedColors[colorIndex + 1], alpha))
  }
  iColors.push(mappedColors[mappedColors.length - 1])

  return iColors
}

const line = new Line2(new LineGeometry(), new LineMaterial())
const { sizes, invalidate } = useTresContext()

function updateLineMaterial(line: Line2, props: PropsType) {
  const material = line.material
  material.color = normalizeColor(props.color)
  material.linewidth = props.lineWidth
  material.alphaToCoverage = props.alphaToCoverage
  material.worldUnits = props.worldUnits
  material.vertexColors = props.vertexColors.length > 0
  material.dashed = props.dashed
  material.dashScale = props.dashScale
  material.dashSize = props.dashSize
  material.dashOffset = props.dashOffset
  material.gapSize = props.gapSize
  material.needsUpdate = true
}

function updateLineGeometry(line: Line2, props: PropsType) {
  const points = props.points
  const vertexColors = props.vertexColors
  const pValues = points.map((p) => {
    if (p instanceof Vector3) {
      return [p.x, p.y, p.z]
    }
    else if (p instanceof Vector2) {
      return [p.x, p.y, 0]
    }
    else if (Array.isArray(p) && p.length === 2) {
      return [p[0], p[1], 0]
    }
    else {
      return p
    }
  }).flat()

  if (pValues.length > line.geometry.getAttribute('position').array.length) {
    // NOTE:
    // https://threejs.org/docs/?q=linegeom#examples/en/lines/LineGeometry
    // LineGeometry docs currently (11/2024) say that `setPositions` will
    // replace points, but the implementation does not appear to allow points
    // to be added. Points outside of the current `array.length` are not
    // drawn to screen. So ...
    const geo = line.geometry
    // Create a new Geometry.
    line.geometry = new LineGeometry()
    // Dispose old geometry.
    geo.dispose()
  }
  line.geometry.setPositions(pValues.flat())

  const colors = getInterpolatedVertexColors(vertexColors, pValues.length / 3).map(c => c.toArray()).flat()
  line.geometry.setColors(colors)

  line.computeLineDistances()
}

updateLineMaterial(line, props)
updateLineGeometry(line, props)
line.computeLineDistances()

watch(() => [
  props.color,
  props.lineWidth,
  props.alphaToCoverage,
  props.worldUnits,
  props.dashed,
  props.dashScale,
  props.dashSize,
  props.dashOffset,
], () => {
  updateLineMaterial(line, props)
  invalidate()
})

watch(() => [sizes.width.value, sizes.height.value], () => {
  line.material.resolution = new Vector2(sizes.width.value, sizes.height.value)
  invalidate()
})

if (isReactive(props.vertexColors)) {
  watch(props.vertexColors, () => {
    updateLineMaterial(line, props)
    updateLineGeometry(line, props)
    invalidate()
  })
}

if (isReactive(props.points)) {
  watch(props.points, () => {
    updateLineGeometry(line, props)
    invalidate()
  })
}

onUnmounted(() => {
  line.geometry.dispose()
  line.material.dispose()
})

const lineRef = shallowRef()
defineExpose({ instance: lineRef })
</script>

<template>
  <primitive
    ref="lineRef"
    :object="line"
  />
</template>
