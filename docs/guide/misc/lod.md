# LOD (level of detail)

<DocsDemo>
  <LODDemo />
</DocsDemo>

**Cientos** provides a component called `LOD` (Level of Detail) which reduces or increase the resolution of the geometry based on distance from the camera. based on: [LOD](https://threejs.org/docs/index.html?q=lod#api/en/objects/LOD)

Every level is associated with a group, and rendering can be switched between them at the distances specified. Typically you would create, say, three meshes:

- one for far away (lesser detail)
- one for mid-range (medium detail)
- one for close-up (higher detail).

## Basic usage

When using the `<LOD >` component you need to pass a `distance` prop, then you put inside all the components that will be rendered at that distance

<<< @/.vitepress/theme/components/LODDemo.vue{3,10-14,16-20,22-26}

::: warning
Due the nature of the base class on ThreeJs this component is not reactive, that's mean if you make a change you have to manually reload the page for view them.
:::

## Props

| Prop          | Type     | Default | Description  |
| :------------ | -------- | ------- | ------------ |
| **distance** | `number` | required    | The distance at which to display this level of detail.. |
| **hysteresis** | `number` | `0`     | Threshold used to avoid flickering at LOD boundaries, as a fraction of distance.. |
