import { defineComponent, withAsyncContext, unref, mergeProps, withCtx, createVNode, useSSRContext, resolveComponent } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { TresCanvas } from "@tresjs/core";
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from "three";
import { H as HI, b as bx, i as iT, Z as Zx, _ as __unplugin_components_0 } from "./DocsDemo.b6cdbb3e.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.cc2b3d55.js";
import "tweakpane";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "HtmlLaptopDemo",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const gl = {
      clearColor: "#241a1a",
      shadows: true,
      alpha: false,
      shadowMapType: BasicShadowMap,
      outputColorSpace: SRGBColorSpace,
      toneMapping: NoToneMapping
    };
    const { nodes } = ([__temp, __restore] = withAsyncContext(() => HI(
      "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf",
      { draco: true }
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TresCanvas), mergeProps(gl, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<TresPerspectiveCamera${ssrRenderAttr("position", [-5, 4, 3])}${_scopeId}></TresPerspectiveCamera>`);
            _push2(ssrRenderComponent(unref(bx), null, null, _parent2, _scopeId));
            _push2(`<primitive${ssrRenderAttr("object", unref(nodes).Macbook)}${_scopeId}>`);
            _push2(ssrRenderComponent(unref(iT), {
              transform: "",
              "wrapper-class": "webpage",
              "distance-factor": 11,
              position: [0, 10.5, -13.6],
              occlude: "",
              "rotation-x": -0.256
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<iframe class="rounded-lg w-[1024px] h-[670px]" src="https://tresjs.org" frameborder="0"${_scopeId2}></iframe>`);
                } else {
                  return [
                    createVNode("iframe", {
                      class: "rounded-lg w-[1024px] h-[670px]",
                      src: "https://tresjs.org",
                      frameborder: "0"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</primitive>`);
            _push2(ssrRenderComponent(unref(Zx), {
              blur: 3.5,
              resolution: 512,
              opacity: 1
            }, null, _parent2, _scopeId));
            _push2(`<TresAmbientLight${ssrRenderAttr("intensity", 1)}${_scopeId}></TresAmbientLight><TresDirectionalLight${ssrRenderAttr("intensity", 2)}${ssrRenderAttr("position", [2, 3, 0])}${ssrRenderAttr("cast-shadow", true)}${ssrRenderAttr("shadow-camera-far", 50)}${ssrRenderAttr("shadow-camera-left", -10)}${ssrRenderAttr("shadow-camera-right", 10)}${ssrRenderAttr("shadow-camera-top", 10)}${ssrRenderAttr("shadow-camera-bottom", -10)}${_scopeId}></TresDirectionalLight>`);
          } else {
            return [
              createVNode("TresPerspectiveCamera", { position: [-5, 4, 3] }),
              createVNode(unref(bx)),
              createVNode("primitive", {
                object: unref(nodes).Macbook
              }, [
                createVNode(unref(iT), {
                  transform: "",
                  "wrapper-class": "webpage",
                  "distance-factor": 11,
                  position: [0, 10.5, -13.6],
                  occlude: "",
                  "rotation-x": -0.256
                }, {
                  default: withCtx(() => [
                    createVNode("iframe", {
                      class: "rounded-lg w-[1024px] h-[670px]",
                      src: "https://tresjs.org",
                      frameborder: "0"
                    })
                  ]),
                  _: 1
                }, 8, ["position", "rotation-x"])
              ], 8, ["object"]),
              createVNode(unref(Zx), {
                blur: 3.5,
                resolution: 512,
                opacity: 1
              }, null, 8, ["blur"]),
              createVNode("TresAmbientLight", { intensity: 1 }),
              createVNode("TresDirectionalLight", {
                intensity: 2,
                position: [2, 3, 0],
                "cast-shadow": true,
                "shadow-camera-far": 50,
                "shadow-camera-left": -10,
                "shadow-camera-right": 10,
                "shadow-camera-top": 10,
                "shadow-camera-bottom": -10
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/theme/components/HtmlLaptopDemo.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __pageData = JSON.parse('{"title":"Html","description":"","frontmatter":{},"headers":[],"relativePath":"guide/misc/html-component.md","filePath":"guide/misc/html-component.md"}');
const _sfc_main = { name: "guide/misc/html-component.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Badge = resolveComponent("Badge");
  const _component_DocsDemo = __unplugin_components_0;
  const _component_HtmlLaptopDemo = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="html" tabindex="-1">Html `);
  _push(ssrRenderComponent(_component_Badge, {
    type: "warning",
    text: "^3.4.0"
  }, null, _parent));
  _push(` <a class="header-anchor" href="#html" aria-label="Permalink to &quot;Html &lt;Badge type=&quot;warning&quot; text=&quot;^3.4.0&quot; /&gt;&quot;">​</a></h1><p>This component allows you to project HTML content to any object in your scene. TresJS will automatically update the position of the HTML content to match the position of the object in the scene.</p>`);
  _push(ssrRenderComponent(_component_DocsDemo, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_HtmlLaptopDemo, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_HtmlLaptopDemo)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresMesh</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:position</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;[1, 1, 1]&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresBoxGeometry</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresMeshNormalMaterial</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">Html</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">center</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">transform</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:distance-factor</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;4&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:position</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;[0.5, 0, 0.65]&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:scale</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;[0.75, 0.75, 0.75]&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">h1</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">class</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;bg-white text-xs p-1 rounded&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      I&#39;m a Box 📦</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;/</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">h1</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">Html</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresMesh</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresMesh</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:position</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;[1, 1, 1]&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresBoxGeometry</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresMeshNormalMaterial</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">Html</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">center</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">transform</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:distance-factor</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;4&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:position</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;[0.5, 0, 0.65]&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:scale</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;[0.75, 0.75, 0.75]&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">h1</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">class</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;bg-white text-xs p-1 rounded&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      I&#39;m a Box 📦</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;/</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">h1</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">Html</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresMesh</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span></code></pre></div><h2 id="occlusion" tabindex="-1">Occlusion <a class="header-anchor" href="#occlusion" aria-label="Permalink to &quot;Occlusion&quot;">​</a></h2><p>By default, the HTML content will be visible through other objects in the scene. You can use the <code>occlude</code> prop to make the HTML content occlude other objects in the scene.</p><p>Html can hide behind geometry using the occlude prop.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#e1e4e8" })}">&lt;Html occlude&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#24292e" })}">&lt;Html occlude&gt;</span></span></code></pre></div><p>You can also choose which objects should occlude the HTML content by passing an array of objects refs to the <code>occlude</code> prop.</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">script</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">setup</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">lang</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;ts&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> { TresCanvas } </span><span style="${ssrRenderStyle({ "color": "#F97583" })}">from</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&#39;@tresjs/core&#39;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> { OrbitControls, Html } </span><span style="${ssrRenderStyle({ "color": "#F97583" })}">from</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&#39;@tresjs/cientos&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#F97583" })}">const</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#79B8FF" })}">sphereRef</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">ref</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "color": "#79B8FF" })}">null</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">)</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">script</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">template</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">v-bind</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;gl&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresMesh</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:position</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;[1, 1, 1]&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresBoxGeometry</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresMeshNormalMaterial</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      &lt;</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">Html</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">        </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">center</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">        </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">transform</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">        </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:occlude</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;[sphereRef]&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">        </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:distance-factor</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;4&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      &gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">        &lt;</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">h1</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">class</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;bg-white text-xs p-1 rounded&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">          Box</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">        &lt;/</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">h1</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      &lt;/</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">Html</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;/</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresMesh</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresMesh</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">ref</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;sphereRef&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:position</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;[3, 1, 1]&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresSphereGeometry</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresMeshNormalMaterial</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      &lt;</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">Html</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">        </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">center</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">        </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">transform</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">        </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:distance-factor</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;4&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      &gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">        &lt;</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">h1</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">class</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;bg-white text-xs p-1 rounded&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">          Sphere</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">        &lt;/</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">h1</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      &lt;/</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">Html</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;/</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresMesh</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">template</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">script</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">setup</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">lang</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;ts&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#D73A49" })}">import</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> { TresCanvas } </span><span style="${ssrRenderStyle({ "color": "#D73A49" })}">from</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&#39;@tresjs/core&#39;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#D73A49" })}">import</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> { OrbitControls, Html } </span><span style="${ssrRenderStyle({ "color": "#D73A49" })}">from</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&#39;@tresjs/cientos&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#D73A49" })}">const</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#005CC5" })}">sphereRef</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#D73A49" })}">=</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">ref</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">(</span><span style="${ssrRenderStyle({ "color": "#005CC5" })}">null</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">)</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">script</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">template</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">v-bind</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;gl&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresMesh</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:position</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;[1, 1, 1]&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresBoxGeometry</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresMeshNormalMaterial</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      &lt;</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">Html</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">        </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">center</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">        </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">transform</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">        </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:occlude</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;[sphereRef]&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">        </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:distance-factor</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;4&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      &gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">        &lt;</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">h1</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">class</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;bg-white text-xs p-1 rounded&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">          Box</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">        &lt;/</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">h1</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      &lt;/</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">Html</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;/</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresMesh</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresMesh</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">ref</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;sphereRef&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:position</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;[3, 1, 1]&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresSphereGeometry</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresMeshNormalMaterial</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      &lt;</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">Html</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">        </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">center</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">        </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">transform</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">        </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:distance-factor</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;4&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      &gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">        &lt;</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">h1</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">class</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;bg-white text-xs p-1 rounded&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">          Sphere</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">        &lt;/</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">h1</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      &lt;/</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">Html</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;/</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresMesh</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">template</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span></code></pre></div><h2 id="using-iframes" tabindex="-1">Using <code>iframes</code> <a class="header-anchor" href="#using-iframes" aria-label="Permalink to &quot;Using \`iframes\`&quot;">​</a></h2><p>You can achieve pretty cool results with the <code>Html</code> component by using iframes. For example, you can use an iframe to display a YouTube video in your scene or a webpage with a 3D model.</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">script</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">setup</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">lang</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;ts&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> { TresCanvas } </span><span style="${ssrRenderStyle({ "color": "#F97583" })}">from</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&#39;@tresjs/core&#39;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> { BasicShadowMap, SRGBColorSpace, NoToneMapping } </span><span style="${ssrRenderStyle({ "color": "#F97583" })}">from</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&#39;three&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#F97583" })}">import</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> { OrbitControls, Html, useGLTF, Levioso, ContactShadows } </span><span style="${ssrRenderStyle({ "color": "#F97583" })}">from</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&#39;@tresjs/cientos&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#F97583" })}">const</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#79B8FF" })}">gl</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  clearColor: </span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&#39;#241a1a&#39;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  shadows: </span><span style="${ssrRenderStyle({ "color": "#79B8FF" })}">true</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  alpha: </span><span style="${ssrRenderStyle({ "color": "#79B8FF" })}">false</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  shadowMapType: BasicShadowMap,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  outputColorSpace: SRGBColorSpace,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  toneMapping: NoToneMapping,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">}</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#F97583" })}">const</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> { </span><span style="${ssrRenderStyle({ "color": "#79B8FF" })}">nodes</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> } </span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  </span><span style="${ssrRenderStyle({ "color": "#F97583" })}">=</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#F97583" })}">await</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">useGLTF</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&#39;https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf&#39;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">, </span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    { draco: </span><span style="${ssrRenderStyle({ "color": "#79B8FF" })}">true</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> },</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  )</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">script</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">template</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">v-bind</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;gl&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresPerspectiveCamera</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:position</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;[-5, 4, 3]&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">OrbitControls</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">Levioso</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">primitive</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:object</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;nodes.Macbook&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">        &lt;</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">Html</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">          </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">transform</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">          </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">wrapper-class</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;webpage&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">          </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:distance-factor</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;11&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">          </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:position</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;[0, 10.5, -13.4]&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">          </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">occlude</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">          </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:rotation-x</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;-0.256&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">        &gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">          &lt;</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">iframe</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">            </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">class</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;rounded-lg w-[1024px] h-[670px]&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">            </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">src</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;https://tresjs.org&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">            </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">frameborder</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;0&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">          </span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">/</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">        &lt;/</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">Html</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      &lt;/</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">primitive</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;/</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">Levioso</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">ContactShadows</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:blur</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;3.5&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:resolution</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;512&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:opacity</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;1&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresAmbientLight</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:intensity</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;1&quot;</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresDirectionalLight</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:intensity</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;2&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:position</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;[2, 3, 0]&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:cast-shadow</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;true&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:shadow-camera-far</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;50&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:shadow-camera-left</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;-10&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:shadow-camera-right</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;10&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:shadow-camera-top</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;10&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">:shadow-camera-bottom</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;-10&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">template</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">script</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">setup</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">lang</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;ts&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#D73A49" })}">import</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> { TresCanvas } </span><span style="${ssrRenderStyle({ "color": "#D73A49" })}">from</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&#39;@tresjs/core&#39;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#D73A49" })}">import</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> { BasicShadowMap, SRGBColorSpace, NoToneMapping } </span><span style="${ssrRenderStyle({ "color": "#D73A49" })}">from</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&#39;three&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#D73A49" })}">import</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> { OrbitControls, Html, useGLTF, Levioso, ContactShadows } </span><span style="${ssrRenderStyle({ "color": "#D73A49" })}">from</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&#39;@tresjs/cientos&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#D73A49" })}">const</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#005CC5" })}">gl</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#D73A49" })}">=</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> {</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  clearColor: </span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&#39;#241a1a&#39;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  shadows: </span><span style="${ssrRenderStyle({ "color": "#005CC5" })}">true</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  alpha: </span><span style="${ssrRenderStyle({ "color": "#005CC5" })}">false</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  shadowMapType: BasicShadowMap,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  outputColorSpace: SRGBColorSpace,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  toneMapping: NoToneMapping,</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">}</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#D73A49" })}">const</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> { </span><span style="${ssrRenderStyle({ "color": "#005CC5" })}">nodes</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> } </span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  </span><span style="${ssrRenderStyle({ "color": "#D73A49" })}">=</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#D73A49" })}">await</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">useGLTF</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">(</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&#39;https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf&#39;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">, </span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    { draco: </span><span style="${ssrRenderStyle({ "color": "#005CC5" })}">true</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> },</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  )</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">script</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">template</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">v-bind</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;gl&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresPerspectiveCamera</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:position</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;[-5, 4, 3]&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">OrbitControls</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">Levioso</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">primitive</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:object</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;nodes.Macbook&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">        &lt;</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">Html</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">          </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">transform</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">          </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">wrapper-class</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;webpage&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">          </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:distance-factor</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;11&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">          </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:position</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;[0, 10.5, -13.4]&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">          </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">occlude</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">          </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:rotation-x</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;-0.256&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">        &gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">          &lt;</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">iframe</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">            </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">class</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;rounded-lg w-[1024px] h-[670px]&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">            </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">src</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;https://tresjs.org&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">            </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">frameborder</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;0&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">          </span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">/</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">        &lt;/</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">Html</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      &lt;/</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">primitive</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;/</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">Levioso</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">ContactShadows</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:blur</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;3.5&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:resolution</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;512&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:opacity</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;1&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresAmbientLight</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:intensity</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;1&quot;</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresDirectionalLight</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:intensity</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;2&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:position</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;[2, 3, 0]&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:cast-shadow</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;true&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:shadow-camera-far</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;50&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:shadow-camera-left</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;-10&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:shadow-camera-right</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;10&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:shadow-camera-top</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;10&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">:shadow-camera-bottom</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;-10&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">template</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span></code></pre></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/misc/html-component.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const htmlComponent = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  htmlComponent as default
};
