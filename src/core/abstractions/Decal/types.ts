import type { Euler, Group, Mesh, Texture, Vector3 } from 'three'
import type { ShallowRef } from 'vue'

export interface Decal {
  uid: string
  position: Vector3
  orientation: Euler
  orientationZ: number
  size: Vector3
  scale: number
  normal: Vector3
  parent: Group | null
  map: Texture
  textureFilename: string
}

export interface CustomTexture extends Texture {
  aspectRatio?: number
  isPortrait?: boolean
}

export interface DecalProps {
  debug?: boolean
  data?: Decal[]
  debugLineColor?: string
  depthTest?: boolean
  depthWrite?: boolean
  scale?: number
  polygonOffsetFactor?: number
  map?: string[] | null
  mesh?: ShallowRef<Mesh | null>
}
