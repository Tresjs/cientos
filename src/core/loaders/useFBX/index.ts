import type { TresObject } from '@tresjs/core'
import { buildGraph, useLoader } from '@tresjs/core'

import { computed, type MaybeRef, watch } from 'vue'

import { FBXLoader } from 'three-stdlib'

export interface UseFBXOptions {
  /**
   * A traverse function applied to the scene upon loading the model.
   * @type {Function}
   */
  traverse?: (child: TresObject) => void
}

/**
 * Vue composable for loading FBX models in TresJS
 *
 * @remarks
 * This composable uses Three.js FBXLoader under the hood to load FBX 3D models.
 * The loaded model is automatically parsed and made available as a reactive state.
 *
 * @example
 * ```ts
 * const { state: model } = useFBX('/path/to/model.fbx')
 * ```
 *
 * @param {MaybeRef<string>} path - Path to the FBX model file
 * @returns {{ state: Group, isLoading: boolean, execute: () => Promise<void>, nodes: object, materials: object }} Object containing the model state, loading state, reload function, and parsed nodes/materials
 */
export function useFBX(path: MaybeRef<string>, options?: UseFBXOptions) {
  const result = useLoader(FBXLoader, path)
  if (options?.traverse) {
    watch(result.state, (state) => {
      // GLTF loader types aren't aligned with Three.js types
      state.traverse(child => options.traverse?.(child as TresObject))
    })
  }

  // Extract nodes from the loaded FBX model for easy access
  const nodes = computed(() => {
    return result.state.value ? buildGraph(result.state.value as unknown as TresObject).nodes : {}
  })

  // Extract materials from the loaded FBX model for easy access
  const materials = computed(() => {
    return result.state.value ? buildGraph(result.state.value as unknown as TresObject).materials : {}
  })

  return {
    ...result,
    nodes,
    materials,
  }
}
