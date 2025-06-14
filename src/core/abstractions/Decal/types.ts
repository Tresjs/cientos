import type { Euler, Group, Material, Mesh, Texture, Vector3 } from 'three'
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
  index: number
}

export interface DecalElementProps {
  properties: Decal
  instance: Mesh & { material: Material }
  depthTest?: boolean
  depthWrite?: boolean
  polygonOffsetFactor?: number
  order?: number
}

export interface EnhancedTexture extends Texture {
  aspectRatio?: number
  isPortrait?: boolean
}

export interface DecalAttributes {
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

export interface DecalAttributesItem {
  properties: Decal
  depthTest?: boolean
  depthWrite?: boolean
  polygonOffsetFactor?: number
  order?: number
}
