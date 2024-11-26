# TextTroika

<DocsDemo>
  <TextTroikaDemo />
</DocsDemo>

`<TextTroika />` renders high-quality 2D text. It wraps the [troika-three-text](https://github.com/protectwise/troika/tree/1af247e61d2f9f884728a7c77914bc8255c4e7cb/packages/troika-three-text) library.

## Usage

<<< @/.vitepress/theme/components/TextTroikaDemo.vue

## Props

All props are optional.

| Prop               | Description                                                            | Default |
| :----------------- | :--------------------------------------------------------------------- | ------- |
| **font**           | The URL of a custom font file to be used. Supported font formats are: .ttf, .otf, .woff (.woff2 is not supported) | Roboto from Google Fonts CDN   |
| **text**           | The string of text to be rendered. Newlines and repeating whitespace characters are honored. | `''` |
| **characters**     | Character glyphs to pre-generate to avoid <acronym title="flash of unstyled content">FOUC</acronym>. | |
| **color**          | This is a shortcut for setting the `color` of the text's material. You can use this if you don't want to specify a whole custom material and just want to change its color.  | |
| **fontSize**       | The em-height at which to render the font, in local world units. | `0.1` |
| **fontWeight**     | A numeric font weight, `"normal"`, or `"bold"`. Currently only used to select the preferred weight for the fallback Unicode fonts. | `'normal'` |
| **fontStyle**      | Either `"italic"` or `"normal"`. Currently only used to select the preferred style for the fallback Unicode fonts. | `'normal'` |
| **maxWidth** | The maximum width of the text block, above which text may start wrapping according to the whiteSpace and overflowWrap properties. | `Infinity` (does not wrap) |
| **lineHeight** | Sets the height of each line of text. Can either be `'normal'` which chooses a reasonable height based on the chosen font's ascender/descender metrics, or a number that is interpreted as a multiple of the fontSize. | `'normal`' |
| **letterSpacing** | Sets a uniform adjustment to spacing between letters after kerning is applied, in local world units. Positive numbers increase spacing and negative numbers decrease it. | `0` |
| **textAlign** | The horizontal alignment of each line of text within the overall text bounding box. Can be one of `'left' \| 'right' \| 'center' \| 'justify'`. | `'normal'` |
| **anchorX** | Defines the horizontal position in the text block that should line up with the local origin. Can be specified as a numeric `x` position in local units, a string percentage of the total text block width e.g. `'25%'`, or one of the following keyword strings: `'left' \| 'center' \| 'right'`. | `0` |
| **anchorY** | Defines the vertical position in the text block that should line up with the local origin. Can be specified as a numeric `y` position in local units (note: down is negative y), a string percentage of the total text block height e.g. '25%', or one of the following keyword strings: `'top' \| 'top-baseline' \| 'top-cap' \| 'top-ex' \| 'middle' \| 'bottom-baseline' \| 'bottom'`. | `0` |

See all available properties on the [troika-three-text README](https://github.com/protectwise/troika/tree/1af247e61d2f9f884728a7c77914bc8255c4e7cb/packages/troika-three-text).
