import { useTresContext } from '@tresjs/core'
import { EventDispatcher } from 'three'

import { Ref, inject, ref, toRefs, watchEffect } from 'vue'
/* import { useLogger } from '@tresjs/core' */
/**
 * Allows to use and extend the state of the core package.
 *
 * @export
 * @return {*}
 */
export function useCientos() {
  const { renderer, camera, scene } = useTresContext()
  const controls: Ref<(EventDispatcher & { enabled: boolean }) | null> = ref()

  const extend =
    inject<(objects: any) => void>('extend') ||
    (() => {
      /* logWarning('No extend function provided') */
    })

  return {
    controls,
    camera,
    renderer,
    scene,
    extend
  }
}
