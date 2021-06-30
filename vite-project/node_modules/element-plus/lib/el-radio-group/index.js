'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var aria = require('../utils/aria');
var constants = require('../utils/constants');
var validators = require('../utils/validators');
var form = require('../el-form');

const radioGroupKey = "RadioGroup";

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
  name: "ElRadioGroup",
  componentName: "ElRadioGroup",
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: ""
    },
    size: {
      type: String,
      validator: validators.isValidComponentSize
    },
    fill: {
      type: String,
      default: ""
    },
    textColor: {
      type: String,
      default: ""
    },
    disabled: Boolean
  },
  emits: [constants.UPDATE_MODEL_EVENT, "change"],
  setup(props, ctx) {
    const radioGroup = vue.ref(null);
    const elFormItem = vue.inject(form.elFormItemKey, {});
    const radioGroupSize = vue.computed(() => {
      return props.size || elFormItem.size;
    });
    const changeEvent = (value) => {
      ctx.emit(constants.UPDATE_MODEL_EVENT, value);
      vue.nextTick(() => {
        ctx.emit("change", value);
      });
    };
    vue.provide(radioGroupKey, vue.reactive(__spreadProps(__spreadValues({
      name: "ElRadioGroup"
    }, vue.toRefs(props)), {
      radioGroupSize,
      changeEvent
    })));
    vue.watch(() => props.modelValue, (val) => {
      var _a;
      (_a = elFormItem.formItemMitt) == null ? void 0 : _a.emit("el.form.change", [val]);
    });
    const handleKeydown = (e) => {
      const target = e.target;
      const className = target.nodeName === "INPUT" ? "[type=radio]" : "[role=radio]";
      const radios = radioGroup.value.querySelectorAll(className);
      const length = radios.length;
      const index = Array.from(radios).indexOf(target);
      const roleRadios = radioGroup.value.querySelectorAll("[role=radio]");
      let nextIndex = null;
      switch (e.code) {
        case aria.EVENT_CODE.left:
        case aria.EVENT_CODE.up:
          e.stopPropagation();
          e.preventDefault();
          nextIndex = index === 0 ? length - 1 : index - 1;
          break;
        case aria.EVENT_CODE.right:
        case aria.EVENT_CODE.down:
          e.stopPropagation();
          e.preventDefault();
          nextIndex = index === length - 1 ? 0 : index + 1;
          break;
      }
      if (nextIndex === null)
        return;
      roleRadios[nextIndex].click();
      roleRadios[nextIndex].focus();
    };
    vue.onMounted(() => {
      const radios = radioGroup.value.querySelectorAll("[type=radio]");
      const firstLabel = radios[0];
      if (!Array.from(radios).some((radio) => radio.checked) && firstLabel) {
        firstLabel.tabIndex = 0;
      }
    });
    return {
      handleKeydown,
      radioGroupSize,
      radioGroup
    };
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("div", {
    ref: "radioGroup",
    class: "el-radio-group",
    role: "radiogroup",
    onKeydown: _cache[1] || (_cache[1] = (...args) => _ctx.handleKeydown && _ctx.handleKeydown(...args))
  }, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 544);
}

script.render = render;
script.__file = "packages/radio/src/radio-group.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _RadioGroup = script;

exports.default = _RadioGroup;
