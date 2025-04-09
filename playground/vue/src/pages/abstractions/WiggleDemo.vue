<script setup lang="ts">
import { gsap } from 'gsap'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { ContactShadows, Environment, OrbitControls, TransformControls, useGLTF, Wiggle } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import { SkeletonUtils } from 'three-stdlib'
import '@tresjs/leches/styles'
import type { TresObject } from '@tresjs/core'

const gl = {
  powerPreference: 'high-performance',
  precision: 'highp',
  clearColor: '#F6B03B',
}

const model = await useGLTF(
  '/wiggle/demo.glb',
  { draco: true },
)

const model1 = SkeletonUtils.clone(model.scene)

const modelRef = ref<TresObject | null>(null)
const modelRefBis = ref<TresObject | null>(null)
const testRef = ref(null)
const testRefBis = ref(null)
const testRefBisBis = ref(null)
const testRefOpposite = ref(null)

const areaLimit = 3

const { debug, velocity, stiffness, damping } = useControls({
  debug: { value: false, type: 'boolean', label: 'Debug' },
  velocity: {
    label: 'Velocity',
    value: 0.3,
    min: 0.1,
    max: 1,
    step: 0.01,
  },
  stiffness: {
    label: 'Stiffness',
    value: 600,
    min: 100,
    max: 1000,
    step: 10,
  },
  damping: {
    label: 'Damping',
    value: 25,
    min: 15,
    max: 50,
    step: 1,
  },
})

// watch(testRef, () => {
//   if (!testRef.value) { return }

//   gsap.to(testRef.value.root.position, {
//     keyframes: {
//       x: [areaLimit, -areaLimit, -areaLimit, areaLimit, areaLimit],
//       z: [areaLimit, areaLimit, -areaLimit, -areaLimit, areaLimit],
//       easeEach: 'elastic.inOut(0.85,0.6)',
//     },
//     ease: 'none',
//     repeat: -1,
//     duration: 6.5,
//   })
// })

// watch(testRefOpposite, () => {
//   if (!testRefOpposite.value) { return }

//   gsap.to(testRefOpposite.value.root.position, {
//     keyframes: {
//       x: [-areaLimit, areaLimit, areaLimit, -areaLimit, -areaLimit],
//       z: [-areaLimit, -areaLimit, areaLimit, areaLimit, -areaLimit],
//       easeEach: 'elastic.inOut(0.85,0.6)',
//     },
//     ease: 'none',
//     repeat: -1,
//     duration: 6.5,
//   })
// })

const { onLoop } = useRenderLoop()

onLoop(({ elapsed }) => {
  if (!testRefBis.value) { return }

  // testRef.value.root.rotation.y = Math.PI / 2 * Math.sin(elapsed)
  // testRef.value.root.rotation.x = Math.PI / 6 * Math.sin(elapsed)

  testRefBis.value.instance.position.z = 2 * Math.sin(elapsed)
})
</script>

<template>
  <TresLeches />

  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera :position="[5, 2.5, 7.5]" />

    <OrbitControls make-default />

    <Suspense>
      <Environment
        preset="shangai"
      />
    </Suspense>

    <!-- <Suspense>
      <Wiggle ref="testRef" :position-z="areaLimit" :position-x="areaLimit" :scale="15" :debug="true" :basic="{ velocity: velocity.value }">
        <primitive ref="modelRef" :object="model.scene" />
      </Wiggle>
    </Suspense>

    <Suspense>
      <Wiggle ref="testRefOpposite" :position-z="-areaLimit" :position-x="-areaLimit" :scale="15" :debug="true" :basic="{ velocity: velocity.value }">
        <primitive ref="modelRef" :object="model1" />
      </Wiggle>
    </Suspense> -->

    <Suspense>
      <Wiggle ref="testRefBis" :position-x="2" :scale="1.5" :debug="debug.value" :spring="{ stiffness: stiffness.value, damping: damping.value }">
        <primitive ref="modelRefBis" :object="model.scene" />
      </Wiggle>
    </Suspense>

    <TransformControls :object="modelRefBis" />

    <Suspense>
      <Wiggle ref="testRefBisBis" :position-x="-2" :scale="1.5" :debug="true" :basic="{ velocity: velocity.value }">
        <primitive ref="modelRef" :object="model1" />
      </Wiggle>
    </Suspense>

    <TransformControls :object="modelRef" />
  </TresCanvas>
</template>
