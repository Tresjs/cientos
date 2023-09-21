import type { WebGLRenderTargetOptions } from 'three'

import { WebGLRenderTarget, LinearFilter, FloatType, HalfFloatType, DepthTexture } from 'three'
import { useTresContext } from '@tresjs/core'

type FBOSettings = {
  /** Defines the count of MSAA samples. Can only be used with WebGL 2. Default: 0 */
  samples?: number
  /** If set, the scene depth will be rendered into buffer.depthTexture. Default: false */
  depth?: boolean
} & WebGLRenderTargetOptions

export function useFBO(
  width?: number | FBOSettings,
  height?: number,
  settings?: FBOSettings,
): WebGLRenderTarget {
  const { renderer } = useTresContext()

  // const { size } = renderer.value.state
  const size = {
    width: 512, height: 512,
  }

  // const viewport = useThree((state) => state.viewport)
  const viewport = { dpr: 1.5 }

  const _width = typeof width === 'number' ? width : size.width * viewport.dpr
  const _height = typeof height === 'number' ? height : size.height * viewport.dpr
  const _settings = (typeof width === 'number' ? settings : (width as FBOSettings)) || {}
  const { samples = 0, depth, ...targetSettings } = _settings

  const target = new WebGLRenderTarget(_width, _height, {
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    type: HalfFloatType,
    ...targetSettings,
  })

  if (depth) {
    target.depthTexture = new DepthTexture(_width, _height, FloatType)
  }

  target.samples = samples

  return target
}
