<script setup lang="ts">
import { useTresContext, useRenderLoop } from '@tresjs/core'
import type { WebGLRenderTargetOptions, Camera } from 'three'
import {
  WebGLRenderTarget,
  LinearFilter,
  FloatType,
  HalfFloatType,
  DepthTexture,
} from 'three'
import type { Ref } from 'vue'
import { watchEffect, onBeforeUnmount, toRefs, ref } from 'vue'

export interface FboProps {
  /*
	 * The width of the frame buffer object.
	 *
	 * @default 512
	 * @type {number}
	 * @memberof FboProps
	 */
  width?: number

  /*
	 * The height of the frame buffer object.
	 *
	 * @default 512
	 * @type {number}
	 * @memberof FboProps
	 */
  height?: number

  /*
	 * If set, the scene depth will be rendered into buffer.depthTexture.
	 *
	 * @default false
	 * @type {boolean}
	 * @memberof FboProps
	 */
  depth?: boolean

  /*
	 * Defines the count of MSAA samples. Can only be used with WebGL 2.
	 *
	 * @default 0
	 * @type {number}
	 * @memberof FboProps
	 */
  samples?: number

  /*
	 * Additional settings for the render target.
	 * See https://threejs.org/docs/#api/en/renderers/WebGLRenderTarget for more information.
	 *
	 * @default {}
	 * @type {WebGLRenderTargetOptions}
	 * @memberof FboProps
	 */
  settings?: WebGLRenderTargetOptions
}

const props = withDefaults(defineProps<FboProps>(), {
  depth: false,
  samples: 0,
  settings: undefined,
})

const renderTarget: Ref<WebGLRenderTarget | null> = ref(null)

defineExpose({
  value: renderTarget,
})

const { onLoop } = useRenderLoop()
const { camera, renderer, scene, sizes } = useTresContext()

const { height, width, samples, settings, depth } = toRefs(props)

watchEffect(() => {
  renderTarget.value?.dispose()

  renderTarget.value = new WebGLRenderTarget(width?.value || sizes.width.value, height?.value || sizes.height.value, {
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    type: HalfFloatType,
    samples: samples.value,
    ...settings.value,
  })

  if (depth.value) {
    renderTarget.value.depthTexture = new DepthTexture(
      width?.value || sizes.width.value,
      height?.value || sizes.height.value,
      FloatType,
    )
  }
})

onLoop(() => {
  renderer.value.setRenderTarget(renderTarget.value)
  renderer.value.clear()
  renderer.value.render(scene.value, camera.value as Camera)

  renderer.value.setRenderTarget(null)
})

onBeforeUnmount(() => {
  renderTarget.value?.dispose()
})
</script>
