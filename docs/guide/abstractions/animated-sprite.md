# AnimatedSprite

<DocsDemo>
  <AnimatedSpriteDemo />
</DocsDemo>

`<AnimatedSprite />` allows you to use 2D animations defined in a [texture atlas](https://en.wikipedia.org/wiki/Texture_atlas). A typical `<AnimatedSprite />` will use:

* an image containing multiple sprites
* a JSON atlas containing the individual sprite coordinates in the image

## Usage

<<< @/.vitepress/theme/components/AnimatedSpriteDemo.vue{3,12-20}

::: warning Suspense
`<AnimatedSprite />` loads resources asynchronously, so it must be wrapped in a `<Suspense />`.
:::

## Compiling an atlas

In typical usage, `<AnimatedSprite/>` requires both the URL to a texture of compiled sprite images and a JSON atlas containing information about the sprites in the texture.

* [example compiled texture](https://raw.githubusercontent.com/Tresjs/assets/6c0b087768a0a2b76148c99fc87d7e6ddc3c6d66/textures/animated-sprite/namedAnimationsTexture.png)
* [example JSON atlas](https://raw.githubusercontent.com/Tresjs/assets/6c0b087768a0a2b76148c99fc87d7e6ddc3c6d66/textures/animated-sprite/namedAnimationsAtlas.json)

Compiling source images into a texture atlas is usually handled by third-party software. You may find [TexturePacker](https://www.codeandweb.com/texturepacker) useful.

## Without an atlas

There may be cases where you don't want to supply a generated JSON atlas as an `atlas` prop. To do so:

* Compile your source images into a single image texture
* Space each sprite into equally sized columns and rows in the compiled image texture 
* Ensure no extra padding in the compiled image texture
* Set the `atlas` prop to number of columns, number of rows as `[number, number]`

## Spritesheets in the wild

::: warning 
Spritesheets found online are often distributed without atlases. In most cases, you'll want to recompile the spritesheet (and atlas) to get them to work with `<AnimatedSprite />`.
:::

### Recompiling a spritesheet

* Cut individual sprites from the spritesheet and paste them into separate layers in an image editing software, e.g., GIMP.
* Align the layers for animation. Toggling layer visibility on/off will show you how the animation will display, frame to frame.
* Export layers as individual images.
* Name the individual images according to the following pattern: <br>`[animation name][frame number].[extension]` E.g., walk000.png, walk001.png, idle000.png, idle001.png
* Compile individual images into an image texture and atlas using a texture packing application, like TexturePacker.

## Props

<CientosPropsTable 
component-path="src/core/abstractions/AnimatedSprite/component.vue" 
:fields="['name', 'description', 'default', 'required']"
:on-format-value="({valueFormatted, propName, fieldName, getFieldFormatted})=> {
  if (fieldName === 'description') {
    const type = getFieldFormatted('type')
    return type + ' – ' + valueFormatted
  }
}"
 />

## Events

| Event | Description | Argument |
| - | - | - |
| `frame` | Emitted when the displayed animation frame changes – at most once per tick | `string` – Name of the next frame to be displayed | 
| `end` | Emitted when the animation ends – `props.loop` must be set to `false` | `string` – Name of the ending frame |
| `loop` | Emitted when the animation loops – `props.loop` must be set to `true` | `string` – Name of the frame at the end of the loop |


## `animation`

The `:animation` prop holds either the name of the currently playing animation or a range of frames to play, or a frame number to display.

### Using named animations as `animation`

When individual files are converted to a spritesheet/atlas, typically the original images' filenames will be included in the atlas. 

`<AnimatedSprite />` uses those filenames to automatically group images into animations.

Use either of the following naming conventions for your source images ...

* `[animation name][frame number].[file_extension]`
* `[animation name]_[frame number].[file_extension]`

... then `<AnimatedSprite />` will automatically make all `[animation name]` available for playback. Just pass `[animation name]` to the component's `:animation` prop.

#### Example

For our Cientos heart cartoon character animation, here's how it works.

| Filenames | Animation name |
| - | - |
| blink0000.png, blink0001.png, ... | blink |
| idle0000.png, idle0001.png, ... | idle |
| walk0000.png, walk0001.png, ... | walk |

Try it out by clicking a few times below:

<DocsDemo>
  <AnimatedSpriteNamedAnimationDemo />
</DocsDemo>

<<< @/.vitepress/theme/components/AnimatedSpriteNamedAnimationDemo.vue

## `definitions`

You can supply and object to the `:definitions` prop. Any [named animation](#animation), can be a key. The value is a string that specifies frame order and repeated frames (delays).

Here, a delay of ten frames as been added to the bottom of the bounce (`0(10)`) and the top of the bounce (`3(10)`). After that, all five frames of the animation play again with a delay of three frames each (`0-5(3)`).

<DocsDemo>
  <AnimatedSpriteDefinitionsDemo />
</DocsDemo>

<<< @/.vitepress/theme/components/AnimatedSpriteDefinitionsDemo.vue{17}

## `center`

In addition to being the sprite's anchor point, the `:center` prop also controls how differently sized source images will "grow" and "shrink". Namely, they "grow out from" and "shrink towards" the center.

Below is a simple animation containing differently sized source images. The anchor is visible at world position `0, 0, 0`.

<DocsDemo>
  <AnimatedSpriteCenterDemo />
</DocsDemo>

::: warning
Changing the anchor from the default can have unpredictable results if `asSprite` is `true`.
:::
