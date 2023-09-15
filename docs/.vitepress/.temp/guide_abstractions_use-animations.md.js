import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.cc2b3d55.js";
const __pageData = JSON.parse('{"title":"useAnimations","description":"","frontmatter":{},"headers":[],"relativePath":"guide/abstractions/use-animations.md","filePath":"guide/abstractions/use-animations.md"}');
const _sfc_main = { name: "guide/abstractions/use-animations.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_StackBlitzEmbed = resolveComponent("StackBlitzEmbed");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="useanimations" tabindex="-1">useAnimations <a class="header-anchor" href="#useanimations" aria-label="Permalink to &quot;useAnimations&quot;">​</a></h1><p><code>useAnimation</code> is a composable that returns a <code>shallowReactive</code> with all the models actions based on the animations provided. It is a wrapper around the <a href="https://threejs.org/docs/#api/en/animation/AnimationMixer" target="_blank" rel="noreferrer">AnimationMixer</a> class.</p>`);
  _push(ssrRenderComponent(_component_StackBlitzEmbed, { projectId: "tresjs-use-animations" }, null, _parent));
  _push(`<h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> { useAnimations } </span><span style="${ssrRenderStyle({ "color": "#F97583" })}">from</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&#39;@tresjs/cientos&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#F97583" })}">const</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> { </span><span style="${ssrRenderStyle({ "color": "#FFAB70" })}">scene</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">: </span><span style="${ssrRenderStyle({ "color": "#79B8FF" })}">model</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "color": "#79B8FF" })}">animations</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> } </span><span style="${ssrRenderStyle({ "color": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#F97583" })}">await</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">useGLTF</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&#39;/models/ugly-naked-bunny.gltf&#39;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">)</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#6A737D" })}">// Animations [ { name: &#39;Greeting&#39;}, { name: &#39;Idle&#39; } ]</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#F97583" })}">const</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> { </span><span style="${ssrRenderStyle({ "color": "#79B8FF" })}">actions</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "color": "#79B8FF" })}">mixer</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> } </span><span style="${ssrRenderStyle({ "color": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">useAnimations</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">(animations, model)</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#F97583" })}">let</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> currentAction </span><span style="${ssrRenderStyle({ "color": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> actions.Greeting</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">currentAction.</span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">play</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#D73A49" })}">import</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> { useAnimations } </span><span style="${ssrRenderStyle({ "color": "#D73A49" })}">from</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&#39;@tresjs/cientos&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#D73A49" })}">const</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> { </span><span style="${ssrRenderStyle({ "color": "#E36209" })}">scene</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">: </span><span style="${ssrRenderStyle({ "color": "#005CC5" })}">model</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">, </span><span style="${ssrRenderStyle({ "color": "#005CC5" })}">animations</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> } </span><span style="${ssrRenderStyle({ "color": "#D73A49" })}">=</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#D73A49" })}">await</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">useGLTF</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">(</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&#39;/models/ugly-naked-bunny.gltf&#39;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">)</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#6A737D" })}">// Animations [ { name: &#39;Greeting&#39;}, { name: &#39;Idle&#39; } ]</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#D73A49" })}">const</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> { </span><span style="${ssrRenderStyle({ "color": "#005CC5" })}">actions</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">, </span><span style="${ssrRenderStyle({ "color": "#005CC5" })}">mixer</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> } </span><span style="${ssrRenderStyle({ "color": "#D73A49" })}">=</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">useAnimations</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">(animations, model)</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#D73A49" })}">let</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> currentAction </span><span style="${ssrRenderStyle({ "color": "#D73A49" })}">=</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> actions.Greeting</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">currentAction.</span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">play</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">()</span></span></code></pre></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/abstractions/use-animations.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const useAnimations = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  useAnimations as default
};
