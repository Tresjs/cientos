<script lang="ts" setup>
import { shallowRef, reactive, toRefs, watchEffect } from 'vue'
import { TresColor } from '@tresjs/core'
import { useTresContext } from '@tresjs/core'
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
   * @type {object}
   * @memberof ReflectorProps
   *
   */
  shader?: object
}

const props = withDefaults(defineProps<ReflectorProps>(), {
  color: '#333',
  textureWidth: 512,
  textureHeight: 512,
  clipBias: 0,
  multisample: 4,
  shader: Reflector.ReflectorShader,
})

const reflectorRef = shallowRef<Reflector>()

const { extend } = useTresContext()

extend({ Reflector })

const { color, textureWidth, textureHeight, clipBias, multisample, shader } = toRefs(props)

const options = reactive({
  color: color.value,
  textureWidth: textureWidth.value,
  textureHeight: textureHeight.value,
  clipBias: clipBias.value,
  multisample: multisample.value,
  shader: {...Reflector.ReflectorShader,...shader.value },
})

watchEffect(() =>{
  if(!reflectorRef?.value) return
  if (clipBias.value) options.clipBias = clipBias.value
  const currentGeo =  reflectorRef.value.geometry
  reflectorRef.value.dispose()
  reflectorRef.value = new Reflector(currentGeo, options)
})

defineExpose({
  value: reflectorRef,
})
</script>

<template>
  <TresReflector ref="reflectorRef" :args="[new PlaneGeometry(), options]" :material-uniforms-color-value="color">
    <slot>
      <TresPlaneGeometry />
    </slot>
  </TresReflector>
</template>
