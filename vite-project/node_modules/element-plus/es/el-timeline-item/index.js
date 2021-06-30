import { defineComponent, inject, openBlock, createBlock, createCommentVNode, renderSlot, createVNode, toDisplayString } from 'vue';

var script = defineComponent({
  name: "ElTimelineItem",
  props: {
    timestamp: {
      type: String,
      default: ""
    },
    hideTimestamp: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: "bottom"
    },
    type: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "normal"
    },
    icon: {
      type: String,
      default: ""
    }
  },
  setup() {
    inject("timeline");
  }
});

const _hoisted_1 = { class: "el-timeline-item" };
const _hoisted_2 = /* @__PURE__ */ createVNode("div", { class: "el-timeline-item__tail" }, null, -1);
const _hoisted_3 = {
  key: 1,
  class: "el-timeline-item__dot"
};
const _hoisted_4 = { class: "el-timeline-item__wrapper" };
const _hoisted_5 = {
  key: 0,
  class: "el-timeline-item__timestamp is-top"
};
const _hoisted_6 = { class: "el-timeline-item__content" };
const _hoisted_7 = {
  key: 1,
  class: "el-timeline-item__timestamp is-bottom"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("li", _hoisted_1, [
    _hoisted_2,
    !_ctx.$slots.dot ? (openBlock(), createBlock("div", {
      key: 0,
      class: ["el-timeline-item__node", [
        `el-timeline-item__node--${_ctx.size || ""}`,
        `el-timeline-item__node--${_ctx.type || ""}`
      ]],
      style: {
        backgroundColor: _ctx.color
      }
    }, [
      _ctx.icon ? (openBlock(), createBlock("i", {
        key: 0,
        class: ["el-timeline-item__icon", _ctx.icon]
      }, null, 2)) : createCommentVNode("v-if", true)
    ], 6)) : createCommentVNode("v-if", true),
    _ctx.$slots.dot ? (openBlock(), createBlock("div", _hoisted_3, [
      renderSlot(_ctx.$slots, "dot")
    ])) : createCommentVNode("v-if", true),
    createVNode("div", _hoisted_4, [
      !_ctx.hideTimestamp && _ctx.placement === "top" ? (openBlock(), createBlock("div", _hoisted_5, toDisplayString(_ctx.timestamp), 1)) : createCommentVNode("v-if", true),
      createVNode("div", _hoisted_6, [
        renderSlot(_ctx.$slots, "default")
      ]),
      !_ctx.hideTimestamp && _ctx.placement === "bottom" ? (openBlock(), createBlock("div", _hoisted_7, toDisplayString(_ctx.timestamp), 1)) : createCommentVNode("v-if", true)
    ])
  ]);
}

script.render = render;
script.__file = "packages/timeline/src/item.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _TimelineItem = script;

export default _TimelineItem;
