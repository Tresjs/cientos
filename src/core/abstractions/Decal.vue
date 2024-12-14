<script setup lang="ts">
import { computed, defineProps, onUnmounted, reactive, ref, shallowReactive, shallowRef, type ShallowRef, toRaw, toRefs, watch, watchEffect, withDefaults } from 'vue'
import type { Intersection, Texture } from 'three'
import { Color, Euler, MathUtils, Mesh, Vector3 } from 'three'
import { DecalGeometry } from 'three-stdlib'
import { useRenderLoop, useTresContext } from '@tresjs/core'
import { Box } from '../../index'
import { useControls } from '@tresjs/leches'

// TODO: meshLineRef prop Color
// TODO: Calculate the size of boxHelperRef, meshLineRef dynamically in relation to the size of the parent element of meshRef.

export interface DecalProps {
  debug?: boolean
  debugLineColor?: string
  depthTest?: boolean
  depthWrite?: boolean
  polygonOffsetFactor?: number
  map?: Texture | null
  mesh?: ShallowRef<Mesh | null>
  position?: number[]
  orientation?: number[]
  size?: number[]
  normal?: number[]
  order?: number
}

const props = withDefaults(defineProps<DecalProps>(), {
  debug: false,
  debugLineColor: '#0000ff',
  depthTest: true,
  depthWrite: false,
  polygonOffsetFactor: -10,
  map: null,
  mesh: () => shallowRef(null),
  position: () => [-9999, -9999, -9999],
  orientation: () => [0, 0, 0],
  size: () => [1, 1, 1],
  normal: () => [0, 0, 0],
  order: () => Math.round(Math.random() * 100),
})

const { debug, depthTest, depthWrite, polygonOffsetFactor, mesh, map, position, orientation, size, normal, order, debugLineColor } = toRefs(props)

const orbitControlsStarted = ref<boolean>(false)
const onDraggingOrbitControls = ref<boolean>(false)
const sizeControls = ref<object>({})
const orientationControls = ref<object>({})

const decalPosition = reactive<Vector3>(new Vector3(...position.value))
const decalOrientation = reactive<Euler>(new Euler(...orientation.value))
const decalSize = reactive<Vector3>(new Vector3(...size.value))
const decalNormal = reactive<Vector3>(new Vector3(...normal.value))
const orientationSave = reactive<Euler>(new Euler())

const meshRef = shallowRef<Mesh | null>(null)
const meshLineRef = shallowRef<Mesh | null>(null)
const boxHelperRef = shallowRef<Mesh | null>(null)
const currentIntersect = shallowReactive<Intersection | {}>({})
const decalIntersect = shallowReactive<Intersection | {}>({})

const currentIntersectIsEmpty = computed(() => Object.keys(currentIntersect).length === 0)
const decalIntersectIsEmpty = computed(() => Object.keys(decalIntersect).length === 0)
const meshLineColor = computed(() => new Color(debugLineColor.value))

const { onLoop } = useRenderLoop()
const { raycaster, controls } = useTresContext()

const exportDecal = () => {
  if (decalIntersectIsEmpty.value) { return }

  const datas = {
    position: [...toRaw(decalPosition)],
    orientation: [...toRaw(decalOrientation)].slice(0, -1), // delete the EulerOrder
    size: [...toRaw(decalSize)],
    normal: [...decalIntersect.face.normal],
  }

  console.log('↓ —— OBJECT TO COPY —— ↓', datas, '↑ —— OBJECT TO COPY —— ↑')
}

if (debug.value) {
  const { size, orientation } = useControls({
    size: {
      label: 'Size',
      value: decalSize,
      visible: false,
      step: 0.1,
    },
    orientation: {
      label: 'Orientation',
      visible: false,
      value: 0,
      min: -360, // in degrees
      max: 360, // in degrees
      step: 1,
    },
    btn: {
      label: 'Export Decal',
      type: 'button',
      onClick: exportDecal,
      size: 'sm',
    },
  })

  sizeControls.value = size.value
  orientationControls.value = orientation.value
}

watchEffect(() => {
  if (!meshRef?.value) { return }

  const parent = mesh?.value || meshRef.value.parent

  if (!(parent instanceof Mesh)) {
    throw new TypeError('A Mesh parent is required for the decal or the "mesh" prop must be set.')
  }

  if (map.value) {
    meshRef.value.material.map = map.value
  }

  if (decalIntersectIsEmpty.value) {
    makeGeometry()
  }
})

watch([sizeControls.value, orientationControls.value], () => {
  makeGeometryDebugMode()
})

watch(meshLineRef, () => {
  if (!meshLineRef.value) { return }

  meshLineRef.value.geometry.setFromPoints([new Vector3(), new Vector3()])
})

watch(decalIntersectIsEmpty, () => {
  sizeControls.value.visible = !decalIntersectIsEmpty.value
  orientationControls.value.visible = !decalIntersectIsEmpty.value
})

watch(controls, () => {
  if (!controls.value || !debug.value) { return }

  controls.value.addEventListener('start', onStartOrbitControls)
  controls.value.addEventListener('end', onEndOrbitControls)
  controls.value.addEventListener('change', onChangeOrbitControls)
  controls.value.enableDamping = !debug.value // Very important in debug mode
  controls.value.autoRotate = !debug.value // Very important in debug mode
})

onUnmounted(() => {
  controls?.value?.removeEventListener('start', onStartOrbitControls)
  controls?.value?.removeEventListener('end', onEndOrbitControls)
  controls?.value?.removeEventListener('change', onChangeOrbitControls)

  meshRef?.value?.geometry?.dispose()
  meshLineRef?.value?.geometry?.dispose()
  boxHelperRef?.value?.value?.geometry?.dispose()
  map?.value?.dispose()
})

onLoop(({ delta, elapsed, clock }) => {
  if (!meshLineRef.value || !meshRef.value || !boxHelperRef?.value?.value || !debug.value || !controls.value) { return }

  const parent = mesh?.value || meshRef.value.parent

  if (!parent) { return }

  const intersects = raycaster.value.intersectObject(parent, false)

  if (intersects.length > 0) {
    const { point, face } = intersects[0]

    if (!face || !point) { return }

    Object.assign(currentIntersect, intersects[0])

    const { depth } = boxHelperRef.value.value.geometry.parameters

    const parentMatrixWorld = parent.matrixWorld.clone().invert()
    const p = point.clone().applyMatrix4(parentMatrixWorld)

    boxHelperRef.value.value.position.copy(p)

    const nLookAt = face.normal.clone()
    nLookAt.transformDirection(parent.matrixWorld)
    nLookAt.multiplyScalar(depth)
    nLookAt.add(point)

    const nLineHelper = face.normal.clone()
    nLineHelper.transformDirection(parent.matrixWorld)
    nLineHelper.multiplyScalar(depth)
    nLineHelper.add(point)
    nLineHelper.applyMatrix4(parentMatrixWorld)

    boxHelperRef.value.value.lookAt(nLookAt)

    const positions = meshLineRef.value.geometry.attributes.position
    positions.setXYZ(0, p.x, p.y, p.z)
    positions.setXYZ(1, nLineHelper.x, nLineHelper.y, nLineHelper.z)
    positions.needsUpdate = true
  }
  else {
    for (const key in currentIntersect) {
      if (Object.hasOwnProperty.call(currentIntersect, key)) {
        delete currentIntersect[key]
      }
    }
  }
})

const onStartOrbitControls = () => {
  if (currentIntersectIsEmpty.value && !debug.value) { return }

  orbitControlsStarted.value = true
}

const onEndOrbitControls = () => {
  if (!debug.value || !boxHelperRef.value?.value) { return }

  if (!onDraggingOrbitControls.value && !currentIntersectIsEmpty.value) {
    Object.assign(decalIntersect, currentIntersect)
    orientationSave.copy(boxHelperRef.value.value.rotation.clone())

    makeGeometryDebugMode()
  }

  orbitControlsStarted.value = false
  onDraggingOrbitControls.value = false
}

const onChangeOrbitControls = () => {
  if ((currentIntersectIsEmpty.value || !orbitControlsStarted.value) && !debug.value) { return }

  onDraggingOrbitControls.value = true
}

const makeGeometryDebugMode = () => {
  const parent = mesh?.value || meshRef.value?.parent
  const target = meshRef.value

  if (!parent || !target) { return }

  target.geometry?.dispose()

  parent?.updateMatrixWorld()

  const parentMatrixWorld = parent.matrixWorld.clone().invert()
  const normal = decalIntersect.face.normal.clone()
  const position = decalIntersect.point.clone()
  const size = sizeControls.value.value
  const orientation = orientationSave.clone()
  orientation.z -= MathUtils.degToRad(orientationControls.value.value)

  decalPosition.copy(position)
  decalOrientation.copy(orientation)
  decalSize.copy(size)

  target.position.copy(normal).multiplyScalar(0.01)
  target.geometry = new DecalGeometry(parent, decalPosition, decalOrientation, decalSize)
  target.geometry.applyMatrix4(parentMatrixWorld)
}

const makeGeometry = () => {
  const parent = mesh?.value || meshRef.value?.parent
  const target = meshRef.value

  if (!parent || !target) { return }

  target.geometry?.dispose()

  parent?.updateMatrixWorld()

  const parentMatrixWorld = parent.matrixWorld.clone().invert()

  target.position.copy(decalNormal).multiplyScalar(0.01)
  target.geometry = new DecalGeometry(parent, decalPosition, decalOrientation, decalSize)
  target.geometry.applyMatrix4(parentMatrixWorld)
}

defineExpose({
  value: meshRef,
})
</script>

<template>
  <TresMesh
    ref="meshRef"
    v-bind="$attrs"
    :render-order="order"
    material-transparent
    material-polygonOffset
    :material-polygonOffsetFactor="polygonOffsetFactor"
    :material-depthTest="depthTest"
    :material-depthWrite="depthWrite"
  >
    <slot></slot>
  </TresMesh>

  <TresLine v-if="debug" ref="meshLineRef" :visible="!!(!currentIntersectIsEmpty)">
    <TresBufferGeometry />
    <TresLineBasicMaterial :color="meshLineColor" />
  </TresLine>

  <Box v-if="debug" ref="boxHelperRef" :visible="false" :args="[.1, .1, 1]">
    <TresMeshNormalMaterial />
  </Box>
</template>
