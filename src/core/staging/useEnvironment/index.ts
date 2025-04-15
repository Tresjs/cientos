import { useTresContext } from '@tresjs/core'
import {
  CubeReflectionMapping,
  CubeTextureLoader,
  EquirectangularReflectionMapping,
} from 'three'
import { RGBELoader } from 'three-stdlib'
import { computed, ref, toRefs, unref, watch } from 'vue'
import type {
  CubeTexture,
  Texture,
  WebGLCubeRenderTarget,
} from 'three'
import type { Ref } from 'vue'
import { environmentPresets } from './const'
import type { EnvironmentOptions } from './const'

const PRESET_ROOT = 'https://raw.githubusercontent.com/Tresjs/assets/main/textures/hdr/'

/**
 * Component that loads an environment map and sets it as the scene's background and environment.
 *
 * @export
 * @param {Partial<EnvironmentOptions>} options - The options for the environment map
 *   files = ['/px.png', '/nx.png', '/py.png', '/ny.png', '/pz.png', '/nz.png'],
 *   blur = 0,
 *   background = false,
 *   path = undefined,
 *   preset = undefined,
 *   colorSpace = undefined,
 * @param {Ref<WebGLCubeRenderTarget | null>} fbo - The framebuffer object
 * @return {Promise<Ref<Texture | CubeTexture | null>>} The loaded texture
 */
export async function useEnvironment(
  options: Partial<EnvironmentOptions>,
  fbo: Ref<WebGLCubeRenderTarget | null>,
): Promise<Ref<Texture | CubeTexture | null>> {
  const { scene, invalidate } = useTresContext()

  const {
    preset,
    blur,
    files = ref([]),
    path = ref(''),
    background,
  } = toRefs(options)

  watch(options, () => {
    invalidate()
  })

  const texture: Ref<Texture | CubeTexture | null> = ref(null)
  const isCubeMap = computed(() => Array.isArray((files as Ref<string[]>).value))

  // Create loaders
  const cubeTextureLoader = new CubeTextureLoader()
  const rgbeLoader = new RGBELoader()

  // Function to load textures directly
  const loadTexture = async (files: string[], path?: string): Promise<Texture | CubeTexture> => {
    return new Promise((resolve, reject) => {
      if (isCubeMap.value) {
        // Handle cube map
        if (path) { cubeTextureLoader.setPath(path) }
        cubeTextureLoader.load(
          files,
          (texture) => {
            texture.mapping = CubeReflectionMapping
            resolve(texture)
          },
          undefined,
          error => reject(error),
        )
      }
      else {
        // Handle HDR/equirectangular
        if (path) { rgbeLoader.setPath(path) }
        rgbeLoader.load(
          files[0],
          (texture) => {
            texture.mapping = EquirectangularReflectionMapping
            resolve(texture)
          },
          undefined,
          error => reject(error),
        )
      }
    })
  }

  watch([files, path], async ([files, path]) => {
    if (!files || files.length === 0 || preset?.value) { return }

    try {
      const loadedTexture = await loadTexture(
        isCubeMap.value
          ? [...(unref(files) as string[])]
          : [unref(files) as string],
        unref(path),
      )
      texture.value = loadedTexture
    }
    catch (error) {
      throw new Error(`Failed to load environment map: ${error}`)
    }
  }, {
    immediate: true,
  })

  watch(texture, (value) => {
    if (scene.value && value) {
      scene.value.environment = value
    }
  }, {
    immediate: true,
  })

  watch([background, texture], ([background, texture]) => {
    if (scene.value) {
      const bTexture = fbo?.value ? fbo.value.texture : texture
      if (bTexture) {
        scene.value.background = background ? bTexture as Texture : null
      }
    }
  }, {
    immediate: true,
  })

  watch(() => blur?.value, (value) => {
    if (scene.value && value) {
      scene.value.backgroundBlurriness = value
    }
  }, {
    immediate: true,
  })

  watch(() => preset?.value, async (value) => {
    if (value && value in environmentPresets) {
      const _path = PRESET_ROOT
      const _files = environmentPresets[value as unknown as keyof typeof environmentPresets]

      try {
        // Load preset using RGBELoader directly
        rgbeLoader.setPath(_path)
        const loadedTexture = await new Promise<Texture>((resolve, reject) => {
          rgbeLoader.load(
            _files,
            (texture) => {
              texture.mapping = EquirectangularReflectionMapping
              resolve(texture)
            },
            undefined,
            error => reject(error),
          )
        })

        texture.value = loadedTexture
        invalidate()
      }
      catch (error) {
        throw new Error(`Failed to load environment map: ${error}`)
      }
    }
    else if (value && !(value in environmentPresets)) {
      throw new Error(`Preset must be one of: ${Object.keys(environmentPresets).join(', ')}`)
    }
  }, {
    immediate: true,
  })

  return texture
}
