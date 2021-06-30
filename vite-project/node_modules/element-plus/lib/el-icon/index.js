'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

var script = vue.defineComponent({
  name: "ElIcon",
  props: {
    name: {
      type: String,
      default: ""
    }
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("i", {
    class: `el-icon-${_ctx.name}`
  }, null, 2);
}

script.render = render;
script.__file = "packages/icon/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Icon = script;

exports.default = _Icon;
