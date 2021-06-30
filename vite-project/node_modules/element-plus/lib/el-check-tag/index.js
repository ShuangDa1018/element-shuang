'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

var script = vue.defineComponent({
  name: "ElCheckTag",
  props: {
    checked: Boolean
  },
  emits: ["change"],
  setup(props, { emit }) {
    const onChange = () => {
      emit("change", !props.checked);
    };
    return {
      onChange
    };
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("span", {
    class: {
      "el-check-tag": true,
      "is-checked": _ctx.checked
    },
    onClick: _cache[1] || (_cache[1] = (...args) => _ctx.onChange && _ctx.onChange(...args))
  }, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 2);
}

script.render = render;
script.__file = "packages/check-tag/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _CheckTag = script;

exports.default = _CheckTag;
