<!-- eslint-disable no-console -->
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { OrbitControls } from '@tresjs/cientos'
import { reactive, watch, shallowRef } from 'vue'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const controlsRef = shallowRef()

watch(controlsRef, () => {
  console.log('watch ~ controlsRef:', controlsRef.value.root)
})

const controlsState = reactive({
  enableDamping: true,
  dampingFactor: 0.05,
  enableZoom: true,
  autoRotate: false,
  autoRotateSpeed: 2,
  maxPolarAngle: Math.PI,
  minPolarAngle: 0,
  maxAzimuthAngle: Math.PI,
  minAzimuthAngle: -Math.PI,
  enablePan: true,
  keyPanSpeed: 7,
  maxDistance: 100,
  minDistance: 0,
  minZoom: 0,
  maxZoom: 100,
  zoomSpeed: 1,
  enableRotate: true,
  rotateSpeed: 1,
})

const {
  'enable Damping': enableDamping,
  dampingFactor,
  'enable Zoom': enableZoom,
  'enable Pan': enablePan,
  keyPanSpeed,
} = useControls({
  'enable Damping': controlsState.enableDamping,
  dampingFactor: {
    value: controlsState.dampingFactor,
    step: 0.01,
    min: 0,
    max: 10,
  },
  'enable Zoom': controlsState.enableZoom,
  'enable Pan': controlsState.enablePan,
  keyPanSpeed: {
    value: controlsState.keyPanSpeed,
    step: 0.01,
    min: 0,
    max: 10,
  },
})

watch([enableDamping.value, dampingFactor.value, enableZoom.value, enablePan.value, keyPanSpeed.value], () => {
  controlsState.enableDamping = enableDamping.value.root
  controlsState.dampingFactor = dampingFactor.value.root
  controlsState.enableZoom = enableZoom.value.root
  controlsState.enablePan = enablePan.value.root
  controlsState.keyPanSpeed = keyPanSpeed.value.root
})

const {
  AnglesMaxPolarAngle,
  AnglesMinPolarAngle,
  AnglesMaxAzimuthAngle,
  AnglesMinAzimuthAngle,
} = useControls('Angles', {
  maxPolarAngle: {
    value: controlsState.maxPolarAngle,
    step: 0.01,
    min: 0,
    max: Math.PI,
  }, minPolarAngle: {
    value: controlsState.minPolarAngle,
    step: 0.01,
    min: 0,
    max: Math.PI,
  }, maxAzimuthAngle: {
    value: controlsState.maxAzimuthAngle,
    step: 0.01,
    min: 0,
    max: 2 * Math.PI,
  }, minAzimuthAngle: {
    value: controlsState.minPolarAngle,
    step: 0.01,
    min: 0,
    max: 2 * Math.PI,
  },
})

watch([
  AnglesMaxPolarAngle.value,
  AnglesMinPolarAngle.value,
  AnglesMaxAzimuthAngle.value,
  AnglesMinAzimuthAngle.value,
  keyPanSpeed.value,
], () => {
  controlsState.maxPolarAngle = AnglesMaxPolarAngle.value.root
  controlsState.minPolarAngle = AnglesMinPolarAngle.value.root
  controlsState.maxAzimuthAngle = AnglesMaxAzimuthAngle.value.root
  controlsState.minAzimuthAngle = AnglesMinAzimuthAngle.value.root
})

const { DistancesMaxDistance, DistancesMinDistance } = useControls('Distances', {
  maxDistance: {
    value: controlsState.maxDistance,
    step: 0.01,
    min: 0,
    max: 100,
  }, minDistance: {
    value: controlsState.minDistance,
    step: 0.01,
    min: 0,
    max: 100,
  },
})

watch([DistancesMaxDistance.value, DistancesMinDistance.value], () => {
  controlsState.maxDistance = DistancesMaxDistance.value.root
  controlsState.minDistance = DistancesMinDistance.value.root
})

const { ZoomEnableZoom, ZoomMinZoom, ZoomMaxZoom, ZoomZoomSpeed } = useControls('Zoom', {
  enableZoom: controlsState.enableZoom,
  minZoom: {
    value: controlsState.minZoom,
    step: 0.01,
    min: 0,
    max: 10,
  },
  maxZoom: {
    value: controlsState.maxZoom,
    step: 0.01,
    min: 0,
    max: 100,
  },
  zoomSpeed: {
    value: controlsState.zoomSpeed,
    step: 0.01,
    min: 0,
    max: 100,
  },
})

watch([ZoomEnableZoom.value, ZoomMinZoom.value, ZoomMaxZoom.value, ZoomZoomSpeed.value], () => {
  controlsState.enableZoom = ZoomEnableZoom.value.root
  controlsState.minZoom = ZoomMinZoom.value.root
  controlsState.maxZoom = ZoomMaxZoom.value.root
  controlsState.zoomSpeed = ZoomZoomSpeed.value.root
})

function onChange() {
  /* console.log('change') */
}

function onStart() {
  /*  console.log('start') */
}

function onEnd() {
  /*   console.log('end') */
}
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls
      v-bind="controlsState"
      ref="controlsRef"
      @change="onChange"
      @start="onStart"
      @end="onEnd"
    />
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
