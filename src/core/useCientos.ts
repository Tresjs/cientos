import { TresState, useTresContext } from '@tresjs/core'
import { watch } from 'fs'
import { inject, toRefs, watchEffect } from 'vue'
/* import { useLogger } from '@tresjs/core' */
/**
 * Allows to use and extend the state of the core package.
 *
 * @export
 * @return {*}
 */
export function useCientos() {
  /* const { logWarning } = useLogger() */
  const { renderer, camera, scene, cameras } = inject<TresState>('useTres', useTresContext())

  watchEffect(() => {
    console.log('useCientos watchEffect', camera.value)
  })
  const extend =
    inject<(objects: any) => void>('extend') ||
    (() => {
      /* logWarning('No extend function provided') */
    })

  return {
    camera,
    renderer,
    extend
  }
}
