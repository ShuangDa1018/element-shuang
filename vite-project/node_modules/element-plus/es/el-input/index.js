import { defineComponent, getCurrentInstance, inject, ref, shallowRef, computed, watch, nextTick, onMounted, onUpdated, openBlock, createBlock, Fragment, createCommentVNode, renderSlot, mergeProps, createVNode, withModifiers, toDisplayString } from 'vue';
import { useAttrs } from '../hooks';
import { UPDATE_MODEL_EVENT, VALIDATE_STATE_MAP } from '../utils/constants';
import { useGlobalConfig, isObject } from '../utils/util';
import isServer from '../utils/isServer';
import { isKorean } from '../utils/isDef';
import { isValidComponentSize } from '../utils/validators';
import { elFormKey, elFormItemKey } from '../el-form';

let hiddenTextarea;
const HIDDEN_STYLE = `
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
`;
const CONTEXT_STYLE = [
  "letter-spacing",
  "line-height",
  "padding-top",
  "padding-bottom",
  "font-family",
  "font-weight",
  "font-size",
  "text-rendering",
  "text-transform",
  "width",
  "text-indent",
  "padding-left",
  "padding-right",
  "border-width",
  "box-sizing"
];
function calculateNodeStyling(targetElement) {
  const style = window.getComputedStyle(targetElement);
  const boxSizing = style.getPropertyValue("box-sizing");
  const paddingSize = parseFloat(style.getPropertyValue("padding-bottom")) + parseFloat(style.getPropertyValue("padding-top"));
  const borderSize = parseFloat(style.getPropertyValue("border-bottom-width")) + parseFloat(style.getPropertyValue("border-top-width"));
  const contextStyle = CONTEXT_STYLE.map((name) => `${name}:${style.getPropertyValue(name)}`).join(";");
  return { contextStyle, paddingSize, borderSize, boxSizing };
}
function calcTextareaHeight(targetElement, minRows = 1, maxRows = null) {
  var _a;
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement("textarea");
    document.body.appendChild(hiddenTextarea);
  }
  const {
    paddingSize,
    borderSize,
    boxSizing,
    contextStyle
  } = calculateNodeStyling(targetElement);
  hiddenTextarea.setAttribute("style", `${contextStyle};${HIDDEN_STYLE}`);
  hiddenTextarea.value = targetElement.value || targetElement.placeholder || "";
  let height = hiddenTextarea.scrollHeight;
  const result = {};
  if (boxSizing === "border-box") {
    height = height + borderSize;
  } else if (boxSizing === "content-box") {
    height = height - paddingSize;
  }
  hiddenTextarea.value = "";
  const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
  if (minRows !== null) {
    let minHeight = singleRowHeight * minRows;
    if (boxSizing === "border-box") {
      minHeight = minHeight + paddingSize + borderSize;
    }
    height = Math.max(minHeight, height);
    result.minHeight = `${minHeight}px`;
  }
  if (maxRows !== null) {
    let maxHeight = singleRowHeight * maxRows;
    if (boxSizing === "border-box") {
      maxHeight = maxHeight + paddingSize + borderSize;
    }
    height = Math.min(maxHeight, height);
  }
  result.height = `${height}px`;
  (_a = hiddenTextarea.parentNode) == null ? void 0 : _a.removeChild(hiddenTextarea);
  hiddenTextarea = null;
  return result;
}

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
const PENDANT_MAP = {
  suffix: "append",
  prefix: "prepend"
};
var script = defineComponent({
  name: "ElInput",
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    size: {
      type: String,
      validator: isValidComponentSize
    },
    resize: {
      type: String,
      validator: (val) => ["none", "both", "horizontal", "vertical"].includes(val)
    },
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    autocomplete: {
      type: String,
      default: "off",
      validator: (val) => ["on", "off"].includes(val)
    },
    placeholder: {
      type: String
    },
    form: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    suffixIcon: {
      type: String,
      default: ""
    },
    prefixIcon: {
      type: String,
      default: ""
    },
    label: {
      type: String
    },
    tabindex: {
      type: [Number, String]
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    inputStyle: {
      type: Object,
      default: () => ({})
    }
  },
  emits: [
    UPDATE_MODEL_EVENT,
    "input",
    "change",
    "focus",
    "blur",
    "clear",
    "mouseleave",
    "mouseenter",
    "keydown"
  ],
  setup(props, ctx) {
    const instance = getCurrentInstance();
    const attrs = useAttrs();
    const $ELEMENT = useGlobalConfig();
    const elForm = inject(elFormKey, {});
    const elFormItem = inject(elFormItemKey, {});
    const input = ref(null);
    const textarea = ref(null);
    const focused = ref(false);
    const hovering = ref(false);
    const isComposing = ref(false);
    const passwordVisible = ref(false);
    const _textareaCalcStyle = shallowRef(props.inputStyle);
    const inputOrTextarea = computed(() => input.value || textarea.value);
    const inputSize = computed(() => props.size || elFormItem.size || $ELEMENT.size);
    const needStatusIcon = computed(() => elForm.statusIcon);
    const validateState = computed(() => elFormItem.validateState || "");
    const validateIcon = computed(() => VALIDATE_STATE_MAP[validateState.value]);
    const computedTextareaStyle = computed(() => __spreadProps(__spreadValues({}, _textareaCalcStyle.value), {
      resize: props.resize
    }));
    const inputDisabled = computed(() => props.disabled || elForm.disabled);
    const nativeInputValue = computed(() => props.modelValue === null || props.modelValue === void 0 ? "" : String(props.modelValue));
    const upperLimit = computed(() => ctx.attrs.maxlength);
    const showClear = computed(() => {
      return props.clearable && !inputDisabled.value && !props.readonly && nativeInputValue.value && (focused.value || hovering.value);
    });
    const showPwdVisible = computed(() => {
      return props.showPassword && !inputDisabled.value && !props.readonly && (!!nativeInputValue.value || focused.value);
    });
    const isWordLimitVisible = computed(() => {
      return props.showWordLimit && ctx.attrs.maxlength && (props.type === "text" || props.type === "textarea") && !inputDisabled.value && !props.readonly && !props.showPassword;
    });
    const textLength = computed(() => {
      return typeof props.modelValue === "number" ? String(props.modelValue).length : (props.modelValue || "").length;
    });
    const inputExceed = computed(() => {
      return isWordLimitVisible.value && textLength.value > upperLimit.value;
    });
    const resizeTextarea = () => {
      const { type, autosize } = props;
      if (isServer || type !== "textarea")
        return;
      if (autosize) {
        const minRows = isObject(autosize) ? autosize.minRows : void 0;
        const maxRows = isObject(autosize) ? autosize.maxRows : void 0;
        _textareaCalcStyle.value = __spreadValues(__spreadValues({}, props.inputStyle), calcTextareaHeight(textarea.value, minRows, maxRows));
      } else {
        _textareaCalcStyle.value = __spreadProps(__spreadValues({}, props.inputStyle), {
          minHeight: calcTextareaHeight(textarea.value).minHeight
        });
      }
    };
    const setNativeInputValue = () => {
      const input2 = inputOrTextarea.value;
      if (!input2 || input2.value === nativeInputValue.value)
        return;
      input2.value = nativeInputValue.value;
    };
    const calcIconOffset = (place) => {
      const { el } = instance.vnode;
      const elList = Array.from(el.querySelectorAll(`.el-input__${place}`));
      const target = elList.find((item) => item.parentNode === el);
      if (!target)
        return;
      const pendant = PENDANT_MAP[place];
      if (ctx.slots[pendant]) {
        target.style.transform = `translateX(${place === "suffix" ? "-" : ""}${el.querySelector(`.el-input-group__${pendant}`).offsetWidth}px)`;
      } else {
        target.removeAttribute("style");
      }
    };
    const updateIconOffset = () => {
      calcIconOffset("prefix");
      calcIconOffset("suffix");
    };
    const handleInput = (event) => {
      const { value } = event.target;
      if (isComposing.value)
        return;
      if (value === nativeInputValue.value)
        return;
      ctx.emit(UPDATE_MODEL_EVENT, value);
      ctx.emit("input", value);
      nextTick(setNativeInputValue);
    };
    const handleChange = (event) => {
      ctx.emit("change", event.target.value);
    };
    const focus = () => {
      nextTick(() => {
        inputOrTextarea.value.focus();
      });
    };
    const blur = () => {
      inputOrTextarea.value.blur();
    };
    const handleFocus = (event) => {
      focused.value = true;
      ctx.emit("focus", event);
    };
    const handleBlur = (event) => {
      var _a;
      focused.value = false;
      ctx.emit("blur", event);
      if (props.validateEvent) {
        (_a = elFormItem.formItemMitt) == null ? void 0 : _a.emit("el.form.blur", [props.modelValue]);
      }
    };
    const select = () => {
      inputOrTextarea.value.select();
    };
    const handleCompositionStart = () => {
      isComposing.value = true;
    };
    const handleCompositionUpdate = (event) => {
      const text = event.target.value;
      const lastCharacter = text[text.length - 1] || "";
      isComposing.value = !isKorean(lastCharacter);
    };
    const handleCompositionEnd = (event) => {
      if (isComposing.value) {
        isComposing.value = false;
        handleInput(event);
      }
    };
    const clear = () => {
      ctx.emit(UPDATE_MODEL_EVENT, "");
      ctx.emit("change", "");
      ctx.emit("clear");
    };
    const handlePasswordVisible = () => {
      passwordVisible.value = !passwordVisible.value;
      focus();
    };
    const getSuffixVisible = () => {
      return ctx.slots.suffix || props.suffixIcon || showClear.value || props.showPassword || isWordLimitVisible.value || validateState.value && needStatusIcon.value;
    };
    watch(() => props.modelValue, (val) => {
      var _a;
      nextTick(resizeTextarea);
      if (props.validateEvent) {
        (_a = elFormItem.formItemMitt) == null ? void 0 : _a.emit("el.form.change", [val]);
      }
    });
    watch(nativeInputValue, () => {
      setNativeInputValue();
    });
    watch(() => props.type, () => {
      nextTick(() => {
        setNativeInputValue();
        resizeTextarea();
        updateIconOffset();
      });
    });
    onMounted(() => {
      setNativeInputValue();
      updateIconOffset();
      nextTick(resizeTextarea);
    });
    onUpdated(() => {
      nextTick(updateIconOffset);
    });
    const onMouseLeave = (e) => {
      hovering.value = false;
      ctx.emit("mouseleave", e);
    };
    const onMouseEnter = (e) => {
      hovering.value = true;
      ctx.emit("mouseenter", e);
    };
    const handleKeydown = (e) => {
      ctx.emit("keydown", e);
    };
    return {
      input,
      textarea,
      attrs,
      inputSize,
      validateState,
      validateIcon,
      computedTextareaStyle,
      resizeTextarea,
      inputDisabled,
      showClear,
      showPwdVisible,
      isWordLimitVisible,
      upperLimit,
      textLength,
      hovering,
      inputExceed,
      passwordVisible,
      inputOrTextarea,
      handleInput,
      handleChange,
      handleFocus,
      handleBlur,
      handleCompositionStart,
      handleCompositionUpdate,
      handleCompositionEnd,
      handlePasswordVisible,
      clear,
      select,
      focus,
      blur,
      getSuffixVisible,
      onMouseLeave,
      onMouseEnter,
      handleKeydown
    };
  }
});

const _hoisted_1 = {
  key: 0,
  class: "el-input-group__prepend"
};
const _hoisted_2 = {
  key: 2,
  class: "el-input__prefix"
};
const _hoisted_3 = {
  key: 3,
  class: "el-input__suffix"
};
const _hoisted_4 = { class: "el-input__suffix-inner" };
const _hoisted_5 = {
  key: 3,
  class: "el-input__count"
};
const _hoisted_6 = { class: "el-input__count-inner" };
const _hoisted_7 = {
  key: 4,
  class: "el-input-group__append"
};
const _hoisted_8 = {
  key: 2,
  class: "el-input__count"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", {
    class: [
      _ctx.type === "textarea" ? "el-textarea" : "el-input",
      _ctx.inputSize ? "el-input--" + _ctx.inputSize : "",
      {
        "is-disabled": _ctx.inputDisabled,
        "is-exceed": _ctx.inputExceed,
        "el-input-group": _ctx.$slots.prepend || _ctx.$slots.append,
        "el-input-group--append": _ctx.$slots.append,
        "el-input-group--prepend": _ctx.$slots.prepend,
        "el-input--prefix": _ctx.$slots.prefix || _ctx.prefixIcon,
        "el-input--suffix": _ctx.$slots.suffix || _ctx.suffixIcon || _ctx.clearable || _ctx.showPassword,
        "el-input--suffix--password-clear": _ctx.clearable && _ctx.showPassword
      },
      _ctx.$attrs.class
    ],
    style: _ctx.$attrs.style,
    onMouseenter: _cache[20] || (_cache[20] = (...args) => _ctx.onMouseEnter && _ctx.onMouseEnter(...args)),
    onMouseleave: _cache[21] || (_cache[21] = (...args) => _ctx.onMouseLeave && _ctx.onMouseLeave(...args))
  }, [
    _ctx.type !== "textarea" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
      createCommentVNode(" \u524D\u7F6E\u5143\u7D20 "),
      _ctx.$slots.prepend ? (openBlock(), createBlock("div", _hoisted_1, [
        renderSlot(_ctx.$slots, "prepend")
      ])) : createCommentVNode("v-if", true),
      _ctx.type !== "textarea" ? (openBlock(), createBlock("input", mergeProps({
        key: 1,
        ref: "input",
        class: "el-input__inner"
      }, _ctx.attrs, {
        type: _ctx.showPassword ? _ctx.passwordVisible ? "text" : "password" : _ctx.type,
        disabled: _ctx.inputDisabled,
        readonly: _ctx.readonly,
        autocomplete: _ctx.autocomplete,
        tabindex: _ctx.tabindex,
        "aria-label": _ctx.label,
        placeholder: _ctx.placeholder,
        style: _ctx.inputStyle,
        onCompositionstart: _cache[1] || (_cache[1] = (...args) => _ctx.handleCompositionStart && _ctx.handleCompositionStart(...args)),
        onCompositionupdate: _cache[2] || (_cache[2] = (...args) => _ctx.handleCompositionUpdate && _ctx.handleCompositionUpdate(...args)),
        onCompositionend: _cache[3] || (_cache[3] = (...args) => _ctx.handleCompositionEnd && _ctx.handleCompositionEnd(...args)),
        onInput: _cache[4] || (_cache[4] = (...args) => _ctx.handleInput && _ctx.handleInput(...args)),
        onFocus: _cache[5] || (_cache[5] = (...args) => _ctx.handleFocus && _ctx.handleFocus(...args)),
        onBlur: _cache[6] || (_cache[6] = (...args) => _ctx.handleBlur && _ctx.handleBlur(...args)),
        onChange: _cache[7] || (_cache[7] = (...args) => _ctx.handleChange && _ctx.handleChange(...args)),
        onKeydown: _cache[8] || (_cache[8] = (...args) => _ctx.handleKeydown && _ctx.handleKeydown(...args))
      }), null, 16, ["type", "disabled", "readonly", "autocomplete", "tabindex", "aria-label", "placeholder"])) : createCommentVNode("v-if", true),
      createCommentVNode(" \u524D\u7F6E\u5185\u5BB9 "),
      _ctx.$slots.prefix || _ctx.prefixIcon ? (openBlock(), createBlock("span", _hoisted_2, [
        renderSlot(_ctx.$slots, "prefix"),
        _ctx.prefixIcon ? (openBlock(), createBlock("i", {
          key: 0,
          class: ["el-input__icon", _ctx.prefixIcon]
        }, null, 2)) : createCommentVNode("v-if", true)
      ])) : createCommentVNode("v-if", true),
      createCommentVNode(" \u540E\u7F6E\u5185\u5BB9 "),
      _ctx.getSuffixVisible() ? (openBlock(), createBlock("span", _hoisted_3, [
        createVNode("span", _hoisted_4, [
          !_ctx.showClear || !_ctx.showPwdVisible || !_ctx.isWordLimitVisible ? (openBlock(), createBlock(Fragment, { key: 0 }, [
            renderSlot(_ctx.$slots, "suffix"),
            _ctx.suffixIcon ? (openBlock(), createBlock("i", {
              key: 0,
              class: ["el-input__icon", _ctx.suffixIcon]
            }, null, 2)) : createCommentVNode("v-if", true)
          ], 64)) : createCommentVNode("v-if", true),
          _ctx.showClear ? (openBlock(), createBlock("i", {
            key: 1,
            class: "el-input__icon el-icon-circle-close el-input__clear",
            onMousedown: _cache[9] || (_cache[9] = withModifiers(() => {
            }, ["prevent"])),
            onClick: _cache[10] || (_cache[10] = (...args) => _ctx.clear && _ctx.clear(...args))
          }, null, 32)) : createCommentVNode("v-if", true),
          _ctx.showPwdVisible ? (openBlock(), createBlock("i", {
            key: 2,
            class: "el-input__icon el-icon-view el-input__clear",
            onClick: _cache[11] || (_cache[11] = (...args) => _ctx.handlePasswordVisible && _ctx.handlePasswordVisible(...args))
          })) : createCommentVNode("v-if", true),
          _ctx.isWordLimitVisible ? (openBlock(), createBlock("span", _hoisted_5, [
            createVNode("span", _hoisted_6, toDisplayString(_ctx.textLength) + "/" + toDisplayString(_ctx.upperLimit), 1)
          ])) : createCommentVNode("v-if", true)
        ]),
        _ctx.validateState ? (openBlock(), createBlock("i", {
          key: 0,
          class: ["el-input__icon", "el-input__validateIcon", _ctx.validateIcon]
        }, null, 2)) : createCommentVNode("v-if", true)
      ])) : createCommentVNode("v-if", true),
      createCommentVNode(" \u540E\u7F6E\u5143\u7D20 "),
      _ctx.$slots.append ? (openBlock(), createBlock("div", _hoisted_7, [
        renderSlot(_ctx.$slots, "append")
      ])) : createCommentVNode("v-if", true)
    ], 64)) : (openBlock(), createBlock("textarea", mergeProps({
      key: 1,
      ref: "textarea",
      class: "el-textarea__inner"
    }, _ctx.attrs, {
      tabindex: _ctx.tabindex,
      disabled: _ctx.inputDisabled,
      readonly: _ctx.readonly,
      autocomplete: _ctx.autocomplete,
      style: _ctx.computedTextareaStyle,
      "aria-label": _ctx.label,
      placeholder: _ctx.placeholder,
      onCompositionstart: _cache[12] || (_cache[12] = (...args) => _ctx.handleCompositionStart && _ctx.handleCompositionStart(...args)),
      onCompositionupdate: _cache[13] || (_cache[13] = (...args) => _ctx.handleCompositionUpdate && _ctx.handleCompositionUpdate(...args)),
      onCompositionend: _cache[14] || (_cache[14] = (...args) => _ctx.handleCompositionEnd && _ctx.handleCompositionEnd(...args)),
      onInput: _cache[15] || (_cache[15] = (...args) => _ctx.handleInput && _ctx.handleInput(...args)),
      onFocus: _cache[16] || (_cache[16] = (...args) => _ctx.handleFocus && _ctx.handleFocus(...args)),
      onBlur: _cache[17] || (_cache[17] = (...args) => _ctx.handleBlur && _ctx.handleBlur(...args)),
      onChange: _cache[18] || (_cache[18] = (...args) => _ctx.handleChange && _ctx.handleChange(...args)),
      onKeydown: _cache[19] || (_cache[19] = (...args) => _ctx.handleKeydown && _ctx.handleKeydown(...args))
    }), "\n    ", 16, ["tabindex", "disabled", "readonly", "autocomplete", "aria-label", "placeholder"])),
    _ctx.isWordLimitVisible && _ctx.type === "textarea" ? (openBlock(), createBlock("span", _hoisted_8, toDisplayString(_ctx.textLength) + "/" + toDisplayString(_ctx.upperLimit), 1)) : createCommentVNode("v-if", true)
  ], 38);
}

script.render = render;
script.__file = "packages/input/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Input = script;

export default _Input;
