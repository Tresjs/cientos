import { useLoop } from '@tresjs/core'
import { AnimationMixer } from 'three'
import { ref, shallowReactive, unref, watch } from 'vue'
import type { AnimationAction, AnimationClip, Object3D } from 'three'
import type { MaybeRef, Ref } from 'vue'

/**
 * Creates an AnimationMixer and returns it.
 *
 * @export
 * @template T
 * @param {T[]} animations
 * @param {(Scene | Ref<Object3D | undefined | null>)} [modelRef]
 * @return {*}
 */
export function useAnimations<T extends AnimationClip>(
  animations: MaybeRef<T[]>,
  modelRef?: MaybeRef<Object3D | undefined | null>,
) {
  const reference: Ref<Object3D> = ref(modelRef) as Ref<Object3D>

  const mixer = new AnimationMixer(reference.value)

  const actions = shallowReactive<{ [key: string]: AnimationAction | undefined }>({})

  const setupActions = () => {
    const items = unref(animations)
    if (items && items.length > 0) {
      Object.keys(actions).forEach(key => delete actions[key])
      items.forEach((animation: T) => {
        const action = mixer.clipAction(animation, reference.value)
        actions[animation.name] = action
      })
    }
  }

  watch(animations, setupActions, { deep: true, immediate: true })

  watch(reference, (newRef) => {
    if (newRef) {
      mixer.uncacheRoot(reference.value)
      reference.value = newRef
      setupActions()
    }
  })

  const { onBeforeRender } = useLoop()

  onBeforeRender(({ delta }) => {
    mixer.update(delta)
  })

  return {
    actions,
    mixer,
  }
}
