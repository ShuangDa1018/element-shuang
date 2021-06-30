'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

var script = vue.defineComponent({
  name: "ElAside",
  props: {
    width: {
      type: String,
      default: "300px"
    }
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("aside", {
    class: "el-aside",
    style: { width: _ctx.width }
  }, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 4);
}

script.render = render;
script.__file = "packages/container/src/aside.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Aside = script;

exports.default = _Aside;
