import { defineComponent, unref, mergeProps, withCtx, createVNode, openBlock, createBlock, Suspense, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderSuspense } from "vue/server-renderer";
import { TresCanvas } from "@tresjs/core";
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from "three";
import { b as bx, x as xx } from "./DocsDemo.b6cdbb3e.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "GLTFModelDemo",
  __ssrInlineRender: true,
  setup(__props) {
    const gl = {
      clearColor: "#F78B3D",
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
            _push2(`<TresPerspectiveCamera${ssrRenderAttr("position", [3, 2, 5])}${_scopeId}></TresPerspectiveCamera>`);
            _push2(ssrRenderComponent(unref(bx), null, null, _parent2, _scopeId));
            ssrRenderSuspense(_push2, {
              default: () => {
                _push2(ssrRenderComponent(unref(xx), { path: "https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb" }, null, _parent2, _scopeId));
              },
              _: 1
            });
            _push2(`<TresDirectionalLight${ssrRenderAttr("intensity", 2)}${ssrRenderAttr("position", [3, 3, 3])}${_scopeId}></TresDirectionalLight><TresAmbientLight${ssrRenderAttr("intensity", 1)}${_scopeId}></TresAmbientLight>`);
          } else {
            return [
              createVNode("TresPerspectiveCamera", { position: [3, 2, 5] }),
              createVNode(unref(bx)),
              (openBlock(), createBlock(Suspense, null, {
                default: withCtx(() => [
                  createVNode(unref(xx), { path: "https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb" })
                ]),
                _: 1
              })),
              createVNode("TresDirectionalLight", {
                intensity: 2,
                position: [3, 3, 3]
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(".vitepress/theme/components/GLTFModelDemo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
