import { onUnmounted, onMounted } from 'vue'
import { Pane } from 'tweakpane'
import { useRenderLoop } from '@tresjs/core'
import { useLogger } from '../../../composables/useLogger'

type TweakPane = Pane & { addBlade(blade: any): void }
let pane: TweakPane
let fpsGraph: any

export /**
 * Creates a TweakPane instance and returns it.
 *
 * @param {string} [selector='body']
 * @return {*}
 */
  const useTweakPane = (selector = 'body') => {
    if (!pane) {
      pane = new Pane({
        container: document.querySelector(selector) as HTMLElement,
      }) as TweakPane
      pane.element.style.position = 'absolute'
      pane.element.style.top = '1rem'
      pane.element.style.right = '1rem'
      pane.element.style.zIndex = '9999'
    }

    const { logWarning } = useLogger()

    logWarning('useTweakPane is going to be deprecated soon and will no longer be part of this package, please start migrating to @tresjs/leches package https://github.com/Tresjs/leches or v-tweakpane https://github.com/vinayakkulkarni/v-tweakpane instead.')

    /**
     * Disposes the TweakPane instance.
     *
     */
    function disposeTweakPane() {
      if (pane) {
        pane.dispose()
      }
    }

    onMounted(() => {
      const { onBeforeLoop, onAfterLoop, resume } = useRenderLoop()
      resume()
      onBeforeLoop(() => fpsGraph.begin())
      onAfterLoop(() => fpsGraph.end())
    })
    onUnmounted(() => {
      disposeTweakPane()
    })

    return { pane, fpsGraph, disposeTweakPane }
  }
