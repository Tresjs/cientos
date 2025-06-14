export function updateBoxHelper(helperRef, object) {
  if (!helperRef.value || !object) { return }
  helperRef.value.setFromObject(object)
  helperRef.value.update()
}

export function parseTextureFilename(src) {
  return src.split('/').pop()?.split('.')[0] || 'unknown'
}
