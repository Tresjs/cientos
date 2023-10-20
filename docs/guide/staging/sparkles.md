# Sparkles

<DocsDemo>
  <SparklesDemo />
</DocsDemo>

`<Sparkles />` makes sparkles on your geometry's vertices – optionally guided by a directional light.

## Usage

### Basic

<<< @/.vitepress/theme/components/SparklesDemo.vue{4,12}

### With TresDirectionalLight

By default, sparkles appear on the up-facing vertices. However, you can pass a directional light to the component. Moving the directional light will cause "lit" vertices to emit sparkles.

<DocsDemo>
  <SparklesDirectionalLightDemo />
</DocsDemo>

<<< @/.vitepress/theme/components/SparklesDirectionalLightDemo.vue{7,20-25,28}

### Sequences

All props beginning with `:sequence-` are used to define how a particle changes as it progresses [(See also: Mixes)](#mixes). `:sequence-` props are of the type `Gradient<T>`, which can be any one of:

* `T`: a single value
* `[T, T, T, ...]`: an evenly distributed series of values
* `[[number, T], [number, T], ...]`: an unevently distributed series of values, where `number` is a gradient "stop" from `0` to `1`.

For example, all of these are acceptable values for `Gradient<TresColor>`:

* `'red'`
* `['red', 'blue', 'green']`
* `[[0.1, 'red'], [0.25, 'blue'], [0.5, 'green']]`

<DocsDemo>
  <SparklesSequenceDemo />
</DocsDemo>

<<< @/.vitepress/theme/components/SparklesSequenceDemo.vue{13-17}

### Mixes

All props beginning with `:mix-` allow you to specify how a particle "progresses" through a corresponding `:sequence-` prop. E.g., `:mix-alpha` affects `:sequence-alpha`.

* If the `:mix-` prop is `0.0`, 'progress' through the `:sequence-` is determined entirely by the light shining on the surface of the sparkling mesh.[<sup>1</sup>](#precisely)
* If the `:mix-` prop is `1.0`, 'progress' through the `:sequence-` is determined entirely by the particle's lifetime.

<small><a id="precisely">1)</a> More precisely, the value is determined by the dot product of the `directionalLight`'s inverted normalized position and each of the sparkling mesh's vertex normals.</small>

<DocsDemo>
  <SparklesMixDemo />
</DocsDemo>

<<< @/.vitepress/theme/components/SparklesMixDemo.vue{10-12,36-40}

## Props

<table><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><strong><nobr>map</nobr></strong></td><td>Type: <code>Texture | string</code><br>Default: <code><span>'https://raw.githubusercontent.com/Tresjs/asset...</span></code><br><br>Texture or image path for individual sparkles<br>
</td></tr><tr><td><strong><nobr>geometry</nobr></strong></td><td>Type: <code>Object3D | BufferGeometry</code><br>Default: <code>undefined</code><br><br>Vertices of the geometry will be used to emit sparkles. Geometry normals are used for sparkles' traveling direction and for responding to the directional light prop.<br>
<ul>
<li>If provided, the component will use the passed geometry.</li>
<li>If no geometry is provided, the component will try to make a copy of the parent object's geometry.</li>
<li>If no parent geometry exists, the component will create and use an IcosphereGeometry.</li>
</ul>
</td></tr><tr><td><strong><nobr>directionalLight</nobr></strong></td><td>Type: <code>Object3D</code><br>Default: <code>undefined</code><br><br>Particles "light up" when their normal "faces" the light. If no <code>directionalLight</code> is provided, the default "up" vector will be used.<br>
</td></tr><tr><td><strong><nobr>lifetimeSec</nobr></strong></td><td>Type: <code>number</code><br>Default: <code>0.4</code><br><br>Particle lifetime in seconds<br>
</td></tr><tr><td><strong><nobr>cooldownSec</nobr></strong></td><td>Type: <code>number</code><br>Default: <code>2.0</code><br><br>Particle cooldown in seconds – time between lifetime end and respawn<br>
</td></tr><tr><td><strong><nobr>normalThreshold</nobr></strong></td><td>Type: <code>number</code><br>Default: <code>0.7</code><br><br>Number from 0-1 indicating how closely the particle needs to be faced towards the light to "light up". (Lower == more flexible)<br>
</td></tr><tr><td><strong><nobr>noiseScale</nobr></strong></td><td>Type: <code>number</code><br>Default: <code>3.0</code><br><br>Scale of the noise period (lower == more slowly cycling noise)<br>
</td></tr><tr><td><strong><nobr>scaleNoise</nobr></strong></td><td>Type: <code>number</code><br>Default: <code>1.0</code><br><br>Noise coefficient applied to particle scale<br>
</td></tr><tr><td><strong><nobr>offsetNoise</nobr></strong></td><td>Type: <code>number</code><br>Default: <code>0.1</code><br><br>Noise coefficient applied to particle offset<br>
</td></tr><tr><td><strong><nobr>lifetimeNoise</nobr></strong></td><td>Type: <code>number</code><br>Default: <code>0.0</code><br><br>Noise coefficient applied to particle lifetime<br>
</td></tr><tr><td><strong><nobr>size</nobr></strong></td><td>Type: <code>number</code><br>Default: <code>1.0</code><br><br>Particle scale multiplier<br>
</td></tr><tr><td><strong><nobr>alpha</nobr></strong></td><td>Type: <code>number</code><br>Default: <code>1.0</code><br><br>Opacity multiplier<br>
</td></tr><tr><td><strong><nobr>offset</nobr></strong></td><td>Type: <code>number</code><br>Default: <code>1.0</code><br><br>Offset multiplier<br>
</td></tr><tr><td><strong><nobr>surfaceDistance</nobr></strong></td><td>Type: <code>number</code><br>Default: <code>1.0</code><br><br>Surface distance multiplier<br>
</td></tr><tr><td><strong><nobr>sequenceColor</nobr></strong></td><td>Type: <code>Gradient&lt;TresColor&gt;</code><br>Default: <code>[[0.7, '#82dbc5'], [0.8, '#fbb03b']]</code><br><br>'<em>Sequence' props: specify how a particle changes as it "progresses". See also "mix</em>" props.<br>
Color sequence as particles progress<br>
</td></tr><tr><td><strong><nobr>sequenceAlpha</nobr></strong></td><td>Type: <code>Gradient&lt;number&gt;</code><br>Default: <code>[[0.0, 0.0], [0.10, 1.0], [0.5, 1.0], [0.9, 0.0]]</code><br><br>Opacity sequence as particles progress<br>
</td></tr><tr><td><strong><nobr>sequenceOffset</nobr></strong></td><td>Type: <code>Gradient&lt;[number, number, number]&gt;</code><br>Default: <code>[0.0, 0.0, 0.0]</code><br><br>Distance sequence as particles progress<br>
</td></tr><tr><td><strong><nobr>sequenceNoise</nobr></strong></td><td>Type: <code>Gradient&lt;[number, number, number]&gt;</code><br>Default: <code>[0.1, 0.1, 0.1]</code><br><br>Noise sequence as particles progress<br>
</td></tr><tr><td><strong><nobr>sequenceSize</nobr></strong></td><td>Type: <code>Gradient&lt;number&gt;</code><br>Default: <code>[0.0, 1.0]</code><br><br>Size sequence as particles progress<br>
</td></tr><tr><td><strong><nobr>sequenceSurfaceDistance</nobr></strong></td><td>Type: <code>Gradient&lt;number&gt;</code><br>Default: <code>[0.05, 0.08, 0.1]</code><br><br>Distance from surface (along normal) as particles progress<br>
</td></tr><tr><td><strong><nobr>mixColor</nobr></strong></td><td>Type: <code>number</code><br>Default: <code>0.5</code><br><br>'mix*' props: A particle "progresses" with a mix of two factors:<br>
<ul>
<li>its normal "facing" the directionalLight</li>
<li>its lifetime</li>
</ul>
'mix*' props specify the relationship between the two factors.<br>
How is a particle's progress for color calculated? (0: normal, 1: particle lifetime)<br>
</td></tr><tr><td><strong><nobr>mixAlpha</nobr></strong></td><td>Type: <code>number</code><br>Default: <code>1.</code><br><br>How is a particle's progress for alpha calculated? (0: normal, 1: particle lifetime)<br>
</td></tr><tr><td><strong><nobr>mixOffset</nobr></strong></td><td>Type: <code>number</code><br>Default: <code>1.</code><br><br>How is a particle's progress for offset calculated? (0: normal, 1: particle lifetime)<br>
</td></tr><tr><td><strong><nobr>mixSize</nobr></strong></td><td>Type: <code>number</code><br>Default: <code>0.</code><br><br>How is a particle's progress for size calculated? (0: normal, 1: particle lifetime)<br>
</td></tr><tr><td><strong><nobr>mixSurfaceDistance</nobr></strong></td><td>Type: <code>number</code><br>Default: <code>1.</code><br><br>How is a particle's progress for surface distance calculated? (0: normal, 1: particle lifetime)<br>
</td></tr><tr><td><strong><nobr>mixNoise</nobr></strong></td><td>Type: <code>number</code><br>Default: <code>1.</code><br><br>How is a particle's progress for lifetime calculated? (0: normal, 1: particle lifetime)<br>
</td></tr><tr><td><strong><nobr>blending</nobr></strong></td><td>Type: <code>Blending</code><br>Default: <code>AdditiveBlending</code><br><br>Material blending<br>
</td></tr><tr><td><strong><nobr>transparent</nobr></strong></td><td>Type: <code>boolean</code><br>Default: <code>true</code><br><br>Material transparency<br>
</td></tr><tr><td><strong><nobr>depthWrite</nobr></strong></td><td>Type: <code>boolean</code><br>Default: <code>false</code><br><br>Material depth write<br>
</td></tr></tbody></table>