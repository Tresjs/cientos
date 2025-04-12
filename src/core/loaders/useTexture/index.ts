import { useLoader } from '@tresjs/core'
import { TextureLoader } from 'three'
import type { MaybeRef } from 'vue'

export function useTexture(path: MaybeRef<string>) {
  const result = useLoader(TextureLoader, path)

  return result
}
