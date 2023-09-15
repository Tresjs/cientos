import { defineComponent, ref, unref, withCtx, createVNode, openBlock, createBlock, Suspense, useSSRContext } from "vue";
import { ssrRenderAttr, ssrRenderComponent, ssrRenderSuspense, ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { TresCanvas } from "@tresjs/core";
import { b as bx, v as vx, _ as __unplugin_components_0 } from "./DocsDemo.b6cdbb3e.js";
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from "three";
import { _ as _export_sfc } from "./plugin-vue_export-helper.cc2b3d55.js";
import "tweakpane";
const fontPath = "https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Text3Demo",
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
    const reactiveText = ref("You can edit me...");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="bg-gray-100 flex justify-center"><input${ssrRenderAttr("value", reactiveText.value)} class="p-2 m-2 rounded-md bg-white border border-gray-400 color-red"></div>`);
      _push(ssrRenderComponent(unref(TresCanvas), gl, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<TresPerspectiveCamera${ssrRenderAttr("position", [0, 0.5, 5])}${_scopeId}></TresPerspectiveCamera>`);
            _push2(ssrRenderComponent(unref(bx), null, null, _parent2, _scopeId));
            ssrRenderSuspense(_push2, {
              default: () => {
                _push2(ssrRenderComponent(unref(vx), {
                  text: reactiveText.value,
                  size: 0.3,
                  font: fontPath,
                  center: "",
                  "need-updates": true
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<TresMeshNormalMaterial${_scopeId2}></TresMeshNormalMaterial>`);
                    } else {
                      return [
                        createVNode("TresMeshNormalMaterial")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              },
              _: 1
            });
            _push2(`<TresAmbientLight${ssrRenderAttr("intensity", 1)}${_scopeId}></TresAmbientLight>`);
          } else {
            return [
              createVNode("TresPerspectiveCamera", { position: [0, 0.5, 5] }, null, 8, ["position"]),
              createVNode(unref(bx)),
              (openBlock(), createBlock(Suspense, null, {
                default: withCtx(() => [
                  createVNode(unref(vx), {
                    text: reactiveText.value,
                    size: 0.3,
                    font: fontPath,
                    center: "",
                    "need-updates": true
                  }, {
                    default: withCtx(() => [
                      createVNode("TresMeshNormalMaterial")
                    ]),
                    _: 1
                  }, 8, ["text", "size"])
                ]),
                _: 1
              })),
              createVNode("TresAmbientLight", { intensity: 1 })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/theme/components/Text3Demo.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __pageData = JSON.parse('{"title":"Text3D","description":"","frontmatter":{},"headers":[],"relativePath":"guide/abstractions/text-3d.md","filePath":"guide/abstractions/text-3d.md"}');
const _sfc_main = { name: "guide/abstractions/text-3d.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_DocsDemo = __unplugin_components_0;
  const _component_Text3Demo = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="text3d" tabindex="-1">Text3D <a class="header-anchor" href="#text3d" aria-label="Permalink to &quot;Text3D&quot;">​</a></h1><p><code>&lt;Text3D /&gt;</code> is a component that renders a 3D text. It is a wrapper around the <a href="https://threejs.org/docs/#api/en/geometries/TextGeometry" target="_blank" rel="noreferrer">TextGeometry</a> class.</p>`);
  _push(ssrRenderComponent(_component_DocsDemo, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_Text3Demo, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_Text3Demo)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><p>To use the <code>&lt;Text3D /&gt;</code> component you need to pass the <code>font</code> prop with the URL of the font JSON file you want to use. TextGeometry uses <code>typeface</code>.json generated fonts, you can generate yours <a href="http://gero3.github.io/facetype.js/" target="_blank" rel="noreferrer">here</a></p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">template</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">Text3D</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">text</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;TresJS&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">font</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;/fonts/FiraCodeRegular.json&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresMeshNormalMaterial</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;/</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">Text3D</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">template</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">template</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">Text3D</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">text</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;TresJS&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">font</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;/fonts/FiraCodeRegular.json&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresMeshNormalMaterial</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;/</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">Text3D</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">template</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span></code></pre></div><p>Notice that you need to pass the <code>&lt;TresMeshNormalMaterial /&gt;</code> component as a child of the <code>&lt;Text3D /&gt;</code> component. This is because <code>&lt;Text3D /&gt;</code> is a <code>Mesh</code> component, so it needs a material. The geometry is created automatically. Also you can pass the text as a slot or as a prop like this:</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">template</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">Text3D</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">font</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;/fonts/FiraCodeRegular.json&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      TresJS</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresMeshNormalMaterial</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;/</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">Text3D</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">template</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">template</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">Text3D</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">font</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;/fonts/FiraCodeRegular.json&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      TresJS</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresMeshNormalMaterial</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;/</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">Text3D</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">template</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span></code></pre></div><p>In addition, you can use the power of Vue to add reactivity, but you need to apply the needUpdates prop, for example you can create a reactive value, apply a v-model and make the bound, the Text3D component will update</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">template</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">input</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">v-model</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;myReactiveText&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">Text3D</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:text</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;myReactiveText&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">font</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;/fonts/FiraCodeRegular.json&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">center</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">need-updates</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">template</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">template</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">input</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">v-model</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;myReactiveText&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">Text3D</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:text</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;myReactiveText&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">font</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;/fonts/FiraCodeRegular.json&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">center</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">need-updates</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">template</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span></code></pre></div><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table><thead><tr><th style="${ssrRenderStyle({ "text-align": "left" })}">Prop</th><th style="${ssrRenderStyle({ "text-align": "left" })}">Description</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>font</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The font data or font name to use for the text.</td><td></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>text</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The text to display.</td><td></td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>size</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The size of the text.</td><td>0.5</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>height</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The height of the text.</td><td>0.2</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>curveSegments</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The number of curve segments to use when generating the text geometry.</td><td>5</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>bevelEnabled</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">A flag indicating whether beveling should be enabled for the text.</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>bevelThickness</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The thickness of the beveled edge on the text.</td><td>0.05</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>bevelSize</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The size of the beveled edge on the text.</td><td>0.02</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>bevelOffset</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The offset of the beveled edge on the text.</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>bevelSegments</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The number of bevel segments to use when generating the text geometry.</td><td>4</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>center</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">To center the text</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>needUpdates</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">This props add reactivity</td><td>false</td></tr></tbody></table><h2 id="references" tabindex="-1">References <a class="header-anchor" href="#references" aria-label="Permalink to &quot;References&quot;">​</a></h2><p><a id="1">[1]</a> This table was generated by <a href="https://chat.openai.com/chat" target="_blank" rel="noreferrer">ChatGPT</a> based on the Vue component props.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/abstractions/text-3d.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const text3d = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  text3d as default
};
