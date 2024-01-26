import { useLogger } from '@tresjs/core'
import {
  DirectionalLightHelper,
  PointLightHelper,
  SpotLightHelper,
  HemisphereLightHelper,
  CameraHelper,
} from 'three'
import { RectAreaLightHelper } from 'three-stdlib'

const { logWarning } = useLogger()

export const vLightHelper = {
  mounted: (el: any, binding: any) => {
    if (!el.isLight) {
      logWarning(`${el.type} is not a light`)
      return
    }
    currentHelper = helpers[el.type]
    el.parent.add(new currentHelper(el))

    // if has ShadowCamera
    if (binding.arg === 'shadowCamera' && el.shadow) {
      currentShadowCameraHelper = new CameraHelper(el.shadow.camera)
      el.parent.add(currentShadowCameraHelper)
    }
    else { logWarning(`${el.type} doesn't create shadows`) }
  },
  updated: (el: any) => {
    currentInstance = getHelperIntance(el)
    if (currentInstance instanceof RectAreaLightHelper) return
    currentInstance.update()

    // if has ShadowCamera
    if (!currentShadowCameraHelper) return
    currentShadowCameraHelper = getShadowCameraHelperIntance(el)
    currentShadowCameraHelper.update()
  },
  unmounted: (el: any) => {
    if (!el.isLight) {
      logWarning(`${el.type} is not a light`)
      return
    }
    currentInstance = getHelperIntance(el)
    currentInstance.dispose()
    el.parent.remove(currentInstance)

    // if has ShadowCamera
    if (!currentShadowCameraHelper) return
    currentShadowCameraHelper = getShadowCameraHelperIntance(el)
    currentShadowCameraHelper.dispose()
    el.parent.remove(currentShadowCameraHelper)
  },
}
let currentHelper: any
let currentInstance: any
let currentShadowCameraHelper: any

const getHelperIntance = (el: any) =>
  el.parent.children.find((child: any) => child instanceof currentHelper)
const getShadowCameraHelperIntance = (el: any) =>
  el.parent.children.find((child: any) => child instanceof CameraHelper)

const helpers = {
  DirectionalLight: DirectionalLightHelper,
  PointLight: PointLightHelper,
  SpotLight: SpotLightHelper,
  HemisphereLight: HemisphereLightHelper,
  RectAreaLight: RectAreaLightHelper,
}
