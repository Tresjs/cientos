import { watch } from 'vue'
import { useTresContext } from '@tresjs/core' // Replace with the actual import path

export function useOnDemandInvalidation(props: Record<string, any>) {
  const { render, invalidate } = useTresContext()

  function invalidateOnDemand() {
    if (render.mode.value === 'on-demand') {
      invalidate()
    }
  }

  watch(props, () => {
    invalidateOnDemand()
  })

  return {
    invalidateOnDemand,
  }
}
