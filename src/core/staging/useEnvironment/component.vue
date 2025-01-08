<script setup lang="ts">
import { useLoop, useTresContext } from '@tresjs/core'
import { BackSide, CubeCamera, HalfFloatType, Mesh, MeshBasicMaterial, SphereGeometry, WebGLCubeRenderTarget } from 'three'
import { onUnmounted, ref, toRaw, useSlots, watch } from 'vue'
import type { CubeTexture, Object3D, Texture } from 'three'
import type { Ref } from 'vue'
import { useEnvironment } from '.'
import EnvSence from './envSence'
import type { EnvironmentOptions } from './const'

const props = withDefaults(defineProps<EnvironmentOptions>(), {
  background: false,
  blur: 0,
  files: () => [],
  path: '',
  preset: undefined,
  resolution: 256,
  near: 1,
  far: 1000,
  frames: Number.POSITIVE_INFINITY,
})

const texture: Ref<Texture | CubeTexture | null> = ref(null)
defineExpose({ texture })

const { extend, renderer, scene } = useTresContext()
extend({ EnvSence })

let slots = null as any
const fbo = ref<WebGLCubeRenderTarget | null>(null)
let cubeCamera: CubeCamera | null = null
const envSence = ref<EnvSence | null>(null)

const useEnvironmentTexture = await useEnvironment(props, fbo)

const { onBeforeRender } = useLoop()
let count = 1
onBeforeRender(() => {
  if (cubeCamera && envSence.value && fbo.value) {
    if (props.frames === Number.POSITIVE_INFINITY || count < props.frames) {
      // Update cube camera
      const autoClear = renderer.value.autoClear
      renderer.value.autoClear = true
      // Use raw scene to avoid proxy issues
      const rawScene = toRaw(envSence.value).virtualScene
      cubeCamera.update(renderer.value, rawScene)
      renderer.value.autoClear = autoClear
      count++
    }
  }
}, -1)

// Add environment map to virtual scene when available
watch([useEnvironmentTexture, envSence], ([texture, scene]) => {
  if (texture && scene?.virtualScene) {
    // Clear previous environment
    const rawScene = toRaw(scene).virtualScene
    rawScene.children = rawScene.children.filter(
      child => !(child instanceof Mesh && child.userData.isEnvironment),
    )

    // Add environment map as a large sphere
    const envMesh = new Mesh(
      new SphereGeometry(100, 32, 32),
      new MeshBasicMaterial({
        map: texture,
        side: BackSide,
      }),
    )
    envMesh.userData.isEnvironment = true
    rawScene.add(envMesh)
  }
}, { immediate: true })

const setTextureEnvAndBG = (fbo?: WebGLCubeRenderTarget) => {
  if (fbo && slots?.length) {
    // If we have lightformers, use FBO texture for both environment and background
    scene.value.environment = fbo.texture
    if (props.background) {
      scene.value.background = fbo.texture
    }
  }
  else if (useEnvironmentTexture.value) {
    // Otherwise use the original environment texture
    scene.value.environment = useEnvironmentTexture.value
    if (props.background) {
      scene.value.background = useEnvironmentTexture.value
    }
  }
}

watch(useEnvironmentTexture, () => {
  if (fbo.value) {
    setTextureEnvAndBG(fbo.value)
  }
}, { immediate: true, deep: true })

watch(() => useSlots().default, (value) => {
  if (value) {
    slots = value()
    if (Array.isArray(slots) && slots.length > 0) {
      extend({ EnvSence })
      fbo.value = new WebGLCubeRenderTarget(props.resolution)
      fbo.value.texture.type = HalfFloatType
      cubeCamera = new CubeCamera(props.near, props.far, fbo.value)
      setTextureEnvAndBG(fbo.value)
      return
    }
  }
  fbo.value?.dispose()
  fbo.value = null
  setTextureEnvAndBG()
}, { immediate: true, deep: true })

texture.value = useEnvironmentTexture.value

onUnmounted(() => {
  envSence.value?.dispose()
  fbo.value?.dispose()
})
</script>

<template>
  <TresEnvSence
    v-if="fbo"
    ref="envSence"
  >
    <slot></slot>
  </TresEnvSence>
</template>
