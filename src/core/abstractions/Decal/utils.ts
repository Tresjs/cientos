import { Euler, MathUtils, Vector3 } from 'three'

export function createDecalData({ position, orientation, orientationZ, size, scale, normal, map, uid, textureFilename }) {
  return {
    position: new Vector3(...position),
    orientation: new Euler(...orientation),
    orientationZ,
    size: new Vector3(...size),
    scale,
    normal: new Vector3(...normal),
    map,
    uid,
    textureFilename,
  }
}

export function updateBoxHelper(helperRef, object) {
  if (!helperRef.value || !object) { return }
  helperRef.value.setFromObject(object)
  helperRef.value.update()
}

export function parseTextureFilename(src) {
  return src.split('/').pop()?.split('.')[0] || 'unknown'
}

export function generateDecalUID(index) {
  return `decal-${index}`
}
