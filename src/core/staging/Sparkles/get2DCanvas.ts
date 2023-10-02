export default function get2DCanvas(width = 256, height = 256) {
  if ('OffscreenCanvas' in window) {
    const canvas = new OffscreenCanvas(width, height)
    const context = canvas!.getContext('2d')
    if (!context) {
      throw new Error('Cannot create rendering context.')
    }
    const getBitmapData = () => context.getImageData(0, 0, width, height)
    return { canvas, context, getBitmapData }
  }

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Cannot create rendering context.')
  }

  const getBitmapData = () => context.getImageData(0, 0, width, height)

  return { context, canvas, getBitmapData }
}
