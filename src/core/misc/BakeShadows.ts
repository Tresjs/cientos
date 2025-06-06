import { useTres } from '@tresjs/core'
import { defineComponent, watchEffect } from 'vue'

export const BakeShadows = defineComponent({
  name: 'BakeShadows',

  setup() {
    const { renderer } = useTres()

    watchEffect(() => {
      renderer.shadowMap.autoUpdate = false
      renderer.shadowMap.needsUpdate = true
    })
  },
})
