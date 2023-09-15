import { defineComponent, unref, mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderAttrs, ssrRenderStyle } from "vue/server-renderer";
import { TresCanvas } from "@tresjs/core";
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from "three";
import { q as qx, I as Ix, _ as __unplugin_components_0 } from "./DocsDemo.b6cdbb3e.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.cc2b3d55.js";
import "tweakpane";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MouseParallaxDemo",
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TresCanvas), mergeProps(gl, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<TresPerspectiveCamera${ssrRenderAttr("position", [0, 0, 7.5])}${ssrRenderAttr("fov", 75)}${ssrRenderAttr("near", 0.1)}${ssrRenderAttr("far", 1e3)}${_scopeId}></TresPerspectiveCamera>`);
            _push2(ssrRenderComponent(unref(qx), null, {
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
            _push2(ssrRenderComponent(unref(Ix), {
              factor: 5,
              ease: 3
            }, null, _parent2, _scopeId));
            _push2(`<TresAmbientLight${ssrRenderAttr("intensity", 1)}${_scopeId}></TresAmbientLight>`);
          } else {
            return [
              createVNode("TresPerspectiveCamera", {
                position: [0, 0, 7.5],
                fov: 75,
                near: 0.1,
                far: 1e3
              }, null, 8, ["position", "near"]),
              createVNode(unref(qx), null, {
                default: withCtx(() => [
                  createVNode("TresMeshNormalMaterial")
                ]),
                _: 1
              }),
              createVNode(unref(Ix), {
                factor: 5,
                ease: 3
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/theme/components/MouseParallaxDemo.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __pageData = JSON.parse('{"title":"MouseParallax","description":"","frontmatter":{},"headers":[],"relativePath":"guide/abstractions/mouse-parallax.md","filePath":"guide/abstractions/mouse-parallax.md"}');
const _sfc_main = { name: "guide/abstractions/mouse-parallax.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_DocsDemo = __unplugin_components_0;
  const _component_MouseParallaxDemo = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="mouseparallax" tabindex="-1">MouseParallax <a class="header-anchor" href="#mouseparallax" aria-label="Permalink to &quot;MouseParallax&quot;">​</a></h1>`);
  _push(ssrRenderComponent(_component_DocsDemo, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_MouseParallaxDemo, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_MouseParallaxDemo)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<p><code>&lt;MouseParallax /&gt;</code> is a component that allow you to create easily the pam parallax effect. The camera will update automatically according to the mouse position, creating a beautiful nice effect</p><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><p>You only need import it and use it <code>&lt;MouseParallax /&gt;</code> additionally you can pass two props, ease and factor.</p><p>Factor is a number to increase the movement range of the camera and ease it&#39;s a boolean that create a smooth transition. Also you can disabled with the &quot;disable&quot; prop</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">template</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">MouseParallax</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">Text3D</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">text</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;TresJS&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      </span><span style="${ssrRenderStyle({ "color": "#B392F0" })}">font</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">=</span><span style="${ssrRenderStyle({ "color": "#9ECBFF" })}">&quot;/fonts/FiraCodeRegular.json&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">      &lt;</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresMeshNormalMaterial</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">    &lt;/</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">Text3D</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#FDAEB7", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#85E89D" })}">template</span><span style="${ssrRenderStyle({ "color": "#E1E4E8" })}">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">template</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">MouseParallax</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">Text3D</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">text</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;TresJS&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      </span><span style="${ssrRenderStyle({ "color": "#6F42C1" })}">font</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">=</span><span style="${ssrRenderStyle({ "color": "#032F62" })}">&quot;/fonts/FiraCodeRegular.json&quot;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">      &lt;</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresMeshNormalMaterial</span><span style="${ssrRenderStyle({ "color": "#24292E" })}"> /&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">    &lt;/</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">Text3D</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">  &lt;/</span><span style="${ssrRenderStyle({ "color": "#B31D28", "font-style": "italic" })}">TresCanvas</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "color": "#24292E" })}">&lt;/</span><span style="${ssrRenderStyle({ "color": "#22863A" })}">template</span><span style="${ssrRenderStyle({ "color": "#24292E" })}">&gt;</span></span></code></pre></div><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table><thead><tr><th style="${ssrRenderStyle({ "text-align": "left" })}">Prop</th><th style="${ssrRenderStyle({ "text-align": "left" })}">Description</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>disabled</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">enable or disabled the effect, boolean</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>factor</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">Increase the range of the parallax</td><td>2.5</td></tr><tr><td style="${ssrRenderStyle({ "text-align": "left" })}"><strong>ease-factor</strong></td><td style="${ssrRenderStyle({ "text-align": "left" })}">enable or disabled the easing effect</td><td>true</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("guide/abstractions/mouse-parallax.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const mouseParallax = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  mouseParallax as default
};
