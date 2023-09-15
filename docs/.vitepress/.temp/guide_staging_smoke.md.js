import { defineComponent, unref, mergeProps, withCtx, createVNode, openBlock, createBlock, Suspense, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderSuspense, ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { TresCanvas } from "@tresjs/core";
import { t as tT, P as Px, b as bx, _ as __unplugin_components_0 } from "./DocsDemo.b6cdbb3e.js";
import { SRGBColorSpace, NoToneMapping } from "three";
import { _ as _export_sfc } from "./plugin-vue_export-helper.cc2b3d55.js";
import "tweakpane";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SmokeDemo",
  __ssrInlineRender: true,
  setup(__props) {
    const gl = {
      clearColor: "#333",
      alpha: true,
      outputColorSpace: SRGBColorSpace,
      toneMapping: NoToneMapping
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TresCanvas), mergeProps(gl, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<TresPerspectiveCamera${ssrRenderAttr("position", [0, 2, 5])}${_scopeId}></TresPerspectiveCamera>`);
            ssrRenderSuspense(_push2, {
              default: () => {
                _push2(ssrRenderComponent(unref(tT), {
                  segments: 4,
                  width: 1,
                  position: [-4, -2, 0]
                }, null, _parent2, _scopeId));
              },
              _: 1
            });
            ssrRenderSuspense(_push2, {
              default: () => {
                _push2(ssrRenderComponent(unref(tT), {
                  segments: 4,
                  width: 1,
                  position: [-4, 2, 0]
                }, null, _parent2, _scopeId));
              },
              _: 1
            });
            ssrRenderSuspense(_push2, {
              default: () => {
                _push2(ssrRenderComponent(unref(tT), {
                  segments: 4,
                  width: 1
                }, null, _parent2, _scopeId));
              },
              _: 1
            });
            ssrRenderSuspense(_push2, {
              default: () => {
                _push2(ssrRenderComponent(unref(tT), {
                  segments: 4,
                  width: 1,
                  position: [4, -2, 0]
                }, null, _parent2, _scopeId));
              },
              _: 1
            });
            ssrRenderSuspense(_push2, {
              default: () => {
                _push2(ssrRenderComponent(unref(tT), {
                  segments: 4,
                  width: 1,
                  position: [4, 2, 0]
                }, null, _parent2, _scopeId));
              },
              _: 1
            });
            _push2(ssrRenderComponent(unref(Px), { args: [2, 2] }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<TresMeshToonMaterial color="#82DBC5"${_scopeId2}></TresMeshToonMaterial>`);
                } else {
                  return [
                    createVNode("TresMeshToonMaterial", { color: "#82DBC5" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<TresGridHelper${ssrRenderAttr("args", [10, 10])}${_scopeId}></TresGridHelper><TresAmbientLight${ssrRenderAttr("intensity", 1)}${_scopeId}></TresAmbientLight><TresDirectionalLight${ssrRenderAttr("intensity", 1)}${ssrRenderAttr("position", [2, 2, 2])}${_scopeId}></TresDirectionalLight>`);
            _push2(ssrRenderComponent(unref(bx), null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("TresPerspectiveCamera", { position: [0, 2, 5] }),
              (openBlock(), createBlock(Suspense, null, {
                default: withCtx(() => [
                  createVNode(unref(tT), {
                    segments: 4,
                    width: 1,
                    position: [-4, -2, 0]
                  })
                ]),
                _: 1
              })),
              (openBlock(), createBlock(Suspense, null, {
                default: withCtx(() => [
                  createVNode(unref(tT), {
                    segments: 4,
                    width: 1,
                    position: [-4, 2, 0]
                  })
                ]),
                _: 1
              })),
              (openBlock(), createBlock(Suspense, null, {
                default: withCtx(() => [
                  createVNode(unref(tT), {
                    segments: 4,
                    width: 1
                  })
                ]),
                _: 1
              })),
              (openBlock(), createBlock(Suspense, null, {
                default: withCtx(() => [
                  createVNode(unref(tT), {
                    segments: 4,
                    width: 1,
                    position: [4, -2, 0]
                  })
                ]),
                _: 1
              })),
              (openBlock(), createBlock(Suspense, null, {
                default: withCtx(() => [
                  createVNode(unref(tT), {
                    segments: 4,
                    width: 1,
                    position: [4, 2, 0]
                  })
                ]),
                _: 1
              })),
              createVNode(unref(Px), { args: [2, 2] }, {
                default: withCtx(() => [
                  createVNode("TresMeshToonMaterial", { color: "#82DBC5" })
                ]),
                _: 1
              }),
              createVNode("TresGridHelper", { args: [10, 10] }),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/theme/components/SmokeDemo.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __pageData = JSON.parse('{"title":"Smoke","description":"","frontmatter":{},"headers":[],"relativePath":"guide/staging/smoke.md","filePath":"guide/staging/smoke.md"}');
const _sfc_main = { name: "guide/staging/smoke.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_DocsDemo = __unplugin_components_0;
  const _component_SmokeDemo = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="smoke" tabindex="-1">Smoke <a class="header-anchor" href="#smoke" aria-label="Permalink to &quot;Smoke&quot;">​</a></h1><p><code>&lt;Smoke /&gt;</code> is a component that renders a smoke in your scene. It is an abstraction that use a combination of textures, transparency and some calculation, to create a beautiful smoke - cloud - fog effect</p>`);
  _push(ssrRenderComponent(_component_DocsDemo, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_SmokeDemo, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_SmokeDemo)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>Smoke componente comes with a default texture abstraction it needs to be wrapped by a Suspense component</p></div><p>You can use <code>&lt;Smoke /&gt;</code> component without passing any props, but still if you want you can tweak the props to find the best setup for you</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">template</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    ...</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">Suspense</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">Smoke</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;/</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">Suspense</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    ...</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">template</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">template</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    ...</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">Suspense</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">Smoke</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;/</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">Suspense</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    ...</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">template</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span></code></pre></div><p>Notice that you can pass a texture in combination with props, to personalize your effect</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">template</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    ...</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">Suspense</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">Smoke</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">        </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:speed</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;0.8&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">        </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:segments</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;12&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">        </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">texture</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;my_texture_path&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">        </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:color</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;#f7f&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;/</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">Suspense</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    ...</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">template</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">template</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    ...</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">Suspense</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">Smoke</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">        </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:speed</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;0.8&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">        </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:segments</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;12&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">        </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">texture</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;my_texture_path&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">        </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:color</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;#f7f&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;/</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">Suspense</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    ...</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">template</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span></code></pre></div><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table><thead><tr><th style="${ssrRenderStyle({ "text-align": "left" })}">Prop</th><th style="${ssrRenderStyle({ "text-align": "left" })}">Description</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>opacity</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The strength of the opacity.</td><td>0.5</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>speed</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The rotation speed of the smoke.</td><td>0.4</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>width</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The base width.</td><td>4</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>depth</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The base depth.</td><td>10</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>segments</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The number of smoke to render.</td><td>10</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>texture</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The texture of the smoke.</td><td>null</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>color</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The color of the smoke.</td><td>0xffffff</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>depthTest</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">The depthTest.</td><td>true</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/staging/smoke.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const smoke = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  smoke as default
};
