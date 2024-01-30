import { TextureLoader, type Texture } from "three";
import { useLoader, useLogger } from "@tresjs/core";
import { getNumbersFromEnd, stripUnderscoresNumbersFromEnd } from "./StringOps";
import { expand } from "./AtlasAnimationDefinitionParser";

export async function getTextureAndAtlasAsync(
  imagePathOrImageData: string,
  atlasPathOrAtlasish: string | Atlasish,
  definitions?: Record<string, string>
): Promise<[Texture, Atlas]> {
  const texturePromise: Promise<Texture> = useLoader(
    TextureLoader,
    imagePathOrImageData
  );
  const atlasishPromise: Promise<Atlasish> =
    typeof atlasPathOrAtlasish !== "string"
      ? new Promise((resolve) => resolve(atlasPathOrAtlasish as Atlasish))
      : fetch(atlasPathOrAtlasish)
          .then((response) => response.json())
          .catch((e) => useLogger().logError(`Cientos Atlas - ${e}`));
  return Promise.all([texturePromise, atlasishPromise]).then(
    ([texture, atlasish]) => {
      const atlas = getAtlas(
        atlasish,
        texture.image.width,
        texture.image.height,
        definitions
      );
      return [texture, atlas];
    }
  );
}

export interface AtlasFrame {
  name: string;
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
  repeatX: number;
  repeatY: number;
}

export interface Atlas {
  frames: AtlasFrame[];
  namedFrames: Record<string, AtlasFrame[]>;
}

export function getAtlas(
  atlasish: Atlasish,
  textureWidth: number,
  textureHeight: number,
  definitions?: Record<string, string>
): Atlas {
  const frames =
    typeof atlasish === "number" || Array.isArray(atlasish)
      ? getAtlasFramesFromNumColsNumRows(atlasish, textureWidth, textureHeight)
      : getAtlasFramesFromTexturePackerData(
          atlasish,
          textureWidth,
          textureHeight
        );

  const namedFrames = groupAtlasFramesByKey(frames);
  const atlas: Atlas = { frames, namedFrames };
  if (definitions) {
    setDefinitions(atlas, definitions);
  }
  return atlas;
}

export function getAtlasFrames(
  atlas: Atlas,
  animationNameOrFrameNumber: string | number | [number, number],
  reversed: boolean
): AtlasFrame[] {
  let frames: AtlasFrame[];
  if (typeof animationNameOrFrameNumber === "string")
    frames = getAtlasFramesByAnimationName(atlas, animationNameOrFrameNumber);
  else if (typeof animationNameOrFrameNumber === "number")
    frames = getAtlasFramesByIndices(
      atlas,
      animationNameOrFrameNumber,
      animationNameOrFrameNumber
    );
  else {
    frames = getAtlasFramesByIndices(
      atlas,
      animationNameOrFrameNumber[0],
      animationNameOrFrameNumber[1]
    );
  }
  return reversed ? frames.toReversed() : frames;
}

export function getNullAtlasFrame(): AtlasFrame {
  return {
    name: "null",
    width: 0,
    height: 0,
    offsetX: 0,
    offsetY: 0,
    repeatX: 0,
    repeatY: 0,
  };
}

export type AtlasData =
  | TexturePackerFrameDataArray
  | TexturePackerFrameDataObject;
export type Atlasish = AtlasData | [number, number] | number;

interface TexturePackerFrameData {
  filename: string;
  frame: { x: number; y: number; w: number; h: number };
}

interface TexturePackerFrameDataArray {
  frames: TexturePackerFrameData[];
}

interface TexturePackerFrameDataObject {
  frames: Record<string, TexturePackerFrameData>;
}

function getAtlasFramesFromTexturePackerData(
  data: TexturePackerFrameDataArray | TexturePackerFrameDataObject,
  width: number,
  height: number
) {
  return Array.isArray(data.frames)
    ? getAtlasFramesFromTexturePackerDataArray(
        data as TexturePackerFrameDataArray,
        width,
        height
      )
    : getAtlasFramesFromTexturePackerDataObject(
        data as TexturePackerFrameDataObject,
        width,
        height
      );
}

function getAtlasFramesFromTexturePackerDataArray(
  data: TexturePackerFrameDataArray,
  width: number,
  height: number
): AtlasFrame[] {
  const invWidth = 1 / width;
  const invHeight = 1 / height;
  return data.frames.map((d) => ({
    name: d.filename,
    offsetX: d.frame.x * invWidth,
    offsetY: 1 - (d.frame.y + d.frame.h) * invHeight,
    repeatX: d.frame.w * invWidth,
    repeatY: d.frame.h * invHeight,
    width: d.frame.w,
    height: d.frame.h,
  }));
}

function getAtlasFramesFromTexturePackerDataObject(
  data: TexturePackerFrameDataObject,
  width: number,
  height: number
): AtlasFrame[] {
  const invWidth = 1 / width;
  const invHeight = 1 / height;
  return Object.entries(data.frames).map(([k, v]) => ({
    name: k,
    offsetX: v.frame.x * invWidth,
    offsetY: 1 - (v.frame.y + v.frame.h) * invHeight,
    repeatX: v.frame.w * invWidth,
    repeatY: v.frame.h * invHeight,
    width: v.frame.w,
    height: v.frame.h,
  }));
}

function getAtlasFramesFromNumColsNumRows(
  numColsOrNumColsNumRows: number | [number, number],
  width: number,
  height: number,
  name = "default"
): AtlasFrame[] {
  const [numCols, numRows] = Array.isArray(numColsOrNumColsNumRows)
    ? numColsOrNumColsNumRows
    : [numColsOrNumColsNumRows, 1];
  const frameWidth = width / numCols;
  const frameHeight = height / numRows;
  const padAmount = (numCols * numRows).toString().length;
  const repeatX = 1 / numCols;
  const repeatY = 1 / numRows;
  const result: AtlasFrame[] = [];

  let i = 0;
  for (let row = numRows - 1; row >= 0; row--) {
    for (let col = 0; col < numCols; col++) {
      i++;
      result.push({
        name: name + String(i).padStart(padAmount, "0"),
        offsetX: col * repeatX,
        offsetY: row * repeatY,
        repeatX,
        repeatY,
        width: frameWidth,
        height: frameHeight,
      });
    }
  }
  return result;
}

function setDefinitions(page: Atlas, definitions: Record<string, string>) {
  for (const [animationName, definitionStr] of Object.entries(definitions)) {
    const frames: AtlasFrame[] = getAtlasFrames(page, animationName, false);
    const expanded = expand(definitionStr);
    for (const i of expanded) {
      if (i < 0 || frames.length <= i) {
        useLogger().logError(
          `Cientos Atlas: Attempting to access frame index ${i} in animation ${animationName}, but it does not exist.`
        );
      }
    }
    page.namedFrames[animationName] = expanded.map((i) => frames[i]);
  }
}

function getAtlasFramesByAnimationName(
  page: Atlas,
  name: string
): AtlasFrame[] {
  if (!(name in page.namedFrames)) {
    useLogger().logError(
      `Cientos Atlas: getFramesByName
The animation name "${name}" does not exist in this page. 
Available names: 
${Object.keys(page.namedFrames)
  .map((n) => "* " + n + "\n")
  .join("")}`
    );
    return [getNullAtlasFrame()];
  }
  return page.namedFrames[name];
}

function getAtlasFramesByIndices(
  page: Atlas,
  startI: number,
  endI: number
): AtlasFrame[] {
  if (
    startI < 0 ||
    page.frames.length <= startI ||
    endI < 0 ||
    page.frames.length <= endI
  ) {
    useLogger().logError(
      `Cientos Atlas: getFramesByIndex – [${startI}, ${endI}] is out of bounds.`
    );
    return [getNullAtlasFrame()];
  }
  const result = [];
  const sign = Math.sign(endI - startI);
  if (sign === 0) return [page.frames[startI]];
  for (let i = startI; i !== endI + sign; i += sign) {
    result.push(page.frames[i]);
  }
  return result;
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
function groupAtlasFramesByKey(
  frames: AtlasFrame[]
): Record<string, AtlasFrame[]> {
  const result: Record<string, AtlasFrame[]> = {};

  for (const frame of frames) {
    if (getNumbersFromEnd(frame.name) !== null) {
      const key = stripUnderscoresNumbersFromEnd(frame.name);
      if (result.hasOwnProperty(key)) {
        result[key].push(frame);
      } else {
        result[key] = [frame];
      }
    }
  }

  for (const entry of Object.values(result)) {
    entry.sort((a, b) => a.name.localeCompare(b.name));
  }

  return result;
}
