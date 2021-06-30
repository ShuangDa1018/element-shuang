import { inject, ref, computed, defineComponent, nextTick, openBlock, createBlock, withKeys, withModifiers, createVNode, withDirectives, vModelRadio, renderSlot, createTextVNode, toDisplayString } from 'vue';
import { UPDATE_MODEL_EVENT } from '../utils/constants';
import { isValidComponentSize } from '../utils/validators';
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
      validator: isValidComponentSize
    }
  },
  emits: [UPDATE_MODEL_EVENT, "change"],
  setup(props, ctx) {
    const {
      isGroup,
      radioGroup,
      elFormItemSize,
      ELEMENT,
      focus,
      elForm
    } = useRadio();
    const radioRef = ref();
    const model = computed({
      get() {
        return isGroup.value ? radioGroup.modelValue : props.modelValue;
      },
      set(val) {
        if (isGroup.value) {
          radioGroup.changeEvent(val);
        } else {
          ctx.emit(UPDATE_MODEL_EVENT, val);
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
    const radioSize = computed(() => {
      const temRadioSize = props.size || elFormItemSize.value || ELEMENT.size;
      return isGroup.value ? radioGroup.radioGroupSize || temRadioSize : temRadioSize;
    });
    function handleChange() {
      nextTick(() => {
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

const _hoisted_1 = /* @__PURE__ */ createVNode("span", { class: "el-radio__inner" }, null, -1);
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("label", {
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
    onKeydown: _cache[6] || (_cache[6] = withKeys(withModifiers(($event) => _ctx.model = _ctx.isDisabled ? _ctx.model : _ctx.label, ["stop", "prevent"]), ["space"]))
  }, [
    createVNode("span", {
      class: ["el-radio__input", {
        "is-disabled": _ctx.isDisabled,
        "is-checked": _ctx.model === _ctx.label
      }]
    }, [
      _hoisted_1,
      withDirectives(createVNode("input", {
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
        [vModelRadio, _ctx.model]
      ])
    ], 2),
    createVNode("span", {
      class: "el-radio__label",
      onKeydown: _cache[5] || (_cache[5] = withModifiers(() => {
      }, ["stop"]))
    }, [
      renderSlot(_ctx.$slots, "default", {}, () => [
        createTextVNode(toDisplayString(_ctx.label), 1)
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

export default _Radio;
