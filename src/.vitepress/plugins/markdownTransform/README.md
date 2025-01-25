# markdownTransform

This Vitepress plugin transforms Cientos' docs markdown by:

* appending type information from source files to docs markdown
* appending links to source files on Github
* converting Vue SFC demo source to working on-screen demos
    - extracting source and writing it to external SFC components
    - appending demo SFC components
    - adding refs/controls for interactive demos (see below)

## Demos

In docs' markdown, prefixing codeblocks with ...

\`\`\`vue demo

instructs `markdownTransform` to append a working demo i.e. ...

`<DocsDemo>[the demo source]</DocsDemo>`

before the codeblock.

## Demos with controls

Using HTML comments in `vue demo` codeblocks, widgets can be added to control Vue props in on-screen demos.

To create a control, add a control comment immediately before the controlled component.

Below, a range control will be added to modify `position-x` on a `<TresMesh />`.

```vue
<TresCanvas>
  <!-- demo-control position-x
  value: 0
  min: -1
  max: 1
  step: 0.1
  -->
  <TresMesh :position-x="1"></TresMesh>
</TresCanvas>
```

A control comment takes the form of:

```vue
<!-- demo-control [propToControl]
[frontMatterKey]: [frontMatterValue]
[frontMatterKey]: [frontMatterValue]
...
-->
<ControlledComponent :[propToControl]="...">
```
:::important
The `[propToControl]` *must* exist on `<ControlledComponent />`. If a matching prop name does not exist on the component, the controller will be dropped with a build time console warning.

If the component prop is prefixed by a `:`, omit the `:` in the `propToControl` string.
:::

Front-matter key/value pairs are parsed by [gray-matter](https://github.com/jonschlinkert/gray-matter).

### Control comments are stripped

Controls comments will be stripped from the on-screen codeblocks before display.

### Demo Control types

#### color picker

```html
<!-- demo-control color
value: '#F00'
-->
```

#### boolean

```html
<!-- demo-control v-if
value: true
-->
```

#### range

```html
<!-- demo-control position-x
value: 0
min: -5
max: 5
step: 0.1
-->
```

#### Vector3 range

```html
<!-- demo-control scale
value:
- 1
- 1
- 1
min: -2
max: 2
step: 0.1
-->
```

#### text

```html
<!-- demo-control name
value: hello, world
-->
```

#### select

```html
<!-- demo-control clear-color
value: blue
options:
- red
- blue
- green
-->
```
