import type { Euler, Object3D, Texture, Vector3 } from 'three'

export interface Decal {
  parent: Object3D | null
  normal: Vector3
  position: Vector3
  size: Vector3
  orientation: Euler
  map: CustomTexture
  scale: number
  orientationZ: number
  index: number
}

export interface CustomTexture extends Texture {
  aspectRatio: number
  isPortrait: boolean
}
