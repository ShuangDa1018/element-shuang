'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var ElPopper = require('../el-popper');
var constants = require('../utils/constants');
var throwError = require('../utils/error');
var vnode = require('../utils/vnode');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ElPopper__default = /*#__PURE__*/_interopDefaultLegacy(ElPopper);
var throwError__default = /*#__PURE__*/_interopDefaultLegacy(throwError);

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
var Tooltip = vue.defineComponent({
  name: "ElTooltip",
  components: {
    ElPopper: ElPopper__default['default']
  },
  props: __spreadProps(__spreadValues({}, ElPopper.defaultProps), {
    manual: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Boolean,
      validator: (val) => {
        return typeof val === "boolean";
      },
      default: void 0
    },
    openDelay: {
      type: Number,
      default: 0
    },
    visibleArrow: {
      type: Boolean,
      default: true
    },
    tabindex: {
      type: [String, Number],
      default: "0"
    }
  }),
  emits: [constants.UPDATE_MODEL_EVENT],
  setup(props, ctx) {
    if (props.manual && typeof props.modelValue === "undefined") {
      throwError__default['default']("[ElTooltip]", "You need to pass a v-model to el-tooltip when `manual` is true");
    }
    const popper = vue.ref(null);
    const onUpdateVisible = (val) => {
      ctx.emit(constants.UPDATE_MODEL_EVENT, val);
    };
    const updatePopper = () => {
      return popper.value.update();
    };
    return {
      popper,
      onUpdateVisible,
      updatePopper
    };
  },
  render() {
    const {
      $slots,
      content,
      manual,
      openDelay,
      onUpdateVisible,
      showAfter,
      visibleArrow,
      modelValue,
      tabindex
    } = this;
    const throwErrorTip = () => {
      throwError__default['default']("[ElTooltip]", "you need to provide a valid default slot.");
    };
    const popper = vue.h(ElPopper__default['default'], __spreadProps(__spreadValues({}, Object.keys(ElPopper.defaultProps).reduce((result, key) => {
      return __spreadProps(__spreadValues({}, result), { [key]: this[key] });
    }, {})), {
      ref: "popper",
      manualMode: manual,
      showAfter: openDelay || showAfter,
      showArrow: visibleArrow,
      visible: modelValue,
      "onUpdate:visible": onUpdateVisible
    }), {
      default: () => $slots.content ? $slots.content() : content,
      trigger: () => {
        if ($slots.default) {
          const firstVnode = vnode.getFirstValidNode($slots.default(), 1);
          if (!firstVnode)
            throwErrorTip();
          return vue.cloneVNode(firstVnode, { tabindex }, true);
        }
        throwErrorTip();
      }
    });
    return popper;
  }
});

Tooltip.install = (app) => {
  app.component(Tooltip.name, Tooltip);
};
const _Tooltip = Tooltip;

exports.default = _Tooltip;
