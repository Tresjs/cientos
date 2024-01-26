import type { Texture } from 'three'
import { TextureLoader } from 'three'
import { useLoader, useLogger } from '@tresjs/core'
import { getNumbersFromEnd, stripUnderscoresNumbersFromEnd } from './StringOps'
import { expand } from './AtlasAnimationDefinitionParser'

export interface AtlasFrame {
  name: string
  width: number
  height: number
  offsetX: number
  offsetY: number
  repeatX: number
  repeatY: number
}

export interface AtlasPage {
  frames: AtlasFrame[]
  namedFrames: Record<string, AtlasFrame[]>
  texture: Texture
}

export async function getAtlasPageAsync(
  atlas:
  | string
  | number
  | [number, number]
  | string[]
  | TexturePackerFrameDataArray
  | TexturePackerFrameDataObject,
  image: string,
  definitions?: Record<string, string>,
): Promise<AtlasPage> {
  const texturePromise = useLoader(TextureLoader, image)
  const atlasPromise
    = typeof atlas === 'string'
      ? fetch(atlas)
        .then(response => response.json())
        .catch(e => useLogger().logError(`Cientos Atlas - ${e}`))
      : new Promise(resolve => resolve(atlas))

  const pagePromise = Promise.all([atlasPromise, texturePromise]).then(
    (response) => {
      const texture: Texture = response[1]
      const processingFn = (() => {
        if (typeof atlas === 'string' || atlas.hasOwnProperty('frames')) {
          return getFramesFromTexturePackerData
        }
        else if (
          typeof atlas === 'number'
          || (Array.isArray(atlas)
            && atlas.length === 2
            && typeof atlas[0] === 'number')
        ) {
          return getFramesFromNumColsNumRowsWidthHeight
        }
        else {
          return getFramesFromAnimationNamesWidthHeight
        }
      })()
      const frames = processingFn(
        response[0],
        texture.image.width,
        texture.image.height,
      )
      const namedFrames = groupFramesByKey(frames)
      texture.matrixAutoUpdate = false
      const page: AtlasPage = { frames, namedFrames, texture }
      if (definitions) {
        setDefinitions(page, definitions)
      }
      return page
    },
  )

  return pagePromise
}

export type AtlasData = TexturePackerFrameDataArray | TexturePackerFrameData

interface TexturePackerFrameData {
  filename: string
  frame: { x: number; y: number; w: number; h: number }
}

interface TexturePackerFrameDataArray {
  frames: TexturePackerFrameData[]
}

interface TexturePackerFrameDataObject {
  frames: Record<string, TexturePackerFrameData>
}

function getFramesFromTexturePackerData(
  data: TexturePackerFrameDataArray | TexturePackerFrameDataObject,
  width: number,
  height: number,
) {
  return Array.isArray(data.frames)
    ? getFramesFromTexturePackerDataArray(
      data as TexturePackerFrameDataArray,
      width,
      height,
    )
    : getFramesFromTexturePackerDataObject(
      data as TexturePackerFrameDataObject,
      width,
      height,
    )
}

function getFramesFromTexturePackerDataArray(
  data: TexturePackerFrameDataArray,
  width: number,
  height: number,
): AtlasFrame[] {
  const invWidth = 1 / width
  const invHeight = 1 / height
  return data.frames.map(d => ({
    name: d.filename,
    offsetX: d.frame.x * invWidth,
    offsetY: 1 - (d.frame.y + d.frame.h) * invHeight,
    repeatX: d.frame.w * invWidth,
    repeatY: d.frame.h * invHeight,
    width: d.frame.w,
    height: d.frame.h,
  }))
}

function getFramesFromTexturePackerDataObject(
  data: TexturePackerFrameDataObject,
  width: number,
  height: number,
): AtlasFrame[] {
  const invWidth = 1 / width
  const invHeight = 1 / height
  return Object.entries(data.frames).map(([k, v]) => ({
    name: k,
    offsetX: v.frame.x * invWidth,
    offsetY: 1 - (v.frame.y + v.frame.h) * invHeight,
    repeatX: v.frame.w * invWidth,
    repeatY: v.frame.h * invHeight,
    width: v.frame.w,
    height: v.frame.h,
  }))
}

function getFramesFromNumColsNumRowsWidthHeight(
  numColsOrNumColsNumRows: number | [number, number],
  width: number,
  height: number,
  name = 'default',
): AtlasFrame[] {
  const [numCols, numRows] = Array.isArray(numColsOrNumColsNumRows)
    ? numColsOrNumColsNumRows
    : [numColsOrNumColsNumRows, 1]
  const frameWidth = width / numCols
  const frameHeight = height / numRows
  const padAmount = (numCols * numRows).toString().length
  const repeatX = 1 / numCols
  const repeatY = 1 / numRows
  const result: AtlasFrame[] = []

  let i = 0
  for (let row = numRows - 1; row >= 0; row--) {
    for (let col = 0; col < numCols; col++) {
      i++
      result.push({
        name: name + String(i).padStart(padAmount, '0'),
        offsetX: col * repeatX,
        offsetY: row * repeatY,
        repeatX,
        repeatY,
        width: frameWidth,
        height: frameHeight,
      })
    }
  }
  return result
}

function getFramesFromAnimationNamesWidthHeight(
  animationNames: string[],
  width: number,
  height: number,
): AtlasFrame[] {
  const numCols = animationNames.length
  const frames = getFramesFromNumColsNumRowsWidthHeight(numCols, width, height)
  const padAmount = numCols.toString().length
  animationNames.forEach((name, i) => {
    frames[i].name = `${name}_${String(i).padStart(padAmount, '0')}`
  })
  return frames
}

function setDefinitions(page: AtlasPage, definitions: Record<string, string>) {
  for (const [animationName, definitionStr] of Object.entries(definitions)) {
    const frames: AtlasFrame[] = getFrames(page, animationName, false)
    const expanded = expand(definitionStr)
    for (const i of expanded) {
      if (i < 0 || frames.length <= i) {
        useLogger().logError(
          `Cientos Atlas: Attempting to access frame index ${i} in animation ${animationName}, but it does not exist.`,
        )
      }
    }
    page.namedFrames[animationName] = expanded.map(i => frames[i])
  }
}

export function getFrames(
  page: AtlasPage,
  animationNameOrFrameNumber: string | number | [number, number],
  reversed: boolean,
): AtlasFrame[] {
  let frames: AtlasFrame[]
  if (typeof animationNameOrFrameNumber === 'string')
    frames = getFramesByName(page, animationNameOrFrameNumber)
  else if (typeof animationNameOrFrameNumber === 'number')
    frames = getFramesByIndices(
      page,
      animationNameOrFrameNumber,
      animationNameOrFrameNumber,
    )
  else {
    frames = getFramesByIndices(
      page,
      animationNameOrFrameNumber[0],
      animationNameOrFrameNumber[1],
    )
  }
  return reversed ? frames.toReversed() : frames
}

export function getNullFrame(): AtlasFrame {
  return {
    name: 'null',
    width: 0,
    height: 0,
    offsetX: 0,
    offsetY: 0,
    repeatX: 0,
    repeatY: 0,
  }
}

function getFramesByName(page: AtlasPage, name: string): AtlasFrame[] {
  if (!(name in page.namedFrames)) {
    useLogger().logError(
      `Cientos Atlas: getFramesByName
The name "${name}" does not exist in this page. 
Available names: ${Object.keys( page.namedFrames,).join(', ')}`)
      return [getNullFrame()]
  }
  return page.namedFrames[name]
}

function getFramesByIndices(
  page: AtlasPage,
  startI: number,
  endI: number,
): AtlasFrame[] {
  if (
    startI < 0
    || page.frames.length <= startI
    || endI < 0
    || page.frames.length <= endI
  ) {
    useLogger().logError(
      `Cientos Atlas: getFramesByIndex – [${startI}, ${endI}] is out of bounds.`,
    )
    return [getNullFrame()]
  }
  const result = []
  const sign = Math.sign(endI - startI)
  if (sign === 0) return [page.frames[startI]]
  for (let i = startI; i !== endI + sign; i += sign) {
    result.push(page.frames[i])
  }
  return result
}

/**
 * @returns An object where all AtlasFrames with the same key are grouped in an ordered array by name in ascending value.
 * A key is defined as an alphanumeric string preceding a trailing numeric string.
 * E.g.:
 * "hero0Idle" has no key as it does not have trailing numeric string.
 * "heroIdle0" has the key "heroIdle".
 * @example ```
 * groupFramesByKey([{name: hero, ...}, {name: heroJump3, ...}, {name: heroJump0, ...}, {name: heroIdle0, ...}, {name: heroIdle1, ...}]) returns
 * {
 * heroJump: [{name: heroJump0, ...}, {name: heroJump3, ...}],
 * heroIdle: [{name: heroIdle0, ...}, {name: heroIdle1, ...}]
 * }
 * ```
 */
function groupFramesByKey(frames: AtlasFrame[]): Record<string, AtlasFrame[]> {
  const result: Record<string, AtlasFrame[]> = {}

  for (const frame of frames) {
    if (getNumbersFromEnd(frame.name) !== null) {
      const key = stripUnderscoresNumbersFromEnd(frame.name)
      if (result.hasOwnProperty(key)) {
        result[key].push(frame)
      }
      else {
        result[key] = [frame]
      }
    }
  }

  for (const entry of Object.values(result)) {
    entry.sort((a, b) => a.name.localeCompare(b.name))
  }

  return result
}
