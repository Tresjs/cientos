import { VideoTexture } from 'three'

export interface VideoTextureOptions {
  /**
   * Whether to use Draco compression.
   *
   * @type {string}
   * @memberof VideoTextureOptions
   */
  unsuspend?: string
  /**
   * Whether to use Draco compression.
   *
   * @type {string}
   * @memberof VideoTextureOptions
   */
  crossOrigin?: string
  /**
   * Whether to use Draco compression.
   *
   * @type {boolean}
   * @memberof VideoTextureOptions
   */
  muted?: boolean
  /**
   * Whether to use Draco compression.
   *
   * @type {boolean}
   * @memberof VideoTextureOptions
   */
  loop?: boolean
  /**
   * Whether to use Draco compression.
   *
   * @type {boolean}
   * @memberof VideoTextureOptions
   */
  start?: boolean
  /**
   * Whether to use Draco compression.
   *
   * @type {boolean}
   * @memberof VideoTextureOptions
   */
  playsInline?: boolean
}

/**
 * Composable for loading video textures.
 *
 * ```ts
 * import { ref } from 'vue'
 * import { useVideoTexture } from '@tresjs/cientos'
 * import MyVideo from 'MyVideo.mp4'
 *
 * const texture = ref()
 * texture.value = useVideoTexture(MyVideo)
 * ```
 * Then you can use the texture in your material.
 *
 * ```vue
 * <TresMeshBasicMaterial :map="texture" />
 * ```
 * @see https://tresjs.org/examples/load-textures.html // TODO cambiar
 * @export
 * @param {HTMLVideoElement} src
 * @return {VideoTexture}  {VideoTexture}
 */
export async function useVideoTexture(
  src: string,
  options: VideoTextureOptions = {
    unsuspend: 'loadedmetadata',
    crossOrigin: 'Anonymous',
    muted: true,
    loop: true,
    start: true,
    playsInline: true,
  },
) {
  /**
   * Load a video as a texture.
   *
   * @param {src} string
   * @return {VideoTexture}  {VideoTexture}
   */
  if (!src) return // TODO throw error

  const loadTexture = (src: string): VideoTexture => {
    let texture: VideoTexture
    new Promise((res, rej) => {
      const video = Object.assign(document.createElement('video'), {
        src: (typeof src === 'string' && src) || undefined,
        crossOrigin: options.crossOrigin,
        loop: options.loop,
        muted: options.muted,
        autoplay: true
      })
      console.log('jaime ~ video ~ options.loop:', options.loop);
      console.log('jaime ~ video ~ video:', video)
      texture = new VideoTexture(video)
      return res(texture)
      // if ('colorSpace' in texture) (texture as any).colorSpace = (gl as any).outputColorSpace
      // else texture.encoding = gl.outputEncoding

      //video.addEventListener(unsuspend, () => res(texture))
    })
    return texture
  }
  const texture = await loadTexture(src)

  if(options.start && texture.image) texture.image.play()

  return texture
}
