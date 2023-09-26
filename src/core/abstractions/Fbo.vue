<script setup lang="ts">
import { useTresContext, useRenderLoop } from '@tresjs/core'
import type { WebGLRenderTargetOptions } from 'three'
import {
  WebGLRenderTarget,
  LinearFilter,
  FloatType,
  HalfFloatType,
  DepthTexture,
} from 'three'
import { watchEffect, onBeforeUnmount } from 'vue'

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
  width: 512,
  height: 512,
  depth: false,
  samples: 0,
  settings: undefined,
})

let renderTarget: WebGLRenderTarget

const { onLoop } = useRenderLoop()
const { camera, renderer, scene } = useTresContext()

watchEffect(() => {
  renderTarget?.dispose()

  const { height, width, samples, settings, depth } = props

  renderTarget = new WebGLRenderTarget(width, height, {
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    type: HalfFloatType,
    depthBuffer: depth,
    samples,
    ...settings,
  })

  if (depth) {
    renderTarget.depthTexture = new DepthTexture(width, height, FloatType)
  }
})

defineExpose(renderTarget)

onLoop(() => {
  renderer.value.setRenderTarget(renderTarget)
  renderer.value.clear()
  renderer.value.render(scene.value, camera.value)

  renderer.value.setRenderTarget(null)
})

onBeforeUnmount(() => {
  renderTarget.dispose()
})
</script>
