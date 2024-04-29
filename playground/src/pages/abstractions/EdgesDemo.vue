<script setup lang="ts">
import { TresCanvas, useTresContext } from '@tresjs/core'
import { PCFSoftShadowMap, SRGBColorSpace, NoToneMapping, MathUtils, Vector3, Color } from 'three'
import { Edges, OrbitControls, Levioso, ContactShadows, Box } from '@tresjs/cientos'
import { useControls, TresLeches } from '@tresjs/leches'
import '@tresjs/leches/styles'

const gl = {
  powerPreference: 'high-performance',
  precision: 'highp',
  clearColor: '#F6B03B',
}

const { edgeColor, edgeThreshold } = useControls({
  edgeColor: { value: '#292929', type: 'color', label: 'Color' },
  edgeThreshold: {
    label: 'Threshold Angle',
    value: 15,
    min: 1,
    max: 100,
    step: 1,
  },
})
</script>

<template>
  <TresLeches />

  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[0, 2, 5]"
      :rotation-x="Math.PI * 2"
    />
    <TresGridHelper
      :args="[10, 10]"
      :position-y="-.5"
    />

    <Box :position="[-1, 0, 0]">
      <TresMeshBasicMaterial color="#f6f6f6" />

      <Edges
        :scale="1.1"
        :threshold="edgeThreshold.value"
      >
        <TresMeshBasicMaterial
          :color="edgeColor.value"
        />
      </Edges>
    </Box>

    <Box :position="[1, 0, 0]">
      <TresMeshBasicMaterial color="#292929" />

      <Edges
        :scale="1.1"
        :threshold="edgeThreshold.value"
        color="#f6f6f6"
      />
    </Box>

    <OrbitControls
      make-default
      enable-damping
      :enable-pan="false"
    />
  </TresCanvas>
</template>
