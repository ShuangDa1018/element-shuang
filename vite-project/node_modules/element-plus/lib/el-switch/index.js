'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var form = require('../el-form');
var util = require('../utils/util');
var throwError = require('../utils/error');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var throwError__default = /*#__PURE__*/_interopDefaultLegacy(throwError);

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 * IMPORTANT: all calls of this function must be prefixed with
 * \/\*#\_\_PURE\_\_\*\/
 * So that rollup can tree-shake them if necessary.
 */
const EMPTY_OBJ = (process.env.NODE_ENV !== 'production')
    ? Object.freeze({})
    : {};
const EMPTY_ARR = (process.env.NODE_ENV !== 'production') ? Object.freeze([]) : [];
const isFunction = (val) => typeof val === 'function';
const isObject = (val) => val !== null && typeof val === 'object';
const isPromise = (val) => {
    return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};

var script = vue.defineComponent({
  name: "ElSwitch",
  props: {
    modelValue: {
      type: [Boolean, String, Number],
      default: false
    },
    value: {
      type: [Boolean, String, Number],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 40
    },
    activeIconClass: {
      type: String,
      default: ""
    },
    inactiveIconClass: {
      type: String,
      default: ""
    },
    activeText: {
      type: String,
      default: ""
    },
    inactiveText: {
      type: String,
      default: ""
    },
    activeColor: {
      type: String,
      default: ""
    },
    inactiveColor: {
      type: String,
      default: ""
    },
    activeValue: {
      type: [Boolean, String, Number],
      default: true
    },
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false
    },
    name: {
      type: String,
      default: ""
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    id: String,
    loading: {
      type: Boolean,
      default: false
    },
    beforeChange: Function
  },
  emits: ["update:modelValue", "change", "input"],
  setup(props, ctx) {
    const elForm = vue.inject(form.elFormKey, {});
    const elFormItem = vue.inject(form.elFormItemKey, {});
    const isModelValue = vue.ref(props.modelValue !== false);
    const input = vue.ref(null);
    const core = vue.ref(null);
    const scope = "ElSwitch";
    vue.watch(() => props.modelValue, () => {
      isModelValue.value = true;
    });
    vue.watch(() => props.value, () => {
      isModelValue.value = false;
    });
    const actualValue = vue.computed(() => {
      return isModelValue.value ? props.modelValue : props.value;
    });
    const checked = vue.computed(() => {
      return actualValue.value === props.activeValue;
    });
    if (!~[props.activeValue, props.inactiveValue].indexOf(actualValue.value)) {
      ctx.emit("update:modelValue", props.inactiveValue);
      ctx.emit("change", props.inactiveValue);
      ctx.emit("input", props.inactiveValue);
    }
    vue.watch(checked, () => {
      var _a;
      input.value.checked = checked.value;
      if (props.activeColor || props.inactiveColor) {
        setBackgroundColor();
      }
      if (props.validateEvent) {
        (_a = elFormItem.formItemMitt) == null ? void 0 : _a.emit("el.form.change", [actualValue.value]);
      }
    });
    const switchDisabled = vue.computed(() => {
      return props.disabled || props.loading || (elForm || {}).disabled;
    });
    const handleChange = () => {
      const val = checked.value ? props.inactiveValue : props.activeValue;
      ctx.emit("update:modelValue", val);
      ctx.emit("change", val);
      ctx.emit("input", val);
      vue.nextTick(() => {
        input.value.checked = checked.value;
      });
    };
    const switchValue = () => {
      if (switchDisabled.value)
        return;
      const { beforeChange } = props;
      if (!beforeChange) {
        handleChange();
        return;
      }
      const shouldChange = beforeChange();
      const isExpectType = [isPromise(shouldChange), util.isBool(shouldChange)].some((i) => i);
      if (!isExpectType) {
        throwError__default['default'](scope, "beforeChange must return type `Promise<boolean>` or `boolean`");
      }
      if (isPromise(shouldChange)) {
        shouldChange.then((result) => {
          if (result) {
            handleChange();
          }
        }).catch((e) => {
          if (process.env.NODE_ENV !== "production") {
            throwError.warn(scope, `some error occurred: ${e}`);
          }
        });
      } else if (shouldChange) {
        handleChange();
      }
    };
    const setBackgroundColor = () => {
      const newColor = checked.value ? props.activeColor : props.inactiveColor;
      const coreEl = core.value;
      coreEl.style.borderColor = newColor;
      coreEl.style.backgroundColor = newColor;
      coreEl.children[0].style.color = newColor;
    };
    const focus = () => {
      var _a, _b;
      (_b = (_a = input.value) == null ? void 0 : _a.focus) == null ? void 0 : _b.call(_a);
    };
    vue.onMounted(() => {
      if (props.activeColor || props.inactiveColor) {
        setBackgroundColor();
      }
      input.value.checked = checked.value;
    });
    return {
      input,
      core,
      switchDisabled,
      checked,
      handleChange,
      switchValue,
      focus
    };
  }
});

const _hoisted_1 = { class: "el-switch__action" };
const _hoisted_2 = {
  key: 0,
  class: "el-icon-loading"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("div", {
    class: ["el-switch", { "is-disabled": _ctx.switchDisabled, "is-checked": _ctx.checked }],
    role: "switch",
    "aria-checked": _ctx.checked,
    "aria-disabled": _ctx.switchDisabled,
    onClick: _cache[3] || (_cache[3] = vue.withModifiers((...args) => _ctx.switchValue && _ctx.switchValue(...args), ["prevent"]))
  }, [
    vue.createVNode("input", {
      id: _ctx.id,
      ref: "input",
      class: "el-switch__input",
      type: "checkbox",
      name: _ctx.name,
      "true-value": _ctx.activeValue,
      "false-value": _ctx.inactiveValue,
      disabled: _ctx.switchDisabled,
      onChange: _cache[1] || (_cache[1] = (...args) => _ctx.handleChange && _ctx.handleChange(...args)),
      onKeydown: _cache[2] || (_cache[2] = vue.withKeys((...args) => _ctx.switchValue && _ctx.switchValue(...args), ["enter"]))
    }, null, 40, ["id", "name", "true-value", "false-value", "disabled"]),
    _ctx.inactiveIconClass || _ctx.inactiveText ? (vue.openBlock(), vue.createBlock("span", {
      key: 0,
      class: ["el-switch__label", "el-switch__label--left", !_ctx.checked ? "is-active" : ""]
    }, [
      _ctx.inactiveIconClass ? (vue.openBlock(), vue.createBlock("i", {
        key: 0,
        class: [_ctx.inactiveIconClass]
      }, null, 2)) : vue.createCommentVNode("v-if", true),
      !_ctx.inactiveIconClass && _ctx.inactiveText ? (vue.openBlock(), vue.createBlock("span", {
        key: 1,
        "aria-hidden": _ctx.checked
      }, vue.toDisplayString(_ctx.inactiveText), 9, ["aria-hidden"])) : vue.createCommentVNode("v-if", true)
    ], 2)) : vue.createCommentVNode("v-if", true),
    vue.createVNode("span", {
      ref: "core",
      class: "el-switch__core",
      style: { "width": (_ctx.width || 40) + "px" }
    }, [
      vue.createVNode("div", _hoisted_1, [
        _ctx.loading ? (vue.openBlock(), vue.createBlock("i", _hoisted_2)) : vue.createCommentVNode("v-if", true)
      ])
    ], 4),
    _ctx.activeIconClass || _ctx.activeText ? (vue.openBlock(), vue.createBlock("span", {
      key: 1,
      class: ["el-switch__label", "el-switch__label--right", _ctx.checked ? "is-active" : ""]
    }, [
      _ctx.activeIconClass ? (vue.openBlock(), vue.createBlock("i", {
        key: 0,
        class: [_ctx.activeIconClass]
      }, null, 2)) : vue.createCommentVNode("v-if", true),
      !_ctx.activeIconClass && _ctx.activeText ? (vue.openBlock(), vue.createBlock("span", {
        key: 1,
        "aria-hidden": !_ctx.checked
      }, vue.toDisplayString(_ctx.activeText), 9, ["aria-hidden"])) : vue.createCommentVNode("v-if", true)
    ], 2)) : vue.createCommentVNode("v-if", true)
  ], 10, ["aria-checked", "aria-disabled"]);
}

script.render = render;
script.__file = "packages/switch/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Switch = script;

exports.default = _Switch;
