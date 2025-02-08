<script setup lang="ts">
import { gsap } from 'gsap'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { Box, Environment, OrbitControls, TransformControls, useGLTF, Wiggle } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const gl = {
  powerPreference: 'high-performance',
  precision: 'highp',
  clearColor: '#F6B03B',
}

const model = await useGLTF(
  '/wiggle/banana.glb',
  { draco: true },
)

const modelFlower = await useGLTF(
  '/wiggle/banana.glb',
  { draco: true },
)

console.log('demo — useGLTF', model)

const modelRef = ref<TresObject | null>(null)
const modelRefBis = ref<TresObject | null>(null)
const testRef = ref(null)
const testRefBis = ref(null)

const { debug, velocity, stiffness, damping } = useControls({
  debug: { value: false, type: 'boolean', label: 'Debug' },
  velocity: {
    label: 'Velocity',
    value: 0.1,
    min: 0.01,
    max: 1,
    step: 0.01,
  },
  stiffness: {
    label: 'Stiffness',
    value: 500,
    min: 100,
    max: 1000,
    step: 10,
  },
  damping: {
    label: 'Damping',
    value: 17,
    min: 1,
    max: 30,
    step: 1,
  },
})

// watch(testRef, () => {
//   if (!testRef.value) { return }

//   // gsap.to(testRef.value.root.position, {
//   //   z: 5,
//   //   repeat: -1,
//   //   ease: 'elastic.out(1,0.3)',
//   //   duration: 2,
//   // })
//   console.log(testRef.value.root)
// })

const { onLoop } = useRenderLoop()

onLoop(({ delta, elapsed, clock }) => {
  // testRef.value.root.position.x = 0.35 * Math.sin(3 * elapsed)
  // rootBone.position.y = 1 * Math.sin(3 * elapsed)
})
</script>

<template>
  <TresLeches />

  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[5, 2.5, 5]"
    />

    <OrbitControls
      make-default
      :target="[0, 0, 0]"
    />

    <TresGridHelper
      :args="[10, 10]"
      :position-y="0.25"
    />

    <Suspense>
      <Environment
        preset="shangai"
      />
    </Suspense>

    <Suspense>
      <Wiggle ref="testRef" :scale="15" :debug="true" :basic="{ velocity: velocity.value }">
        <primitive ref="modelRef" :object="model.scene" />
      </Wiggle>
    </Suspense>

    <Suspense>
      <Wiggle ref="testRefBis" :position-z="-2" :scale="15" :debug="true" :spring="{ stiffness: stiffness.value, damping: damping.value }">
        <primitive ref="modelRefBis" :object="modelFlower.scene" />
      </Wiggle>
    </Suspense>

    <TransformControls :object="modelRefBis" />
  </TresCanvas>
</template>
