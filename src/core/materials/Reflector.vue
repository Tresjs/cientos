<script lang="ts" setup>
import { shallowRef, watch, reactive, toRefs } from 'vue'
import { TresColor } from '@tresjs/core'
import { useCientos } from '../../core/useCientos'
import { Reflector } from 'three/addons/objects/Reflector'
import { PlaneGeometry } from 'three'

export interface ReflectorProps {
  /**
   * The color of the reflector.
   *
   * @default '#000000'
   * @type {TresColor}
   * @memberof ReflectorProps
   *
   */
  color?: TresColor
  /**
   * The textureWidth of the internal WebGLRenderTarget.
   *
   * @default window.innerWidth
   * @type {number}
   * @memberof ReflectorProps
   *
   */
  textureWidth?: number
  /**
   * The textureHeight of the internal WebGLRenderTarget.
   *
   * @default window.innerHeight
   * @type {number}
   * @memberof ReflectorProps
   *
   */
  textureHeight?: number
  /**
   * The clipBias.
   *
   * @default 0
   * @type {number}
   * @memberof ReflectorProps
   *
   */
  clipBias?: number
  /**
   * The number of samples to render.
   *
   * @default 4
   * @type {number}
   * @memberof ReflectorProps
   *
   */
  multisample?: number
  /**
   * The number of samples to render.
   *
   * @default Reflector.ReflectorShader
   * @type {string}
   * @memberof ReflectorProps
   *
   */
  shader?: string
}

const props = withDefaults(defineProps<ReflectorProps>(), {
  color: '#000000',
  textureWidth: window.innerWidth,
  textureHeight: window.innerHeight,
  clipBias: 0,
  multisample: 4,
  shader: Reflector.ReflectorShader,
})

const reflector = shallowRef<Reflector>()

const { extend } = useCientos()

extend({ Reflector })

const { color, textureWidth, textureHeight, clipBias, multisample, shader } = toRefs(props)

const options = reactive({
  color: color.value,
  textureWidth: textureWidth.value,
  textureHeight: textureHeight.value,
  clipBias: clipBias.value,
  multisample: multisample.value,
  shader: shader.value,
})
watch(clipBias, value => {
    options.clipBias = value
})
</script>

<template>
  <TresReflector ref="reflector" :args="[new PlaneGeometry(), options]">
    <slot>
      <TresPlaneGeometry />
    </slot>
  </TresReflector>
</template>
