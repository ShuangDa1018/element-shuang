'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var dom = require('../utils/dom');
var aria = require('../utils/aria');
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
const isArray = Array.isArray;
const isObject = (val) => val !== null && typeof val === 'object';

var script = vue.defineComponent({
  name: "ElRate",
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    lowThreshold: {
      type: Number,
      default: 2
    },
    highThreshold: {
      type: Number,
      default: 4
    },
    max: {
      type: Number,
      default: 5
    },
    colors: {
      type: [Array, Object],
      default: () => ["#F7BA2A", "#F7BA2A", "#F7BA2A"]
    },
    voidColor: {
      type: String,
      default: "#C6D1DE"
    },
    disabledVoidColor: {
      type: String,
      default: "#EFF2F7"
    },
    iconClasses: {
      type: [Array, Object],
      default: () => ["el-icon-star-on", "el-icon-star-on", "el-icon-star-on"]
    },
    voidIconClass: {
      type: String,
      default: "el-icon-star-off"
    },
    disabledVoidIconClass: {
      type: String,
      default: "el-icon-star-on"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    allowHalf: {
      type: Boolean,
      default: false
    },
    showText: {
      type: Boolean,
      default: false
    },
    showScore: {
      type: Boolean,
      default: false
    },
    textColor: {
      type: String,
      default: "#1f2d3d"
    },
    texts: {
      type: Array,
      default: () => ["Extremely bad", "Disappointed", "Fair", "Satisfied", "Surprise"]
    },
    scoreTemplate: {
      type: String,
      default: "{value}"
    }
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const elForm = vue.inject(form.elFormKey, {});
    const currentValue = vue.ref(props.modelValue);
    const rateDisabled = vue.computed(() => props.disabled || elForm.disabled);
    const text = vue.computed(() => {
      let result = "";
      if (props.showScore) {
        result = props.scoreTemplate.replace(/\{\s*value\s*\}/, rateDisabled.value ? `${props.modelValue}` : `${currentValue.value}`);
      } else if (props.showText) {
        result = props.texts[Math.ceil(currentValue.value) - 1];
      }
      return result;
    });
    function getValueFromMap(value, map) {
      const matchedKeys = Object.keys(map).filter((key) => {
        const val = map[key];
        const excluded = isObject(val) ? val.excluded : false;
        return excluded ? value < key : value <= key;
      }).sort((a, b) => a - b);
      const matchedValue = map[matchedKeys[0]];
      return isObject(matchedValue) ? matchedValue.value : matchedValue || "";
    }
    const valueDecimal = vue.computed(() => props.modelValue * 100 - Math.floor(props.modelValue) * 100);
    const colorMap = vue.computed(() => isArray(props.colors) ? {
      [props.lowThreshold]: props.colors[0],
      [props.highThreshold]: { value: props.colors[1], excluded: true },
      [props.max]: props.colors[2]
    } : props.colors);
    const activeColor = vue.computed(() => getValueFromMap(currentValue.value, colorMap.value));
    const decimalStyle = vue.computed(() => {
      let width = "";
      if (rateDisabled.value) {
        width = `${valueDecimal.value}%`;
      } else if (props.allowHalf) {
        width = "50%";
      }
      return {
        color: activeColor.value,
        width
      };
    });
    const classMap = vue.computed(() => isArray(props.iconClasses) ? {
      [props.lowThreshold]: props.iconClasses[0],
      [props.highThreshold]: { value: props.iconClasses[1], excluded: true },
      [props.max]: props.iconClasses[2]
    } : props.iconClasses);
    const decimalIconClass = vue.computed(() => getValueFromMap(props.modelValue, classMap.value));
    const voidClass = vue.computed(() => rateDisabled.value ? props.disabledVoidIconClass : props.voidIconClass);
    const activeClass = vue.computed(() => getValueFromMap(currentValue.value, classMap.value));
    const classes = vue.computed(() => {
      let result = Array(props.max);
      let threshold = currentValue.value;
      result.fill(activeClass.value, 0, threshold);
      result.fill(voidClass.value, threshold, props.max);
      return result;
    });
    const pointerAtLeftHalf = vue.ref(true);
    vue.watch(() => props.modelValue, (val) => {
      currentValue.value = val;
      pointerAtLeftHalf.value = props.modelValue !== Math.floor(props.modelValue);
    });
    function showDecimalIcon(item) {
      let showWhenDisabled = rateDisabled.value && valueDecimal.value > 0 && item - 1 < props.modelValue && item > props.modelValue;
      let showWhenAllowHalf = props.allowHalf && pointerAtLeftHalf.value && item - 0.5 <= currentValue.value && item > currentValue.value;
      return showWhenDisabled || showWhenAllowHalf;
    }
    function getIconStyle(item) {
      const voidColor = rateDisabled.value ? props.disabledVoidColor : props.voidColor;
      return {
        color: item <= currentValue.value ? activeColor.value : voidColor
      };
    }
    function selectValue(value) {
      if (rateDisabled.value) {
        return;
      }
      if (props.allowHalf && pointerAtLeftHalf.value) {
        emit("update:modelValue", currentValue.value);
        if (props.modelValue !== currentValue.value) {
          emit("change", currentValue.value);
        }
      } else {
        emit("update:modelValue", value);
        if (props.modelValue !== value) {
          emit("change", value);
        }
      }
    }
    function handleKey(e) {
      if (rateDisabled.value) {
        return;
      }
      let _currentValue = currentValue.value;
      const code = e.code;
      if (code === aria.EVENT_CODE.up || code === aria.EVENT_CODE.right) {
        if (props.allowHalf) {
          _currentValue += 0.5;
        } else {
          _currentValue += 1;
        }
        e.stopPropagation();
        e.preventDefault();
      } else if (code === aria.EVENT_CODE.left || code === aria.EVENT_CODE.down) {
        if (props.allowHalf) {
          _currentValue -= 0.5;
        } else {
          _currentValue -= 1;
        }
        e.stopPropagation();
        e.preventDefault();
      }
      _currentValue = _currentValue < 0 ? 0 : _currentValue;
      _currentValue = _currentValue > props.max ? props.max : _currentValue;
      emit("update:modelValue", _currentValue);
      emit("change", _currentValue);
      return _currentValue;
    }
    const hoverIndex = vue.ref(-1);
    function setCurrentValue(value, event) {
      if (rateDisabled.value) {
        return;
      }
      if (props.allowHalf) {
        let target = event.target;
        if (dom.hasClass(target, "el-rate__item")) {
          target = target.querySelector(".el-rate__icon");
        }
        if (dom.hasClass(target, "el-rate__decimal")) {
          target = target.parentNode;
        }
        pointerAtLeftHalf.value = event.offsetX * 2 <= target.clientWidth;
        currentValue.value = pointerAtLeftHalf.value ? value - 0.5 : value;
      } else {
        currentValue.value = value;
      }
      hoverIndex.value = value;
    }
    function resetCurrentValue() {
      if (rateDisabled.value) {
        return;
      }
      if (props.allowHalf) {
        pointerAtLeftHalf.value = props.modelValue !== Math.floor(props.modelValue);
      }
      currentValue.value = props.modelValue;
      hoverIndex.value = -1;
    }
    if (!props.modelValue) {
      emit("update:modelValue", 0);
    }
    return {
      hoverIndex,
      currentValue,
      rateDisabled,
      text,
      decimalStyle,
      decimalIconClass,
      classes,
      showDecimalIcon,
      getIconStyle,
      selectValue,
      handleKey,
      setCurrentValue,
      resetCurrentValue
    };
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("div", {
    class: "el-rate",
    role: "slider",
    "aria-valuenow": _ctx.currentValue,
    "aria-valuetext": _ctx.text,
    "aria-valuemin": "0",
    "aria-valuemax": _ctx.max,
    tabindex: "0",
    onKeydown: _cache[2] || (_cache[2] = (...args) => _ctx.handleKey && _ctx.handleKey(...args))
  }, [
    (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.max, (item, key) => {
      return vue.openBlock(), vue.createBlock("span", {
        key,
        class: "el-rate__item",
        style: { cursor: _ctx.rateDisabled ? "auto" : "pointer" },
        onMousemove: ($event) => _ctx.setCurrentValue(item, $event),
        onMouseleave: _cache[1] || (_cache[1] = (...args) => _ctx.resetCurrentValue && _ctx.resetCurrentValue(...args)),
        onClick: ($event) => _ctx.selectValue(item)
      }, [
        vue.createVNode("i", {
          class: [[_ctx.classes[item - 1], { "hover": _ctx.hoverIndex === item }], "el-rate__icon"],
          style: _ctx.getIconStyle(item)
        }, [
          _ctx.showDecimalIcon(item) ? (vue.openBlock(), vue.createBlock("i", {
            key: 0,
            class: [_ctx.decimalIconClass, "el-rate__decimal"],
            style: _ctx.decimalStyle
          }, null, 6)) : vue.createCommentVNode("v-if", true)
        ], 6)
      ], 44, ["onMousemove", "onClick"]);
    }), 128)),
    _ctx.showText || _ctx.showScore ? (vue.openBlock(), vue.createBlock("span", {
      key: 0,
      class: "el-rate__text",
      style: { color: _ctx.textColor }
    }, vue.toDisplayString(_ctx.text), 5)) : vue.createCommentVNode("v-if", true)
  ], 40, ["aria-valuenow", "aria-valuetext", "aria-valuemax"]);
}

script.render = render;
script.__file = "packages/rate/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Rate = script;

exports.default = _Rate;
