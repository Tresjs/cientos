import { defineComponent, onUnmounted, watch } from 'vue'
import { AudioListener, Audio, AudioLoader } from 'three'
import { useEventListener } from '@vueuse/core'
import { useTresContext } from '@tresjs/core'

export interface AudioProps {
  /**
   * Path to your audio file.
   * @type {string}
   * @memberof AudioProps
   *
   */
  src: string
  /**
   * Id of the DOM element that trigger the play/pause state.
   * @type {string}
   * @memberof AudioProps
   * @default renderer.domElement
   *
   */
  playTrigger?: string
  /**
   * Id of the DOM element that trigger the stop state.
   * @type {string}
   * @memberof AudioProps
   * @default
   *
   */
  stopTrigger?: string
  /**
   * If the audio must be replayed when ends.
   * @type {boolean}
   * @memberof AudioProps
   * @default false
   *
   */
  loop?: boolean
  /**
   * Volume of the audio.
   * @type {number}
   * @memberof AudioProps
   * @default 0.5
   *
   */
  volume?: number
  /**
   * PlaybackRate of the audio.
   * @type {number}
   * @memberof AudioProps
   * @default 1
   *
   */
  playbackRate?: number

}

export const GlobalAudio = defineComponent<AudioProps>({
  name: 'GlobalAudio',
  props: [
    'src',
    'loop',
    'volume',
    'playbackRate',
    'playTrigger',
    'stopTrigger',
  ] as unknown as undefined,

  async setup(props, { expose, emit }) {

    const { camera, renderer } = useTresContext()

    const listener = new AudioListener()
    camera.value?.add( listener )

    const sound = new Audio( listener )
    const audioLoader = new AudioLoader()

    expose({ sound })

    onUnmounted(() => {
      if (sound) {
        sound.disconnect()
      }
    })

    watch(() => [props.playbackRate], () => sound.setPlaybackRate( props.playbackRate ?? 1 ), { immediate: true })
    watch(() => [props.volume], () => sound.setVolume( props.volume ?? 0.5 ), { immediate: true })
    watch(() => [props.loop], () => sound.setLoop( props.loop ?? false ), { immediate: true })
    watch(() => [props.src], async () => {
      const buffer = await audioLoader.loadAsync( props.src)
      sound.setBuffer( buffer )
      
    }, { immediate: true })
    
    const selector = document.getElementById(props.playTrigger ?? '')
    const btnPlay = selector ? selector : renderer.value.domElement
    useEventListener(btnPlay, 'click', () => {
      if (sound.isPlaying) {
        sound.pause()
      }
      else sound.play()
      emit('isPlaying', sound.isPlaying)
    })

    const btnStop = document.getElementById(props.stopTrigger ?? '')
    if (btnStop) {
      useEventListener(btnStop, 'click', () => {
        sound.stop()
        emit('isPlaying', sound.isPlaying)
      })
    }
    return null
  },
})
