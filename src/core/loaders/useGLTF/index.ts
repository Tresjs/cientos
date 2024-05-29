import { DRACOLoader, GLTFLoader } from 'three-stdlib'
import type { TresObject3D } from '@tresjs/core'
import { useLoader } from '@tresjs/core'

export interface GLTFLoaderOptions {
  /**
   * Whether to use Draco compression.
   *
   * @type {boolean}
   * @memberof GLTFLoaderOptions
   */
  draco?: boolean
  /**
   * The path to the Draco decoder.
   *
   * @type {string}
   * @memberof GLTFLoaderOptions
   */
  decoderPath?: string
}

export interface GLTFResult {
  animations: Array<THREE.AnimationClip>
  nodes: Record<string, TresObject3D>
  materials: Record<string, THREE.Material>
  scene: THREE.Scene
}

/**
 * Create the loader for Draco.
 *
 * @param {string} decoderPath
 * @return {*}
 */

async function createDRACOLoader(decoderPath: string): Promise<DRACOLoader> {
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath(decoderPath)
  return dracoLoader
}

/**
 * Sets the extensions for the GLTFLoader.
 *
 * @param {GLTFLoaderOptions} options
 * @param {DRACOLoader} [dracoLoader]
 * @param {(loader: GLTFLoader) => void} [extendLoader]
 * @return {*}
 */
function setExtensions(
  options: GLTFLoaderOptions,
  dracoLoader: DRACOLoader | null,
  extendLoader?: (loader: GLTFLoader) => void,
) {
  return (loader: GLTFLoader) => {
    if (extendLoader) {
      extendLoader(loader as GLTFLoader)
    }
    if (options.draco && dracoLoader) {
      loader.setDRACOLoader(dracoLoader)
    }
  }
}

/**
 * Loads a GLTF file and returns a THREE.Object3D.
 *
 * @export
 * @param {(string | string[])} path
 * @param {GLTFLoaderOptions} [options]
 *
 *
 * @param {(loader: GLTFLoader) => void} [extendLoader]
 * @return {*}  {Promise<GLTFResult>}
 */
export async function useGLTF<T extends string | string[]>(
  path: T,
  options: GLTFLoaderOptions = { draco: false },
  extendLoader?: (loader: GLTFLoader) => void,
): Promise<T extends string[] ? GLTFResult[] : GLTFResult> {
  const dracoLoader = options.draco
    ? await createDRACOLoader(
      options.decoderPath
      || 'https://www.gstatic.com/draco/versioned/decoders/1.4.3/',
    )
    : null
  const gltfModel = (await useLoader(
    GLTFLoader,
    path,
    setExtensions(options, dracoLoader, extendLoader),
  )) as unknown as GLTFResult
  dracoLoader?.dispose()
  return gltfModel
}
