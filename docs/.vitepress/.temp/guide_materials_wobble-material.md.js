import { defineComponent, unref, mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { TresCanvas } from "@tresjs/core";
import { L as Lx, b as bx, _ as __unplugin_components_0 } from "./DocsDemo.b6cdbb3e.js";
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from "three";
import { _ as _export_sfc } from "./plugin-vue_export-helper.cc2b3d55.js";
import "tweakpane";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "WobbleMaterialDemo",
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
            _push2(`<TresPerspectiveCamera${ssrRenderAttr("position", [3, 3, 3])}${_scopeId}></TresPerspectiveCamera><TresMesh${_scopeId}><TresTorusGeometry${_scopeId}></TresTorusGeometry>`);
            _push2(ssrRenderComponent(unref(Lx), {
              color: "orange",
              speed: 1,
              factor: 2
            }, null, _parent2, _scopeId));
            _push2(`</TresMesh><TresAmbientLight${ssrRenderAttr("intensity", 1)}${_scopeId}></TresAmbientLight><TresDirectionalLight${ssrRenderAttr("intensity", 1)}${ssrRenderAttr("position", [2, 2, 2])}${_scopeId}></TresDirectionalLight>`);
            _push2(ssrRenderComponent(unref(bx), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("TresPerspectiveCamera", { position: [3, 3, 3] }),
              createVNode("TresMesh", null, [
                createVNode("TresTorusGeometry"),
                createVNode(unref(Lx), {
                  color: "orange",
                  speed: 1,
                  factor: 2
                })
              ]),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/theme/components/WobbleMaterialDemo.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __pageData = JSON.parse('{"title":"MeshWobbleMaterial","description":"","frontmatter":{},"headers":[],"relativePath":"guide/materials/wobble-material.md","filePath":"guide/materials/wobble-material.md"}');
const _sfc_main = { name: "guide/materials/wobble-material.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_DocsDemo = __unplugin_components_0;
  const _component_WobbleMaterialDemo = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="meshwobblematerial" tabindex="-1">MeshWobbleMaterial <a class="header-anchor" href="#meshwobblematerial" aria-label="Permalink to &quot;MeshWobbleMaterial&quot;">​</a></h1>`);
  _push(ssrRenderComponent(_component_DocsDemo, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_WobbleMaterialDemo, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_WobbleMaterialDemo)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<p>The <code>cientos</code> package provides a <code>&lt;MeshWobbleMaterial /&gt;</code> component that makes a geometry wobble and wave around. This material extends <code>MeshStandardMaterial</code> so all the default props can be passed as well in addition for two more:</p><ul><li><code>speed</code> how fast the wobble effect would be</li><li><code>factor</code>: how strong the wobble effect will deform the geometry</li></ul><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresMesh</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresTorusGeometry</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">MeshWobbleMaterial</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">color</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;orange&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">speed</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;10&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">factor</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;5&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresMesh</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresMesh</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresTorusGeometry</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">MeshWobbleMaterial</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">color</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;orange&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">speed</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;10&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">factor</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;5&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresMesh</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span></code></pre></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/materials/wobble-material.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const wobbleMaterial = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  wobbleMaterial as default
};
