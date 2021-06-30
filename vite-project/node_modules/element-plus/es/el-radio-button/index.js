import { inject, ref, computed, defineComponent, openBlock, createBlock, withKeys, withModifiers, withDirectives, createVNode, vModelRadio, renderSlot, createTextVNode, toDisplayString } from 'vue';
import { elFormKey, elFormItemKey } from '../el-form';
import { useGlobalConfig } from '../utils/util';

const radioGroupKey = "RadioGroup";

const useRadio = () => {
  const ELEMENT = useGlobalConfig();
  const elForm = inject(elFormKey, {});
  const elFormItem = inject(elFormItemKey, {});
  const radioGroup = inject(radioGroupKey, {});
  const focus = ref(false);
  const isGroup = computed(() => (radioGroup == null ? void 0 : radioGroup.name) === "ElRadioGroup");
  const elFormItemSize = computed(() => elFormItem.size || ELEMENT.size);
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
  const isDisabled = computed(() => {
    return isGroup.value ? radioGroup.disabled || props.disabled || elForm.disabled : props.disabled || elForm.disabled;
  });
  const tabIndex = computed(() => {
    return isDisabled.value || isGroup.value && model.value !== props.label ? -1 : 0;
  });
  return {
    isDisabled,
    tabIndex
  };
};

var script = defineComponent({
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
    const size = computed(() => {
      return radioGroup.radioGroupSize || elFormItemSize.value || ELEMENT.size;
    });
    const value = computed({
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
    const activeStyle = computed(() => {
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
  return openBlock(), createBlock("label", {
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
    onKeydown: _cache[5] || (_cache[5] = withKeys(withModifiers(($event) => _ctx.value = _ctx.isDisabled ? _ctx.value : _ctx.label, ["stop", "prevent"]), ["space"]))
  }, [
    withDirectives(createVNode("input", {
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
      [vModelRadio, _ctx.value]
    ]),
    createVNode("span", {
      class: "el-radio-button__inner",
      style: _ctx.value === _ctx.label ? _ctx.activeStyle : null,
      onKeydown: _cache[4] || (_cache[4] = withModifiers(() => {
      }, ["stop"]))
    }, [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createTextVNode(toDisplayString(_ctx.label), 1)
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

export default _RadioButton;
