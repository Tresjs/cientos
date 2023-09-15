import { defineComponent, reactive, shallowRef, unref, mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { useRenderLoop, TresCanvas } from "@tresjs/core";
import { I as Ix, J as Jx, b as bx, _ as __unplugin_components_0 } from "./DocsDemo.b6cdbb3e.js";
import { SRGBColorSpace, NoToneMapping } from "three";
import { _ as _export_sfc } from "./plugin-vue_export-helper.cc2b3d55.js";
import "tweakpane";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "StarsDemo",
  __ssrInlineRender: true,
  setup(__props) {
    const gl = {
      clearColor: "#333",
      outputColorSpace: SRGBColorSpace,
      toneMapping: NoToneMapping
    };
    const options = reactive({
      size: 0.1,
      sizeAttenuation: true,
      count: 5e3,
      depth: 50,
      radius: 100
    });
    const star = shallowRef(null);
    const { onLoop } = useRenderLoop();
    onLoop(() => {
      if (star.value) {
        star.value.value.rotation.y += 1e-3;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TresCanvas), mergeProps(gl, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<TresPerspectiveCamera${ssrRenderAttr("position", [0, 2, 5])}${_scopeId}></TresPerspectiveCamera>`);
            _push2(ssrRenderComponent(unref(Ix), { factor: 0.5 }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Jx), {
              ref_key: "star",
              ref: star,
              radius: options.radius,
              depth: options.depth,
              count: options.count,
              size: options.size,
              "size-attenuation": options.sizeAttenuation
            }, null, _parent2, _scopeId));
            _push2(`<TresGridHelper${ssrRenderAttr("args", [4, 4])}${_scopeId}></TresGridHelper>`);
            _push2(ssrRenderComponent(unref(bx), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("TresPerspectiveCamera", { position: [0, 2, 5] }),
              createVNode(unref(Ix), { factor: 0.5 }, null, 8, ["factor"]),
              createVNode(unref(Jx), {
                ref_key: "star",
                ref: star,
                radius: options.radius,
                depth: options.depth,
                count: options.count,
                size: options.size,
                "size-attenuation": options.sizeAttenuation
              }, null, 8, ["radius", "depth", "count", "size", "size-attenuation"]),
              createVNode("TresGridHelper", { args: [4, 4] }),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/theme/components/StarsDemo.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __pageData = JSON.parse('{"title":"Stars","description":"","frontmatter":{},"headers":[],"relativePath":"guide/staging/stars.md","filePath":"guide/staging/stars.md"}');
const _sfc_main = { name: "guide/staging/stars.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_DocsDemo = __unplugin_components_0;
  const _component_StarsDemo = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="stars" tabindex="-1">Stars <a class="header-anchor" href="#stars" aria-label="Permalink to &quot;Stars&quot;">​</a></h1><p><code>&lt;Stars /&gt;</code> is a component that renders a stars in the sky of your scene. It is an abstraction that use Points, PointsMaterial and BufferGeometry to create a beautiful stars effect</p>`);
  _push(ssrRenderComponent(_component_DocsDemo, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_StarsDemo, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_StarsDemo)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><p>You can use <code>&lt;Stars /&gt;</code> component without passing any props, but still if you want you can tweak the props to find the best setup for you</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">template</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    ...</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">Stars</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    ...</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">template</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">template</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    ...</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">Stars</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    ...</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">template</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span></code></pre></div><p>Notice that you can pass a texture as an alphaMap to personalize the star shape</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">template</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    ...</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">Stars</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:radius</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;50&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:depth</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;20&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:count</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;3000&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:alpha-map</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;alphaMap&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    ...</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">template</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">template</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    ...</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">Stars</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:radius</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;50&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:depth</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;20&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:count</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;3000&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:alpha-map</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;alphaMap&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    ...</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">template</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span></code></pre></div><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table><thead><tr><th style="${ssrRenderStyle({ "text-align": "left" })}">Prop</th><th style="${ssrRenderStyle({ "text-align": "left" })}">Description</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>size</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The size of the stars</td><td>0.1</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>sizeAttenuation</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">keep the same size regardless distance.</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>transparent</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">show transparency on the stars texture</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>alphaTest</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">enables the WebGL to know when not to render the pixeltext.</td><td>0.01</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>alphaMap</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">texture of the stars</td><td>null</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>count</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">number of stars</td><td>5000</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>depth</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">depth of star&#39;s shape</td><td>50</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>radius</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Radius of star&#39;s shape</td><td>100</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/staging/stars.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const stars = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  stars as default
};
