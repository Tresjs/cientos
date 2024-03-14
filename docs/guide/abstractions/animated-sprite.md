# AnimatedSprite

<DocsDemo>
  <AnimatedSpriteDemo />
</DocsDemo>

`<AnimatedSprite />` displays 2D animations defined in a [texture atlas](https://en.wikipedia.org/wiki/Texture_atlas). A typical `<AnimatedSprite />` will use:

* an image containing multiple sprites
* a JSON atlas containing the individual sprite coordinates in the image

## Usage

<<< @/.vitepress/theme/components/AnimatedSpriteDemo.vue{3,12-21}

::: warning Suspense
`<AnimatedSprite />` loads resources asynchronously, so it must be wrapped in a `<Suspense />`.
:::

## Compiling an atlas

In typical usage, `<AnimatedSprite />` requires both the URL to a texture of compiled sprite images and a JSON atlas containing information about the sprites in the texture.

* [example compiled texture](https://raw.githubusercontent.com/Tresjs/assets/main/textures/animated-sprite/cientosTexture.png)
* [example JSON atlas](https://raw.githubusercontent.com/Tresjs/assets/main/textures/animated-sprite/cientosAtlas.json)

Compiling source images into a texture atlas is usually handled by third-party software. You may find [TexturePacker](https://www.codeandweb.com/texturepacker) useful.

## Without an atlas

There may be cases where you don't want to supply an atlas to the `atlas` prop. To do so:

* Compile your source images into a single image texture.
* Space each sprite into equally sized columns and rows in the compiled image texture.
* Ensure no extra padding has been added to the compiled image texture.
* Set the `atlas` prop to number of columns, number of rows as `[number, number]`.

## Spritesheets in the wild

::: warning 
In the wild, spritesheets are often distributed without atlases and the images are often compiled by hand. It can be difficult or impossible to use these resources directly with `<AnimatedSprite />`. In many cases, it's advisable to recompile the spritesheet.
:::

### How to recompile an existing spritesheet image

* Cut individual sprites from the spritesheet and paste them into separate layers in an image editing application, e.g., GIMP.
* Align the layers for animation. Toggling layer visibility on/off will show you how the animation will display, frame to frame.
* Export layers as individual images.
* Name the individual images according to the following pattern: <br>`[animation name][frame number].[extension]` <br>E.g., walk000.png, walk001.png, idle000.png, idle001.png
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
| `frame` | Emitted when the displayed animation frame changes – at most once per tick, frames may be dropped | `string` – Name of the newly displayed frame | 
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

You can supply an object to the `:definitions` prop. Any [named animation](#animation) can be a key. The value is a string that specifies frame order and delays.

### Demo

In this demo, the 'idle' animation is comprised of six different images. By default, those images will play sequentially when the `:animation` prop is `'idle'`.

But below, we've added a `:definitions` prop with this value for the `idle` key:

```
'0-5, 0(10), 1-2, 3(20), 4-5, 0-5(3)'
```

So, instead of playing images 0-5 sequentially, this animation will play instead:

* `0-5` – Play all six images (`0-5`) of the animation normally. 
* `0(10), 1-2, 3(20), 4-5` – Play all six images again with a delay of ten frames at the bottom of the bounce (`0(10)`) and a delay of twenty frames at the top of the bounce (`3(20)`). 
* `0-5(3)` – Finally, play all six images of the animation with a delay of three frames each.

<DocsDemo>
  <AnimatedSpriteDefinitionsDemo />
</DocsDemo>

<<< @/.vitepress/theme/components/AnimatedSpriteDefinitionsDemo.vue{17-19}

## `center`

In addition to being the sprite's anchor point, the `:center` prop also controls how differently sized source images will "grow" and "shrink". Namely, they "grow out from" and "shrink towards" the center.

Below is a simple animation containing differently sized source images. The anchor is visible at world position `0, 0, 0`.

<DocsDemo>
  <AnimatedSpriteCenterDemo />
</DocsDemo>