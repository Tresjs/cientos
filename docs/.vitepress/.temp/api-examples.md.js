import { useSSRContext, unref } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import { u as useData } from "./Content.2e6a8024.js";
import "@vueuse/core";
const __pageData = JSON.parse('{"title":"Runtime API Examples","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"api-examples.md","filePath":"api-examples.md"}');
const __default__ = { name: "api-examples.md" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const { site, theme, page, frontmatter } = useData();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="runtime-api-examples" tabindex="-1">Runtime API Examples <a class="header-anchor" href="#runtime-api-examples" aria-label="Permalink to &quot;Runtime API Examples&quot;">​</a></h1><p>This page demonstrates usage of some of the runtime APIs provided by VitePress.</p><p>The main <code>useData()</code> API can be used to access site, theme, and page data for the current page. It works in both <code>.md</code> and <code>.vue</code> files:</p><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;script setup&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">import { useData } from &#39;vitepress&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">const { theme, page, frontmatter } = useData()</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;/script&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#79B8FF", "font-weight": "bold" })}">## Results</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#79B8FF", "font-weight": "bold" })}">### Theme Data</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;pre&gt;{{ theme }}&lt;/pre&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#79B8FF", "font-weight": "bold" })}">### Page Data</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;pre&gt;{{ page }}&lt;/pre&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#79B8FF", "font-weight": "bold" })}">### Page Frontmatter</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;pre&gt;{{ frontmatter }}&lt;/pre&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;script setup&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">import { useData } from &#39;vitepress&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">const { theme, page, frontmatter } = useData()</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;/script&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#005CC5", "font-weight": "bold" })}">## Results</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#005CC5", "font-weight": "bold" })}">### Theme Data</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;pre&gt;{{ theme }}&lt;/pre&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#005CC5", "font-weight": "bold" })}">### Page Data</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;pre&gt;{{ page }}&lt;/pre&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#005CC5", "font-weight": "bold" })}">### Page Frontmatter</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;pre&gt;{{ frontmatter }}&lt;/pre&gt;</span></span></code></pre></div><h2 id="results" tabindex="-1">Results <a class="header-anchor" href="#results" aria-label="Permalink to &quot;Results&quot;">​</a></h2><h3 id="theme-data" tabindex="-1">Theme Data <a class="header-anchor" href="#theme-data" aria-label="Permalink to &quot;Theme Data&quot;">​</a></h3><pre>${ssrInterpolate(unref(theme))}</pre><h3 id="page-data" tabindex="-1">Page Data <a class="header-anchor" href="#page-data" aria-label="Permalink to &quot;Page Data&quot;">​</a></h3><pre>${ssrInterpolate(unref(page))}</pre><h3 id="page-frontmatter" tabindex="-1">Page Frontmatter <a class="header-anchor" href="#page-frontmatter" aria-label="Permalink to &quot;Page Frontmatter&quot;">​</a></h3><pre>${ssrInterpolate(unref(frontmatter))}</pre><h2 id="more" tabindex="-1">More <a class="header-anchor" href="#more" aria-label="Permalink to &quot;More&quot;">​</a></h2><p>Check out the documentation for the <a href="https://vitepress.dev/reference/runtime-api#usedata" target="_blank" rel="noreferrer">full list of runtime APIs</a>.</p></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("api-examples.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  __pageData,
  _sfc_main as default
};
