'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
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
  name: "ElRadioButton",
  props: {
    label: {
      type: [String, Number, Boolean],
      default: ""
    },
    disabled: Boolean,
    name: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const {
      isGroup,
      radioGroup,
      elFormItemSize,
      ELEMENT,
      focus,
      elForm
    } = useRadio();
    const size = vue.computed(() => {
      return radioGroup.radioGroupSize || elFormItemSize.value || ELEMENT.size;
    });
    const value = vue.computed({
      get() {
        return radioGroup.modelValue;
      },
      set(value2) {
        radioGroup.changeEvent(value2);
      }
    });
    const {
      isDisabled,
      tabIndex
    } = useRadioAttrs(props, {
      model: value,
      elForm,
      radioGroup,
      isGroup
    });
    const activeStyle = vue.computed(() => {
      return {
        backgroundColor: radioGroup.fill || "",
        borderColor: radioGroup.fill || "",
        boxShadow: radioGroup.fill ? `-1px 0 0 0 ${radioGroup.fill}` : "",
        color: radioGroup.textColor || ""
      };
    });
    return {
      isGroup,
      size,
      isDisabled,
      tabIndex,
      value,
      focus,
      activeStyle
    };
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("label", {
    class: ["el-radio-button", [
      _ctx.size ? "el-radio-button--" + _ctx.size : "",
      {
        "is-active": _ctx.value === _ctx.label,
        "is-disabled": _ctx.isDisabled,
        "is-focus": _ctx.focus
      }
    ]],
    role: "radio",
    "aria-checked": _ctx.value === _ctx.label,
    "aria-disabled": _ctx.isDisabled,
    tabindex: _ctx.tabIndex,
    onKeydown: _cache[5] || (_cache[5] = vue.withKeys(vue.withModifiers(($event) => _ctx.value = _ctx.isDisabled ? _ctx.value : _ctx.label, ["stop", "prevent"]), ["space"]))
  }, [
    vue.withDirectives(vue.createVNode("input", {
      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.value = $event),
      class: "el-radio-button__orig-radio",
      value: _ctx.label,
      type: "radio",
      name: _ctx.name,
      disabled: _ctx.isDisabled,
      tabindex: "-1",
      onFocus: _cache[2] || (_cache[2] = ($event) => _ctx.focus = true),
      onBlur: _cache[3] || (_cache[3] = ($event) => _ctx.focus = false)
    }, null, 40, ["value", "name", "disabled"]), [
      [vue.vModelRadio, _ctx.value]
    ]),
    vue.createVNode("span", {
      class: "el-radio-button__inner",
      style: _ctx.value === _ctx.label ? _ctx.activeStyle : null,
      onKeydown: _cache[4] || (_cache[4] = vue.withModifiers(() => {
      }, ["stop"]))
    }, [
      vue.renderSlot(_ctx.$slots, "default", {}, () => [
        vue.createTextVNode(vue.toDisplayString(_ctx.label), 1)
      ])
    ], 36)
  ], 42, ["aria-checked", "aria-disabled", "tabindex"]);
}

script.render = render;
script.__file = "packages/radio/src/radio-button.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _RadioButton = script;

exports.default = _RadioButton;
