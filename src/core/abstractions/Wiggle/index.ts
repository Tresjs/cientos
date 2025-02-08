import { WiggleBone as WiggleSpringBone } from 'wiggle/spring'
import { WiggleBone } from 'wiggle'
import type { Bone, Object3D, SkinnedMesh } from 'three'
import { WiggleRigHelper } from 'wiggle/helper'
import { useRenderLoop, useTresContext } from '@tresjs/core'
import { isRef, ref, watch } from 'vue'

/**
 * Hook useWiggle : applique l'effet wiggle aux bones du modèle.
 *
 * @param {Object3D} model - Le modèle 3D auquel appliquer l'effet wiggle.
 * @param {object} options - Les options pour useWiggle.
 * @param {boolean} [options.debug] - Activer ou désactiver le mode debug.
 * @param {boolean|object} [options.basic] - Activer ou désactiver le mode basic avec options.
 *
 */

interface UseWiggleProps {
  debug?: boolean
  basic?: boolean | { velocity?: number }
  spring?: boolean | { stiffness?: number, damping?: number }
  helper?: object
}

export function useWiggle(model: Object3D, { debug = false, basic = true, spring = false, helper }: UseWiggleProps) {
  if (!model) {
    console.error('No model provided')
    return
  }

  console.log('ehlper', helper)

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

  onLoop(({ elapsed }) => {
    if (!wiggleBones.length || !rootBone) { return }

    rootBone.position.x = 2 * Math.sin(3 * elapsed)
    rootBone.position.y = 1 * Math.sin(3 * elapsed)

    wiggleBones.forEach(wb => wb.update())
  })

  if (isBasicMode) {
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
    // wiggleHelper,
    wiggleBones,
    rootBone,
  }
}
