import { defineComponent, ref, watch, watchEffect, withAsyncContext, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, Suspense, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderSuspense } from "vue/server-renderer";
import { TresCanvas } from "@tresjs/core";
import { PCFSoftShadowMap, SRGBColorSpace } from "three";
import { w as wx, x as xx, $ as $x, _ as __unplugin_components_0 } from "./DocsDemo.b6cdbb3e.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.cc2b3d55.js";
import "tweakpane";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "BackdropDemo",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const gl = {
      clearColor: "pink",
      shadows: true,
      alpha: false,
      shadowMapType: PCFSoftShadowMap,
      outputColorSpace: SRGBColorSpace
    };
    const model = ref(null);
    watch(model, ({ value }) => {
      value.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });
    });
    const cameraRef = ref(null);
    watchEffect(() => {
      if (cameraRef.value) {
        cameraRef.value.lookAt(0, 5, 0);
      }
    });
    const { hasFinishLoading, progress, items } = ([__temp, __restore] = withAsyncContext(() => wx()), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "aspect-video w-full relative" }, _attrs))}><div style="${ssrRenderStyle(!unref(hasFinishLoading) ? null : { display: "none" })}" class="absolute bg-grey-600 t-0 l-0 w-full h-full z-20 flex justify-center items-center text-black font-mono"><div class="w-200px"> Loading... ${ssrInterpolate(unref(progress))} % </div></div>`);
      _push(ssrRenderComponent(unref(TresCanvas), gl, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<TresPerspectiveCamera${ssrRenderAttr("position", [0.07224002153117198, 0.5245876539770153, 2.9469498522622626])}${ssrRenderAttr("rotation", [-0.04419077275543715, 0.025561987075415186, 0.0011302162688196786])}${ssrRenderAttr("fov", 35)}${_scopeId}></TresPerspectiveCamera>`);
            ssrRenderSuspense(_push2, {
              default: () => {
                _push2(ssrRenderComponent(unref(xx), {
                  ref_key: "model",
                  ref: model,
                  path: "https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb",
                  rotation: [0, 0.5, 0],
                  position: [0, 0.4, 0],
                  scale: 0.5
                }, null, _parent2, _scopeId));
              },
              _: 1
            });
            _push2(ssrRenderComponent(unref($x), {
              floor: 1.5,
              scale: [10, 3, 3],
              position: [0, 0, -3],
              "receive-shadow": ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<TresMeshPhysicalMaterial${ssrRenderAttr("roughness", 1)} color="pink"${ssrRenderAttr("side", 2)}${_scopeId2}></TresMeshPhysicalMaterial>`);
                } else {
                  return [
                    createVNode("TresMeshPhysicalMaterial", {
                      roughness: 1,
                      color: "pink",
                      side: 2
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<TresAmbientLight${ssrRenderAttr("intensity", 0.5)}${_scopeId}></TresAmbientLight><TresDirectionalLight${ssrRenderAttr("args", ["white", 2])} cast-shadow${ssrRenderAttr("position", [3, 4, 4])}${ssrRenderAttr("look-at", [0, 0, 0])}${ssrRenderAttr("shadow-camera-near", 0.5)}${ssrRenderAttr("shadow-camera-left", -10)}${_scopeId}></TresDirectionalLight><TresDirectionalLight${ssrRenderAttr("args", ["pink", 1])} cast-shadow${ssrRenderAttr("position", [-3, 2, 4])}${ssrRenderAttr("look-at", [0, 0, 0])}${ssrRenderAttr("shadow-camera-near", 0.5)}${ssrRenderAttr("shadow-camera-left", -10)}${_scopeId}></TresDirectionalLight>`);
          } else {
            return [
              createVNode("TresPerspectiveCamera", {
                position: [0.07224002153117198, 0.5245876539770153, 2.9469498522622626],
                rotation: [-0.04419077275543715, 0.025561987075415186, 0.0011302162688196786],
                fov: 35
              }, null, 8, ["position", "rotation"]),
              (openBlock(), createBlock(Suspense, null, {
                default: withCtx(() => [
                  createVNode(unref(xx), {
                    ref_key: "model",
                    ref: model,
                    path: "https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb",
                    rotation: [0, 0.5, 0],
                    position: [0, 0.4, 0],
                    scale: 0.5
                  }, null, 8, ["rotation", "position", "scale"])
                ]),
                _: 1
              })),
              createVNode(unref($x), {
                floor: 1.5,
                scale: [10, 3, 3],
                position: [0, 0, -3],
                "receive-shadow": ""
              }, {
                default: withCtx(() => [
                  createVNode("TresMeshPhysicalMaterial", {
                    roughness: 1,
                    color: "pink",
                    side: 2
                  })
                ]),
                _: 1
              }, 8, ["floor"]),
              createVNode("TresAmbientLight", { intensity: 0.5 }, null, 8, ["intensity"]),
              createVNode("TresDirectionalLight", {
                args: ["white", 2],
                "cast-shadow": "",
                position: [3, 4, 4],
                "look-at": [0, 0, 0],
                "shadow-camera-near": 0.5,
                "shadow-camera-left": -10
              }, null, 8, ["shadow-camera-near"]),
              createVNode("TresDirectionalLight", {
                args: ["pink", 1],
                "cast-shadow": "",
                position: [-3, 2, 4],
                "look-at": [0, 0, 0],
                "shadow-camera-near": 0.5,
                "shadow-camera-left": -10
              }, null, 8, ["shadow-camera-near"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/theme/components/BackdropDemo.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __pageData = JSON.parse('{"title":"Backdrop","description":"","frontmatter":{},"headers":[],"relativePath":"guide/staging/backdrop.md","filePath":"guide/staging/backdrop.md"}');
const _sfc_main = { name: "guide/staging/backdrop.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_DocsDemo = __unplugin_components_0;
  const _component_BackdropDemo = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="backdrop" tabindex="-1">Backdrop <a class="header-anchor" href="#backdrop" aria-label="Permalink to &quot;Backdrop&quot;">​</a></h1>`);
  _push(ssrRenderComponent(_component_DocsDemo, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_BackdropDemo, { class: "demo-scene" }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_BackdropDemo, { class: "demo-scene" })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<p>The <code>cientos</code> package provides a <code>&lt;Backdrop /&gt;</code> component. It&#39;s just a curved plane, like a studio backdrop. Meant is for presentational purposes, to break up light and shadows more interestingly.</p><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">Backdrop</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> /&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">// Backdrop with a custom material</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">Backdrop</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  </span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:floor</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;1.5&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:segments</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;20&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">recieve-shadow</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresMeshPhysicalMaterial</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">color</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;orange&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:roughness</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;1&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">Backdrop</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">Backdrop</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> /&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">// Backdrop with a custom material</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">Backdrop</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">  </span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:floor</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;1.5&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:segments</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;20&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">recieve-shadow</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresMeshPhysicalMaterial</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">color</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;orange&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:roughness</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;1&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">Backdrop</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span></code></pre></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/staging/backdrop.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const backdrop = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  backdrop as default
};
