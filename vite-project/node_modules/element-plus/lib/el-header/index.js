'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

var script = vue.defineComponent({
  name: "ElHeader",
  props: {
    height: {
      type: String,
      default: "60px"
    }
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("header", {
    class: "el-header",
    style: { height: _ctx.height }
  }, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 4);
}

script.render = render;
script.__file = "packages/container/src/header.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Header = script;

exports.default = _Header;
