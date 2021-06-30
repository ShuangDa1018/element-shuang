import { defineComponent, ref, h, cloneVNode } from 'vue';
import ElPopper, { defaultProps } from '../el-popper';
import { UPDATE_MODEL_EVENT } from '../utils/constants';
import throwError from '../utils/error';
import { getFirstValidNode } from '../utils/vnode';

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
var Tooltip = defineComponent({
  name: "ElTooltip",
  components: {
    ElPopper
  },
  props: __spreadProps(__spreadValues({}, defaultProps), {
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
  emits: [UPDATE_MODEL_EVENT],
  setup(props, ctx) {
    if (props.manual && typeof props.modelValue === "undefined") {
      throwError("[ElTooltip]", "You need to pass a v-model to el-tooltip when `manual` is true");
    }
    const popper = ref(null);
    const onUpdateVisible = (val) => {
      ctx.emit(UPDATE_MODEL_EVENT, val);
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
      throwError("[ElTooltip]", "you need to provide a valid default slot.");
    };
    const popper = h(ElPopper, __spreadProps(__spreadValues({}, Object.keys(defaultProps).reduce((result, key) => {
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
          const firstVnode = getFirstValidNode($slots.default(), 1);
          if (!firstVnode)
            throwErrorTip();
          return cloneVNode(firstVnode, { tabindex }, true);
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

export default _Tooltip;
