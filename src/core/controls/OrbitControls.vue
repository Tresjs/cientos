<script lang="ts" setup>
import { useLoop, useTresContext } from '@tresjs/core'
import { useEventListener } from '@vueuse/core'
import { MOUSE, TOUCH } from 'three'
import { OrbitControls } from 'three-stdlib'
import { onUnmounted, shallowRef, toRefs, watch } from 'vue'
import type { TresVector3 } from '@tresjs/core'
import type { Camera } from 'three'

export interface OrbitControlsProps {
  /**
   * Whether to make this the default controls.
   *
   * @default false
   * @type {boolean}
   * @memberof OrbitControlsProps
   */
  makeDefault?: boolean
  /**
   * The camera to control.
   *
   * @type {Camera}
   * @memberof OrbitControlsProps
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls.camera
   */
  camera?: Camera
  /**
   * The dom element to listen to.
   *
   * @type {HTMLElement}
   * @memberof OrbitControlsProps
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls.domElement
   */
  domElement?: HTMLElement
  /**
   * The target to orbit around.
   *
   * @type {TresVector3}
   * @memberof OrbitControlsProps
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls.target
   */
  target?: TresVector3
  /**
   * Whether to enable damping (inertia)
   *
   * @default false
   * @type {boolean}
   * @memberof OrbitControlsProps
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls.enableDamping
   */
  enableDamping?: boolean
  /**
   * The damping inertia used if `.enableDamping` is set to true
   *
   * @default 0.05
   * @type {number}
   * @memberof OrbitControlsProps
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls.dampingFactor
   */
  dampingFactor?: number
  /**
   * Set to true to automatically rotate around the target.
   *
   * @default false
   * @type {boolean}
   * @memberof OrbitControlsProps
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls.autoRotate
   */
  autoRotate?: boolean
  /**
   * How fast to rotate around the target if `.autoRotate` is true.
   *
   * @default 2
   * @type {number}
   * @memberof OrbitControlsProps
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls.autoRotateSpeed
   */
  autoRotateSpeed?: number
  /**
   * Whether to enable panning.
   *
   * @default true
   * @type {boolean}
   * @memberof OrbitControlsProps
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls.enablePan
   */
  enablePan?: boolean
  /**
   * How fast to pan the camera when the keyboard is used. Default is 7.0 pixels per keypress.
   *
   * @default 7.0
   * @type {number}
   * @memberof OrbitControlsProps
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls.keyPanSpeed
   */
  keyPanSpeed?: number
  /**
   * This object contains references to the keycodes for controlling camera panning.
   * Default is the 4 arrow keys.
   *
   * @default `{ LEFT: 'ArrowLeft', UP: 'ArrowUp', RIGHT: 'ArrowRight', BOTTOM: 'ArrowDown' }`
   * @type Record<string, string>
   * @memberof OrbitControlsProps
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls.keys
   */
  keys?: Record<string, string>
  /**
   * How far you can orbit horizontally, upper limit.
   * If set, the interval [ min, max ] must be a sub-interval of [ - 2 PI, 2 PI ],
   * with ( max - min < 2 PI ). Default is Infinity.
   *
   * @default Infinity
   * @type {number}
   * @memberof OrbitControlsProps
   * @see https://threejs.org/docs/index.html?q=orbi#examples/en/controls/OrbitControls.maxAzimuthAngle
   */
  maxAzimuthAngle?: number
  /**
   * How far you can orbit horizontally, lower limit.
   * If set, the interval [ min, max ] must be a sub-interval of [ - 2 PI, 2 PI ],
   * with ( max - min < 2 PI ).
   * Default is - Infinity.
   *
   * @default -Infinity
   * @type {number}
   * @memberof OrbitControlsProps
   * @see https://threejs.org/docs/index.html?q=orbi#examples/en/controls/OrbitControls.minAzimuthAngle
   */
  minAzimuthAngle?: number
  /**
   * How far you can orbit vertically, upper limit.
   * Range is 0 to Math.PI radians, and default is Math.PI.
   *
   * @default Math.PI
   * @type {number}
   * @memberof OrbitControlsProps
   * @see https://threejs.org/docs/index.html?q=orbi#examples/en/controls/OrbitControls.maxPolarAngle
   */
  maxPolarAngle?: number
  /**
   * How far you can orbit vertically, lower limit.
   * Range is 0 to Math.PI radians, and default is 0.
   *
   * @default 0
   * @type {number}
   * @memberof OrbitControlsProps
   * @see https://threejs.org/docs/index.html?q=orbi#examples/en/controls/OrbitControls.minPolarAngle
   */
  minPolarAngle?: number
  /**
   * The minimum distance of the camera to the target.
   * Default is 0.
   *
   * @default 0
   * @type {number}
   * @memberof OrbitControlsProps
   * @see https://threejs.org/docs/index.html?q=orbi#examples/en/controls/OrbitControls.minDistance
   */
  minDistance?: number
  /**
   * The maximum distance of the camera to the target.
   * Default is Infinity.
   *
   * @default Infinity
   * @type {number}
   * @memberof OrbitControlsProps
   * @see https://threejs.org/docs/index.html?q=orbi#examples/en/controls/OrbitControls.maxDistance
   */
  maxDistance?: number
  /**
   * The minimum field of view angle, in radians.
   * Default is 0.
   *
   * @default 0
   * @type {number}
   * @memberof OrbitControlsProps
   * @see https://threejs.org/docs/index.html?q=orbi#examples/en/controls/OrbitControls.minZoom
   */
  minZoom?: number
  /**
   * The maximum field of view angle, in radians.
   * ( OrthographicCamera only ).
   * Default is Infinity.
   *
   * @default Infinity
   * @type {number}
   * @memberof OrbitControlsProps
   * @see https://threejs.org/docs/index.html?q=orbi#examples/en/controls/OrbitControls.maxZoom
   */
  maxZoom?: number
  touches?: {
    ONE?: number | undefined
    TWO?: number | undefined
  }
  /**
   * Whether to enable zooming.
   *
   * @default true
   * @type {boolean}
   * @memberof OrbitControlsProps
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls.enableZoom
   */
  enableZoom?: boolean
  /**
   * How fast to zoom in and out. Default is 1.
   *
   * @default 1
   * @type {number}
   * @memberof OrbitControlsProps
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls.zoomSpeed
   */
  zoomSpeed?: number
  /**
   * Whether to enable rotating.
   *
   * @default true
   * @type {boolean}
   * @memberof OrbitControlsProps
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls.enableRotate
   */
  enableRotate?: boolean
  /**
   * How fast to rotate around the target. Default is 1.
   *
   * @default 1
   * @type {number}
   * @memberof OrbitControlsProps
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls.rotateSpeed
   */
  rotateSpeed?: number
  /**
   * This object contains references to the mouse actions used by the controls.
   * LEFT: Rotate around the target
   * MIDDLE: Zoom the camera
   * RIGHT: Pan the camera
   *
   * @default { LEFT: MOUSE.ROTATE, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.PAN }
   * @type {{ LEFT?: number, MIDDLE?: number, RIGHT?: number }}
   * @memberof OrbitControlsProps
   * @see https://threejs.org/docs/#examples/en/controls/OrbitControls.mouseButtons
   */
  mouseButtons?: {
    LEFT?: number
    MIDDLE?: number
    RIGHT?: number
  }
}

const props = withDefaults(defineProps<OrbitControlsProps>(), {
  makeDefault: false,
  autoRotate: false,
  autoRotateSpeed: 2,
  enableDamping: true,
  dampingFactor: 0.05,
  enablePan: true,
  keyPanSpeed: 7,
  maxAzimuthAngle: Number.POSITIVE_INFINITY,
  minAzimuthAngle: Number.NEGATIVE_INFINITY,
  maxPolarAngle: Math.PI,
  minPolarAngle: 0,
  minDistance: 0,
  maxDistance: Number.POSITIVE_INFINITY,
  minZoom: 0,
  maxZoom: Number.POSITIVE_INFINITY,
  enableZoom: true,
  zoomSpeed: 1,
  enableRotate: true,
  touches: () => ({ ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN }),
  rotateSpeed: 1,
  target: () => [0, 0, 0],
  mouseButtons: () => ({ LEFT: MOUSE.ROTATE, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.PAN }),
})

const emit = defineEmits(['change', 'start', 'end'])

const {
  makeDefault,
  autoRotate,
  autoRotateSpeed,
  enableDamping,
  dampingFactor,
  enablePan,
  keyPanSpeed,
  maxAzimuthAngle,
  minAzimuthAngle,
  maxPolarAngle,
  minPolarAngle,
  minDistance,
  maxDistance,
  minZoom,
  maxZoom,
  enableZoom,
  zoomSpeed,
  enableRotate,
  touches,
  rotateSpeed,
  target,
  mouseButtons,
} = toRefs(props)

const { camera: activeCamera, renderer, extend, controls, invalidate } = useTresContext()

const controlsRef = shallowRef<OrbitControls | null>(null)

extend({ OrbitControls })

watch(controlsRef, (value) => {
  addEventListeners()
  if (value && makeDefault.value) {
    controls.value = value
  }
  else {
    controls.value = null
  }
})

function addEventListeners() {
  useEventListener(controlsRef.value as any, 'change', () => {
    emit('change', controlsRef.value)
    invalidate()
  })
  useEventListener(controlsRef.value as any, 'start', () => emit('start', controlsRef.value))
  useEventListener(controlsRef.value as any, 'end', () => emit('end', controlsRef.value))
}

const { onBeforeRender } = useLoop()

onBeforeRender(({ invalidate }) => {
  if (controlsRef.value && (enableDamping.value || autoRotate.value)) {
    controlsRef.value.update()

    if (autoRotate.value) {
      invalidate()
    }
  }
})

onUnmounted(() => {
  if (controlsRef.value) {
    controlsRef.value.dispose()
  }
})

defineExpose({ instance: controlsRef })
</script>

<template>
  <TresOrbitControls
    v-if="(camera || activeCamera) && (domElement || renderer)"
    ref="controlsRef"
    :target="target"
    :auto-rotate="autoRotate"
    :auto-rotate-speed="autoRotateSpeed"
    :enable-damping="enableDamping"
    :damping-factor="dampingFactor"
    :enable-pan="enablePan"
    :key-pan-speed="keyPanSpeed"
    :keys="keys"
    :max-azimuth-angle="maxAzimuthAngle"
    :min-azimuth-angle="minAzimuthAngle"
    :max-polar-angle="maxPolarAngle"
    :min-polar-angle="minPolarAngle"
    :min-distance="minDistance"
    :max-distance="maxDistance"
    :min-zoom="minZoom"
    :max-zoom="maxZoom"
    :touches="touches"
    :enable-zoom="enableZoom"
    :zoom-speed="zoomSpeed"
    :enable-rotate="enableRotate"
    :rotate-speed="rotateSpeed"
    :mouse-buttons="mouseButtons"
    :args="[camera || activeCamera, domElement || renderer.domElement]"
  />
</template>
