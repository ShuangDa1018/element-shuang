'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

var script = vue.defineComponent({
  name: "ElMain"
});

const _hoisted_1 = { class: "el-main" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("main", _hoisted_1, [
    vue.renderSlot(_ctx.$slots, "default")
  ]);
}

script.render = render;
script.__file = "packages/container/src/main.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Main = script;

exports.default = _Main;
