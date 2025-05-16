import { useTresContext } from '@tresjs/core'
import { defineComponent, watchEffect } from 'vue'

export const BakeShadows = defineComponent({
  name: 'BakeShadows',

  setup() {
    const { renderer } = useTresContext()

    watchEffect(() => {
      renderer.instance.value.shadowMap.autoUpdate = false
      renderer.instance.value.shadowMap.needsUpdate = true
    })
  },
})
