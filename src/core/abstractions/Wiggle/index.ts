import { WiggleBone as WiggleSpringBone } from 'wiggle/spring'
import { WiggleBone } from 'wiggle'
import type { Bone, Object3D, SkinnedMesh } from 'three'
import { WiggleRigHelper } from 'wiggle/helper'
import { useRenderLoop, useTresContext } from '@tresjs/core'
import { isRef, ref, watch } from 'vue'

/**
 * Hook useWiggle: applies the wiggle effect to the bones of the model.
 *
 * @param {Object3D} model - The 3D model to apply the wiggle effect to.
 * @param {object} options - The options for useWiggle.
 * @param {boolean} [options.debug] - Enable or disable debug mode.
 * @param {boolean|object} [options.basic] - Enable or disable basic mode with options.
 * @param {boolean|object} [options.spring] - Enable or disable spring mode with options.
 * @param {object} [options.helper] - The parameters for WiggleRigHelper.
 *
 */

interface UseWiggleProps {
  debug?: boolean
  basic?: boolean | object
  spring?: boolean | object
  helper?: object
}

export function useWiggle(model: Object3D, { debug = false, basic = true, spring = false, helper }: UseWiggleProps) {
  if (!model) {
    console.error('No model provided')
    return
  }

  const { scene } = useTresContext()
  const { onLoop } = useRenderLoop()

  const skinnedMesh = model.getObjectByProperty('type', 'SkinnedMesh') as SkinnedMesh

  if (!skinnedMesh) { return }

  const skeleton = skinnedMesh.skeleton

  if (!skeleton) { return }

  const wiggleBones: WiggleBone[] = []

  const wiggleHelper = new WiggleRigHelper({
    skeleton,
    ...helper,
  })

  if (debug) {
    // Prevent dispose issue on Unmount caused by the memory clean up
    // of tresjs (WiggleRighelper is not a Tresjs object)
    delete Object.getPrototypeOf(wiggleHelper).dispose

    scene.value.add(wiggleHelper)
  }

  const basicRef = isRef(basic) ? basic : ref(basic)
  const springRef = isRef(spring) ? spring : ref(spring)

  if (springRef.value) {
    basicRef.value = !basicRef.value
  }

  const isBasicMode = basicRef.value && (typeof basicRef.value === 'boolean' || typeof basicRef.value === 'object')
  const isSpringMode = springRef.value && (typeof springRef.value === 'boolean' || typeof springRef.value === 'object')

  let rootBone: Bone | undefined

  skeleton.bones.forEach((bone: Bone) => {
    if (!bone.parent || bone.parent.type !== 'Bone') {
      rootBone = bone
    }
    else {
      if (isBasicMode) {
        if (typeof basicRef.value === 'boolean') {
          const wiggleBone = new WiggleBone(bone)
          wiggleBones.push(wiggleBone)
        }
        else if (typeof basicRef.value === 'object') {
          const wiggleBone = new WiggleBone(bone, basicRef.value)
          wiggleBones.push(wiggleBone)
        }
      }

      if (isSpringMode) {
        if (typeof springRef.value === 'boolean') {
          const wiggleBone = new WiggleSpringBone(bone)
          wiggleBones.push(wiggleBone)
        }
        else if (typeof springRef.value === 'object') {
          const wiggleBone = new WiggleSpringBone(bone, springRef.value)
          wiggleBones.push(wiggleBone)
        }
      }
    }
  })

  onLoop(() => {
    if (!wiggleBones.length) { return }

    wiggleBones.forEach(wb => wb.update())
  })

  if (isBasicMode && typeof basicRef.value === 'object') {
    watch(basicRef, () => {
      if (!basicRef) { return }

      wiggleBones.forEach((wb) => {
        wb.options = basicRef.value
      })
    })
  }

  if (isSpringMode && typeof springRef.value === 'object') {
    watch(springRef, () => {
      wiggleBones.forEach((wb) => {
        // Ensure the new values are applied to the springs
        wb.springX.updateConfig(springRef.value)
        wb.springY.updateConfig(springRef.value)
        wb.springZ.updateConfig(springRef.value)
      })
    })
  }

  return {
    wiggleHelper,
    wiggleBones,
    rootBone,
  }
}
