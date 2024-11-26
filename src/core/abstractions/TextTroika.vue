<script setup lang="ts">
import { useTres } from '@tresjs/core'
import type { ColorRepresentation } from 'three'
import { preloadFont, Text as TextMeshImpl } from 'troika-three-text'
import { onUnmounted, shallowRef } from 'vue'

interface Props {
  /* The text to display, default: '' */
  text?: string
  characters?: string
  color?: ColorRepresentation
  /** Font size, default: 0 */
  fontSize?: number
  fontWeight?: number | string
  fontStyle?: 'italic' | 'normal'
  maxWidth?: number
  lineHeight?: number
  letterSpacing?: number
  textAlign?: 'left' | 'right' | 'center' | 'justify'
  font?: string
  anchorX?: number | 'left' | 'center' | 'right'
  anchorY?: number | 'top' | 'top-baseline' | 'middle' | 'bottom-baseline' | 'bottom'
  clipRect?: [number, number, number, number]
  depthOffset?: number
  direction?: 'auto' | 'ltr' | 'rtl'
  overflowWrap?: 'normal' | 'break-word'
  whiteSpace?: 'normal' | 'overflowWrap' | 'nowrap'
  outlineWidth?: number | string
  outlineOffsetX?: number | string
  outlineOffsetY?: number | string
  outlineBlur?: number | string
  outlineColor?: ColorRepresentation
  outlineOpacity?: number
  strokeWidth?: number | string
  strokeColor?: ColorRepresentation
  strokeOpacity?: number
  fillOpacity?: number
  sdfGlyphSize?: number
  debugSDF?: boolean
  onSync?: (troika: any) => void
}

const props = defineProps<Props>()

const invalidate = useTres().invalidate
const troikaMesh = new TextMeshImpl()

troikaMesh.sync(() => {
  invalidate()
  if (props.onSync) { props.onSync(troikaMesh) }
})

const textRef = shallowRef()
defineExpose({ instance: textRef })

onUnmounted(() => { troikaMesh.dispose() })

await (() => new Promise((resolve) => { preloadFont({ font: props.font, characters: props.characters, sdfGlyphSize: props.sdfGlyphSize }, resolve) }))
</script>

<template>
  <primitive
    ref="textRef"
    :object="troikaMesh"
    v-bind="props"
  >
    <slot></slot>
  </primitive>
</template>
