'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var hooks = require('../hooks');
var debounce = require('lodash/debounce');
var directives = require('../directives');
var util = require('../utils/util');
var constants = require('../utils/constants');
var throwError = require('../utils/error');
var ElInput = require('../el-input');
var ElScrollbar = require('../el-scrollbar');
var ElPopper = require('../el-popper');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var debounce__default = /*#__PURE__*/_interopDefaultLegacy(debounce);
var throwError__default = /*#__PURE__*/_interopDefaultLegacy(throwError);
var ElInput__default = /*#__PURE__*/_interopDefaultLegacy(ElInput);
var ElScrollbar__default = /*#__PURE__*/_interopDefaultLegacy(ElScrollbar);
var ElPopper__default = /*#__PURE__*/_interopDefaultLegacy(ElPopper);

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
const NOOP = () => { };

var script = vue.defineComponent({
  name: "ElAutocomplete",
  components: {
    ElPopper: ElPopper__default['default'],
    ElInput: ElInput__default['default'],
    ElScrollbar: ElScrollbar__default['default']
  },
  directives: {
    clickoutside: directives.ClickOutside
  },
  inheritAttrs: false,
  props: {
    valueKey: {
      type: String,
      default: "value"
    },
    modelValue: {
      type: [String, Number],
      default: ""
    },
    debounce: {
      type: Number,
      default: 300
    },
    placement: {
      type: String,
      validator: (val) => {
        return ["top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end"].includes(val);
      },
      default: "bottom-start"
    },
    fetchSuggestions: {
      type: Function,
      default: NOOP
    },
    popperClass: {
      type: String,
      default: ""
    },
    triggerOnFocus: {
      type: Boolean,
      default: true
    },
    selectWhenUnmatched: {
      type: Boolean,
      default: false
    },
    hideLoading: {
      type: Boolean,
      default: false
    },
    popperAppendToBody: {
      type: Boolean,
      default: true
    },
    highlightFirstItem: {
      type: Boolean,
      default: false
    }
  },
  emits: [constants.UPDATE_MODEL_EVENT, "input", "change", "focus", "blur", "clear", "select"],
  setup(props, ctx) {
    const attrs = hooks.useAttrs();
    const suggestions = vue.ref([]);
    const highlightedIndex = vue.ref(-1);
    const dropdownWidth = vue.ref("");
    const activated = vue.ref(false);
    const suggestionDisabled = vue.ref(false);
    const loading = vue.ref(false);
    const inputRef = vue.ref(null);
    const regionRef = vue.ref(null);
    const popper = vue.ref(null);
    const id = vue.computed(() => {
      return `el-autocomplete-${util.generateId()}`;
    });
    const suggestionVisible = vue.computed(() => {
      const isValidData = util.isArray(suggestions.value) && suggestions.value.length > 0;
      return (isValidData || loading.value) && activated.value;
    });
    const suggestionLoading = vue.computed(() => {
      return !props.hideLoading && loading.value;
    });
    const updatePopperPosition = () => {
      vue.nextTick(popper.value.update);
    };
    vue.watch(suggestionVisible, () => {
      dropdownWidth.value = `${inputRef.value.$el.offsetWidth}px`;
    });
    vue.onMounted(() => {
      inputRef.value.inputOrTextarea.setAttribute("role", "textbox");
      inputRef.value.inputOrTextarea.setAttribute("aria-autocomplete", "list");
      inputRef.value.inputOrTextarea.setAttribute("aria-controls", "id");
      inputRef.value.inputOrTextarea.setAttribute("aria-activedescendant", `${id.value}-item-${highlightedIndex.value}`);
      const $ul = regionRef.value.querySelector(".el-autocomplete-suggestion__list");
      $ul.setAttribute("role", "listbox");
      $ul.setAttribute("id", id.value);
    });
    vue.onUpdated(updatePopperPosition);
    const getData = (queryString) => {
      if (suggestionDisabled.value) {
        return;
      }
      loading.value = true;
      updatePopperPosition();
      props.fetchSuggestions(queryString, (suggestionsArg) => {
        loading.value = false;
        if (suggestionDisabled.value) {
          return;
        }
        if (util.isArray(suggestionsArg)) {
          suggestions.value = suggestionsArg;
          highlightedIndex.value = props.highlightFirstItem ? 0 : -1;
        } else {
          throwError__default['default']("ElAutocomplete", "autocomplete suggestions must be an array");
        }
      });
    };
    const debouncedGetData = debounce__default['default'](getData, props.debounce);
    const handleInput = (value) => {
      ctx.emit("input", value);
      ctx.emit(constants.UPDATE_MODEL_EVENT, value);
      suggestionDisabled.value = false;
      if (!props.triggerOnFocus && !value) {
        suggestionDisabled.value = true;
        suggestions.value = [];
        return;
      }
      debouncedGetData(value);
    };
    const handleChange = (value) => {
      ctx.emit("change", value);
    };
    const handleFocus = (e) => {
      activated.value = true;
      ctx.emit("focus", e);
      if (props.triggerOnFocus) {
        debouncedGetData(props.modelValue);
      }
    };
    const handleBlur = (e) => {
      ctx.emit("blur", e);
    };
    const handleClear = () => {
      activated.value = false;
      ctx.emit(constants.UPDATE_MODEL_EVENT, "");
      ctx.emit("clear");
    };
    const handleKeyEnter = () => {
      if (suggestionVisible.value && highlightedIndex.value >= 0 && highlightedIndex.value < suggestions.value.length) {
        select(suggestions.value[highlightedIndex.value]);
      } else if (props.selectWhenUnmatched) {
        ctx.emit("select", { value: props.modelValue });
        vue.nextTick(() => {
          suggestions.value = [];
          highlightedIndex.value = -1;
        });
      }
    };
    const close = () => {
      activated.value = false;
    };
    const focus = () => {
      inputRef.value.focus();
    };
    const select = (item) => {
      ctx.emit("input", item[props.valueKey]);
      ctx.emit(constants.UPDATE_MODEL_EVENT, item[props.valueKey]);
      ctx.emit("select", item);
      vue.nextTick(() => {
        suggestions.value = [];
        highlightedIndex.value = -1;
      });
    };
    const highlight = (index) => {
      if (!suggestionVisible.value || loading.value) {
        return;
      }
      if (index < 0) {
        highlightedIndex.value = -1;
        return;
      }
      if (index >= suggestions.value.length) {
        index = suggestions.value.length - 1;
      }
      const suggestion = regionRef.value.querySelector(".el-autocomplete-suggestion__wrap");
      const suggestionList = suggestion.querySelectorAll(".el-autocomplete-suggestion__list li");
      const highlightItem = suggestionList[index];
      const scrollTop = suggestion.scrollTop;
      const offsetTop = highlightItem.offsetTop;
      if (offsetTop + highlightItem.scrollHeight > scrollTop + suggestion.clientHeight) {
        suggestion.scrollTop += highlightItem.scrollHeight;
      }
      if (offsetTop < scrollTop) {
        suggestion.scrollTop -= highlightItem.scrollHeight;
      }
      highlightedIndex.value = index;
      inputRef.value.inputOrTextarea.setAttribute("aria-activedescendant", `${id.value}-item-${highlightedIndex.value}`);
    };
    return {
      attrs,
      suggestions,
      highlightedIndex,
      dropdownWidth,
      activated,
      suggestionDisabled,
      loading,
      inputRef,
      regionRef,
      popper,
      id,
      suggestionVisible,
      suggestionLoading,
      getData,
      handleInput,
      handleChange,
      handleFocus,
      handleBlur,
      handleClear,
      handleKeyEnter,
      close,
      focus,
      select,
      highlight
    };
  }
});

const _hoisted_1 = { key: 0 };
const _hoisted_2 = /* @__PURE__ */ vue.createVNode("i", { class: "el-icon-loading" }, null, -1);
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = vue.resolveComponent("el-input");
  const _component_el_scrollbar = vue.resolveComponent("el-scrollbar");
  const _component_el_popper = vue.resolveComponent("el-popper");
  const _directive_clickoutside = vue.resolveDirective("clickoutside");
  return vue.openBlock(), vue.createBlock(_component_el_popper, {
    ref: "popper",
    visible: _ctx.suggestionVisible,
    "onUpdate:visible": _cache[3] || (_cache[3] = ($event) => _ctx.suggestionVisible = $event),
    placement: _ctx.placement,
    "popper-class": `el-autocomplete__popper ${_ctx.popperClass}`,
    "append-to-body": _ctx.popperAppendToBody,
    pure: "",
    "manual-mode": "",
    effect: "light",
    trigger: "click",
    transition: "el-zoom-in-top",
    "gpu-acceleration": false
  }, {
    trigger: vue.withCtx(() => [
      vue.withDirectives(vue.createVNode("div", {
        class: ["el-autocomplete", _ctx.$attrs.class],
        style: _ctx.$attrs.style,
        role: "combobox",
        "aria-haspopup": "listbox",
        "aria-expanded": _ctx.suggestionVisible,
        "aria-owns": _ctx.id
      }, [
        vue.createVNode(_component_el_input, vue.mergeProps({ ref: "inputRef" }, _ctx.attrs, {
          "model-value": _ctx.modelValue,
          onInput: _ctx.handleInput,
          onChange: _ctx.handleChange,
          onFocus: _ctx.handleFocus,
          onBlur: _ctx.handleBlur,
          onClear: _ctx.handleClear,
          onKeydown: [
            _cache[1] || (_cache[1] = vue.withKeys(vue.withModifiers(($event) => _ctx.highlight(_ctx.highlightedIndex - 1), ["prevent"]), ["up"])),
            _cache[2] || (_cache[2] = vue.withKeys(vue.withModifiers(($event) => _ctx.highlight(_ctx.highlightedIndex + 1), ["prevent"]), ["down"])),
            vue.withKeys(_ctx.handleKeyEnter, ["enter"]),
            vue.withKeys(_ctx.close, ["tab"])
          ]
        }), vue.createSlots({ _: 2 }, [
          _ctx.$slots.prepend ? {
            name: "prepend",
            fn: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "prepend")
            ])
          } : void 0,
          _ctx.$slots.append ? {
            name: "append",
            fn: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "append")
            ])
          } : void 0,
          _ctx.$slots.prefix ? {
            name: "prefix",
            fn: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "prefix")
            ])
          } : void 0,
          _ctx.$slots.suffix ? {
            name: "suffix",
            fn: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "suffix")
            ])
          } : void 0
        ]), 1040, ["model-value", "onInput", "onChange", "onFocus", "onBlur", "onClear", "onKeydown"])
      ], 14, ["aria-expanded", "aria-owns"]), [
        [_directive_clickoutside, _ctx.close]
      ])
    ]),
    default: vue.withCtx(() => [
      vue.createVNode("div", {
        ref: "regionRef",
        class: ["el-autocomplete-suggestion", _ctx.suggestionLoading && "is-loading"],
        style: { width: _ctx.dropdownWidth, outline: "none" },
        role: "region"
      }, [
        vue.createVNode(_component_el_scrollbar, {
          tag: "ul",
          "wrap-class": "el-autocomplete-suggestion__wrap",
          "view-class": "el-autocomplete-suggestion__list"
        }, {
          default: vue.withCtx(() => [
            _ctx.suggestionLoading ? (vue.openBlock(), vue.createBlock("li", _hoisted_1, [
              _hoisted_2
            ])) : (vue.openBlock(true), vue.createBlock(vue.Fragment, { key: 1 }, vue.renderList(_ctx.suggestions, (item, index) => {
              return vue.openBlock(), vue.createBlock("li", {
                id: `${_ctx.id}-item-${index}`,
                key: index,
                class: { "highlighted": _ctx.highlightedIndex === index },
                role: "option",
                "aria-selected": _ctx.highlightedIndex === index,
                onClick: ($event) => _ctx.select(item)
              }, [
                vue.renderSlot(_ctx.$slots, "default", { item }, () => [
                  vue.createTextVNode(vue.toDisplayString(item[_ctx.valueKey]), 1)
                ])
              ], 10, ["id", "aria-selected", "onClick"]);
            }), 128))
          ]),
          _: 3
        })
      ], 6)
    ]),
    _: 1
  }, 8, ["visible", "placement", "popper-class", "append-to-body"]);
}

script.render = render;
script.__file = "packages/autocomplete/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Autocomplete = script;

exports.default = _Autocomplete;
