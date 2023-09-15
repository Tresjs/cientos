import { defineComponent, shallowRef, reactive, unref, mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { TresCanvas } from "@tresjs/core";
import { e as eT, b as bx, _ as __unplugin_components_0 } from "./DocsDemo.b6cdbb3e.js";
import { SRGBColorSpace, NoToneMapping } from "three";
import { _ as _export_sfc } from "./plugin-vue_export-helper.cc2b3d55.js";
import "tweakpane";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PrecipitationDemo",
  __ssrInlineRender: true,
  setup(__props) {
    const gl = {
      clearColor: "#333",
      outputColorSpace: SRGBColorSpace,
      toneMapping: NoToneMapping
    };
    const precipitationRef = shallowRef();
    const options = reactive({
      speed: 1,
      randomness: 0,
      count: 1e3,
      size: 0.1,
      areaX: 25,
      areaY: 25,
      areaZ: 25
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TresCanvas), mergeProps(gl, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<TresPerspectiveCamera${ssrRenderAttr("position", [0, 2, 15])}${_scopeId}></TresPerspectiveCamera>`);
            _push2(ssrRenderComponent(unref(eT), {
              ref_key: "precipitationRef",
              ref: precipitationRef,
              speed: options.speed,
              area: [options.areaX, options.areaY, options.areaZ],
              count: options.count,
              randomness: options.randomness,
              size: options.size
            }, null, _parent2, _scopeId));
            _push2(`<TresGridHelper${ssrRenderAttr("args", [10, 10])}${_scopeId}></TresGridHelper>`);
            _push2(ssrRenderComponent(unref(bx), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("TresPerspectiveCamera", { position: [0, 2, 15] }),
              createVNode(unref(eT), {
                ref_key: "precipitationRef",
                ref: precipitationRef,
                speed: options.speed,
                area: [options.areaX, options.areaY, options.areaZ],
                count: options.count,
                randomness: options.randomness,
                size: options.size
              }, null, 8, ["speed", "area", "count", "randomness", "size"]),
              createVNode("TresGridHelper", { args: [10, 10] }),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/theme/components/PrecipitationDemo.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __pageData = JSON.parse('{"title":"Precipitation","description":"","frontmatter":{},"headers":[],"relativePath":"guide/staging/precipitation.md","filePath":"guide/staging/precipitation.md"}');
const _sfc_main = { name: "guide/staging/precipitation.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_DocsDemo = __unplugin_components_0;
  const _component_PrecipitationDemo = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="precipitation" tabindex="-1">Precipitation <a class="header-anchor" href="#precipitation" aria-label="Permalink to &quot;Precipitation&quot;">​</a></h1><p><code>&lt;Precipitation /&gt;</code> is a fully flexible component that renders an infinite particle flow, It comes with several props that allow you customize it to create different effects like precipitation, snow, waterfall, beams, etc.</p>`);
  _push(ssrRenderComponent(_component_DocsDemo, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_PrecipitationDemo, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_PrecipitationDemo)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><p>You can use <code>&lt;Precipitation /&gt;</code> component without passing any props.</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">template</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    ...</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">Precipitation</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    ...</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">template</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">template</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    ...</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">Precipitation</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    ...</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">template</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span></code></pre></div><p>To create uniques effects play around with the different props available</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">template</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    ...</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">Precipitation</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:speed</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;1&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:count</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;2500&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:map</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;myTexture&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    ...</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">template</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">template</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    ...</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">Precipitation</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:speed</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;1&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:count</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;2500&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:map</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;myTexture&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    ...</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">template</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>Be careful with the performance this components render infinite particles in movement</p></div><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table><thead><tr><th style="${ssrRenderStyle({ "text-align": "left" })}">Prop</th><th style="${ssrRenderStyle({ "text-align": "left" })}">Description</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>size</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The size of the drops.</td><td>0.1</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>area</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The size of the precipitation area.</td><td>[10, 10, 20]</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>color</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The color of the drops.</td><td>0xffffff</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>map</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Color texture of the drops.</td><td>null</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>alphaMap</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Alpha texture of the Drops.</td><td>null</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>alphaTest</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Enables the WebGL to know when not to render the pixel.</td><td>0.01</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>opacity</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Set the opacity of the drops.</td><td>0.8</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>count</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Number of drops.</td><td>5000</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>speed</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Drops speed.</td><td>0.1</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>randomness</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Add randomness to the drops.</td><td>0.5</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>depthWrite</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Whether should write to the depth buffer or not. drops.</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>transparent</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Transparency on the drops texture</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>sizeAttenuation</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Keep the same size regardless distance. drops.</td><td>true</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/staging/precipitation.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const precipitation = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  precipitation as default
};
