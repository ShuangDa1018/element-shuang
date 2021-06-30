'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var directives = require('../directives');
var ElInput = require('../el-input');
var util = require('../utils/util');
var validators = require('../utils/validators');
var form = require('../el-form');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ElInput__default = /*#__PURE__*/_interopDefaultLegacy(ElInput);

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
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
    // extract "RawType" from strings like "[object RawType]"
    return toTypeString(value).slice(8, -1);
};

var script = vue.defineComponent({
  name: "ElInputNumber",
  components: {
    ElInput: ElInput__default['default']
  },
  directives: {
    RepeatClick: directives.RepeatClick
  },
  props: {
    step: {
      type: Number,
      default: 1
    },
    stepStrictly: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    modelValue: {
      required: true,
      validator: (val) => {
        return toRawType(val) === "Number" || val === void 0;
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      validator: validators.isValidComponentSize
    },
    controls: {
      type: Boolean,
      default: true
    },
    controlsPosition: {
      type: String,
      default: ""
    },
    name: String,
    label: String,
    placeholder: String,
    precision: {
      type: Number,
      validator: (val) => val >= 0 && val === parseInt(val + "", 10)
    }
  },
  emits: ["update:modelValue", "change", "input", "blur", "focus"],
  setup(props, { emit }) {
    const ELEMENT = util.useGlobalConfig();
    const elForm = vue.inject(form.elFormKey, {});
    const elFormItem = vue.inject(form.elFormItemKey, {});
    const input = vue.ref(null);
    const data = vue.reactive({
      currentValue: props.modelValue,
      userInput: null
    });
    const minDisabled = vue.computed(() => {
      return _decrease(props.modelValue) < props.min;
    });
    const maxDisabled = vue.computed(() => {
      return _increase(props.modelValue) > props.max;
    });
    const numPrecision = vue.computed(() => {
      const stepPrecision = getPrecision(props.step);
      if (props.precision !== void 0) {
        if (stepPrecision > props.precision) {
          console.warn("[Element Warn][InputNumber]precision should not be less than the decimal places of step");
        }
        return props.precision;
      } else {
        return Math.max(getPrecision(props.modelValue), stepPrecision);
      }
    });
    const controlsAtRight = vue.computed(() => {
      return props.controls && props.controlsPosition === "right";
    });
    const inputNumberSize = vue.computed(() => {
      return props.size || elFormItem.size || ELEMENT.size;
    });
    const inputNumberDisabled = vue.computed(() => {
      return props.disabled || elForm.disabled;
    });
    const displayValue = vue.computed(() => {
      if (data.userInput !== null) {
        return data.userInput;
      }
      let currentValue = data.currentValue;
      if (typeof currentValue === "number") {
        if (props.precision !== void 0) {
          currentValue = currentValue.toFixed(props.precision);
        }
      }
      return currentValue;
    });
    const toPrecision = (num, pre) => {
      if (pre === void 0)
        pre = numPrecision.value;
      return parseFloat(Math.round(num * Math.pow(10, pre)) / Math.pow(10, pre) + "");
    };
    const getPrecision = (value) => {
      if (value === void 0)
        return 0;
      const valueString = value.toString();
      const dotPosition = valueString.indexOf(".");
      let precision = 0;
      if (dotPosition !== -1) {
        precision = valueString.length - dotPosition - 1;
      }
      return precision;
    };
    const _increase = (val) => {
      if (typeof val !== "number" && val !== void 0)
        return data.currentValue;
      const precisionFactor = Math.pow(10, numPrecision.value);
      return toPrecision((precisionFactor * val + precisionFactor * props.step) / precisionFactor);
    };
    const _decrease = (val) => {
      if (typeof val !== "number" && val !== void 0)
        return data.currentValue;
      const precisionFactor = Math.pow(10, numPrecision.value);
      return toPrecision((precisionFactor * val - precisionFactor * props.step) / precisionFactor);
    };
    const increase = () => {
      if (inputNumberDisabled.value || maxDisabled.value)
        return;
      const value = props.modelValue || 0;
      const newVal = _increase(value);
      setCurrentValue(newVal);
    };
    const decrease = () => {
      if (inputNumberDisabled.value || minDisabled.value)
        return;
      const value = props.modelValue || 0;
      const newVal = _decrease(value);
      setCurrentValue(newVal);
    };
    const setCurrentValue = (newVal) => {
      const oldVal = data.currentValue;
      if (typeof newVal === "number" && props.precision !== void 0) {
        newVal = toPrecision(newVal, props.precision);
      }
      if (newVal !== void 0 && newVal >= props.max)
        newVal = props.max;
      if (newVal !== void 0 && newVal <= props.min)
        newVal = props.min;
      if (oldVal === newVal)
        return;
      data.userInput = null;
      emit("update:modelValue", newVal);
      emit("input", newVal);
      emit("change", newVal, oldVal);
      data.currentValue = newVal;
    };
    const handleInput = (value) => {
      return data.userInput = value;
    };
    const handleInputChange = (value) => {
      const newVal = value === "" ? void 0 : Number(value);
      if (!isNaN(newVal) || value === "") {
        setCurrentValue(newVal);
      }
      data.userInput = null;
    };
    vue.watch(() => props.modelValue, (value) => {
      let newVal = value === void 0 ? value : Number(value);
      if (newVal !== void 0) {
        if (isNaN(newVal))
          return;
        if (props.stepStrictly) {
          const stepPrecision = getPrecision(props.step);
          const precisionFactor = Math.pow(10, stepPrecision);
          newVal = Math.round(newVal / props.step) * precisionFactor * props.step / precisionFactor;
        }
        if (props.precision !== void 0) {
          newVal = toPrecision(newVal, props.precision);
        }
      }
      if (newVal !== void 0 && newVal >= props.max) {
        newVal = props.max;
        emit("update:modelValue", newVal);
      }
      if (newVal !== void 0 && newVal <= props.min) {
        newVal = props.min;
        emit("update:modelValue", newVal);
      }
      data.currentValue = newVal;
      data.userInput = null;
    }, { immediate: true });
    vue.onMounted(() => {
      let innerInput = input.value.input;
      innerInput.setAttribute("role", "spinbutton");
      innerInput.setAttribute("aria-valuemax", props.max);
      innerInput.setAttribute("aria-valuemin", props.min);
      innerInput.setAttribute("aria-valuenow", data.currentValue);
      innerInput.setAttribute("aria-disabled", inputNumberDisabled.value);
      if (toRawType(props.modelValue) !== "Number" && props.modelValue !== void 0) {
        emit("update:modelValue", void 0);
      }
    });
    vue.onUpdated(() => {
      let innerInput = input.value.input;
      innerInput.setAttribute("aria-valuenow", data.currentValue);
    });
    return {
      input,
      displayValue,
      handleInput,
      handleInputChange,
      controlsAtRight,
      decrease,
      increase,
      inputNumberSize,
      inputNumberDisabled,
      maxDisabled,
      minDisabled
    };
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = vue.resolveComponent("el-input");
  const _directive_repeat_click = vue.resolveDirective("repeat-click");
  return vue.openBlock(), vue.createBlock("div", {
    class: [
      "el-input-number",
      _ctx.inputNumberSize ? "el-input-number--" + _ctx.inputNumberSize : "",
      { "is-disabled": _ctx.inputNumberDisabled },
      { "is-without-controls": !_ctx.controls },
      { "is-controls-right": _ctx.controlsAtRight }
    ],
    onDragstart: _cache[5] || (_cache[5] = vue.withModifiers(() => {
    }, ["prevent"]))
  }, [
    _ctx.controls ? vue.withDirectives((vue.openBlock(), vue.createBlock("span", {
      key: 0,
      class: ["el-input-number__decrease", { "is-disabled": _ctx.minDisabled }],
      role: "button",
      onKeydown: _cache[1] || (_cache[1] = vue.withKeys((...args) => _ctx.decrease && _ctx.decrease(...args), ["enter"]))
    }, [
      vue.createVNode("i", {
        class: `el-icon-${_ctx.controlsAtRight ? "arrow-down" : "minus"}`
      }, null, 2)
    ], 34)), [
      [_directive_repeat_click, _ctx.decrease]
    ]) : vue.createCommentVNode("v-if", true),
    _ctx.controls ? vue.withDirectives((vue.openBlock(), vue.createBlock("span", {
      key: 1,
      class: ["el-input-number__increase", { "is-disabled": _ctx.maxDisabled }],
      role: "button",
      onKeydown: _cache[2] || (_cache[2] = vue.withKeys((...args) => _ctx.increase && _ctx.increase(...args), ["enter"]))
    }, [
      vue.createVNode("i", {
        class: `el-icon-${_ctx.controlsAtRight ? "arrow-up" : "plus"}`
      }, null, 2)
    ], 34)), [
      [_directive_repeat_click, _ctx.increase]
    ]) : vue.createCommentVNode("v-if", true),
    vue.createVNode(_component_el_input, {
      ref: "input",
      "model-value": _ctx.displayValue,
      placeholder: _ctx.placeholder,
      disabled: _ctx.inputNumberDisabled,
      size: _ctx.inputNumberSize,
      max: _ctx.max,
      min: _ctx.min,
      name: _ctx.name,
      label: _ctx.label,
      onKeydown: [
        vue.withKeys(vue.withModifiers(_ctx.increase, ["prevent"]), ["up"]),
        vue.withKeys(vue.withModifiers(_ctx.decrease, ["prevent"]), ["down"])
      ],
      onBlur: _cache[3] || (_cache[3] = (event) => _ctx.$emit("blur", event)),
      onFocus: _cache[4] || (_cache[4] = (event) => _ctx.$emit("focus", event)),
      onInput: _ctx.handleInput,
      onChange: _ctx.handleInputChange
    }, null, 8, ["model-value", "placeholder", "disabled", "size", "max", "min", "name", "label", "onKeydown", "onInput", "onChange"])
  ], 34);
}

script.render = render;
script.__file = "packages/input-number/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _InputNumber = script;

exports.default = _InputNumber;
