# Decal — WIP

<DocsDemo>
  <DecalDemo />
</DocsDemo>

The `cientos` package provides an abstraction of the [Decal Geometry](https://threejs.org/docs/#examples/en/geometries/DecalGeometry), `<Decal>` is versatile, such as enhancing models with unique details, dynamically altering visual environments, or seamlessly covering seams. This geometry generates a decal mesh that seamlessly integrates into your scene.

Thanks to its debugging tool 🛠️, it's much easier to position and orientate Decals on objects, models and so on. It also offers a simple way of exporting the data from your `<Decal>` so you can see it permanently on an element.

## Debug Mode

It is crucial to use debug mode to position elements accurately. Without debug mode, you won't be able to see the exact placement and orientation of the decals, making it difficult to achieve the desired results.

If you modify the position of a parent of `Decal(s)` after having already exported their position(s), you will have to re-export the datas of decal(s)

::: warning
Debug mode requires the camera controller [OrbitControls](/guide/controls/orbit-controls.html). It must be present in the scope of `<TresCanvas>`, if not, add it temporarily to add Decal(s).
<br><br>
When you use debug mode on one `<Decal>`, you cannot use it on another `<Decal>`.

```vue
// BAD ❌
<Decal debug :map="texture1" />

<Decal debug :map="texture2" />

// GOOD ✅
<Decal debug :map="texture1" />

<Decal :map="texture2" />
```
:::

::: info
Debug mode automatically disables the `enableDamping` and `autoRotate` properties of [OrbitControls](/guide/controls/orbit-controls.html) for a better experience. When you remove debug mode, your settings will be restored.
:::

<!-- <DocsDemo>
  <DecalDemoDebug />
</DocsDemo>

<<< @/.vitepress/theme/components/DecalDemoDebug.vue{2-6,8-10,12,16,22-26} -->

See [decalsDatas](#decal-datas) part to see the contents of the Decal's datas object of the demo.

## Decal Datas

Partie ou on explique la structure d'un objet exporté par le debug mode

JSON object for examples : [Minimal](#minimal), [Various materials](#various-materials), [Mesh prop](#mesh-prop)
:::details decalsDatas
<!-- <<< @/.vitepress/theme/assets/decal/basicDatas.json -->
:::

JSON object for example : [Model](#model)
:::details modelDatas
<!-- <<< @/.vitepress/theme/assets/decal/modelDatas.json -->
:::

## Usage

### Minimal

The minimal version is very easy to set up: you just need to insert a `<Decal>` component with a map props for the Texture and a call to `v-bind`.

*The default material is [MeshBasicMaterial](https://threejs.org/docs/#api/en/materials/MeshBasicMaterial)*.

<!-- <DocsDemo>
  <DecalDemoBasic />
</DocsDemo>

<<< @/.vitepress/theme/components/DecalDemoBasic.vue{3-4,6-7,16-17} -->

See [decalsDatas](#decal-datas) part to see the contents of the Decal's datas object of the demo.

### Various materials
If the [MeshBasicMaterial](https://threejs.org/docs/#api/en/materials/MeshBasicMaterial) doesn't suit you, you can assign the material you want to the `<Decal>`.  You can now make them react to light 💡, simply by choosing the material that allows it, in this case the [MeshPhysicalMaterial](https://threejs.org/docs/#api/en/materials/MeshPhysicalMaterial).

<!-- <DocsDemo>
  <DecalDemoMaterial />
</DocsDemo>

<<< @/.vitepress/theme/components/DecalDemoMaterial.vue{3-4,6-7,18-23} -->

See [decalsDatas](#decal-datas) part to see the contents of the Decal's datas object of the demo.

### Mesh Prop
Define the surface to which the decal must attach using the mesh prop.

<!-- <DocsDemo>
  <DecalDemoMeshProp />
</DocsDemo>

<<< @/.vitepress/theme/components/DecalDemoMeshProp.vue{2,4-5,7,9-10,18,22-23} -->

See [decalsDatas](#decal-datas) part to see the contents of the Decal's datas object of the demo.

### Model
`<Decal>` can be applied to an imported model!

<!-- <DocsDemo>
  <DecalDemoModel />
</DocsDemo>

<<< @/.vitepress/theme/components/DecalDemoModel.vue{2-5,7,9-10,12,20-28} -->

See [modelDatas](#decal-datas) part to see the contents of the Decal datas object of the demo.

## Props

| Prop              | Description                                          | Default                   |
| :---------------- | :--------------------------------------------------- | ------------------------- |
| **debug**         | `boolean` — Debug mode (Useful for positioning Decal)            | `false`                   |
| **map**           | [`Texture`](https://threejs.org/docs/#api/en/textures/Texture) or `null` — The color map. The map should be applied to the `<Decal>` when no material is applied as a child. (See [usages](#usage) for more details)     | `null`                       |
| **mesh**         | [`Mesh`](https://threejs.org/docs/#api/en/objects/Mesh) or `null` — Define the surface to which the decal must attach using the mesh prop. (See [Mesh Prop](#mesh-prop) part for more details)            | `null`                   |
| **data**         | `number[]` — Position of the decal. Transformed into [`Vector3`](https://threejs.org/docs/#api/en/math/Vector3)         | `[-9999,-9999,-9999]`                   |
| **polygonOffsetFactor**         | `number` — Sets the polygon offset factor | `-10`                   |
| **depthTest**         | `boolean` — Whether to have depth test enabled when rendering this material. | `true`                   |
| **depthWrite**         | `boolean` — Whether rendering this material has any effect on the depth buffer. | `false`                   |
| **order**         | `number` — This value allows the default rendering order of scene graph objects to be overridden although opaque and transparent objects remain sorted independently. <br /> **Sorting is from lowest to highest.** | `Math.round(Math.random() * 100)`                   |

### Feedbacks
