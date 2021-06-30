import { defineComponent, openBlock, createBlock, renderSlot, createTextVNode, toDisplayString, createCommentVNode, createVNode } from 'vue';

var script = defineComponent({
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
  return openBlock(), createBlock("div", {
    class: ["el-card", _ctx.shadow ? "is-" + _ctx.shadow + "-shadow" : "is-always-shadow"]
  }, [
    _ctx.$slots.header || _ctx.header ? (openBlock(), createBlock("div", _hoisted_1, [
      renderSlot(_ctx.$slots, "header", {}, () => [
        createTextVNode(toDisplayString(_ctx.header), 1)
      ])
    ])) : createCommentVNode("v-if", true),
    createVNode("div", {
      class: "el-card__body",
      style: _ctx.bodyStyle
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 4)
  ], 2);
}

script.render = render;
script.__file = "packages/card/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Card = script;

export default _Card;
