'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

var script = vue.defineComponent({
  name: "ElButtonGroup"
});

const _hoisted_1 = { class: "el-button-group" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("div", _hoisted_1, [
    vue.renderSlot(_ctx.$slots, "default")
  ]);
}

script.render = render;
script.__file = "packages/button/src/button-group.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _ButtonGroup = script;

exports.default = _ButtonGroup;
