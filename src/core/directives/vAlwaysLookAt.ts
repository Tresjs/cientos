import { useRenderLoop } from '@tresjs/core'
import type { Object3D } from 'three'
import { extractBindingPosition } from '../../utils/index'

export const vAlwaysLookAt = {
  updated: (el: Object3D, binding: any) => {
    const observer = extractBindingPosition(binding)
    const { onLoop } = useRenderLoop()
    onLoop(() => {
      el.lookAt(observer)
    })
  },
}
