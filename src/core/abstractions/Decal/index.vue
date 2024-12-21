<!-- eslint-disable ts/no-use-before-define -->

<script setup lang="ts">
import { computed, defineProps, nextTick, onUnmounted, provide, reactive, ref, shallowReactive, shallowRef, type ShallowRef, toRaw, toRefs, watch, watchEffect, withDefaults } from 'vue'
import type { BoxHelper, Group, Intersection, Texture } from 'three'
import { Color, Euler, MathUtils, Mesh, SRGBColorSpace, Vector3 } from 'three'
import { DecalGeometry } from 'three-stdlib'
import { useRenderLoop, useTexture, useTresContext } from '@tresjs/core'
import { Box } from '../../index'
import Item from './Item.vue'
import { useControls } from '@tresjs/leches'
import { useClipboard } from '@vueuse/core'

export interface DecalProps {
  debug?: boolean
  data?: any[]
  debugLineColor?: string
  depthTest?: boolean
  depthWrite?: boolean
  scale?: number
  polygonOffsetFactor?: number
  map?: string[] | null
  mesh?: ShallowRef<Mesh | null>
}

const props = withDefaults(defineProps<DecalProps>(), {
  debug: false,
  data: () => [],
  debugLineColor: '#0000ff',
  depthTest: true,
  depthWrite: false,
  scale: 1,
  polygonOffsetFactor: -10,
  map: null,
  mesh: () => shallowRef(null),
})

const { debug, data, depthTest, depthWrite, polygonOffsetFactor, mesh, map, debugLineColor, scale } = toRefs(props)

const controlsInMoved = ref<boolean>(false)
const intersectIsEmpty = ref<boolean>(true)

const decalDebugPosition = reactive<Vector3>(new Vector3(0, 0, 0))
const decalDebugOrientationZ = ref<number>(0)
const decalDebugSizes = reactive<Vector3>(new Vector3(1, 1, 1))
const decalDebugScale = ref<number>(scale.value)
const textureMap = ref<{ [key: string]: Texture }>({})

const meshRef = shallowRef<Mesh | null>(null)
const meshRefDebug = shallowRef<Mesh | null>(null)
const groupRef = shallowRef<Group | null>(null)
const meshLineRef = shallowRef<Mesh | null>(null)
const boxHelperRef = shallowRef<Mesh | null>(null)
const boxHelperCurrentRef = shallowRef<BoxHelper | null>(null)
const boxHelperSelectedRef = shallowRef<BoxHelper | null>(null)
const boxHelpersRef = shallowRef<Group | null>(null)
const currentIntersect = shallowReactive<Intersection>({} as Intersection)
const nodesDecalRefs = ref([])
const decalItemsRef = ref([])
const typeEdit = ref([{ text: 'scale', value: 'scale' }, { text: 'orientation', value: 'orientation' }, { text: 'position', value: 'position' }])

const currentIntersectIsEmpty = computed(() => Object.keys(currentIntersect).length === 0)
const meshLineColor = computed(() => new Color(debugLineColor.value))
const nodesDecalRefsIsEmpty = computed(() => nodesDecalRefs.value.length === 0)

const computedNodesDecal = computed(() => {
  return [
    { text: 'none', value: 'none' },
    ...nodesDecalRefs.value.map((_, index) => ({
      text: `decal-${index}`,
      value: `decal-${index}`,
    })),
  ]
})

const { onLoop } = useRenderLoop()
const { raycaster, controls } = useTresContext()
const { copy, isSupported } = useClipboard()

defineExpose({
  instance: meshRef,
})

const textures = await useTexture(map.value)

if (textures && textures.length) {
  const result: { [key: string]: Texture } = {}
  for (const tex of textures) {
    const src = tex.image?.src || ''
    const fileName = src.split('/').pop()?.split('.')[0] || 'unknown'

    tex.flipY = true
    tex.colorSpace = SRGBColorSpace
    tex.aspectRatio = tex.image.width / tex.image.height
    tex.isPortrait = tex.image.height > tex.image.width
    tex.needsUpdate = true

    result[fileName] = tex
  }
  textureMap.value = result
}

const importDecals = async (decalsArray: any[]) => {
  for (const decalData of decalsArray) {
    const { position, normal, size, orientation, orientationZ, scale, uid, textureFilename } = decalData

    const selectedMap = textureMap.value[textureFilename]

    if (!selectedMap) {
      console.warn(`Texture "${textureFilename}" introuvable dans textureMap.`)
      continue
    }

    const recreatedDecal = {
      position: new Vector3(...position),
      orientation: new Euler(...orientation),
      orientationZ,
      size: new Vector3(...size),
      scale,
      normal: new Vector3(...normal),
      parent: groupRef.value?.parent,
      map: selectedMap,
      uid,
    }

    nodesDecalRefs.value.push(recreatedDecal)
  }

  await nextTick()

  decalSelected.value.options = computedNodesDecal.value
  decalSelected.value.value = 'none'
}

const onClearDecals = () => {
  nodesDecalRefs.value = []
  decalSelected.value.value = 'none'
  decalSelected.value.options = computedNodesDecal.value
  scaleControls.value.visible = false
  orientationZControls.value.visible = false

  if (!boxHelperCurrentRef.value || !boxHelperSelectedRef.value) { return }

  boxHelperCurrentRef.value.visible = false
  boxHelperSelectedRef.value.visible = false
}

const onDeleteCurrentDecal = async () => {
  if (!boxHelperCurrentRef.value || !boxHelperSelectedRef.value) { return }

  const selectedUid = decalSelected.value.value

  if (selectedUid === 'none') {
    console.warn('No decal selected for deletion.')
    return
  }

  const indexToDelete = nodesDecalRefs.value.findIndex(node => node.uid === selectedUid)

  if (indexToDelete === -1) {
    console.warn(`Decal with UID ${selectedUid} not found.`)
    return
  }

  nodesDecalRefs.value.splice(indexToDelete, 1)

  await nextTick()

  if (nodesDecalRefs.value.length > 0) {
    decalSelected.value.value = 'none'

    updateControlsFromDecal(decalDebugScale.value, decalDebugOrientationZ.value)
  }
  else {
    decalSelected.value.value = 'none'
    scaleControls.value.visible = false
    orientationZControls.value.visible = false
    boxHelperCurrentRef.value.visible = false
    boxHelperSelectedRef.value.visible = false
    deleteBtn.value.visible = false
    exportBtn.value.visible = false
  }

  decalSelected.value.options = computedNodesDecal.value
}

const onExportDecals = async () => {
  const decalsArr = toRaw(nodesDecalRefs.value)

  const formattedDecals = decalsArr.map((item) => {
    const src = item.map.image?.src || ''
    const fileName = src.split('/').pop()?.split('.')[0]

    return {
      position: item.position.toArray(),
      normal: item.normal.toArray(),
      size: item.size.toArray(),
      orientation: item.orientation.toArray().slice(0, 3),
      orientationZ: item.orientationZ,
      scale: item.scale,
      uid: item.uid,
      textureFilename: fileName,
    }
  })

  const jsonString = JSON.stringify(formattedDecals, null, 2)

  if (isSupported) {
    try {
      await copy(jsonString)
      console.log('Data successfully copied to clipboard!')
    }
    catch (error) {
      console.error('Copy to clipboard fails :', error)
    }
  }
  else {
    console.error('Copying to the clipboard is not supported on this browser.')
  }

  return jsonString
}

const { scaleControls, orientationZControls, keyTextureSelected, decalSelected, clearBtn, deleteBtn, typeEditControls, exportBtn } = useControls({
  keyTextureSelected: {
    options: Object.keys(textureMap.value).map(key => ({
      text: key,
      value: key,
    })),
    value: Object.keys(textureMap.value)[0],
  },
  decalSelected: {
    options: computedNodesDecal.value,
    value: 'none',
  },
  typeEditControls: {
    label: 'Edit',
    options: typeEdit.value,
    value: typeEdit.value[0].value,
    visible: false,
  },
  scaleControls: {
    label: 'Scale',
    value: decalDebugScale.value,
    visible: false,
    min: 0.001,
    max: decalDebugScale.value * 10,
    step: 0.001,
  },
  orientationZControls: {
    label: 'Orientation Z',
    visible: false,
    value: decalDebugOrientationZ.value,
    min: -360, // in Degrees
    max: 360, // in Degrees
    step: 1,
  },
  deleteBtn: {
    label: 'Delete Decal',
    type: 'button',
    onClick: onDeleteCurrentDecal,
    visible: false,
    size: 'md',
  },
  exportBtn: {
    label: 'Export decals',
    type: 'button',
    onClick: onExportDecals,
    visible: false,
    size: 'md',
  },
  clearBtn: {
    label: 'Clear Decals',
    type: 'button',
    onClick: onClearDecals,
    size: 'md',
  },
})

clearBtn.value.visible = false
deleteBtn.value.visible = false
exportBtn.value.visible = false

const selectedTextureComputed = computed(() => {
  return textureMap.value[keyTextureSelected.value.value]
})

const currentNodesDecalRefs = computed(() => {
  return nodesDecalRefs.value.find((node, index) => `decal-${index}` === decalSelected.value.value) || null
})

const decalSelectedIsNone = computed(() => decalSelected.value.value === 'none')

const printDebugDecal = () => {
  if (currentIntersectIsEmpty.value || !boxHelperRef.value) { return }

  const parent = mesh?.value || groupRef.value?.parent
  const target = meshRefDebug.value

  if (!parent || !target) { return }

  target.geometry?.dispose()

  parent.updateMatrixWorld()
  const parentMatrixWorld = parent.matrixWorld.clone().invert()
  const { point: intersectPosition } = currentIntersect

  const localDecalPosition = intersectPosition.clone()
  decalDebugPosition.copy(localDecalPosition)

  const aspectRatio = selectedTextureComputed.value.aspectRatio
  const localDecalSize = decalDebugSizes.clone()

  const selectedTexture = selectedTextureComputed.value

  if (selectedTexture.isPortrait) {
    localDecalSize.y = localDecalSize.x / selectedTexture.aspectRatio
  }
  else {
    localDecalSize.x = localDecalSize.y * selectedTexture.aspectRatio
  }

  localDecalSize.y = localDecalSize.x / aspectRatio
  const scalar = typeEditControls.value.value === 'position'
    ? scaleControls.value.value
    : decalDebugScale.value
  localDecalSize.multiplyScalar(scalar)

  const localDecalOrientation = boxHelperRef.value.instance.rotation.clone()

  if (typeEditControls.value.value === 'position') {
    localDecalOrientation.z = localDecalOrientation.z + MathUtils.degToRad(orientationZControls.value.value)
  }

  target.geometry = new DecalGeometry(parent, localDecalPosition, localDecalOrientation, localDecalSize)
  target.geometry.applyMatrix4(parentMatrixWorld)

  updateBoxHelper(boxHelperCurrentRef, meshRefDebug.value)
}

const clearCurrentIntersect = () => {
  Object.keys(currentIntersect).forEach((key) => {
    delete currentIntersect[key]
  })
}

onLoop(() => {
  if (!debug.value) { return }

  if (
    !meshLineRef.value
    || !meshRefDebug.value
    || !boxHelperRef.value
  ) {
    return
  }

  const parent = mesh?.value || groupRef.value.parent

  if (!parent) { return }

  const intersects = raycaster.value.intersectObject(parent, false)

  if (!intersects.length) {
    if (!intersectIsEmpty.value) {
      intersectIsEmpty.value = true
      clearCurrentIntersect()
    }
    return
  }

  intersectIsEmpty.value = false
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
  nLineHelper.multiplyScalar(scale.value / 2)
  nLineHelper.add(point)
  nLineHelper.applyMatrix4(parentMatrixWorld)

  boxHelperRef.value.instance.lookAt(nLookAt)

  const positions = meshLineRef.value.geometry.attributes.position
  positions.setXYZ(0, p.x, p.y, p.z)
  positions.setXYZ(1, nLineHelper.x, nLineHelper.y, nLineHelper.z)
  positions.needsUpdate = true

  printDebugDecal()
})

const onChangeOrbitControls = () => {
  controlsInMoved.value = true
}

const onPointerDown = () => {
  controlsInMoved.value = false
}

function updateBoxHelper(helperRef, object) {
  if (!helperRef.value || !object) { return }

  helperRef.value.setFromObject(object)
  helperRef.value.update()
}

const updateControlsFromDecal = (scale, orientationZ) => {
  scaleControls.value.value = scale
  orientationZControls.value.value = orientationZ
}

const rePrintDecal = async () => {
  if (!meshRefDebug.value || !currentNodesDecalRefs.value) { return }

  const { face: { normal: intersectNormal }, point } = currentIntersect
  const orientation = boxHelperRef.value.instance.rotation.clone()

  currentNodesDecalRefs.value.position = point.clone()
  currentNodesDecalRefs.value.orientation = orientation.clone()
  currentNodesDecalRefs.value.normal = intersectNormal.clone()

  const orientationZ = orientationZControls.value.value
  orientation.z = MathUtils.degToRad(orientationZ)

  currentNodesDecalRefs.value.orientationZ = orientationZ

  const uid = currentNodesDecalRefs.value.uid

  decalSelected.value.options = computedNodesDecal.value
  decalSelected.value.value = uid

  const targetMesh = decalItemsRef.value[uid]
  typeEditControls.value.value = 'scale'

  await nextTick()

  updateBoxHelper(boxHelperSelectedRef, targetMesh.instance)
}

const printDecal = async () => {
  if (!currentIntersect || !groupRef.value) { return }

  const orientation = boxHelperRef.value.instance.rotation.clone()
  const selectedMap = selectedTextureComputed.value
  const { face: { normal: intersectNormal }, point } = currentIntersect

  const uid = `decal-${nodesDecalRefs.value.length}`

  const decalData = {
    position: point.clone(),
    orientation: orientation.clone(),
    orientationZ: decalDebugOrientationZ.value,
    size: decalDebugSizes.clone(),
    scale: scaleControls.value.value,
    normal: intersectNormal.clone(),
    parent: groupRef.value.parent,
    map: selectedMap,
    uid,
  }

  nodesDecalRefs.value.push(decalData)

  await nextTick()

  updateControlsFromDecal(decalDebugScale.value, decalDebugOrientationZ.value)

  decalSelected.value.options = computedNodesDecal.value
  decalSelected.value.value = uid

  const targetMesh = decalItemsRef.value[uid]

  updateBoxHelper(boxHelperSelectedRef, targetMesh.instance)
}

const onPointerUp = () => {
  if (currentIntersectIsEmpty.value || intersectIsEmpty.value) { return }

  if (!controlsInMoved.value) {
    if (typeEditControls.value.value === 'position') {
      rePrintDecal()
    }
    else {
      printDecal()
    }
  }
}

watch(() => decalSelected.value.value, async (newVal) => {
  if (!boxHelperCurrentRef.value || !boxHelperSelectedRef.value) { return }

  if (decalSelectedIsNone.value) {
    scaleControls.value.visible = false
    typeEditControls.value.visible = false
    orientationZControls.value.visible = false
    boxHelperCurrentRef.value.visible = false
    boxHelperSelectedRef.value.visible = false
    deleteBtn.value.visible = false
    clearBtn.value.visible = false
  }
  else {
    boxHelperSelectedRef.value.visible = true
    typeEditControls.value.visible = true
    deleteBtn.value.visible = true
    exportBtn.value.visible = true
    deleteBtn.value.value.label = `Delete ${currentNodesDecalRefs.value.uid}`
    clearBtn.value.visible = true

    if (typeEditControls.value.value === 'scale') {
      scaleControls.value.visible = true
    }
    else if (typeEditControls.value.value === 'orientation') {
      orientationZControls.value.visible = true
    }

    await nextTick()

    const selectedDecal = currentNodesDecalRefs.value

    updateControlsFromDecal(selectedDecal.scale, selectedDecal.orientationZ)

    const targetMesh = decalItemsRef.value[newVal]

    updateBoxHelper(boxHelperSelectedRef, targetMesh.instance)
  }
})

watch(
  () => typeEditControls.value.value,
  (newVal) => {
    const uid = currentNodesDecalRefs.value.uid
    const targetMesh = decalItemsRef.value[uid]

    if (newVal === 'scale') {
      scaleControls.value.visible = true
      orientationZControls.value.visible = false
      targetMesh.instance.material.opacity = 1
    }
    else if (newVal === 'orientation') {
      orientationZControls.value.visible = true
      scaleControls.value.visible = false
      targetMesh.instance.material.opacity = 1
    }
    else if (newVal === 'position') {
      orientationZControls.value.visible = false
      scaleControls.value.visible = false
      targetMesh.instance.material.opacity = 0.35
    }
  },
)

watch(
  [() => scaleControls.value.value, () => orientationZControls.value.value],
  ([newScale, newOrientationZ]) => {
    if (
      !nodesDecalRefs.value.length
      || decalSelectedIsNone.value
      || !currentNodesDecalRefs.value
      || typeEditControls.value.value === 'position'
    ) {
      return
    }

    currentNodesDecalRefs.value.scale = newScale
    currentNodesDecalRefs.value.orientationZ = newOrientationZ

    boxHelperSelectedRef.value?.update()
  },
)

watchEffect(() => {
  if (!groupRef.value || !boxHelpersRef.value) { return }

  const parent = mesh?.value || groupRef.value.parent

  if (!(parent instanceof Mesh)) {
    throw new TypeError('A Mesh parent is required ...')
  }

  const scaleArray = parent.scale.clone().toArray().map(v => 1 / v)
  const preventScale = new Vector3().fromArray(scaleArray)
  boxHelpersRef.value.scale.copy(preventScale)
})

watch(nodesDecalRefsIsEmpty, (newVal) => {
  clearBtn.value.visible = !newVal
  exportBtn.value.visible = !newVal
})

watch(meshLineRef, () => {
  if (!meshLineRef.value) { return }

  meshLineRef.value.geometry.setFromPoints([new Vector3(), new Vector3()])
})

watch([groupRef, textureMap], () => {
  if (!groupRef.value || !textureMap.value) { return }

  const parent = mesh?.value || groupRef.value.parent

  if (!parent) { return }

  importDecals(data.value)
})

watch(controls, () => {
  if (!controls.value || !debug.value) { return }

  controls.value.addEventListener('change', onChangeOrbitControls)
  controls.value.enableDamping = !debug.value // Very important in debug mode
  controls.value.autoRotate = !debug.value // Very important in debug mode
}, { immediate: true })

window.addEventListener('pointerdown', onPointerDown)
window.addEventListener('pointerup', onPointerUp)

onUnmounted(() => {
  window.removeEventListener('pointerdown', onPointerDown)
  window.removeEventListener('pointerup', onPointerUp)

  if (!debug.value) {
    controls?.value?.removeEventListener('change', onChangeOrbitControls)
  }

  meshRef?.value?.geometry?.dispose()
  meshLineRef?.value?.geometry?.dispose()
  boxHelperRef?.value?.instance?.geometry?.dispose()
  boxHelperCurrentRef?.value?.dispose()
  boxHelperSelectedRef?.value?.dispose()
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
    :material-map="textureMap[keyTextureSelected.value]"
    :material-opacity="typeEditControls.value === 'position' ? 1 : .75"
    name="debugDecal"
    :visible="!intersectIsEmpty"
  />

  <TresGroup ref="groupRef" />

  <Item
    v-for="(item, index) in nodesDecalRefs"
    :key="`nodes-decal-${index}`"
    :ref="
      (el) => {
        decalItemsRef[item.uid] = el
      }
    "
    v-bind="$attrs"
    :properties="{ ...item, index }"
  >
    <slot></slot>
  </Item>

  <TresLine v-if="debug" ref="meshLineRef" name="debugLine" :visible="!intersectIsEmpty">
    <TresBufferGeometry />
    <TresLineBasicMaterial :color="meshLineColor" />
  </TresLine>

  <Box
    v-if="debug"
    ref="boxHelperRef"
    name="debugBox"
    :visible="false"
  >
    <TresMeshNormalMaterial />
  </Box>

  <TresGroup ref="boxHelpersRef">
    <TresBoxHelper
      v-if="debug"
      ref="boxHelperCurrentRef"
      :visible="!intersectIsEmpty"
      :material-depthTest="false"
    />

    <TresBoxHelper
      v-if="debug"
      ref="boxHelperSelectedRef"
      material-color="#ff0000"
      :material-depthTest="false"
    />
  </TresGroup>
</template>
