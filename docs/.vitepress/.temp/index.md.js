import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.cc2b3d55.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{"layout":"home","hero":{"name":"Cientos","text":"Ready-made abstractions for TresJS","tagline":"Extending helpers and composables using Three addons.","actions":[{"theme":"brand","text":"Get Started","link":"/guide/"},{"theme":"alt","text":"Why Tres?","link":"https://tresjs.org/guide/#motivation"}]},"features":[{"icon":"🦾","title":"three-stdlib","details":"Because the ThreeJS addons repo structure is... daunting"},{"icon":"🦄","title":"Extendable","details":"You want to create a fancy shader material component? Submit a PR 🤗"},{"icon":"💛","title":"Community-Driven","details":"Benefits from the active and growing Vue TresJS community."}]},"headers":[],"relativePath":"index.md","filePath":"index.md"}');
const _sfc_main = { name: "index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
