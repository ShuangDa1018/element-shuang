'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

var script = vue.defineComponent({
  name: "ImgPlaceholder"
});

const _hoisted_1 = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2 = /* @__PURE__ */ vue.createVNode("path", { d: "M64 896V128h896v768H64z m64-128l192-192 116.352 116.352L640 448l256 307.2V192H128v576z m224-480a96 96 0 1 1-0.064 192.064A96 96 0 0 1 352 288z" }, null, -1);
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("svg", _hoisted_1, [
    _hoisted_2
  ]);
}

script.render = render;
script.__file = "packages/skeleton-item/src/img-placeholder.vue";

var script$1 = vue.defineComponent({
  name: "ElSkeletonItem",
  components: {
    [script.name]: script
  },
  props: {
    variant: {
      type: String,
      default: "text"
    }
  }
});

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_img_placeholder = vue.resolveComponent("img-placeholder");
  return vue.openBlock(), vue.createBlock("div", {
    class: ["el-skeleton__item", `el-skeleton__${_ctx.variant}`]
  }, [
    _ctx.variant === "image" ? (vue.openBlock(), vue.createBlock(_component_img_placeholder, { key: 0 })) : vue.createCommentVNode("v-if", true)
  ], 2);
}

script$1.render = render$1;
script$1.__file = "packages/skeleton-item/src/index.vue";

script$1.install = (app) => {
  app.component(script$1.name, script$1);
};
const _SkeletonItem = script$1;

exports.default = _SkeletonItem;
