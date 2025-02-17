<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { useElementBounding, useElementSize, useMouse, useWindowSize } from '@vueuse/core'
import type { UseMouseEventExtractor } from '@vueuse/core'
import { Html } from '../../index'

const emit = defineEmits(['updateTransform'])

let dragTransform, dragScaleRotation

gsap.registerPlugin(Draggable)

const container = ref<HTMLElement | null>(null)
const outline = ref<HTMLElement | null>(null)
const wrapper = ref<HTMLElement | null>(null)
const handle = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const resizerIsActive = ref(false)
const isGrabbing = ref(false)
const angle = ref(0)

const { width: windowWidth, height: windowHeight } = useWindowSize()

const { width: wrapperWidth, height: wrapperHeight } = useElementSize(wrapper)
const { width, height, left, top } = useElementBounding(container)

const extractor: UseMouseEventExtractor = (event) => {
  if (event instanceof Touch) { return null }

  const offsetX = event.clientX
  const offsetY = event.clientY

  return [offsetX, offsetY]
}

const { x: xWindow, y: yWindow } = useMouse({ type: extractor })

const origSize = reactive({ width: 0, height: 0 })
const len1 = ref(0)
const angle1 = ref(0)
const scale = ref(1)

watch([xWindow, yWindow], () => {
  if (isGrabbing.value) { return }

  const centerX = left.value
  const centerY = top.value

  const distX = xWindow.value - centerX
  const distY = yWindow.value - centerY
  const distance = Math.sqrt(distX * distX + distY * distY)

  const radius = Math.min(wrapperWidth.value, wrapperHeight.value) / 2
  const distanceNormalized = distance / radius

  resizerIsActive.value = distanceNormalized < 1.05 && distanceNormalized > 0.95

  const angleRad = Math.atan2(distY, distX)
  angle.value = angleRad + Math.PI / 2
})

watch(resizerIsActive, () => {
  // if (resizerIsActive.value) {
  //   dragTransform[0].disable()
  //   dragScaleRotation[0].enable()
  // }
  // else {
  //   dragTransform[0].enable()
  //   dragScaleRotation[0].disable()
  // }
})

origSize.width = wrapperWidth.value
origSize.height = wrapperHeight.value

const origVector = {
  x: 0,
  y: -origSize.height / 2,
}

len1.value = Math.sqrt(origVector.x * origVector.x + origVector.y * origVector.y)

const v1 = {
  x: origVector.x / len1.value,
  y: origVector.y / len1.value,
}

angle1.value = Math.atan2(v1.y, v1.x)

onMounted(() => {
  console.log(container.value, handle.value, outline.value, wrapper.value)
  gsap.set([container.value, handle.value, outline.value, wrapper.value], {
    xPercent: -50,
    yPercent: -50,
  })

  gsap.set(outline.value, {
    width: origSize.width,
    height: origSize.height,
  })

  gsap.set(handle.value, {
    x: origVector.x,
    y: origVector.y,
    rotation: angle1.value,
  })

  dragTransform = Draggable.create(container.value, {
    onDrag(this: Draggable) {
      updateTransformData(scale.value, angle.value, this.x, this.y)
    },
  })

  dragScaleRotation = Draggable.create(handle.value, {
    onPress: stopPropagation,
    onRelease: () => { isGrabbing.value = false },
    onDrag(this: Draggable) {
      transformItems(this)
    },
  })
})

function getCenteredPosition(x: number, y: number) {
  const centerX = windowWidth.value / 2
  const centerY = windowHeight.value / 2

  return {
    x: x - centerX,
    y: y - centerY,
  }
}

function updateTransformData(scaleValue: number, rotationValue: number, posX: number, posY: number) {
  emit('updateTransform', {
    scale: scaleValue,
    rotation: rotationValue,
    position: { x: posX, y: posY },
  })
}

function transformItems(self: Draggable) {
  const v2 = {
    x: self.x,
    y: self.y,
  }

  const len2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y)

  if (len2) {
    v2.x /= len2
    v2.y /= len2
  }

  const angle = Math.atan2(v2.y, v2.x) - angle1.value

  scale.value = len2 / len1.value

  gsap.set(outline.value, {
    width: origSize.width * scale.value,
    height: origSize.height * scale.value,
    rotation: `${angle}_rad`,
  })

  gsap.set(wrapper.value, {
    scale: scale.value,
    rotation: `${angle}_rad`,
  })

  gsap.set(handle.value, {
    // rotation: Math.atan2(-self.y, -self.x) * (180 / Math.PI) + 90,
  })

  const { x: posX, y: posY } = getCenteredPosition(left.value, top.value)

  updateTransformData(scale.value, angle, posX, posY)
}

function stopPropagation(event) {
  event.stopPropagation()

  isGrabbing.value = true
  console.log('start drag')
}

function updatePosition() {
  console.log('update position resizer')
  // const { x: posX, y: posY } = getCenteredPosition(left.value, top.value)

  // updateTransformData(scale.value, angle.value, posX, posY)
}

defineExpose({ updatePosition, instance: container })
</script>

<template>
  <Html
    center
  >
    <div ref="container" class="container" :class="{ hide: !isVisible }">
      <div ref="wrapper" class="wrapper"></div>
      <span ref="outline" class="outline">outline</span>
      <span class="dot-center"></span>
      <div ref="handle" class="handle">handle</div>
    </div>
  </Html>
</template>

<style scoped>
.container,
.wrapper,
.outline,
.handle {
  position: absolute;
  top: 50%;
  left: 50%;
}

.container.hide {
  /* opacity: 0;
  pointer-events: none; */
}

.dot-center {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.wrapper {
  width: 450px;
  height: 450px;
  border-radius: 50%;
  /* background-color: rgba(255, 0, 0, 0.513); */
}

.handle {
  width: 50px;
  height: 12px;
  border-radius: 5px;
  background-color: white;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 3px #00000080;
}

.outline {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  outline: 5px dashed white;
}
</style>
