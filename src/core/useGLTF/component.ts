import { TresObject } from '@tresjs/core';
import { Vector3 } from 'three';
import { defineComponent, ref } from 'vue'
import { useGLTF } from '.'
import { useCientos } from '../useCientos'

export interface GLTFModelProps {
  /**
   *
   * The path to the GLTF file.
   *
   * @type {string}
   * @required
   * @memberof GLTFModelProps
   *
   **/
  path: string
  /**
   *
   * Whether to use Draco compression.
   *
   * @type {boolean}
   * @default false
   * @memberof GLTFModelProps
   *
   **/
  draco?: boolean
  /**
   *
   * The path to the Draco decoder.
   *
   * @type {string}
   * @default 'https://www.gstatic.com/draco/versioned/decoders/1.4.1/'
   * @memberof GLTFModelProps
   *
   **/
  decoderPath?: string
}

export const GLTFModel = defineComponent<GLTFModelProps>({
  name: 'GLTFModel',
  props: ['path', 'draco', 'decoderPath'] as unknown as undefined,

  async setup(props, { expose, attrs }) {
    const { state } = useCientos()
    
    const model = ref<TresObject>()

    expose({model})
 
    const { scene } = await useGLTF(props.path as string, { draco: props.draco, decoderPath: props.decoderPath })

    model.value = scene as unknown as TresObject

    if (state.scene) {
      Object.keys(attrs).map(key => {
        if(key === 'position' || key === 'scale' || key === 'rotation'){
          scene[key].set(attrs[key][0], attrs[key][1], attrs[key][2])
        } else if(key === "castShadow" || key === "receiveShadow" || key === "visible" || key === "frustumCulled" || key === "renderOrder" || key === "name") {
          scene[key] = attrs[key]
          console.log('jaime ~ Object.keys ~ attrs[key]:', key);
          console.log('jaime ~ Object.keys ~ attrs[key]:', scene[key]);
        }
      })
      state.scene.add(scene)
    }
    return () => {
      scene
    }
  },
})
