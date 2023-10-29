# Superformula

<DocsDemo>
  <SuperformulaLechesDemo />
</DocsDemo>

The `cientos` package provides a `<Superformula />` component that produces a configurable [3D plot of the superformula](https://en.wikipedia.org/wiki/Superformula).

## Usage
<DocsDemo>
  <SuperformulaDemo />
</DocsDemo>

<<< @/.vitepress/theme/components/SuperformulaDemo.vue{3,8-14}

## Props

The `<Superformula />` 3D plot is the product of 2 2D superformulas, referred to as "A" and "B" in the props. See this [Wikipedia article about the superformula](https://en.wikipedia.org/wiki/Superformula) for more information about the function's arguments.

<CientosPropsTable 
component-path="src/core/shapes/Superformula.vue" :fields="['name', 'description', 'default']"
:on-get-value="({propName, fieldName, value}) => {
  if (propName === 'numArmsA' && fieldName === 'description') {
    return 'For A, number of radial arms/ripples'
  }
  return value
}"
/>

## Slot

`<Superformula />` has a single slot for an optional material.