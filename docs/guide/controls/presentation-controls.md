# Presentation Controls

<DocsDemo>
  <PresentationControlsDemo />
</DocsDemo>

The `cientos` package provides a custom control `<PresentationControls>`, which are designed specifically for interactive display management in a 3D scene.

These controls offer smooth, decelerated movements and intuitive content manipulation, enhancing the user experience. They function as Semi-OrbitControls with polar zoom, and snap-back features, specifically designed for presentations. Unlike OrbitControls, they rotate the content itself rather than the camera, and they smoothly predict stopping points. This custom control is based on the [Drei `<PresentationControls>`](https://drei.docs.pmnd.rs/controls/presentation-controls).

## Props

| Prop       | Description                                                                             | Default                      |
| ---------- | --------------------------------------------------------------------------------------- | ---------------------------- |
| enabled    | Enable or disable control interactions.                                               | `true`                       |
| snap       | Automatically snap-back to center <br> Accepts a `boolean` or `numeric` value.      | `true`                       |
| global     | Enable global gesture handling. <br> - If `true`, the controls will spin globally. <br> - If `false`, the element wrapped can be dragged by the model. — It can be combined with `domElement` (See example). | `true`                       |
| cursor     | Enable or disable the cursor style (`grabbing` & `grab`) on drag.                                          | `true`                       |
| speed      | Speed factor.                                                   | `1`                          |
| zoom       | Zoom factor when half of the polar maximum is reached. | `1`    |
| damping    | Smoothing coefficient for the animations.            | `0.25` |
| rotation   | Initial rotation as an array `[x, y, z]` in radians.                                      | `[0, 0, 0]`                  |
| polar      | Vertical rotation limits as an array `[min, max]` (in radians).                           | `[-Math.PI / 2, Math.PI / 2]`                |
| azimuth    | Horizontal rotation limits as an array `[min, max]` (in radians).                         | `[-Infinity, Infinity]`      |
| domElement | DOM element to attach event listeners to.                                               | `null`                       |
| customEase | Custom easing function for animations.                                                  | —                            |
