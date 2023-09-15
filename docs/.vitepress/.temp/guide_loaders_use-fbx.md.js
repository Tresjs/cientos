import { _ as _sfc_main$1 } from "./FBXModelDemo.1db70b21.js";
import { _ as __unplugin_components_0 } from "./DocsDemo.b6cdbb3e.js";
import { withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.cc2b3d55.js";
import "@tresjs/core";
import "three";
import "tweakpane";
const __pageData = JSON.parse('{"title":"useFBX","description":"","frontmatter":{},"headers":[],"relativePath":"guide/loaders/use-fbx.md","filePath":"guide/loaders/use-fbx.md"}');
const _sfc_main = { name: "guide/loaders/use-fbx.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_DocsDemo = __unplugin_components_0;
  const _component_FBXModelDemo = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="usefbx" tabindex="-1">useFBX <a class="header-anchor" href="#usefbx" aria-label="Permalink to &quot;useFBX&quot;">​</a></h1>`);
  _push(ssrRenderComponent(_component_DocsDemo, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_FBXModelDemo, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_FBXModelDemo)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<p>A composable that allows you to easily load glTF models into your <strong>TresJS</strong> scene.</p><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> { useFBX } </span><span style="${ssrRenderStyle({ "color": "#F97583" })}">from</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&#39;@tresjs/cientos&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#F97583" })}">const</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#79B8FF" })}">model</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#F97583" })}">await</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">useFBX</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&#39;/models/Jeep.fbx&#39;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#D73A49" })}">import</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> { useFBX } </span><span style="${ssrRenderStyle({ "color": "#D73A49" })}">from</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&#39;@tresjs/cientos&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#D73A49" })}">const</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#005CC5" })}">model</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#D73A49" })}">=</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#D73A49" })}">await</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">useFBX</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">(</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&#39;/models/Jeep.fbx&#39;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">)</span></span></code></pre></div><p>Then is as straightforward as adding the scene to your scene:</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark has-highlighted-lines vp-code-dark"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">shadows</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">alpha</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">Suspense</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line highlighted"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">primitive</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:object</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;scene&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">Suspense</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span></code></pre><pre class="shiki github-light has-highlighted-lines vp-code-light"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">shadows</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">alpha</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">Suspense</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line highlighted"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">primitive</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:object</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;scene&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">Suspense</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span></code></pre></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/loaders/use-fbx.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const useFbx = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  useFbx as default
};
