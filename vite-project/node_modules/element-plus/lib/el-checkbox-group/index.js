'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var constants = require('../utils/constants');
var validators = require('../utils/validators');
var util = require('../utils/util');
var form = require('../el-form');

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

const useCheckboxGroup = () => {
  const ELEMENT = util.useGlobalConfig();
  const elForm = vue.inject(form.elFormKey, {});
  const elFormItem = vue.inject(form.elFormItemKey, {});
  const checkboxGroup = vue.inject("CheckboxGroup", {});
  const isGroup = vue.computed(() => checkboxGroup && (checkboxGroup == null ? void 0 : checkboxGroup.name) === "ElCheckboxGroup");
  const elFormItemSize = vue.computed(() => {
    return elFormItem.size;
  });
  return {
    isGroup,
    checkboxGroup,
    elForm,
    ELEMENT,
    elFormItemSize,
    elFormItem
  };
};

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var script = vue.defineComponent({
  name: "ElCheckboxGroup",
  props: {
    modelValue: {
      type: [Object, Boolean, Array],
      default: () => void 0
    },
    disabled: Boolean,
    min: {
      type: Number,
      default: void 0
    },
    max: {
      type: Number,
      default: void 0
    },
    size: {
      type: String,
      validator: validators.isValidComponentSize
    },
    fill: {
      type: String,
      default: void 0
    },
    textColor: {
      type: String,
      default: void 0
    }
  },
  emits: [constants.UPDATE_MODEL_EVENT, "change"],
  setup(props, ctx) {
    const { elFormItem, elFormItemSize, ELEMENT } = useCheckboxGroup();
    const checkboxGroupSize = vue.computed(() => props.size || elFormItemSize.value || ELEMENT.size);
    const changeEvent = (value) => {
      ctx.emit(constants.UPDATE_MODEL_EVENT, value);
      vue.nextTick(() => {
        ctx.emit("change", value);
      });
    };
    const modelValue = vue.computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        changeEvent(val);
      }
    });
    vue.provide("CheckboxGroup", __spreadProps(__spreadValues({
      name: "ElCheckboxGroup",
      modelValue
    }, vue.toRefs(props)), {
      checkboxGroupSize,
      changeEvent
    }));
    vue.watch(() => props.modelValue, (val) => {
      var _a;
      (_a = elFormItem.formItemMitt) == null ? void 0 : _a.emit("el.form.change", [val]);
    });
  }
});

const _hoisted_1 = {
  class: "el-checkbox-group",
  role: "group",
  "aria-label": "checkbox-group"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("div", _hoisted_1, [
    vue.renderSlot(_ctx.$slots, "default")
  ]);
}

script.render = render;
script.__file = "packages/checkbox/src/checkbox-group.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _CheckboxGroup = script;

exports.default = _CheckboxGroup;
