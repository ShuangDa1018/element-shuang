'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var constants = require('../utils/constants');
var validators = require('../utils/validators');
var form = require('../el-form');
var util = require('../utils/util');

const radioGroupKey = "RadioGroup";

const useRadio = () => {
  const ELEMENT = util.useGlobalConfig();
  const elForm = vue.inject(form.elFormKey, {});
  const elFormItem = vue.inject(form.elFormItemKey, {});
  const radioGroup = vue.inject(radioGroupKey, {});
  const focus = vue.ref(false);
  const isGroup = vue.computed(() => (radioGroup == null ? void 0 : radioGroup.name) === "ElRadioGroup");
  const elFormItemSize = vue.computed(() => elFormItem.size || ELEMENT.size);
  return {
    isGroup,
    focus,
    radioGroup,
    elForm,
    ELEMENT,
    elFormItemSize
  };
};
const useRadioAttrs = (props, {
  isGroup,
  radioGroup,
  elForm,
  model
}) => {
  const isDisabled = vue.computed(() => {
    return isGroup.value ? radioGroup.disabled || props.disabled || elForm.disabled : props.disabled || elForm.disabled;
  });
  const tabIndex = vue.computed(() => {
    return isDisabled.value || isGroup.value && model.value !== props.label ? -1 : 0;
  });
  return {
    isDisabled,
    tabIndex
  };
};

var script = vue.defineComponent({
  name: "ElRadio",
  componentName: "ElRadio",
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: ""
    },
    label: {
      type: [String, Number, Boolean],
      default: ""
    },
    disabled: Boolean,
    name: {
      type: String,
      default: ""
    },
    border: Boolean,
    size: {
      type: String,
      validator: validators.isValidComponentSize
    }
  },
  emits: [constants.UPDATE_MODEL_EVENT, "change"],
  setup(props, ctx) {
    const {
      isGroup,
      radioGroup,
      elFormItemSize,
      ELEMENT,
      focus,
      elForm
    } = useRadio();
    const radioRef = vue.ref();
    const model = vue.computed({
      get() {
        return isGroup.value ? radioGroup.modelValue : props.modelValue;
      },
      set(val) {
        if (isGroup.value) {
          radioGroup.changeEvent(val);
        } else {
          ctx.emit(constants.UPDATE_MODEL_EVENT, val);
        }
        radioRef.value.checked = props.modelValue === props.label;
      }
    });
    const {
      tabIndex,
      isDisabled
    } = useRadioAttrs(props, {
      isGroup,
      radioGroup,
      elForm,
      model
    });
    const radioSize = vue.computed(() => {
      const temRadioSize = props.size || elFormItemSize.value || ELEMENT.size;
      return isGroup.value ? radioGroup.radioGroupSize || temRadioSize : temRadioSize;
    });
    function handleChange() {
      vue.nextTick(() => {
        ctx.emit("change", model.value);
      });
    }
    return {
      focus,
      isGroup,
      isDisabled,
      model,
      tabIndex,
      radioSize,
      handleChange,
      radioRef
    };
  }
});

const _hoisted_1 = /* @__PURE__ */ vue.createVNode("span", { class: "el-radio__inner" }, null, -1);
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("label", {
    class: ["el-radio", {
      [`el-radio--${_ctx.radioSize || ""}`]: _ctx.border && _ctx.radioSize,
      "is-disabled": _ctx.isDisabled,
      "is-focus": _ctx.focus,
      "is-bordered": _ctx.border,
      "is-checked": _ctx.model === _ctx.label
    }],
    role: "radio",
    "aria-checked": _ctx.model === _ctx.label,
    "aria-disabled": _ctx.isDisabled,
    tabindex: _ctx.tabIndex,
    onKeydown: _cache[6] || (_cache[6] = vue.withKeys(vue.withModifiers(($event) => _ctx.model = _ctx.isDisabled ? _ctx.model : _ctx.label, ["stop", "prevent"]), ["space"]))
  }, [
    vue.createVNode("span", {
      class: ["el-radio__input", {
        "is-disabled": _ctx.isDisabled,
        "is-checked": _ctx.model === _ctx.label
      }]
    }, [
      _hoisted_1,
      vue.withDirectives(vue.createVNode("input", {
        ref: "radioRef",
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.model = $event),
        class: "el-radio__original",
        value: _ctx.label,
        type: "radio",
        "aria-hidden": "true",
        name: _ctx.name,
        disabled: _ctx.isDisabled,
        tabindex: "-1",
        onFocus: _cache[2] || (_cache[2] = ($event) => _ctx.focus = true),
        onBlur: _cache[3] || (_cache[3] = ($event) => _ctx.focus = false),
        onChange: _cache[4] || (_cache[4] = (...args) => _ctx.handleChange && _ctx.handleChange(...args))
      }, null, 40, ["value", "name", "disabled"]), [
        [vue.vModelRadio, _ctx.model]
      ])
    ], 2),
    vue.createVNode("span", {
      class: "el-radio__label",
      onKeydown: _cache[5] || (_cache[5] = vue.withModifiers(() => {
      }, ["stop"]))
    }, [
      vue.renderSlot(_ctx.$slots, "default", {}, () => [
        vue.createTextVNode(vue.toDisplayString(_ctx.label), 1)
      ])
    ], 32)
  ], 42, ["aria-checked", "aria-disabled", "tabindex"]);
}

script.render = render;
script.__file = "packages/radio/src/radio.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Radio = script;

exports.default = _Radio;
