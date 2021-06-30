import { defineComponent, openBlock, createBlock, renderSlot, createCommentVNode } from 'vue';

var script = defineComponent({
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
  return openBlock(), createBlock("div", {
    class: ["el-divider", `el-divider--${_ctx.direction}`]
  }, [
    _ctx.$slots.default && _ctx.direction !== "vertical" ? (openBlock(), createBlock("div", {
      key: 0,
      class: ["el-divider__text", `is-${_ctx.contentPosition}`]
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 2)) : createCommentVNode("v-if", true)
  ], 2);
}

script.render = render;
script.__file = "packages/divider/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Divider = script;

export default _Divider;
