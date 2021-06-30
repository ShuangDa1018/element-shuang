import { computed, watch, defineComponent, reactive, toRefs, resolveComponent, openBlock, createBlock, createVNode, withCtx, createTextVNode, toDisplayString, createCommentVNode, withDirectives, Fragment, renderList, vShow, renderSlot, inject, ref, h } from 'vue';
import { t } from '../locale';
import ElButton from '../el-button';
import ElCheckbox from '../el-checkbox';
import ElCheckboxGroup from '../el-checkbox-group';
import ElInput from '../el-input';
import { UPDATE_MODEL_EVENT as UPDATE_MODEL_EVENT$1 } from '../utils/constants';
import { elFormItemKey } from '../el-form';

const CHECKED_CHANGE_EVENT = "checked-change";
const useCheck = (props, panelState, emit) => {
  const labelProp = computed(() => props.props.label || "label");
  const keyProp = computed(() => props.props.key || "key");
  const disabledProp = computed(() => props.props.disabled || "disabled");
  const filteredData = computed(() => {
    return props.data.filter((item) => {
      if (typeof props.filterMethod === "function") {
        return props.filterMethod(panelState.query, item);
      } else {
        const label = item[labelProp.value] || item[keyProp.value].toString();
        return label.toLowerCase().includes(panelState.query.toLowerCase());
      }
    });
  });
  const checkableData = computed(() => {
    return filteredData.value.filter((item) => !item[disabledProp.value]);
  });
  const checkedSummary = computed(() => {
    const checkedLength = panelState.checked.length;
    const dataLength = props.data.length;
    const { noChecked, hasChecked } = props.format;
    if (noChecked && hasChecked) {
      return checkedLength > 0 ? hasChecked.replace(/\${checked}/g, checkedLength.toString()).replace(/\${total}/g, dataLength.toString()) : noChecked.replace(/\${total}/g, dataLength.toString());
    } else {
      return `${checkedLength}/${dataLength}`;
    }
  });
  const isIndeterminate = computed(() => {
    const checkedLength = panelState.checked.length;
    return checkedLength > 0 && checkedLength < checkableData.value.length;
  });
  const updateAllChecked = () => {
    const checkableDataKeys = checkableData.value.map((item) => item[keyProp.value]);
    panelState.allChecked = checkableDataKeys.length > 0 && checkableDataKeys.every((item) => panelState.checked.includes(item));
  };
  const handleAllCheckedChange = (value) => {
    panelState.checked = value ? checkableData.value.map((item) => item[keyProp.value]) : [];
  };
  watch(() => panelState.checked, (val, oldVal) => {
    updateAllChecked();
    if (panelState.checkChangeByUser) {
      const movedKeys = val.concat(oldVal).filter((v) => !val.includes(v) || !oldVal.includes(v));
      emit(CHECKED_CHANGE_EVENT, val, movedKeys);
    } else {
      emit(CHECKED_CHANGE_EVENT, val);
      panelState.checkChangeByUser = true;
    }
  });
  watch(checkableData, () => {
    updateAllChecked();
  });
  watch(() => props.data, () => {
    const checked = [];
    const filteredDataKeys = filteredData.value.map((item) => item[keyProp.value]);
    panelState.checked.forEach((item) => {
      if (filteredDataKeys.includes(item)) {
        checked.push(item);
      }
    });
    panelState.checkChangeByUser = false;
    panelState.checked = checked;
  });
  watch(() => props.defaultChecked, (val, oldVal) => {
    if (oldVal && val.length === oldVal.length && val.every((item) => oldVal.includes(item)))
      return;
    const checked = [];
    const checkableDataKeys = checkableData.value.map((item) => item[keyProp.value]);
    val.forEach((item) => {
      if (checkableDataKeys.includes(item)) {
        checked.push(item);
      }
    });
    panelState.checkChangeByUser = false;
    panelState.checked = checked;
  }, {
    immediate: true
  });
  return {
    labelProp,
    keyProp,
    disabledProp,
    filteredData,
    checkableData,
    checkedSummary,
    isIndeterminate,
    updateAllChecked,
    handleAllCheckedChange
  };
};

var script = defineComponent({
  name: "ElTransferPanel",
  components: {
    ElCheckboxGroup,
    ElCheckbox,
    ElInput,
    OptionContent: ({ option }) => option
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    optionRender: Function,
    placeholder: String,
    title: String,
    filterable: Boolean,
    format: Object,
    filterMethod: Function,
    defaultChecked: Array,
    props: Object
  },
  emits: [CHECKED_CHANGE_EVENT],
  setup(props, { emit, slots }) {
    const panelState = reactive({
      checked: [],
      allChecked: false,
      query: "",
      inputHover: false,
      checkChangeByUser: true
    });
    const {
      labelProp,
      keyProp,
      disabledProp,
      filteredData,
      checkedSummary,
      isIndeterminate,
      handleAllCheckedChange
    } = useCheck(props, panelState, emit);
    const hasNoMatch = computed(() => {
      return panelState.query.length > 0 && filteredData.value.length === 0;
    });
    const inputIcon = computed(() => {
      return panelState.query.length > 0 && panelState.inputHover ? "circle-close" : "search";
    });
    const hasFooter = computed(() => !!slots.default()[0].children.length);
    const clearQuery = () => {
      if (inputIcon.value === "circle-close") {
        panelState.query = "";
      }
    };
    const {
      checked,
      allChecked,
      query,
      inputHover,
      checkChangeByUser
    } = toRefs(panelState);
    return {
      labelProp,
      keyProp,
      disabledProp,
      filteredData,
      checkedSummary,
      isIndeterminate,
      handleAllCheckedChange,
      checked,
      allChecked,
      query,
      inputHover,
      checkChangeByUser,
      hasNoMatch,
      inputIcon,
      hasFooter,
      clearQuery,
      t
    };
  }
});

const _hoisted_1 = { class: "el-transfer-panel" };
const _hoisted_2 = { class: "el-transfer-panel__header" };
const _hoisted_3 = {
  key: 0,
  class: "el-transfer-panel__footer"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_checkbox = resolveComponent("el-checkbox");
  const _component_el_input = resolveComponent("el-input");
  const _component_option_content = resolveComponent("option-content");
  const _component_el_checkbox_group = resolveComponent("el-checkbox-group");
  return openBlock(), createBlock("div", _hoisted_1, [
    createVNode("p", _hoisted_2, [
      createVNode(_component_el_checkbox, {
        modelValue: _ctx.allChecked,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.allChecked = $event),
        indeterminate: _ctx.isIndeterminate,
        onChange: _ctx.handleAllCheckedChange
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(_ctx.title) + " ", 1),
          createVNode("span", null, toDisplayString(_ctx.checkedSummary), 1)
        ]),
        _: 1
      }, 8, ["modelValue", "indeterminate", "onChange"])
    ]),
    createVNode("div", {
      class: ["el-transfer-panel__body", _ctx.hasFooter ? "is-with-footer" : ""]
    }, [
      _ctx.filterable ? (openBlock(), createBlock(_component_el_input, {
        key: 0,
        modelValue: _ctx.query,
        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.query = $event),
        class: "el-transfer-panel__filter",
        size: "small",
        placeholder: _ctx.placeholder,
        onMouseenter: _cache[4] || (_cache[4] = ($event) => _ctx.inputHover = true),
        onMouseleave: _cache[5] || (_cache[5] = ($event) => _ctx.inputHover = false)
      }, {
        prefix: withCtx(() => [
          createVNode("i", {
            class: ["el-input__icon", "el-icon-" + _ctx.inputIcon],
            onClick: _cache[2] || (_cache[2] = (...args) => _ctx.clearQuery && _ctx.clearQuery(...args))
          }, null, 2)
        ]),
        _: 1
      }, 8, ["modelValue", "placeholder"])) : createCommentVNode("v-if", true),
      withDirectives(createVNode(_component_el_checkbox_group, {
        modelValue: _ctx.checked,
        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => _ctx.checked = $event),
        class: [{ "is-filterable": _ctx.filterable }, "el-transfer-panel__list"]
      }, {
        default: withCtx(() => [
          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.filteredData, (item) => {
            return openBlock(), createBlock(_component_el_checkbox, {
              key: item[_ctx.keyProp],
              class: "el-transfer-panel__item",
              label: item[_ctx.keyProp],
              disabled: item[_ctx.disabledProp]
            }, {
              default: withCtx(() => [
                createVNode(_component_option_content, {
                  option: _ctx.optionRender(item)
                }, null, 8, ["option"])
              ]),
              _: 2
            }, 1032, ["label", "disabled"]);
          }), 128))
        ]),
        _: 1
      }, 8, ["modelValue", "class"]), [
        [vShow, !_ctx.hasNoMatch && _ctx.data.length > 0]
      ]),
      withDirectives(createVNode("p", { class: "el-transfer-panel__empty" }, toDisplayString(_ctx.hasNoMatch ? _ctx.t("el.transfer.noMatch") : _ctx.t("el.transfer.noData")), 513), [
        [vShow, _ctx.hasNoMatch || _ctx.data.length === 0]
      ])
    ], 2),
    _ctx.hasFooter ? (openBlock(), createBlock("p", _hoisted_3, [
      renderSlot(_ctx.$slots, "default")
    ])) : createCommentVNode("v-if", true)
  ]);
}

script.render = render;
script.__file = "packages/transfer/src/transfer-panel.vue";

const useComputedData = (props) => {
  const propsKey = computed(() => props.props.key);
  const dataObj = computed(() => {
    return props.data.reduce((o, cur) => (o[cur[propsKey.value]] = cur) && o, {});
  });
  const sourceData = computed(() => {
    return props.data.filter((item) => !props.modelValue.includes(item[propsKey.value]));
  });
  const targetData = computed(() => {
    if (props.targetOrder === "original") {
      return props.data.filter((item) => props.modelValue.includes(item[propsKey.value]));
    } else {
      return props.modelValue.reduce((arr, cur) => {
        const val = dataObj.value[cur];
        if (val) {
          arr.push(val);
        }
        return arr;
      }, []);
    }
  });
  return {
    propsKey,
    sourceData,
    targetData
  };
};

const LEFT_CHECK_CHANGE_EVENT = "left-check-change";
const RIGHT_CHECK_CHANGE_EVENT = "right-check-change";
const useCheckedChange = (checkedState, emit) => {
  const onSourceCheckedChange = (val, movedKeys) => {
    checkedState.leftChecked = val;
    if (movedKeys === void 0)
      return;
    emit(LEFT_CHECK_CHANGE_EVENT, val, movedKeys);
  };
  const onTargetCheckedChange = (val, movedKeys) => {
    checkedState.rightChecked = val;
    if (movedKeys === void 0)
      return;
    emit(RIGHT_CHECK_CHANGE_EVENT, val, movedKeys);
  };
  return {
    onSourceCheckedChange,
    onTargetCheckedChange
  };
};

const UPDATE_MODEL_EVENT = "update:modelValue";

const useMove = (props, checkedState, propsKey, emit) => {
  const _emit = (value, type, checked) => {
    emit(UPDATE_MODEL_EVENT, value);
    emit(CHANGE_EVENT, value, type, checked);
  };
  const addToLeft = () => {
    const currentValue = props.modelValue.slice();
    checkedState.rightChecked.forEach((item) => {
      const index = currentValue.indexOf(item);
      if (index > -1) {
        currentValue.splice(index, 1);
      }
    });
    _emit(currentValue, "left", checkedState.rightChecked);
  };
  const addToRight = () => {
    let currentValue = props.modelValue.slice();
    const itemsToBeMoved = props.data.filter((item) => {
      const itemKey = item[propsKey.value];
      return checkedState.leftChecked.includes(itemKey) && !props.modelValue.includes(itemKey);
    }).map((item) => item[propsKey.value]);
    currentValue = props.targetOrder === "unshift" ? itemsToBeMoved.concat(currentValue) : currentValue.concat(itemsToBeMoved);
    _emit(currentValue, "right", checkedState.leftChecked);
  };
  return {
    addToLeft,
    addToRight
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
const CHANGE_EVENT = "change";
var script$1 = defineComponent({
  name: "ElTransfer",
  components: {
    TransferPanel: script,
    ElButton
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    titles: {
      type: Array,
      default: () => []
    },
    buttonTexts: {
      type: Array,
      default: () => []
    },
    filterPlaceholder: {
      type: String,
      default: ""
    },
    filterMethod: Function,
    leftDefaultChecked: {
      type: Array,
      default: () => []
    },
    rightDefaultChecked: {
      type: Array,
      default: () => []
    },
    renderContent: Function,
    modelValue: {
      type: Array,
      default: () => []
    },
    format: {
      type: Object,
      default: () => ({})
    },
    filterable: {
      type: Boolean,
      default: false
    },
    props: {
      type: Object,
      default: () => ({
        label: "label",
        key: "key",
        disabled: "disabled"
      })
    },
    targetOrder: {
      type: String,
      default: "original",
      validator: (val) => {
        return ["original", "push", "unshift"].includes(val);
      }
    }
  },
  emits: [
    UPDATE_MODEL_EVENT$1,
    CHANGE_EVENT,
    LEFT_CHECK_CHANGE_EVENT,
    RIGHT_CHECK_CHANGE_EVENT
  ],
  setup(props, { emit, slots }) {
    const elFormItem = inject(elFormItemKey, {});
    const checkedState = reactive({
      leftChecked: [],
      rightChecked: []
    });
    const {
      propsKey,
      sourceData,
      targetData
    } = useComputedData(props);
    const {
      onSourceCheckedChange,
      onTargetCheckedChange
    } = useCheckedChange(checkedState, emit);
    const {
      addToLeft,
      addToRight
    } = useMove(props, checkedState, propsKey, emit);
    const leftPanel = ref(null);
    const rightPanel = ref(null);
    const clearQuery = (which) => {
      if (which === "left") {
        leftPanel.value.query = "";
      } else if (which === "right") {
        rightPanel.value.query = "";
      }
    };
    const hasButtonTexts = computed(() => props.buttonTexts.length === 2);
    const leftPanelTitle = computed(() => props.titles[0] || t("el.transfer.titles.0"));
    const rightPanelTitle = computed(() => props.titles[1] || t("el.transfer.titles.1"));
    const panelFilterPlaceholder = computed(() => props.filterPlaceholder || t("el.transfer.filterPlaceholder"));
    watch(() => props.modelValue, (val) => {
      var _a;
      (_a = elFormItem.formItemMitt) == null ? void 0 : _a.emit("el.form.change", val);
    });
    const optionRender = computed(() => (option) => {
      if (props.renderContent)
        return props.renderContent(h, option);
      if (slots.default)
        return slots.default({ option });
      return h("span", option[props.props.label] || option[props.props.key]);
    });
    return __spreadProps(__spreadValues({
      sourceData,
      targetData,
      onSourceCheckedChange,
      onTargetCheckedChange,
      addToLeft,
      addToRight
    }, toRefs(checkedState)), {
      hasButtonTexts,
      leftPanelTitle,
      rightPanelTitle,
      panelFilterPlaceholder,
      clearQuery,
      optionRender
    });
  }
});

const _hoisted_1$1 = { class: "el-transfer" };
const _hoisted_2$1 = { class: "el-transfer__buttons" };
const _hoisted_3$1 = /* @__PURE__ */ createVNode("i", { class: "el-icon-arrow-left" }, null, -1);
const _hoisted_4 = { key: 0 };
const _hoisted_5 = { key: 0 };
const _hoisted_6 = /* @__PURE__ */ createVNode("i", { class: "el-icon-arrow-right" }, null, -1);
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_transfer_panel = resolveComponent("transfer-panel");
  const _component_el_button = resolveComponent("el-button");
  return openBlock(), createBlock("div", _hoisted_1$1, [
    createVNode(_component_transfer_panel, {
      ref: "leftPanel",
      data: _ctx.sourceData,
      "option-render": _ctx.optionRender,
      placeholder: _ctx.panelFilterPlaceholder,
      title: _ctx.leftPanelTitle,
      filterable: _ctx.filterable,
      format: _ctx.format,
      "filter-method": _ctx.filterMethod,
      "default-checked": _ctx.leftDefaultChecked,
      props: _ctx.props,
      onCheckedChange: _ctx.onSourceCheckedChange
    }, {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "left-footer")
      ]),
      _: 3
    }, 8, ["data", "option-render", "placeholder", "title", "filterable", "format", "filter-method", "default-checked", "props", "onCheckedChange"]),
    createVNode("div", _hoisted_2$1, [
      createVNode(_component_el_button, {
        type: "primary",
        class: ["el-transfer__button", _ctx.hasButtonTexts ? "is-with-texts" : ""],
        disabled: _ctx.rightChecked.length === 0,
        onClick: _ctx.addToLeft
      }, {
        default: withCtx(() => [
          _hoisted_3$1,
          _ctx.buttonTexts[0] !== void 0 ? (openBlock(), createBlock("span", _hoisted_4, toDisplayString(_ctx.buttonTexts[0]), 1)) : createCommentVNode("v-if", true)
        ]),
        _: 1
      }, 8, ["class", "disabled", "onClick"]),
      createVNode(_component_el_button, {
        type: "primary",
        class: ["el-transfer__button", _ctx.hasButtonTexts ? "is-with-texts" : ""],
        disabled: _ctx.leftChecked.length === 0,
        onClick: _ctx.addToRight
      }, {
        default: withCtx(() => [
          _ctx.buttonTexts[1] !== void 0 ? (openBlock(), createBlock("span", _hoisted_5, toDisplayString(_ctx.buttonTexts[1]), 1)) : createCommentVNode("v-if", true),
          _hoisted_6
        ]),
        _: 1
      }, 8, ["class", "disabled", "onClick"])
    ]),
    createVNode(_component_transfer_panel, {
      ref: "rightPanel",
      data: _ctx.targetData,
      "option-render": _ctx.optionRender,
      placeholder: _ctx.panelFilterPlaceholder,
      filterable: _ctx.filterable,
      format: _ctx.format,
      "filter-method": _ctx.filterMethod,
      title: _ctx.rightPanelTitle,
      "default-checked": _ctx.rightDefaultChecked,
      props: _ctx.props,
      onCheckedChange: _ctx.onTargetCheckedChange
    }, {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "right-footer")
      ]),
      _: 3
    }, 8, ["data", "option-render", "placeholder", "filterable", "format", "filter-method", "title", "default-checked", "props", "onCheckedChange"])
  ]);
}

script$1.render = render$1;
script$1.__file = "packages/transfer/src/index.vue";

script$1.install = (app) => {
  app.component(script$1.name, script$1);
};
const _Transfer = script$1;

export default _Transfer;
