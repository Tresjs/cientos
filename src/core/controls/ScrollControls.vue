<script setup lang="ts">
import { watch, ref } from 'vue'
import { useWindowScroll, useWindowSize, useScroll } from '@vueuse/core'
import { useCientos } from '../../core/useCientos'
import { useRenderLoop, useLogger } from '@tresjs/core'
import { Camera } from 'three'
import { greaterThanZero } from '../../utils'

export interface ScrollControlsProps {
  /**
   * Whether to make this the default controls.
   *
   * @default false
   * @type {boolean}
   * @memberof ScrollControlsProps
   * @see https://threejs.org/docs/#examples/en/controls/MapControls
   */
  makeDefault?: boolean
  /**
   * The camera to control.
   *
   * @type {Camera}
   * @memberof ScrollControlsProps
   * @see https://threejs.org/docs/#examples/en/controls/MapControls
   */
  camera?: Camera
  /**
   * The scroll size.
   *
   * @type {Number}
   * @default 4
   * @memberof ScrollControlsProps
   */
  pages?: number
  /**
   * The distance to move the camera.
   *
   * @type {Number}
   * @default 4
   * @memberof ScrollControlsProps
   */
  distance?: number
  /**
   * The smooth factor of the scrolling.
   *
   * @type {Number}
   * @default 4
   * @memberof ScrollControlsProps
   */
  toLerp?: number
  /**
   * Whether the scroll is horizontal or vertical.
   *
   * @type {Boolean}
   * @default false
   * @memberof ScrollControlsProps
   */
  horizontal?: boolean
  /**
   * Whether to use the HTML scroll.
   *
   * @type {Boolean}
   * @default false
   * @memberof ScrollControlsProps
   */
  htmlScroll?: boolean
}

// TODO: remove disable once eslint is updated to support vue 3.3
// eslint-disable-next-line vue/no-setup-props-destructure
const {
  pages = 4,
  distance = 4,
  toLerp = 0.1,
  horizontal = false,
  htmlScroll = true,
  makeDefault = false,
  camera = Camera,
} = defineProps<ScrollControlsProps>()

greaterThanZero('toLerp', toLerp)
greaterThanZero('pages', pages)
greaterThanZero('distance', distance)

// TODO add scrollStatics
const { logWarning } = useLogger()
const { state } = useCientos()

const scrollContainer = document.createElement('div')
const fixed = document.createElement('div')
const fill = document.createElement('div')

const { y: windowY } = useWindowScroll()
const { x: containerX, y: containerY } = useScroll(scrollContainer)
const { height, width } = useWindowSize()

let initCameraPos = 0

const progress = ref(0)
const scrollNodeY = ref(0)
const direction = horizontal ? 'x' : 'y'

const emit = defineEmits(['update:progress'])

watch(state, value => {
  console.log('jaime ~ camera:', value) // se ejecuta 4 veces
  initCameraPos = horizontal ? value.camera.position.x : value.camera.position.y
})

watch(windowY, value => {
  const progressScroll = (value / height.value / (scrollNodeY.value / height.value - 1)).toFixed(2)
  progress.value = +progressScroll
  progress.value *= -1
  emit('update:progress', progressScroll)
})
watch(containerY, value => {
  const progressScroll = (value / height.value / (scrollNodeY.value / height.value)).toFixed(2)
  progress.value = +progressScroll
  progress.value *= -1
  emit('update:progress', progressScroll)
})
watch(containerX, value => {
  const progressScroll = (value / width.value / (scrollNodeY.value / width.value - 1)).toFixed(2)
  progress.value = +progressScroll
  emit('update:progress', progressScroll)
})

watch(state.container, value => {
  const canvasHeight = state.container.value.getBoundingClientRect().height
  if (htmlScroll) {
    // use window scroll only Y axis
    value.style.height = '100vh'
    value.style.position = 'fixed'
    value.style.zIndex = -99999
    value.style.width = '100%'
    value.style.top = 0
    value.style.left = 0
    scrollNodeY.value = document.body.scrollHeight
  } else if (canvasHeight === height.value && state.canvas) {
    // use container scroll
    scrollContainer.style.position = 'absolute'
    scrollContainer.style.width = '100%'
    scrollContainer.style.height = '100%'
    scrollContainer.style[horizontal ? 'overflowX' : 'overflowY'] = 'auto'
    scrollContainer.style[horizontal ? 'overflowY' : 'overflowX'] = 'hidden'
    scrollContainer.style.top = '0px'
    scrollContainer.style.left = '0px'

    fixed.style.position = 'sticky'
    fixed.style.top = '0px'
    fixed.style.left = '0px'
    fixed.style.width = '100%'
    fixed.style.height = '100%'
    fixed.style.overflow = 'hidden'
    scrollContainer.appendChild(fixed)

    fill.style.height = horizontal ? '100%' : `${height.value * pages}px`
    fill.style.width = horizontal ? `${width.value * pages}px` : '100%'
    fill.style.pointerEvents = 'none'
    scrollContainer.appendChild(fill)
    value.appendChild(scrollContainer)
    scrollNodeY.value = horizontal ? width.value * pages : height.value * pages
  } else {
    // use scroll when height is less than window height
    logWarning('Currently scroll controls work only with window-size prop')
  }
})

const { onLoop } = useRenderLoop()

onLoop(() => {
  if (state.camera?.position) {
    state.camera.position[direction] +=
      (progress.value * distance - state.camera.position[direction] + initCameraPos) * toLerp
  }
})

// defineExpose({
//   scrollStatics
// })
</script>
<template>
  <slot />
</template>
<style scoped></style>
