'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

var script = vue.defineComponent({
  name: "ElCard",
  props: {
    header: {
      type: String,
      default: ""
    },
    bodyStyle: {
      type: [String, Object, Array],
      default: ""
    },
    shadow: {
      type: String,
      default: ""
    }
  }
});

const _hoisted_1 = {
  key: 0,
  class: "el-card__header"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("div", {
    class: ["el-card", _ctx.shadow ? "is-" + _ctx.shadow + "-shadow" : "is-always-shadow"]
  }, [
    _ctx.$slots.header || _ctx.header ? (vue.openBlock(), vue.createBlock("div", _hoisted_1, [
      vue.renderSlot(_ctx.$slots, "header", {}, () => [
        vue.createTextVNode(vue.toDisplayString(_ctx.header), 1)
      ])
    ])) : vue.createCommentVNode("v-if", true),
    vue.createVNode("div", {
      class: "el-card__body",
      style: _ctx.bodyStyle
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 4)
  ], 2);
}

script.render = render;
script.__file = "packages/card/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Card = script;

exports.default = _Card;
