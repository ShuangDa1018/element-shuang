'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var util = require('../utils/util');
var validators = require('../utils/validators');
var form = require('../el-form');

var script = vue.defineComponent({
  name: "ElButton",
  props: {
    type: {
      type: String,
      default: "default",
      validator: (val) => {
        return [
          "default",
          "primary",
          "success",
          "warning",
          "info",
          "danger",
          "text"
        ].includes(val);
      }
    },
    size: {
      type: String,
      validator: validators.isValidComponentSize
    },
    icon: {
      type: String,
      default: ""
    },
    nativeType: {
      type: String,
      default: "button",
      validator: (val) => {
        return ["button", "submit", "reset"].includes(val);
      }
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean
  },
  emits: ["click"],
  setup(props, { emit }) {
    const $ELEMENT = util.useGlobalConfig();
    const elForm = vue.inject(form.elFormKey, {});
    const elFormItem = vue.inject(form.elFormItemKey, {});
    const buttonSize = vue.computed(() => {
      return props.size || elFormItem.size || $ELEMENT.size;
    });
    const buttonDisabled = vue.computed(() => {
      return props.disabled || elForm.disabled;
    });
    const handleClick = (evt) => {
      emit("click", evt);
    };
    return {
      buttonSize,
      buttonDisabled,
      handleClick
    };
  }
});

const _hoisted_1 = {
  key: 0,
  class: "el-icon-loading"
};
const _hoisted_2 = { key: 2 };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("button", {
    class: [
      "el-button",
      _ctx.type ? "el-button--" + _ctx.type : "",
      _ctx.buttonSize ? "el-button--" + _ctx.buttonSize : "",
      {
        "is-disabled": _ctx.buttonDisabled,
        "is-loading": _ctx.loading,
        "is-plain": _ctx.plain,
        "is-round": _ctx.round,
        "is-circle": _ctx.circle
      }
    ],
    disabled: _ctx.buttonDisabled || _ctx.loading,
    autofocus: _ctx.autofocus,
    type: _ctx.nativeType,
    onClick: _cache[1] || (_cache[1] = (...args) => _ctx.handleClick && _ctx.handleClick(...args))
  }, [
    _ctx.loading ? (vue.openBlock(), vue.createBlock("i", _hoisted_1)) : vue.createCommentVNode("v-if", true),
    _ctx.icon && !_ctx.loading ? (vue.openBlock(), vue.createBlock("i", {
      key: 1,
      class: _ctx.icon
    }, null, 2)) : vue.createCommentVNode("v-if", true),
    _ctx.$slots.default ? (vue.openBlock(), vue.createBlock("span", _hoisted_2, [
      vue.renderSlot(_ctx.$slots, "default")
    ])) : vue.createCommentVNode("v-if", true)
  ], 10, ["disabled", "autofocus", "type"]);
}

script.render = render;
script.__file = "packages/button/src/button.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Button = script;

exports.default = _Button;
