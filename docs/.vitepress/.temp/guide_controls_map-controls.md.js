import { defineComponent, unref, mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { TresCanvas } from "@tresjs/core";
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from "three";
import { D as Dx, Y as Yx, _ as __unplugin_components_0 } from "./DocsDemo.b6cdbb3e.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.cc2b3d55.js";
import "tweakpane";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MapControlsDemo",
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TresCanvas), mergeProps(gl, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<TresPerspectiveCamera${ssrRenderAttr("position", [3, 3, 3])}${_scopeId}></TresPerspectiveCamera>`);
            _push2(ssrRenderComponent(unref(Dx), null, null, _parent2, _scopeId));
            _push2(`<TresGridHelper${_scopeId}></TresGridHelper>`);
            _push2(ssrRenderComponent(unref(Yx), { scale: 0.5 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<TresMeshNormalMaterial${_scopeId2}></TresMeshNormalMaterial>`);
                } else {
                  return [
                    createVNode("TresMeshNormalMaterial")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<TresAmbientLight${ssrRenderAttr("intensity", 1)}${_scopeId}></TresAmbientLight>`);
          } else {
            return [
              createVNode("TresPerspectiveCamera", { position: [3, 3, 3] }),
              createVNode(unref(Dx)),
              createVNode("TresGridHelper"),
              createVNode(unref(Yx), { scale: 0.5 }, {
                default: withCtx(() => [
                  createVNode("TresMeshNormalMaterial")
                ]),
                _: 1
              }, 8, ["scale"]),
              createVNode("TresAmbientLight", { intensity: 1 })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/theme/components/MapControlsDemo.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __pageData = JSON.parse('{"title":"MapControls","description":"","frontmatter":{},"headers":[],"relativePath":"guide/controls/map-controls.md","filePath":"guide/controls/map-controls.md"}');
const _sfc_main = { name: "guide/controls/map-controls.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_DocsDemo = __unplugin_components_0;
  const _component_MapControlsDemo = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="mapcontrols" tabindex="-1">MapControls <a class="header-anchor" href="#mapcontrols" aria-label="Permalink to &quot;MapControls&quot;">​</a></h1>`);
  _push(ssrRenderComponent(_component_DocsDemo, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_MapControlsDemo, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_MapControlsDemo)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<p><a href="https://threejs.org/docs/index.html?q=controls#examples/en/controls/MapControls" target="_blank" rel="noreferrer">MapControls</a> similar to OrbitControls, this control is intended for transforming a camera over a map from bird&#39;s eye perspective, but uses a specific preset for mouse/touch interaction and disables screen space panning by default.</p><p>However, as it is not part of the core of ThreeJS, to use it you would need to import it from the <code>three/examples/jsm/controls/MapControls</code> module.</p><p>Here is where the fancy part begins. ✨ The <code>cientos</code> package provides a component called <code>&lt;MapControls /&gt;</code>, which is a wrapper of the <code>MapControls</code> from the <a href="https://github.com/pmndrs/three-stdlib" target="_blank" rel="noreferrer"><code>three-stdlib</code></a> module.</p><p>The nicest part? You don&#39;t need to extend the catalog or pass any arguments. It just works. 💯</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark has-highlighted-lines vp-code-dark"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">template</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">shadows</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">alpha</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line highlighted"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresPerspectiveCamera</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:position</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;[0, 0, 3]&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">MapControls</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresGridHelper</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:args</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;[10, 10]&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> /&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">template</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span></code></pre><pre class="shiki github-light has-highlighted-lines vp-code-light"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">template</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">shadows</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">alpha</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line highlighted"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresPerspectiveCamera</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:position</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;[0, 0, 3]&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">MapControls</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresGridHelper</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:args</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;[10, 10]&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> /&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">template</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>Is really important that the Perspective camera is set first in the canvas. Otherwise might break.</p></div><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table><thead><tr><th style="${ssrRenderStyle({ "text-align": "left" })}">Prop</th><th style="${ssrRenderStyle({ "text-align": "left" })}">Description</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>makeDefault</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">If <code>true</code>, the controls will be set as the default controls for the scene.</td><td><code>false</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>camera</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The camera to control.</td><td><code>undefined</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>domElement</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The dom element to listen to.</td><td><code>undefined</code></td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/controls/map-controls.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const mapControls = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  mapControls as default
};
