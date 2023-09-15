import { ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.cc2b3d55.js";
const __pageData = JSON.parse('{"title":"Stats","description":"","frontmatter":{},"headers":[],"relativePath":"guide/misc/stats.md","filePath":"guide/misc/stats.md"}');
const _sfc_main = { name: "guide/misc/stats.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="stats" tabindex="-1">Stats <a class="header-anchor" href="#stats" aria-label="Permalink to &quot;Stats&quot;">​</a></h1><p><a href="https://github.com/mrdoob/stats.js/" target="_blank" rel="noreferrer">stats.js</a> is a JavaScript performance monitor, made by <a href="https://github.com/mrdoob" target="_blank" rel="noreferrer">mrdoop</a>. stats.js provides a simple info box that will help you monitor your code performance.</p><ul><li>FPS Frames rendered in the last second. The higher the number the better.</li><li>MS Milliseconds needed to render a frame. The lower the number the better.</li><li>MB MBytes of allocated memory. (Run Chrome with --enable-precise-memory-info)</li><li>CUSTOM User-defined panel support.</li></ul><p><strong>TresJS</strong> provides a function called <code>Stats</code> that creates a panel without effort or configuration in the top left corner where you&#39;ll be able to monitor your app.</p><h2 id="basic-usage" tabindex="-1">Basic usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic usage&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> { Stats } </span><span style="${ssrRenderStyle({ "color": "#F97583" })}">from</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&#39;@tresjs/cientos&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#B392F0" })}">Stats</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#D73A49" })}">import</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> { Stats } </span><span style="${ssrRenderStyle({ "color": "#D73A49" })}">from</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&#39;@tresjs/cientos&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">Stats</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">()</span></span></code></pre></div><h2 id="options" tabindex="-1">Options <a class="header-anchor" href="#options" aria-label="Permalink to &quot;Options&quot;">​</a></h2><table><thead><tr><th style="${ssrRenderStyle({ "text-align": "left" })}">Name</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>showPanel</strong></td><td><code>number</code></td><td><code>0</code></td><td>The initial monitor.</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/misc/stats.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const stats = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  stats as default
};
