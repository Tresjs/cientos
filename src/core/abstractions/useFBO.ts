import { useTresContext, useRenderLoop } from '@tresjs/core'
import type { WebGLRenderTargetOptions } from 'three'
import { WebGLRenderTarget, LinearFilter, FloatType, HalfFloatType, DepthTexture } from 'three'
import { defineComponent } from 'vue'

export interface UseFboProps {
  /*
   * The width of the frame buffer object.
   *
   * @default 512
   * @type {number}
   * @memberof UseFboProps
   */
  width?: number

  /*
   * The height of the frame buffer object.
   *
   * @default 512
   * @type {number}
   * @memberof UseFboProps
   */
  height?: number

  /*
   * If set, the scene depth will be rendered into buffer.depthTexture.
   *
   * @default false
   * @type {boolean}
   * @memberof UseFboProps
   */
  depth?: boolean

  /*
   * Defines the count of MSAA samples. Can only be used with WebGL 2.
   *
   * @default 0
   * @type {number}
   * @memberof UseFboProps
   */
  samples?: number

  /*
   * Defines the count of MSAA samples. Can only be used with WebGL 2.
   *
   * @default {}
   * @type {object}
   * @memberof UseFboProps
   */
  settings?: WebGLRenderTargetOptions
}

export const UseFBO = defineComponent<UseFboProps>({
  name: 'UseFBO',
  props: [
    'width',
    'height',
    'depth',
    'samples',
    'settings',
  ] as unknown as undefined,

  async setup(props, { expose }) {
    const { height = 512, width = 512, samples = 0, settings = {}, depth = false } = props
    const { onLoop } = useRenderLoop()
    const { camera, renderer, scene } = useTresContext()

    const target = new WebGLRenderTarget(width, height, {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      type: HalfFloatType,
      ...settings,
    })

    if (depth) {
      target.depthTexture = new DepthTexture(width, height, FloatType)
    }

    target.samples = samples

    expose(target)

    onLoop(() => {
      renderer.value.setRenderTarget(target)
      renderer.value.render(scene.value, camera.value)
      renderer.value.setRenderTarget(null)
    })

    return null
  },
})
