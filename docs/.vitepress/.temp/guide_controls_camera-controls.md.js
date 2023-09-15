import { defineComponent, reactive, shallowRef, unref, mergeProps, withCtx, createVNode, useSSRContext, resolveComponent } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { TresCanvas } from "@tresjs/core";
import { F as Fx, _ as __unplugin_components_0 } from "./DocsDemo.b6cdbb3e.js";
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from "three";
import { _ as _export_sfc } from "./plugin-vue_export-helper.cc2b3d55.js";
import "tweakpane";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CameraControlsDemo",
  __ssrInlineRender: true,
  setup(__props) {
    const gl = {
      clearColor: "#82DBC5",
      shadows: true,
      alpha: false,
      shadowMapType: BasicShadowMap,
      outputColorSpace: SRGBColorSpace,
      toneMapping: NoToneMapping
    };
    const controlsState = reactive({
      minDistance: 0,
      maxDistance: 100
    });
    const controlsRef = shallowRef();
    const boxMeshRef = shallowRef();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TresCanvas), mergeProps(gl, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<TresPerspectiveCamera${ssrRenderAttr("position", [5, 5, 5])}${_scopeId}></TresPerspectiveCamera>`);
            _push2(ssrRenderComponent(unref(Fx), mergeProps(controlsState, {
              ref_key: "controlsRef",
              ref: controlsRef,
              "make-default": ""
            }), null, _parent2, _scopeId));
            _push2(`<TresGridHelper${ssrRenderAttr("position", [0, -1, 0])}${_scopeId}></TresGridHelper><TresMesh${_scopeId}><TresBoxGeometry${ssrRenderAttr("args", [2, 2, 2])}${_scopeId}></TresBoxGeometry><TresMeshToonMaterial color="orange"${_scopeId}></TresMeshToonMaterial></TresMesh><TresAmbientLight${ssrRenderAttr("intensity", 1)}${_scopeId}></TresAmbientLight><TresDirectionalLight${ssrRenderAttr("intensity", 1)}${ssrRenderAttr("position", [0, 2, 4])}${_scopeId}></TresDirectionalLight>`);
          } else {
            return [
              createVNode("TresPerspectiveCamera", { position: [5, 5, 5] }),
              createVNode(unref(Fx), mergeProps(controlsState, {
                ref_key: "controlsRef",
                ref: controlsRef,
                "make-default": ""
              }), null, 16),
              createVNode("TresGridHelper", { position: [0, -1, 0] }),
              createVNode("TresMesh", {
                ref_key: "boxMeshRef",
                ref: boxMeshRef
              }, [
                createVNode("TresBoxGeometry", { args: [2, 2, 2] }),
                createVNode("TresMeshToonMaterial", { color: "orange" })
              ], 512),
              createVNode("TresAmbientLight", { intensity: 1 }),
              createVNode("TresDirectionalLight", {
                intensity: 1,
                position: [0, 2, 4]
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/theme/components/CameraControlsDemo.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __pageData = JSON.parse('{"title":"CameraControls","description":"","frontmatter":{},"headers":[],"relativePath":"guide/controls/camera-controls.md","filePath":"guide/controls/camera-controls.md"}');
const _sfc_main = { name: "guide/controls/camera-controls.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Badge = resolveComponent("Badge");
  const _component_DocsDemo = __unplugin_components_0;
  const _component_CameraControlsDemo = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="cameracontrols" tabindex="-1">CameraControls `);
  _push(ssrRenderComponent(_component_Badge, {
    type: "warning",
    text: "^3.2.0"
  }, null, _parent));
  _push(` <a class="header-anchor" href="#cameracontrols" aria-label="Permalink to &quot;CameraControls &lt;Badge type=&quot;warning&quot; text=&quot;^3.2.0&quot; /&gt;&quot;">​</a></h1>`);
  _push(ssrRenderComponent(_component_DocsDemo, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_CameraControlsDemo, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_CameraControlsDemo)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<p><a href="https://github.com/yomotsu/camera-controls" target="_blank" rel="noreferrer">CameraControls</a> is a camera controller similar to <a href="https://cientos.tresjs.org/guide/controls/orbit-controls.html" target="_blank" rel="noreferrer">OrbitControls</a> yet supports smooth transitions and more features.</p><p>However, it is thirty party library for ThreeJS. So to use it you would need to install and import using <a href="https://www.npmjs.com/package/camera-controls" target="_blank" rel="noreferrer">npm</a>.</p><p>Here is where the fancy part begins. ✨ The <code>cientos</code> package provides a component called <code>&lt;CameraControls /&gt;</code> that is a wrapper of the <code>CameraControls</code> from the <a href="https://github.com/yomotsu/camera-controls" target="_blank" rel="noreferrer"><code>camera-controls</code></a> module.</p><p>The nicest part? You don&#39;t need to extend the catalog or pass any arguments. It just works. 💯</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark has-highlighted-lines vp-code-dark"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">template</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">shadows</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">alpha</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line highlighted"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresPerspectiveCamera</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:args</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;[45, 1, 0.1, 1000]&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">CameraControls</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">template</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span></code></pre><pre class="shiki github-light has-highlighted-lines vp-code-light"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">template</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">shadows</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">alpha</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line highlighted"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresPerspectiveCamera</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:args</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;[45, 1, 0.1, 1000]&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">CameraControls</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">template</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>Is really important that the Perspective camera is set first in the canvas. Otherwise might break.</p></div><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><p>Certainly! Here&#39;s the properties of the object in raw markdown table format:</p><table><thead><tr><th style="${ssrRenderStyle({ "text-align": "left" })}">Prop</th><th style="${ssrRenderStyle({ "text-align": "left" })}">Description</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>makeDefault</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Whether to make this the default controls.</td><td><code>false</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>camera</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The camera to control.</td><td><code>undefined</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>domElement</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The DOM element to listen to.</td><td><code>undefined</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>minPolarAngle</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Minimum vertical angle in radians.</td><td><code>0</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>maxPolarAngle</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Maximum vertical angle in radians.</td><td><code>Math.PI</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>minAzimuthAngle</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Minimum horizontal angle in radians.</td><td><code>-Infinity</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>maxAzimuthAngle</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Maximum horizontal angle in radians.</td><td><code>Infinity</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>distance</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Current distance.</td><td><code>8</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>minDistance</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Minimum distance for dolly. PerspectiveCamera only.</td><td><code>Number.EPSILON</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>maxDistance</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Maximum distance for dolly. PerspectiveCamera only.</td><td><code>Infinity</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>infinityDolly</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}"><code>true</code> to enable Infinity Dolly for wheel and pinch.</td><td><code>false</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>minZoom</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Minimum camera zoom.</td><td><code>0.01</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>maxZoom</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Maximum camera zoom.</td><td><code>Infinity</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>smoothTime</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Approximate time in seconds to reach the target. A smaller value will reach the target faster.</td><td><code>0.25</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>draggingSmoothTime</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The smoothTime while dragging.</td><td><code>0.125</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>maxSpeed</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Max transition speed in units per second.</td><td><code>Infinity</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>azimuthRotateSpeed</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Speed of azimuth (horizontal) rotation.</td><td><code>1.0</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>polarRotateSpeed</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Speed of polar (vertical) rotation.</td><td><code>1.0</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>dollySpeed</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Speed of mouse-wheel dollying.</td><td><code>1.0</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>dollyDragInverted</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}"><code>true</code> to invert direction when dollying or zooming via drag.</td><td><code>false</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>truckSpeed</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Speed of drag for truck and pedestal.</td><td><code>2.0</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>dollyToCursor</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}"><code>true</code> to enable Dolly-in to the mouse cursor coords.</td><td><code>false</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>dragToOffset</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Whether to drag to offset.</td><td><code>false</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>verticalDragToForward</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The same as <code>.screenSpacePanning</code> in three.js&#39;s OrbitControls.</td><td><code>false</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>boundaryFriction</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Friction ratio of the boundary.</td><td><code>0.0</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>restThreshold</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Controls how soon the <code>rest</code> event fires as the camera slows.</td><td><code>0.01</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>colliderMeshes</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">An array of Meshes to collide with the camera. Be aware colliderMeshes may decrease performance. The collision test uses 4 raycasters from the camera since the near plane has 4 corners.</td><td><code>[]</code></td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">CameraControls</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">@change</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;onChange&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">@start</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;onStart&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">@end</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;onEnd&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> /&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">CameraControls</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">@change</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;onChange&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">@start</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;onStart&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">@end</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;onEnd&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> /&gt;</span></span></code></pre></div><table><thead><tr><th style="${ssrRenderStyle({ "text-align": "left" })}">Event</th><th style="${ssrRenderStyle({ "text-align": "left" })}">Description</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>start</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Dispatched when the control starts to change.</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>change</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Dispatched when the control changes.</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>end</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Dispatched when the control ends to change.</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/controls/camera-controls.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const cameraControls = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  cameraControls as default
};
