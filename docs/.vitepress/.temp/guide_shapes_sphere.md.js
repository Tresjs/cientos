import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.cc2b3d55.js";
const _imports_0 = "/cientos/sphere.png";
const __pageData = JSON.parse('{"title":"Sphere","description":"","frontmatter":{},"headers":[],"relativePath":"guide/shapes/sphere.md","filePath":"guide/shapes/sphere.md"}');
const _sfc_main = { name: "guide/shapes/sphere.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Badge = resolveComponent("Badge");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="sphere" tabindex="-1">Sphere `);
  _push(ssrRenderComponent(_component_Badge, {
    type: "warning",
    text: "^1.6.0"
  }, null, _parent));
  _push(` <a class="header-anchor" href="#sphere" aria-label="Permalink to &quot;Sphere &lt;Badge type=&quot;warning&quot; text=&quot;^1.6.0&quot; /&gt;&quot;">​</a></h1><p><img${ssrRenderAttr("src", _imports_0)} alt=""></p><p>The <code>cientos</code> package provides a <code>&lt;Sphere /&gt;</code> component that serves as a short-cut for a <code>SphereGeometry</code> and a <code>MeshBasicMaterial</code> with a <code>Mesh</code> object.</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#B392F0" })}">args</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">: [</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  radius: number,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  widthSegments: number,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  heightSegments: number,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  phiStart: number,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  phiLength: number,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  thetaStart: number,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  thetaLength: number</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">args</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">: [</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  radius: number,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  widthSegments: number,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  heightSegments: number,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  phiStart: number,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  phiLength: number,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  thetaStart: number,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  thetaLength: number</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">]</span></span></code></pre></div><p>Reference: <a href="https://threejs.org/docs/?q=sphere#api/en/geometries/SphereGeometry" target="_blank" rel="noreferrer">SphereGeometry</a></p><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">Sphere</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:args</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;[1, 1, 1]&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">color</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;pink&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> /&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">// Sphere with a custom material transformations</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">Sphere</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">ref</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;planeRef&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:args</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;[1, 1, 1]&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:position</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;[2, 4, 0]&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresMeshToonMaterial</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">color</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;pink&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">Sphere</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">Sphere</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:args</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;[1, 1, 1]&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">color</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;pink&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> /&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">// Sphere with a custom material transformations</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">Sphere</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">ref</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;planeRef&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:args</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;[1, 1, 1]&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:position</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;[2, 4, 0]&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresMeshToonMaterial</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">color</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;pink&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">Sphere</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span></code></pre></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/shapes/sphere.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const sphere = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  sphere as default
};
