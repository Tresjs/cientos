# AnimatedSprite

<DocsDemo>
  <AnimatedSpriteDemo />
</DocsDemo>

`<AnimatedSprite />` allows you to use 2D animations defined in a [texture atlas](https://en.wikipedia.org/wiki/Texture_atlas). A typical `<AnimatedSprite />` will use:

* an image containing multiple sprites
* a JSON atlas containing the coordinates of the image

## Usage

<<< @/.vitepress/theme/components/AnimatedSpriteDemo.vue{3,11-19}

::: warning Suspense
`<AnimatedSprite />` loads resources asynchronously, so it must be wrapped in a `<Suspense />`.
:::

## Props

<CientosPropsTable 
component-path="src/core/abstractions/AnimatedSprite/component.vue" 
:fields="['name', 'description', 'default', 'required']"
:on-format-value="({valueFormatted, propName, fieldName, getFieldFormatted})=> {
  if (fieldName === 'description') {
    let type = getFieldFormatted('type')
    if (type.indexOf('TSFunctionType') !== -1 && propName.startsWith('on')) {
      type = '<code>(frameName:string) => void</code>'
    }
    return type + ' – ' + valueFormatted
  }
}"
 />

## `animation`

The `animation` prop holds either the name of the currently playing animation or a range of frames to play, or a frame number to display.

### Named animations

Frames are automatically grouped into named animations, if you use either of the following naming conventions for your source images:

* `[key][frame number].[file_extension]`
* `[key]_[frame number].[file_extension]`

The `<AnimatedSprite />` will automatically make all [key] available for playback as named animations.

#### Example

Here are some example source image names, to be compiled into an image texture and atlas.

* heroIdle00.png
* heroIdle01.png
* heroIdle02.png
* heroRun00.png
* heroRun01.png
* heroRun02.png
* heroRun03.png
* heroHeal00.png
* heroHeal01.png

When the resulting image texture and atlas are provided to `<AnimatedSprite />`, "heroIdle", "heroRun", and "heroHeal" will be available as named animations. Animation names can be used as follows:

```vue{3}
<AnimatedSprite 
atlas="..." image="..." 
animation="heroRun" 
/>
```

### Ranges

A `[number, number]` range can be supplied as the `animation` prop. The numbers correspond to the position of the frame in the `atlas` `frames` array, starting with `0`. The first `number` in the range represents the start frame of the animation. The last `number` represents the end frame.

### Single frame

To display a single animation frame, a `number` can be supplied as the `animation` prop. The `number` corresponds to the position of the frame in the `atlas` `frames` array, starting with `0`. 

## `anchor`

The `anchor` controls how differently sized source images "grow" and "shrink". Namely, they "grow out from" and "shrink towards" the anchor. `[0, 0]` places the anchor at the top left corner of the `<AnimatedSprite />`. `[1,1]` places the anchor at the bottom right corner. By default, the anchor is placed at `[0.5, 0.5]` i.e., the center.

Below is a simple animation containing differently sized source images. The anchor is visible at world position `0, 0, 0`.
<DocsDemo>
  <AnimatedSpriteAnchorDemo />
</DocsDemo>

::: warning
Changing the anchor from the default can have unpredictable results if `asSprite` is `true`.
:::

## `definitions`

For each [named animation](#named-animations), you can supply a "definition" that specifies frame order and repeated frames (delays). For the [named animation example above](#named-animations), the `definitions` prop might look like this:

```vue
<AnimatedSprite 
atlas="..." image="..."
:definitions="{
  'heroIdle':'0(5),1-2', // repeat frame 0 five times, then play frames 1-2
  'heroRun':'0-3,2-1', // play frames 0-3, then 2-1
  // no "heroHeal" definition; the default frame order will be used: 0-1
}"
/>
```

## Compiling an atlas

In typical usage, `<AnimatedSprite/>` requires both the URL to a texture of compiled sprite images and a JSON atlas containing information about the sprites in the texture.

* [example compiled texture](https://raw.githubusercontent.com/Tresjs/assets/6c0b087768a0a2b76148c99fc87d7e6ddc3c6d66/textures/animated-sprite/namedAnimationsTexture.png)
* [example JSON atlas](https://raw.githubusercontent.com/Tresjs/assets/6c0b087768a0a2b76148c99fc87d7e6ddc3c6d66/textures/animated-sprite/namedAnimationsAtlas.json)

Compiling source images into a texture atlas is usually handled by third-party software. You may find [TexturePacker](https://www.codeandweb.com/texturepacker) useful.

## Without an atlas

There may be cases where you don't want to supply a generated JSON atlas as an `atlas` prop. This is possible if you compile your source images in a single row of equally sized columns *and* set the `atlas` prop to the number of columns.

### Example

This image is comprised of 16 source images, compiled into a single image, in a single row:

<img src="https://raw.githubusercontent.com/Tresjs/assets/6c0b087768a0a2b76148c99fc87d7e6ddc3c6d66/textures/animated-sprite/textureWithoutAtlas.png" />

<DocsDemo>
  <AnimatedSpriteNoAtlasDemo />
</DocsDemo>

<<< @/.vitepress/theme/components/AnimatedSpriteNoAtlasDemo.vue{12,13}