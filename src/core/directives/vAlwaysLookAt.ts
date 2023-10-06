import { useRenderLoop, useLogger } from '@tresjs/core'
import type { Object3D } from 'three'
import { extractBindingPosition } from '../../utils/index'

const { logWarning } = useLogger()

export const vAlwaysLookAt = {
  updated: (el: Object3D, binding: any) => {
    const observer = extractBindingPosition(binding)
    if (!observer) {
      logWarning(`${binding} is not a Object3D`)
      return
    }
    const { onLoop } = useRenderLoop()
    onLoop(() => {
      el.lookAt(observer)
    })
  },
}
