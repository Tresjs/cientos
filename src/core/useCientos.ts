import { useTresContext, type TresContext } from '@tresjs/core'
import { EventDispatcher } from 'three'

import { Ref, inject, ref } from 'vue'

export interface CientosReturn extends ReturnType<TresContext> {
  controls: Ref<(EventDispatcher & { enabled: boolean }) | null>
  extend: (objects: any) => void
}
export function useCientos(): CientosReturn {
  const controls: Ref<(EventDispatcher & { enabled: boolean }) | null> = ref(null)

  const extend =
    inject<(objects: any) => void>('extend') ||
    (() => {
      /* logWarning('No extend function provided') */
    })

  return {
    controls,
    ...useTresContext(),
    extend
  }
}
