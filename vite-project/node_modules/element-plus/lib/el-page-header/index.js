'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var locale = require('../locale');

var script = vue.defineComponent({
  name: "ElPageHeader",
  props: {
    icon: {
      type: String,
      default: "el-icon-back"
    },
    title: {
      type: String,
      default: () => locale.t("el.pageHeader.title")
    },
    content: {
      type: String,
      default: ""
    }
  },
  emits: ["back"],
  setup(props, { emit }) {
    function handleClick() {
      emit("back");
    }
    return {
      handleClick
    };
  }
});

const _hoisted_1 = { class: "el-page-header" };
const _hoisted_2 = {
  key: 0,
  class: "el-page-header__icon"
};
const _hoisted_3 = { class: "el-page-header__title" };
const _hoisted_4 = { class: "el-page-header__content" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("div", _hoisted_1, [
    vue.createVNode("div", {
      class: "el-page-header__left",
      onClick: _cache[1] || (_cache[1] = (...args) => _ctx.handleClick && _ctx.handleClick(...args))
    }, [
      _ctx.icon || _ctx.$slots.icon ? (vue.openBlock(), vue.createBlock("div", _hoisted_2, [
        vue.renderSlot(_ctx.$slots, "icon", {}, () => [
          vue.createVNode("i", { class: _ctx.icon }, null, 2)
        ])
      ])) : vue.createCommentVNode("v-if", true),
      vue.createVNode("div", _hoisted_3, [
        vue.renderSlot(_ctx.$slots, "title", {}, () => [
          vue.createTextVNode(vue.toDisplayString(_ctx.title), 1)
        ])
      ])
    ]),
    vue.createVNode("div", _hoisted_4, [
      vue.renderSlot(_ctx.$slots, "content", {}, () => [
        vue.createTextVNode(vue.toDisplayString(_ctx.content), 1)
      ])
    ])
  ]);
}

script.render = render;
script.__file = "packages/page-header/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _PageHeader = script;

exports.default = _PageHeader;
