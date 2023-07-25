import { useLoader } from '@tresjs/core'
import {
  CubeReflectionMapping,
  CubeTexture,
  CubeTextureLoader,
  EquirectangularReflectionMapping,
  SRGBColorSpace,
  Texture,
} from 'three'
import { RGBELoader } from 'three-stdlib'
import { useCientos } from '../../../core/useCientos'
import { EnvironmentOptions, environmentPresets } from './const'
import { computed, shallowRef, toValue, watch } from 'vue'
import type { ShallowRef } from 'vue'

/**
 * Component that loads an environment map and sets it as the scene's background and environment.
 *
 * @export
 * @param {Partial<EnvironmentOptions>} {
 *   files = ['/px.png', '/nx.png', '/py.png', '/ny.png', '/pz.png', '/nz.png'],
 *   blur = 0,
 *   background = false,
 *   path = undefined,
 *   preset = undefined,
 *   colorSpace = undefined,
 * }
 * @return {*}  {(Promise<Texture | CubeTexture>)}
 */
export async function useEnvironment({
  files = ['/px.png', '/nx.png', '/py.png', '/ny.png', '/pz.png', '/nz.png'],
  blur = 0,
  background = false,
  path = '/',
  preset = undefined,
}: Partial<EnvironmentOptions>): Promise<Texture | CubeTexture| null> {
  const { state } = useCientos()

  if (preset) {
    if (!(preset in environmentPresets))
      throw new Error('Preset must be one of: ' + Object.keys(environmentPresets).join(', '))
    files = environmentPresets[preset]
    path = 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/hdr/'
  }

  const isCubeMap = computed(() => Array.isArray(toValue(files)));

  const loader = isCubeMap.value ? CubeTextureLoader : RGBELoader

  const result = await useLoader(
    // @ts-expect-error There is a bug in the types for useLoader
    loader,
    isCubeMap.value ? [files] : files,
    (loader: any) => {
      if (path) loader.setPath(path)
      /* if (colorSpace) loader.colorSpace = colorSpace */
    },
  )

  const texture: ShallowRef<Texture | CubeTexture> = shallowRef(isCubeMap.value ? result[0] : result)

  watch(texture, () => {
    if (texture.value) {
      texture.value.mapping = isCubeMap.value ? CubeReflectionMapping : EquirectangularReflectionMapping
      texture.value.colorSpace = SRGBColorSpace
    }
  }, {immediate: true})

  watch([blur, background], () => {
    state.scene.environment = texture.value
    if(state.scene){
      if (toValue(background)) {
        state.scene.background = texture.value
      }
  
      if(toValue(blur)){
        state.scene.backgroundBlurriness = blur | 0
      }
    }
  }, {immediate: true})

  return texture
}
