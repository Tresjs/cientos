<script setup lang="ts">
import type { ShallowRef } from 'vue'
import { onUnmounted, shallowRef, toRefs, watchEffect } from 'vue'
import type { Camera, Event, Object3D } from 'three'

import { TransformControls } from 'three-stdlib'
import { useEventListener } from '@vueuse/core'
import { useTresContext } from '@tresjs/core'
import { useOnDemandInvalidation } from '../../composables/useOnDemandInvalidation'

export interface TransformControlsProps {
  object: Object3D
  camera?: Camera
  mode?: string
  enabled?: boolean
  axis?: 'X' | 'Y' | 'Z' | 'XY' | 'YZ' | 'XZ' | 'XYZ'
  translationSnap?: number
  rotationSnap?: number
  scaleSnap?: number
  space?: 'local' | 'world'
  size?: number
  showX?: boolean
  showY?: boolean
  showZ?: boolean
}

const props = withDefaults(defineProps<TransformControlsProps>(), {
  mode: 'translate',
  enabled: true,
  axis: 'XYZ',
  space: 'world',
  size: 1,
  showX: true,
  showY: true,
  showZ: true,
})

const emit = defineEmits(['dragging', 'change', 'mouseDown', 'mouseUp', 'objectChange'])

const { object, mode, enabled, axis, translationSnap, rotationSnap, scaleSnap, space, size, showX, showY, showZ }
  = toRefs(props)

const { invalidateOnDemand } = useOnDemandInvalidation(props)

const controlsRef: ShallowRef<TransformControls | undefined> = shallowRef()

const { controls, camera: activeCamera, renderer, extend } = useTresContext()

extend({ TransformControls })

const onChange = () => {
  invalidateOnDemand()
  emit('change')
}

const onDragingChange = (e: Event) => {
  if (controls.value) { controls.value.enabled = !e.value }
  invalidateOnDemand()
  emit('dragging', e.value)
}

const onMouseDown = () => {
  invalidateOnDemand()
  emit('mouseDown')
}

const onMouseUp = () => {
  invalidateOnDemand()
  emit('mouseDown')
}

const onObjectChange = () => {
  invalidateOnDemand()
  emit('objectChange')
}

function addEventListeners() {
  useEventListener(controlsRef.value as any, 'change', onChange)
  useEventListener(controlsRef.value as any, 'dragging-changed', onDragingChange)
  useEventListener(controlsRef.value as any, 'mouseDown', onMouseDown)
  useEventListener(controlsRef.value as any, 'mouseUp', onMouseUp)
  useEventListener(controlsRef.value as any, 'objectChange', onObjectChange)
}

watchEffect(() => {
  if (controlsRef.value) {
    addEventListeners()
  }
})

onUnmounted(() => {
  if (controlsRef.value) {
    controlsRef.value.dispose()
  }
})

defineExpose({
  instance: controlsRef,
})
</script>

<template>
  <TresTransformControls
    v-if="(camera || activeCamera) && renderer"
    ref="controlsRef"
    :key="(camera || activeCamera)?.uuid"
    :object="object"
    :args="[camera || activeCamera, renderer.domElement]"
    :mode="mode"
    :enabled="enabled"
    :axis="axis"
    :translation-snap="translationSnap"
    :rotation-snap="rotationSnap"
    :scale-snap="scaleSnap"
    :space="space"
    :size="size"
    :show-x="showX"
    :show-y="showY"
    :show-z="showZ"
    :visible="true"
  />
</template>
