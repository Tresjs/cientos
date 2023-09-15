import { defineComponent, ref, withAsyncContext, unref, mergeProps, withCtx, createVNode, useSSRContext, resolveComponent } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { B as Bx, b as bx, Y as Yx, _ as __unplugin_components_0 } from "./DocsDemo.b6cdbb3e.js";
import { TresCanvas } from "@tresjs/core";
import { SRGBColorSpace, NoToneMapping } from "three";
import { _ as _export_sfc } from "./plugin-vue_export-helper.cc2b3d55.js";
import "tweakpane";
const exampleVideo = "https://raw.githubusercontent.com/Tresjs/assets/main/textures/video-textures/useVideoTexture.mp4";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "VideoTextureDemo",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const gl = {
      clearColor: "#333",
      alpha: true,
      outputColorSpace: SRGBColorSpace,
      toneMapping: NoToneMapping,
      useLegacyLights: false
    };
    const texture = ref();
    texture.value = ([__temp, __restore] = withAsyncContext(() => Bx(exampleVideo, { loop: false })), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TresCanvas), mergeProps(gl, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<TresPerspectiveCamera${ssrRenderAttr("position", [0, 5, 9])}${ssrRenderAttr("look-at", [0, 1, 0])}${_scopeId}></TresPerspectiveCamera>`);
            _push2(ssrRenderComponent(unref(bx), null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Yx), { position: [0, 2, 0] }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<TresMeshBasicMaterial${ssrRenderAttr("map", texture.value)}${_scopeId2}></TresMeshBasicMaterial>`);
                } else {
                  return [
                    createVNode("TresMeshBasicMaterial", { map: texture.value }, null, 8, ["map"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<TresGridHelper${ssrRenderAttr("size", 10)}${ssrRenderAttr("divisions", 10)}${_scopeId}></TresGridHelper><TresAmbientLight${ssrRenderAttr("intensity", 1)}${_scopeId}></TresAmbientLight>`);
          } else {
            return [
              createVNode("TresPerspectiveCamera", {
                position: [0, 5, 9],
                "look-at": [0, 1, 0]
              }),
              createVNode(unref(bx)),
              createVNode(unref(Yx), { position: [0, 2, 0] }, {
                default: withCtx(() => [
                  createVNode("TresMeshBasicMaterial", { map: texture.value }, null, 8, ["map"])
                ]),
                _: 1
              }),
              createVNode("TresGridHelper", {
                size: 10,
                divisions: 10
              }),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/theme/components/VideoTextureDemo.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __pageData = JSON.parse('{"title":"useVideoTexture","description":"","frontmatter":{},"headers":[],"relativePath":"guide/loaders/use-video-texture.md","filePath":"guide/loaders/use-video-texture.md"}');
const _sfc_main = { name: "guide/loaders/use-video-texture.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Badge = resolveComponent("Badge");
  const _component_DocsDemo = __unplugin_components_0;
  const _component_VideoTextureDemo = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="usevideotexture" tabindex="-1">useVideoTexture `);
  _push(ssrRenderComponent(_component_Badge, {
    type: "warning",
    text: "^3.2.0"
  }, null, _parent));
  _push(` <a class="header-anchor" href="#usevideotexture" aria-label="Permalink to &quot;useVideoTexture &lt;Badge type=&quot;warning&quot; text=&quot;^3.2.0&quot; /&gt;&quot;">​</a></h1>`);
  _push(ssrRenderComponent(_component_DocsDemo, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_VideoTextureDemo, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_VideoTextureDemo)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<p>A composable to easily use videos as textures in your meshes.</p><p>This composable is based on the Drei <a href="https://github.com/pmndrs/drei/tree/master#usevideotexture" target="_blank" rel="noreferrer">useVideoTexture</a></p><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> { useVideoTexture } </span><span style="${ssrRenderStyle({ "color": "#F97583" })}">from</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&#39;@tresjs/cientos&#39;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> exampleVideo </span><span style="${ssrRenderStyle({ "color": "#F97583" })}">from</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&#39;/myVideoPath&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#F97583" })}">const</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#79B8FF" })}">texture</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">ref</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">()</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">texture.value </span><span style="${ssrRenderStyle({ "color": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#F97583" })}">await</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">useVideoTexture</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">(exampleVideo, { loop: </span><span style="${ssrRenderStyle({ "color": "#79B8FF" })}">false</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> })</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#D73A49" })}">import</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> { useVideoTexture } </span><span style="${ssrRenderStyle({ "color": "#D73A49" })}">from</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&#39;@tresjs/cientos&#39;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#D73A49" })}">import</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> exampleVideo </span><span style="${ssrRenderStyle({ "color": "#D73A49" })}">from</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&#39;/myVideoPath&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#D73A49" })}">const</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#005CC5" })}">texture</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#D73A49" })}">=</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">ref</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">()</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">texture.value </span><span style="${ssrRenderStyle({ "color": "#D73A49" })}">=</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#D73A49" })}">await</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">useVideoTexture</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">(exampleVideo, { loop: </span><span style="${ssrRenderStyle({ "color": "#005CC5" })}">false</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> })</span></span></code></pre></div><p>Then you can use the texture in your material, for example:</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark has-highlighted-lines vp-code-dark"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">...</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">Sphere</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> :</span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">position</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">[</span><span style="${ssrRenderStyle({ "color": "#79B8FF" })}">0</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "color": "#79B8FF" })}">2</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "color": "#79B8FF" })}">0</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">]</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line highlighted"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      &lt;TresMeshBasicMaterial :map=&quot;texture&quot; /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;/</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">Sphere</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">...</span></span></code></pre><pre class="shiki github-light has-highlighted-lines vp-code-light"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">...</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">Sphere</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> :</span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">position</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">[</span><span style="${ssrRenderStyle({ "color": "#005CC5" })}">0</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">, </span><span style="${ssrRenderStyle({ "color": "#005CC5" })}">2</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">, </span><span style="${ssrRenderStyle({ "color": "#005CC5" })}">0</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">]</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line highlighted"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      &lt;TresMeshBasicMaterial :map=&quot;texture&quot; /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;/</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">Sphere</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">...</span></span></code></pre></div><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table><thead><tr><th style="${ssrRenderStyle({ "text-align": "left" })}">Prop</th><th style="${ssrRenderStyle({ "text-align": "left" })}">Description</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><code>src</code></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Path to the video.</td><td><code>undefined</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><code>unsuspend</code></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Path to the model file.</td><td><code>loadedmetadata</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><code>crossOrigin</code></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Whether to use CORS to fetch the related video.</td><td><code>Anonymous</code></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><code>muted</code></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Whether to set the audio silenced.</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><code>loop</code></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Automatically seek back to the start upon reaching the end of the video.</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><code>start</code></td><td style="${ssrRenderStyle({ "text-align": "left" })}">To play to the video once loaded or not.</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><code>playsInline</code></td><td style="${ssrRenderStyle({ "text-align": "left" })}">To be play the video inline or not.</td><td>true</td></tr></tbody></table><ul><li>Any other attribute for a <code>&lt;video&gt;</code> tag is accepted and will automatically set</li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/loaders/use-video-texture.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const useVideoTexture = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  useVideoTexture as default
};
