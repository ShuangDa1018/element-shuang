'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

var script = vue.defineComponent({
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
    vue.inject("timeline");
  }
});

const _hoisted_1 = { class: "el-timeline-item" };
const _hoisted_2 = /* @__PURE__ */ vue.createVNode("div", { class: "el-timeline-item__tail" }, null, -1);
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
  return vue.openBlock(), vue.createBlock("li", _hoisted_1, [
    _hoisted_2,
    !_ctx.$slots.dot ? (vue.openBlock(), vue.createBlock("div", {
      key: 0,
      class: ["el-timeline-item__node", [
        `el-timeline-item__node--${_ctx.size || ""}`,
        `el-timeline-item__node--${_ctx.type || ""}`
      ]],
      style: {
        backgroundColor: _ctx.color
      }
    }, [
      _ctx.icon ? (vue.openBlock(), vue.createBlock("i", {
        key: 0,
        class: ["el-timeline-item__icon", _ctx.icon]
      }, null, 2)) : vue.createCommentVNode("v-if", true)
    ], 6)) : vue.createCommentVNode("v-if", true),
    _ctx.$slots.dot ? (vue.openBlock(), vue.createBlock("div", _hoisted_3, [
      vue.renderSlot(_ctx.$slots, "dot")
    ])) : vue.createCommentVNode("v-if", true),
    vue.createVNode("div", _hoisted_4, [
      !_ctx.hideTimestamp && _ctx.placement === "top" ? (vue.openBlock(), vue.createBlock("div", _hoisted_5, vue.toDisplayString(_ctx.timestamp), 1)) : vue.createCommentVNode("v-if", true),
      vue.createVNode("div", _hoisted_6, [
        vue.renderSlot(_ctx.$slots, "default")
      ]),
      !_ctx.hideTimestamp && _ctx.placement === "bottom" ? (vue.openBlock(), vue.createBlock("div", _hoisted_7, vue.toDisplayString(_ctx.timestamp), 1)) : vue.createCommentVNode("v-if", true)
    ])
  ]);
}

script.render = render;
script.__file = "packages/timeline/src/item.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _TimelineItem = script;

exports.default = _TimelineItem;
