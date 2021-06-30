'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

var script = vue.defineComponent({
  name: "ElDivider",
  props: {
    direction: {
      type: String,
      default: "horizontal",
      validator(val) {
        return ["horizontal", "vertical"].indexOf(val) !== -1;
      }
    },
    contentPosition: {
      type: String,
      default: "center",
      validator(val) {
        return ["left", "center", "right"].indexOf(val) !== -1;
      }
    }
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("div", {
    class: ["el-divider", `el-divider--${_ctx.direction}`]
  }, [
    _ctx.$slots.default && _ctx.direction !== "vertical" ? (vue.openBlock(), vue.createBlock("div", {
      key: 0,
      class: ["el-divider__text", `is-${_ctx.contentPosition}`]
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 2)) : vue.createCommentVNode("v-if", true)
  ], 2);
}

script.render = render;
script.__file = "packages/divider/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Divider = script;

exports.default = _Divider;
