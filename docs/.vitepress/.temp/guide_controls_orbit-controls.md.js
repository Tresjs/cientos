import { defineComponent, reactive, resolveComponent, unref, withCtx, mergeProps, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { TresCanvas } from "@tresjs/core";
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from "three";
import { b as bx, _ as __unplugin_components_0 } from "./DocsDemo.b6cdbb3e.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.cc2b3d55.js";
import "tweakpane";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "OrbitControlsDemo",
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
      enableDamping: true,
      dampingFactor: 0.05,
      enableZoom: true,
      autoRotate: false,
      autoRotateSpeed: 2,
      maxPolarAngle: Math.PI,
      minPolarAngle: 0,
      maxAzimuthAngle: Math.PI,
      minAzimuthAngle: -Math.PI,
      enablePan: true,
      keyPanSpeed: 7,
      maxDistance: 100,
      minDistance: 0,
      minZoom: 0,
      maxZoom: 100,
      zoomSpeed: 1,
      enableRotate: true,
      rotateSpeed: 1
    });
    function onChange() {
    }
    function onStart() {
    }
    function onEnd() {
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TresLeches = resolveComponent("TresLeches");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_TresLeches, null, null, _parent));
      _push(ssrRenderComponent(unref(TresCanvas), gl, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<TresPerspectiveCamera${ssrRenderAttr("position", [3, 3, 3])}${_scopeId}></TresPerspectiveCamera>`);
            _push2(ssrRenderComponent(unref(bx), mergeProps(controlsState, {
              onChange,
              onStart,
              onEnd
            }), null, _parent2, _scopeId));
            _push2(`<TresMesh${_scopeId}><TresBoxGeometry${ssrRenderAttr("args", [2, 2, 2])}${_scopeId}></TresBoxGeometry><TresMeshToonMaterial color="orange"${_scopeId}></TresMeshToonMaterial></TresMesh><TresAmbientLight${ssrRenderAttr("intensity", 1)}${_scopeId}></TresAmbientLight><TresDirectionalLight${ssrRenderAttr("intensity", 1)}${ssrRenderAttr("position", [0, 2, 4])}${_scopeId}></TresDirectionalLight><TresGridHelper${_scopeId}></TresGridHelper>`);
          } else {
            return [
              createVNode("TresPerspectiveCamera", { position: [3, 3, 3] }),
              createVNode(unref(bx), mergeProps(controlsState, {
                onChange,
                onStart,
                onEnd
              }), null, 16),
              createVNode("TresMesh", null, [
                createVNode("TresBoxGeometry", { args: [2, 2, 2] }),
                createVNode("TresMeshToonMaterial", { color: "orange" })
              ]),
              createVNode("TresAmbientLight", { intensity: 1 }),
              createVNode("TresDirectionalLight", {
                intensity: 1,
                position: [0, 2, 4]
              }),
              createVNode("TresGridHelper")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/theme/components/OrbitControlsDemo.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __pageData = JSON.parse('{"title":"OrbitControls","description":"","frontmatter":{},"headers":[],"relativePath":"guide/controls/orbit-controls.md","filePath":"guide/controls/orbit-controls.md"}');
const _sfc_main = { name: "guide/controls/orbit-controls.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_DocsDemo = __unplugin_components_0;
  const _component_OrbitControlsDemo = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="orbitcontrols" tabindex="-1">OrbitControls <a class="header-anchor" href="#orbitcontrols" aria-label="Permalink to &quot;OrbitControls&quot;">​</a></h1>`);
  _push(ssrRenderComponent(_component_DocsDemo, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_OrbitControlsDemo, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_OrbitControlsDemo)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<p><a href="https://threejs.org/docs/index.html?q=orbit#examples/en/controls/OrbitControls" target="_blank" rel="noreferrer">OrbitControls</a> is a camera controller that allows you to orbit around a target. It&#39;s a great way to explore your scene.</p><p>However, it is not part of the core of ThreeJS. So to use it you would need to import it from the <code>three/examples/jsm/controls/OrbitControls</code> module.</p><p>Here is where the fancy part begins. ✨<br> The <code>cientos</code> package provides a component called <code>&lt;OrbitControls /&gt;</code> that is a wrapper of the <code>OrbitControls</code> from the <a href="https://github.com/pmndrs/three-stdlib" target="_blank" rel="noreferrer"><code>three-stdlib</code></a> module.</p><p>The nicest part? You don&#39;t need to extend the catalog or pass any arguments.<br> It just works. 💯</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark has-highlighted-lines vp-code-dark"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">template</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">shadows</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">alpha</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line highlighted"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresPerspectiveCamera</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:args</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;[45, 1, 0.1, 1000]&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">OrbitControls</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> /&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">template</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span></code></pre><pre class="shiki github-light has-highlighted-lines vp-code-light"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">template</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">shadows</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">alpha</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line highlighted"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresPerspectiveCamera</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:args</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;[45, 1, 0.1, 1000]&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">OrbitControls</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> /&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">template</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>Is really important that the Perspective camera is set first in the canvas. Otherwise might break.</p></div><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table><thead><tr><th style="${ssrRenderStyle({ "text-align": "left" })}">Prop</th><th style="${ssrRenderStyle({ "text-align": "left" })}">Description</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>makeDefault</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">If <code>true</code>, the controls will be set as the default controls for the scene.</td><td><code>false</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>camera</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The camera to control.</td><td><code>undefined</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>domElement</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The dom element to listen to.</td><td><code>undefined</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>target</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The target to orbit around.</td><td><code>undefined</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>enableDamping</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">If <code>true</code>, the controls will use damping (inertia), which can be used to give a sense of weight to the controls.</td><td><code>false</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>dampingFactor</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The damping inertia used if <code>.enableDamping</code> is set to true.</td><td><code>0.05</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>autoRotate</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Set to true to automatically rotate around the target.</td><td><code>false</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>autoRotateSpeed</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">How fast to rotate around the target if <code>.autoRotate</code> is true.</td><td><code>2</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>enablePan</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Whether to enable panning.</td><td><code>true</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>keyPanSpeed</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">How fast to pan the camera when the keyboard is used. Default is 7.0 pixels per keypress.</td><td><code>7.0</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>keys</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">This object contains references to the keycodes for controlling camera panning. Default is the 4 arrow keys.</td><td><code>{ LEFT: &#39;ArrowLeft&#39;, UP: &#39;ArrowUp&#39;, RIGHT: &#39;ArrowRight&#39;, BOTTOM: &#39;ArrowDown&#39; }</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>maxAzimuthAngle</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">How far you can orbit horizontally, upper limit. If set, the interval [ min, max ] must be a sub-interval of [ - 2 PI, 2 PI ], with ( max - min &lt; 2 PI ). Default is Infinity.</td><td><code>Infinity</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>minAzimuthAngle</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">How far you can orbit horizontally, lower limit. If set, the interval [ min, max ] must be a sub-interval of [ - 2 PI, 2 PI ], with ( max - min &lt; 2 PI ). Default is - Infinity.</td><td><code>-Infinity</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>maxPolarAngle</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">How far you can orbit vertically, upper limit. Range is 0 to Math.PI radians, and default is Math.PI.</td><td><code>Math.PI</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>minPolarAngle</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">How far you can orbit vertically, lower limit. Range is 0 to Math.PI radians, and default is 0.</td><td><code>0</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>minDistance</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The minimum distance of the camera to the target. Default is 0.</td><td><code>0</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>maxDistance</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The maximum distance of the camera to the target. Default is Infinity.</td><td><code>Infinity</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>minZoom</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The minimum field of view angle, in radians. Default is 0.</td><td><code>0</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>maxZoom</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The maximum field of view angle, in radians. ( OrthographicCamera only ). Default is Infinity.</td><td><code>Infinity</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>touches</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">This object contains references to the touch actions used by the controls.</td><td><code>{ ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN }</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}">-</td><td style="${ssrRenderStyle({ "text-align": "left" })}">-</td><td></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>enableZoom</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Whether to enable zooming.</td><td><code>true</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>zoomSpeed</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">How fast to zoom in and out. Default is 1.</td><td><code>1</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>enableRotate</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Whether to enable rotating.</td><td><code>true</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>rotateSpeed</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">How fast to rotate around the target. Default is 1.</td><td><code>1</code></td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">OrbitControls</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">@change</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;onChange&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">@start</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;onStart&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">@end</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;onEnd&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> /&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">OrbitControls</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">@change</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;onChange&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">@start</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;onStart&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">@end</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;onEnd&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> /&gt;</span></span></code></pre></div><table><thead><tr><th style="${ssrRenderStyle({ "text-align": "left" })}">Event</th><th style="${ssrRenderStyle({ "text-align": "left" })}">Description</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>start</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Dispatched when the control starts to change.</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>change</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Dispatched when the control changes.</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>end</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Dispatched when the control ends to change.</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/controls/orbit-controls.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const orbitControls = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  orbitControls as default
};
