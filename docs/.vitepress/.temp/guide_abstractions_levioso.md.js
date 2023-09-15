import { defineComponent, withAsyncContext, shallowRef, watchEffect, unref, mergeProps, withCtx, createVNode, useSSRContext, openBlock, createBlock, Suspense } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderSuspense, ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { TresCanvas } from "@tresjs/core";
import { H as HI, E as Ex, b as bx, _ as __unplugin_components_0 } from "./DocsDemo.b6cdbb3e.js";
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from "three";
import { _ as _export_sfc } from "./plugin-vue_export-helper.cc2b3d55.js";
import "tweakpane";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Feather",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { scene: feather, nodes } = ([__temp, __restore] = withAsyncContext(() => HI("/feather.glb")), __temp = await __temp, __restore(), __temp);
    const featherRef = shallowRef();
    watchEffect(() => {
      if (featherRef.value) {
        console.log(featherRef.value);
        featherRef.value.rotation.y = -Math.PI / 4;
        featherRef.value.updateMatrixWorld();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Ex), mergeProps({ speed: 4 }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<primitive${ssrRenderAttr("object", unref(nodes).Sketchfab_model)}${ssrRenderAttr("position-y", -Math.PI / 4)}${_scopeId}></primitive>`);
          } else {
            return [
              createVNode("primitive", {
                ref_key: "featherRef",
                ref: featherRef,
                object: unref(nodes).Sketchfab_model,
                "position-y": -Math.PI / 4
              }, null, 8, ["object", "position-y"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/theme/components/Feather.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "LeviosoDemo",
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
            _push2(`<TresPerspectiveCamera${ssrRenderAttr("position", [1, 2, 1])}${_scopeId}></TresPerspectiveCamera>`);
            ssrRenderSuspense(_push2, {
              default: () => {
                _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
              },
              _: 1
            });
            _push2(`<TresAmbientLight${ssrRenderAttr("intensity", 1)}${_scopeId}></TresAmbientLight><TresDirectionalLight${ssrRenderAttr("intensity", 1)}${ssrRenderAttr("position", [2, 2, 2])}${_scopeId}></TresDirectionalLight>`);
            _push2(ssrRenderComponent(unref(bx), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("TresPerspectiveCamera", { position: [1, 2, 1] }),
              (openBlock(), createBlock(Suspense, null, {
                default: withCtx(() => [
                  createVNode(_sfc_main$2)
                ]),
                _: 1
              })),
              createVNode("TresAmbientLight", { intensity: 1 }),
              createVNode("TresDirectionalLight", {
                intensity: 1,
                position: [2, 2, 2]
              }),
              createVNode(unref(bx))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/theme/components/LeviosoDemo.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const levioso_md_vue_type_style_index_0_scoped_80fb896c_lang = "";
const __pageData = JSON.parse('{"title":"Levioso (Float)","description":"","frontmatter":{},"headers":[],"relativePath":"guide/abstractions/levioso.md","filePath":"guide/abstractions/levioso.md"}');
const _sfc_main = { name: "guide/abstractions/levioso.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_DocsDemo = __unplugin_components_0;
  const _component_LeviosoDemo = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-80fb896c><h1 id="levioso-float" tabindex="-1" data-v-80fb896c>Levioso (Float) <a class="header-anchor" href="#levioso-float" aria-label="Permalink to &quot;Levioso (Float)&quot;" data-v-80fb896c>​</a></h1>`);
  _push(ssrRenderComponent(_component_DocsDemo, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_LeviosoDemo, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_LeviosoDemo)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<p data-v-80fb896c><img src="https://media.giphy.com/media/HaCFT5ghY6L1m/giphy.gif" alt="Leviosa" data-v-80fb896c></p><p data-v-80fb896c>The <code data-v-80fb896c>cientos</code> package provides a <code data-v-80fb896c>&lt;Levioso /&gt;</code> wrapper that makes it content... float, just like Magic 🪄✨</p><h2 id="usage" tabindex="-1" data-v-80fb896c>Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;" data-v-80fb896c>​</a></h2><div class="language-html vp-adaptive-theme" data-v-80fb896c><button title="Copy Code" class="copy" data-v-80fb896c></button><span class="lang" data-v-80fb896c>html</span><pre class="shiki github-dark vp-code-dark" data-v-80fb896c><code data-v-80fb896c><span class="line" data-v-80fb896c><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}" data-v-80fb896c>&lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}" data-v-80fb896c>Levioso</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}" data-v-80fb896c> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}" data-v-80fb896c>ref</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}" data-v-80fb896c>=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}" data-v-80fb896c>&quot;groupRef&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}" data-v-80fb896c>&gt;</span></span>
<span class="line" data-v-80fb896c><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}" data-v-80fb896c>  &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}" data-v-80fb896c>TorusKnot</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}" data-v-80fb896c> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}" data-v-80fb896c>:position</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}" data-v-80fb896c>=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}" data-v-80fb896c>&quot;[0, 4, 0]&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}" data-v-80fb896c>&gt;</span></span>
<span class="line" data-v-80fb896c><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}" data-v-80fb896c>    &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}" data-v-80fb896c>TresMeshNormalMaterial</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}" data-v-80fb896c> /&gt;</span></span>
<span class="line" data-v-80fb896c><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}" data-v-80fb896c>  &lt;/</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}" data-v-80fb896c>TorusKnot</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}" data-v-80fb896c>&gt;</span></span>
<span class="line" data-v-80fb896c><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}" data-v-80fb896c>&lt;/</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}" data-v-80fb896c>Levioso</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}" data-v-80fb896c>&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light" data-v-80fb896c><code data-v-80fb896c><span class="line" data-v-80fb896c><span style="${ssrRenderStyle({ "color": "#24292E" })}" data-v-80fb896c>&lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}" data-v-80fb896c>Levioso</span><span style="${ssrRenderStyle({ "color": "#24292E" })}" data-v-80fb896c> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}" data-v-80fb896c>ref</span><span style="${ssrRenderStyle({ "color": "#24292E" })}" data-v-80fb896c>=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}" data-v-80fb896c>&quot;groupRef&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}" data-v-80fb896c>&gt;</span></span>
<span class="line" data-v-80fb896c><span style="${ssrRenderStyle({ "color": "#24292E" })}" data-v-80fb896c>  &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}" data-v-80fb896c>TorusKnot</span><span style="${ssrRenderStyle({ "color": "#24292E" })}" data-v-80fb896c> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}" data-v-80fb896c>:position</span><span style="${ssrRenderStyle({ "color": "#24292E" })}" data-v-80fb896c>=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}" data-v-80fb896c>&quot;[0, 4, 0]&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}" data-v-80fb896c>&gt;</span></span>
<span class="line" data-v-80fb896c><span style="${ssrRenderStyle({ "color": "#24292E" })}" data-v-80fb896c>    &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}" data-v-80fb896c>TresMeshNormalMaterial</span><span style="${ssrRenderStyle({ "color": "#24292E" })}" data-v-80fb896c> /&gt;</span></span>
<span class="line" data-v-80fb896c><span style="${ssrRenderStyle({ "color": "#24292E" })}" data-v-80fb896c>  &lt;/</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}" data-v-80fb896c>TorusKnot</span><span style="${ssrRenderStyle({ "color": "#24292E" })}" data-v-80fb896c>&gt;</span></span>
<span class="line" data-v-80fb896c><span style="${ssrRenderStyle({ "color": "#24292E" })}" data-v-80fb896c>&lt;/</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}" data-v-80fb896c>Levioso</span><span style="${ssrRenderStyle({ "color": "#24292E" })}" data-v-80fb896c>&gt;</span></span></code></pre></div><h2 id="props" tabindex="-1" data-v-80fb896c>Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;" data-v-80fb896c>​</a></h2><table data-v-80fb896c><thead data-v-80fb896c><tr data-v-80fb896c><th style="${ssrRenderStyle({ "text-align": "left" })}" data-v-80fb896c>Prop</th><th style="${ssrRenderStyle({ "text-align": "left" })}" data-v-80fb896c>Description</th><th data-v-80fb896c>Default</th></tr></thead><tbody data-v-80fb896c><tr data-v-80fb896c><td style="${ssrRenderStyle({ "text-align": "left" })}" data-v-80fb896c><code data-v-80fb896c>speed</code></td><td style="${ssrRenderStyle({ "text-align": "left" })}" data-v-80fb896c>Floating speed, higher it rocks more 🤘.</td><td data-v-80fb896c><code data-v-80fb896c>1</code></td></tr><tr data-v-80fb896c><td style="${ssrRenderStyle({ "text-align": "left" })}" data-v-80fb896c><code data-v-80fb896c>rotationFactor</code></td><td style="${ssrRenderStyle({ "text-align": "left" })}" data-v-80fb896c>Factor for Euler rotation.</td><td data-v-80fb896c><code data-v-80fb896c>1</code></td></tr><tr data-v-80fb896c><td style="${ssrRenderStyle({ "text-align": "left" })}" data-v-80fb896c><code data-v-80fb896c>floatFactor</code></td><td style="${ssrRenderStyle({ "text-align": "left" })}" data-v-80fb896c>Factor for Up/down movement.</td><td data-v-80fb896c><code data-v-80fb896c>1</code></td></tr><tr data-v-80fb896c><td style="${ssrRenderStyle({ "text-align": "left" })}" data-v-80fb896c><code data-v-80fb896c>range</code></td><td style="${ssrRenderStyle({ "text-align": "left" })}" data-v-80fb896c>Range of y-axis values the object will float within.</td><td data-v-80fb896c><code data-v-80fb896c>[-0.1, 0.1]</code></td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/abstractions/levioso.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const levioso = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-80fb896c"]]);
export {
  __pageData,
  levioso as default
};
