'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

var script = vue.defineComponent({
  name: "ElContainer",
  props: {
    direction: {
      type: String,
      default: ""
    }
  },
  setup(props, { slots }) {
    const isVertical = vue.computed(() => {
      if (props.direction === "vertical") {
        return true;
      } else if (props.direction === "horizontal") {
        return false;
      }
      if (slots && slots.default) {
        const vNodes = slots.default();
        return vNodes.some((vNode) => {
          const tag = vNode.type.name;
          return tag === "ElHeader" || tag === "ElFooter";
        });
      } else {
        return false;
      }
    });
    return {
      isVertical
    };
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("section", {
    class: ["el-container", { "is-vertical": _ctx.isVertical }]
  }, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 2);
}

script.render = render;
script.__file = "packages/container/src/container.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Container = script;

exports.default = _Container;
