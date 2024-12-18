<script setup lang="ts">
import { computed, defineProps, nextTick, onUnmounted, provide, reactive, ref, shallowReactive, shallowRef, type ShallowRef, toRaw, toRefs, watch, watchEffect, withDefaults } from 'vue'
import type { Intersection, Texture } from 'three'
import { Color, Euler, MathUtils, Mesh, SRGBColorSpace, Vector3 } from 'three'
import { DecalGeometry } from 'three-stdlib'
import { useRenderLoop, useTexture, useTresContext } from '@tresjs/core'
import { Box } from '../../index'
import Item from './Item.vue'
import { useControls } from '@tresjs/leches'

// TODO: meshLineRef prop Color
// TODO: Calculate the size of boxHelperRef, meshLineRef dynamically in relation to the size of the parent element of meshRef.

export interface DecalProps {
  debug?: boolean
  debugLineColor?: string
  depthTest?: boolean
  depthWrite?: boolean
  polygonOffsetFactor?: number
  map?: string[] | null
  mesh?: ShallowRef<Mesh | null>
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
  order: () => Math.round(Math.random() * 100),
})

const { debug, depthTest, depthWrite, polygonOffsetFactor, mesh, map, order, debugLineColor } = toRefs(props)

const controlsInMoved = ref<boolean>(false)

const decalDebugPosition = reactive<Vector3>(new Vector3(0, 0, 0))
const decalDebugOrientationZ = ref<number>(0)
const decalDebugSizes = reactive<Vector3>(new Vector3(1, 1, 1))
const decalDebugScale = ref<number>(1)

const meshRef = shallowRef<Mesh | null>(null)
const meshRefDebug = shallowRef<Mesh | null>(null)
const meshLineRef = shallowRef<Mesh | null>(null)
const boxHelperRef = shallowRef<Mesh | null>(null)
const boxHelperCurrentRef = shallowRef<Mesh | null>(null)
const currentIntersect = shallowReactive<Intersection | {}>({})
const nodesDecalRefs = ref([])
const decalItemsRef = ref([])

const currentIntersectIsEmpty = computed(() => Object.keys(currentIntersect).length === 0)
const meshLineColor = computed(() => new Color(debugLineColor.value))

const { onLoop } = useRenderLoop()
const { raycaster, controls } = useTresContext()

defineExpose({
  instance: meshRef,
})

const texture = await useTexture(map.value)

const textureMap = computed(() => {
  return texture.reduce((acc, texture) => {
    const src = texture.image?.src || ''
    const fileName = src.split('/').pop()?.split('.')[0] || 'unknown'

    texture.flipY = true
    texture.colorSpace = SRGBColorSpace
    texture.aspectRatio = texture.image.width / texture.image.height
    texture.isPortrait = texture.image.height > texture.image.width
    texture.needsUpdate = true

    acc[fileName] = texture
    return acc
  }, {})
})

const onClear = () => {
  nodesDecalRefs.value = []

  decalSelected.value.value = 'none'
  decalSelected.value.options = computedNodesDecal.value

  sizeControls.value.visible = false
  orientationZControls.value.visible = false

  boxHelperCurrentRef.value.visible = false
}

const currentNodesDecalRefs = computed(() => {
  return nodesDecalRefs.value.find((node, index) => `decal-${index}` === decalSelected.value.value) || null
})

const computedNodesDecal = computed(() => {
  return [
    { text: 'none', value: 'none' },
    ...nodesDecalRefs.value.map((_, index) => ({
      text: `decal-${index}`,
      value: `decal-${index}`,
    })),
  ]
})

const { sizeControls, orientationZControls, keyTextureSelected, decalSelected, clearBtn } = useControls({

  keyTextureSelected: {
    options: Object.keys(textureMap.value).map((key, index) => ({
      text: key,
      value: key,
    })),
    value: Object.keys(textureMap.value)[0],
  },
  decalSelected: {
    options: computedNodesDecal.value,
    value: 'none',
  },
  sizeControls: {
    label: 'Size',
    value: decalDebugSizes.clone(),
    visible: false,
    step: 0.001,
  },
  orientationZControls: {
    label: 'Orientation Z',
    visible: false,
    value: decalDebugOrientationZ.value,
    min: -360, // in degrees
    max: 360, // in degrees
    step: 1,
  },
  clearBtn: {
    label: 'Clear Decals',
    type: 'button',
    onClick: onClear,
    size: 'sm',
  },
})

watchEffect(() => {
  if (!meshRef?.value) { return }

  const parent = mesh?.value || meshRef.value.parent

  if (!(parent instanceof Mesh)) {
    throw new TypeError('A Mesh parent is required for the decal or the "mesh" prop must be set.')
  }
})

watch(meshLineRef, () => {
  if (!meshLineRef.value) { return }

  meshLineRef.value.geometry.setFromPoints([new Vector3(), new Vector3()])
})

const makeGeometryDebugMode = () => {
  if (currentIntersectIsEmpty.value) { return }

  const parent = mesh?.value || meshRefDebug.value?.parent
  const target = meshRefDebug.value

  if (!parent || !target) { return }

  target.geometry?.dispose()

  parent.updateMatrixWorld()
  const parentMatrixWorld = parent.matrixWorld.clone().invert()
  const { face: { normal: intersectNormal }, point: intersectPosition } = currentIntersect

  const localDecalPosition = intersectPosition.clone()
  decalDebugPosition.copy(localDecalPosition)

  const aspectRatio = textureMap.value[keyTextureSelected.value.value].aspectRatio
  const localDecalSize = decalDebugSizes.clone()

  const selectedTexture = textureMap.value[keyTextureSelected.value.value]

  if (selectedTexture.isPortrait) {
    localDecalSize.y = localDecalSize.x / selectedTexture.aspectRatio
  }
  else {
    localDecalSize.x = localDecalSize.y * selectedTexture.aspectRatio
  }

  localDecalSize.y = localDecalSize.x / aspectRatio

  const localDecalOrientation = boxHelperRef.value.instance.rotation.clone()

  target.position.copy(intersectNormal).multiplyScalar(0.01)
  target.geometry = new DecalGeometry(parent, localDecalPosition, localDecalOrientation, localDecalSize)
  target.geometry.applyMatrix4(parentMatrixWorld)
}

onLoop(({ delta, elapsed, clock }) => {
  if (!meshLineRef.value || !meshRefDebug.value || !boxHelperRef?.value?.instance || !debug.value) { return }

  const parent = mesh?.value || meshRefDebug.value.parent

  if (!parent) { return }

  const intersects = raycaster.value.intersectObject(parent, false)

  if (intersects.length > 0) {
    const { point, face } = intersects[0]

    if (!face || !point) { return }

    Object.assign(currentIntersect, intersects[0])

    const { depth } = boxHelperRef.value.instance.geometry.parameters

    const parentMatrixWorld = parent.matrixWorld.clone().invert()
    const p = point.clone().applyMatrix4(parentMatrixWorld)

    boxHelperRef.value.instance.position.copy(p)

    const nLookAt = face.normal.clone()
    nLookAt.transformDirection(parent.matrixWorld)
    nLookAt.multiplyScalar(depth)
    nLookAt.add(point)

    const nLineHelper = face.normal.clone()
    nLineHelper.transformDirection(parent.matrixWorld)
    nLineHelper.multiplyScalar(depth)
    nLineHelper.add(point)
    nLineHelper.applyMatrix4(parentMatrixWorld)

    boxHelperRef.value.instance.lookAt(nLookAt)

    const positions = meshLineRef.value.geometry.attributes.position
    positions.setXYZ(0, p.x, p.y, p.z)
    positions.setXYZ(1, nLineHelper.x, nLineHelper.y, nLineHelper.z)
    positions.needsUpdate = true

    makeGeometryDebugMode()
  }
  else {
    for (const key in currentIntersect) {
      if (Object.hasOwnProperty.call(currentIntersect, key)) {
        delete currentIntersect[key]
      }
    }
  }
})

const onChangeOrbitControls = () => {
  controlsInMoved.value = true
}

const onPointerDown = () => {
  controlsInMoved.value = false
}

const printDecal = async () => {
  if (!currentIntersect || !meshRefDebug.value) { return }

  const { rotation } = boxHelperRef.value.instance
  const selectedMap = textureMap.value[keyTextureSelected.value.value]
  const { face: { normal: intersectNormal }, point } = currentIntersect

  const uid = `decal-${nodesDecalRefs.value.length}`

  const decalData = {
    position: point.toArray(),
    orientation: rotation.toArray(),
    size: decalDebugSizes.clone().toArray(),
    normal: intersectNormal.clone().toArray(),
    parent: meshRefDebug.value.parent,
    map: selectedMap,
    uid,
  }

  nodesDecalRefs.value.push(decalData)

  await nextTick()

  decalSelected.value.options = computedNodesDecal.value
  decalSelected.value.value = uid

  sizeControls.value.value = decalDebugSizes
  orientationZControls.value.value = 0

  const test = decalItemsRef.value[uid]

  boxHelperCurrentRef.value.setFromObject(test.instance)
  boxHelperCurrentRef.value.update()
}

const onPointerUp = () => {
  if (currentIntersectIsEmpty.value) { return }

  if (!controlsInMoved.value) {
    printDecal()
  }
}

const decalSelectedIsNone = computed(() => decalSelected.value.value === 'none')

watch(() => decalSelected.value.value, async (newVal) => {
  if (decalSelectedIsNone.value) {
    sizeControls.value.visible = false
    orientationZControls.value.visible = false

    boxHelperCurrentRef.value.visible = false
  }
  else {
    boxHelperCurrentRef.value.visible = true

    sizeControls.value.visible = true
    orientationZControls.value.visible = true

    sizeControls.value.value = new Vector3().fromArray(currentNodesDecalRefs.value.size)
    orientationZControls.value.value = MathUtils.radToDeg(currentNodesDecalRefs.value.orientation[2])

    await nextTick()

    const test = decalItemsRef.value[newVal]

    boxHelperCurrentRef.value.setFromObject(test.instance)
    boxHelperCurrentRef.value.update()
  }
})

watch([sizeControls.value, orientationZControls.value], () => {
  if (!nodesDecalRefs.value.length || decalSelectedIsNone.value || !currentNodesDecalRefs.value || !boxHelperCurrentRef.value) { return }

  const size = sizeControls.value.value
  const orientation = new Vector3().fromArray(currentNodesDecalRefs.value.orientation)
  const orientationZ = orientationZControls.value.value
  orientation.z = MathUtils.degToRad(orientationZ)

  const sizeArr = size.toArray()
  const orientationArr = orientation.toArray()

  currentNodesDecalRefs.value.size = sizeArr
  currentNodesDecalRefs.value.orientation = orientationArr

  boxHelperCurrentRef.value.update()
})

watch(controls, () => {
  if (!controls.value) { return }

  controls.value.addEventListener('change', onChangeOrbitControls)
  controls.value.enableDamping = !debug.value // Very important in debug mode
  controls.value.autoRotate = !debug.value // Very important in debug mode
}, { immediate: true })

window.addEventListener('pointerdown', onPointerDown)
window.addEventListener('pointerup', onPointerUp)

onUnmounted(() => {
  window.removeEventListener('pointerdown', onPointerDown)
  window.removeEventListener('pointerup', onPointerUp)
  controls?.value?.removeEventListener('change', onChangeOrbitControls)

  meshRef?.value?.geometry?.dispose()
  meshLineRef?.value?.geometry?.dispose()
  boxHelperRef?.value?.instance?.geometry?.dispose()
})
</script>

<template>
  <TresMesh
    ref="meshRefDebug"
    material-transparent
    material-polygonOffset
    :render-order="2"
    :material-polygonOffsetFactor="polygonOffsetFactor"
    :material-depthTest="depthTest"
    :material-depthWrite="depthWrite"
    :material-opacity=".5"
    :material-map="textureMap[keyTextureSelected.value]"
    name="debugDecal"
    :visible="!!(!currentIntersectIsEmpty)"
  >
    <slot></slot>
  </TresMesh>

  <Item
    v-for="(item, index) in nodesDecalRefs"
    :key="`nodes-decal-${index}`"
    :ref="
      (el) => {
        decalItemsRef[item.uid] = el
      }
    "
    :properties="{ ...item, index }"
  >
    <slot></slot>
  </Item>

  <TresLine v-if="debug" ref="meshLineRef" name="debugLine" :visible="!!(!currentIntersectIsEmpty)">
    <TresBufferGeometry />
    <TresLineBasicMaterial :color="meshLineColor" />
  </TresLine>

  <Box
    v-if="debug"
    ref="boxHelperRef"
    name="debugBox"
    :visible="!!(!currentIntersectIsEmpty)"
    :args="[.1, .1, 1]"
  >
    <TresMeshNormalMaterial />
  </Box>

  <TresBoxHelper v-if="debug" ref="boxHelperCurrentRef" :material-depthTest="false" />
</template>
