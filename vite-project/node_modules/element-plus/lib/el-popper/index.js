'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var throwError = require('../utils/error');
var core = require('@popperjs/core');
var util = require('../utils/util');
var PopupManager = require('../utils/popup-manager');
var dom = require('../utils/dom');
var vnode = require('../utils/vnode');
var directives = require('../directives');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var throwError__default = /*#__PURE__*/_interopDefaultLegacy(throwError);
var PopupManager__default = /*#__PURE__*/_interopDefaultLegacy(PopupManager);

function buildModifier(props, externalModifiers = []) {
  const {
    arrow,
    arrowOffset,
    offset,
    gpuAcceleration,
    fallbackPlacements
  } = props;
  const modifiers = [
    {
      name: "offset",
      options: {
        offset: [0, offset != null ? offset : 12]
      }
    },
    {
      name: "preventOverflow",
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    },
    {
      name: "flip",
      options: {
        padding: 5,
        fallbackPlacements: fallbackPlacements != null ? fallbackPlacements : []
      }
    },
    {
      name: "computeStyles",
      options: {
        gpuAcceleration,
        adaptive: gpuAcceleration
      }
    }
  ];
  if (arrow) {
    modifiers.push({
      name: "arrow",
      options: {
        element: arrow,
        padding: arrowOffset != null ? arrowOffset : 5
      }
    });
  }
  modifiers.push(...externalModifiers);
  return modifiers;
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
function usePopperOptions(props, state) {
  return vue.computed(() => {
    var _a;
    return __spreadProps(__spreadValues({
      placement: props.placement
    }, props.popperOptions), {
      modifiers: buildModifier({
        arrow: state.arrow.value,
        arrowOffset: props.arrowOffset,
        offset: props.offset,
        gpuAcceleration: props.gpuAcceleration,
        fallbackPlacements: props.fallbackPlacements
      }, (_a = props.popperOptions) == null ? void 0 : _a.modifiers)
    });
  });
}

(function(Effect2) {
  Effect2["DARK"] = "dark";
  Effect2["LIGHT"] = "light";
})(exports.Effect || (exports.Effect = {}));
const DEFAULT_TRIGGER = "hover";
const DEFAULT_FALLBACK_PLACEMENTS = [];
var defaultProps = {
  arrowOffset: {
    type: Number,
    default: 5
  },
  appendToBody: {
    type: Boolean,
    default: true
  },
  autoClose: {
    type: Number,
    default: 0
  },
  boundariesPadding: {
    type: Number,
    default: 0
  },
  content: {
    type: String,
    default: ""
  },
  class: {
    type: String,
    default: ""
  },
  style: Object,
  hideAfter: {
    type: Number,
    default: 200
  },
  cutoff: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  effect: {
    type: String,
    default: exports.Effect.DARK
  },
  enterable: {
    type: Boolean,
    default: true
  },
  manualMode: {
    type: Boolean,
    default: false
  },
  showAfter: {
    type: Number,
    default: 0
  },
  offset: {
    type: Number,
    default: 12
  },
  placement: {
    type: String,
    default: "bottom"
  },
  popperClass: {
    type: String,
    default: ""
  },
  pure: {
    type: Boolean,
    default: false
  },
  popperOptions: {
    type: Object,
    default: () => null
  },
  showArrow: {
    type: Boolean,
    default: true
  },
  strategy: {
    type: String,
    default: "fixed"
  },
  transition: {
    type: String,
    default: "el-fade-in-linear"
  },
  trigger: {
    type: [String, Array],
    default: DEFAULT_TRIGGER
  },
  visible: {
    type: Boolean,
    default: void 0
  },
  stopPopperMouseEvent: {
    type: Boolean,
    default: true
  },
  gpuAcceleration: {
    type: Boolean,
    default: true
  },
  fallbackPlacements: {
    type: Array,
    default: DEFAULT_FALLBACK_PLACEMENTS
  }
};

const UPDATE_VISIBLE_EVENT = "update:visible";
function usePopper(props, { emit }) {
  const arrowRef = vue.ref(null);
  const triggerRef = vue.ref(null);
  const popperRef = vue.ref(null);
  const popperId = `el-popper-${util.generateId()}`;
  let popperInstance = null;
  let showTimer = null;
  let hideTimer = null;
  let triggerFocused = false;
  const isManualMode = () => props.manualMode || props.trigger === "manual";
  const popperStyle = vue.ref({ zIndex: PopupManager__default['default'].nextZIndex() });
  const popperOptions = usePopperOptions(props, {
    arrow: arrowRef
  });
  const state = vue.reactive({
    visible: !!props.visible
  });
  const visibility = vue.computed({
    get() {
      if (props.disabled) {
        return false;
      } else {
        return util.isBool(props.visible) ? props.visible : state.visible;
      }
    },
    set(val) {
      if (isManualMode())
        return;
      util.isBool(props.visible) ? emit(UPDATE_VISIBLE_EVENT, val) : state.visible = val;
    }
  });
  function _show() {
    if (props.autoClose > 0) {
      hideTimer = window.setTimeout(() => {
        _hide();
      }, props.autoClose);
    }
    visibility.value = true;
  }
  function _hide() {
    visibility.value = false;
  }
  function clearTimers() {
    clearTimeout(showTimer);
    clearTimeout(hideTimer);
  }
  const show = () => {
    if (isManualMode() || props.disabled)
      return;
    clearTimers();
    if (props.showAfter === 0) {
      _show();
    } else {
      showTimer = window.setTimeout(() => {
        _show();
      }, props.showAfter);
    }
  };
  const hide = () => {
    if (isManualMode())
      return;
    clearTimers();
    if (props.hideAfter > 0) {
      hideTimer = window.setTimeout(() => {
        close();
      }, props.hideAfter);
    } else {
      close();
    }
  };
  const close = () => {
    _hide();
    if (props.disabled) {
      doDestroy(true);
    }
  };
  function onPopperMouseEnter() {
    if (props.enterable && props.trigger !== "click") {
      clearTimeout(hideTimer);
    }
  }
  function onPopperMouseLeave() {
    const { trigger } = props;
    const shouldPrevent = util.isString(trigger) && (trigger === "click" || trigger === "focus") || trigger.length === 1 && (trigger[0] === "click" || trigger[0] === "focus");
    if (shouldPrevent)
      return;
    hide();
  }
  function initializePopper() {
    if (!util.$(visibility)) {
      return;
    }
    const unwrappedTrigger = util.$(triggerRef);
    const _trigger = util.isHTMLElement(unwrappedTrigger) ? unwrappedTrigger : unwrappedTrigger.$el;
    popperInstance = core.createPopper(_trigger, util.$(popperRef), util.$(popperOptions));
    popperInstance.update();
  }
  function doDestroy(forceDestroy) {
    if (!popperInstance || util.$(visibility) && !forceDestroy)
      return;
    detachPopper();
  }
  function detachPopper() {
    var _a;
    (_a = popperInstance == null ? void 0 : popperInstance.destroy) == null ? void 0 : _a.call(popperInstance);
    popperInstance = null;
  }
  const events = {};
  function update() {
    if (!util.$(visibility)) {
      return;
    }
    if (popperInstance) {
      popperInstance.update();
    } else {
      initializePopper();
    }
  }
  function onVisibilityChange(toState) {
    if (toState) {
      popperStyle.value.zIndex = PopupManager__default['default'].nextZIndex();
      initializePopper();
    }
  }
  if (!isManualMode()) {
    const toggleState = () => {
      if (util.$(visibility)) {
        hide();
      } else {
        show();
      }
    };
    const popperEventsHandler = (e) => {
      e.stopPropagation();
      switch (e.type) {
        case "click": {
          if (triggerFocused) {
            triggerFocused = false;
          } else {
            toggleState();
          }
          break;
        }
        case "mouseenter": {
          show();
          break;
        }
        case "mouseleave": {
          hide();
          break;
        }
        case "focus": {
          triggerFocused = true;
          show();
          break;
        }
        case "blur": {
          triggerFocused = false;
          hide();
          break;
        }
      }
    };
    const triggerEventsMap = {
      click: ["onClick"],
      hover: ["onMouseenter", "onMouseleave"],
      focus: ["onFocus", "onBlur"]
    };
    const mapEvents = (t) => {
      triggerEventsMap[t].forEach((event) => {
        events[event] = popperEventsHandler;
      });
    };
    if (util.isArray(props.trigger)) {
      Object.values(props.trigger).forEach(mapEvents);
    } else {
      mapEvents(props.trigger);
    }
  }
  vue.watch(popperOptions, (val) => {
    if (!popperInstance)
      return;
    popperInstance.setOptions(val);
    popperInstance.update();
  });
  vue.watch(visibility, onVisibilityChange);
  return {
    update,
    doDestroy,
    show,
    hide,
    onPopperMouseEnter,
    onPopperMouseLeave,
    onAfterEnter: () => {
      emit("after-enter");
    },
    onAfterLeave: () => {
      detachPopper();
      emit("after-leave");
    },
    onBeforeEnter: () => {
      emit("before-enter");
    },
    onBeforeLeave: () => {
      emit("before-leave");
    },
    initializePopper,
    isManualMode,
    arrowRef,
    events,
    popperId,
    popperInstance,
    popperRef,
    popperStyle,
    triggerRef,
    visibility
  };
}

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

function renderPopper(props, children) {
  const {
    effect,
    name,
    stopPopperMouseEvent,
    popperClass,
    popperStyle,
    popperRef,
    pure,
    popperId,
    visibility,
    onMouseenter,
    onMouseleave,
    onAfterEnter,
    onAfterLeave,
    onBeforeEnter,
    onBeforeLeave
  } = props;
  const kls = [
    popperClass,
    "el-popper",
    "is-" + effect,
    pure ? "is-pure" : ""
  ];
  const mouseUpAndDown = stopPopperMouseEvent ? dom.stop : NOOP;
  return vue.h(vue.Transition, {
    name,
    "onAfterEnter": onAfterEnter,
    "onAfterLeave": onAfterLeave,
    "onBeforeEnter": onBeforeEnter,
    "onBeforeLeave": onBeforeLeave
  }, {
    default: vue.withCtx(() => [vue.withDirectives(vue.h("div", {
      "aria-hidden": String(!visibility),
      class: kls,
      style: popperStyle != null ? popperStyle : {},
      id: popperId,
      ref: popperRef != null ? popperRef : "popperRef",
      role: "tooltip",
      onMouseenter,
      onMouseleave,
      onClick: dom.stop,
      onMousedown: mouseUpAndDown,
      onMouseup: mouseUpAndDown
    }, children), [[vue.vShow, visibility]])])
  });
}

function renderTrigger(trigger, extraProps) {
  const firstElement = vnode.getFirstValidNode(trigger, 1);
  if (!firstElement)
    throwError__default['default']("renderTrigger", "trigger expects single rooted node");
  return vue.cloneVNode(firstElement, extraProps, true);
}

function renderArrow(showArrow) {
  return showArrow ? vue.h("div", {
    ref: "arrowRef",
    class: "el-popper__arrow",
    "data-popper-arrow": ""
  }, null) : vue.h(vue.Comment, null, "");
}

var __defProp$1 = Object.defineProperty;
var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$1.call(b, prop))
      __defNormalProp$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(b)) {
      if (__propIsEnum$1.call(b, prop))
        __defNormalProp$1(a, prop, b[prop]);
    }
  return a;
};
const compName = "ElPopper";
const UPDATE_VISIBLE_EVENT$1 = "update:visible";
var script = vue.defineComponent({
  name: compName,
  props: defaultProps,
  emits: [UPDATE_VISIBLE_EVENT$1, "after-enter", "after-leave", "before-enter", "before-leave"],
  setup(props, ctx) {
    if (!ctx.slots.trigger) {
      throwError__default['default'](compName, "Trigger must be provided");
    }
    const popperStates = usePopper(props, ctx);
    const forceDestroy = () => popperStates.doDestroy(true);
    vue.onMounted(popperStates.initializePopper);
    vue.onBeforeUnmount(forceDestroy);
    vue.onActivated(popperStates.initializePopper);
    vue.onDeactivated(forceDestroy);
    return popperStates;
  },
  render() {
    var _a;
    const {
      $slots,
      appendToBody,
      class: kls,
      style,
      effect,
      hide,
      onPopperMouseEnter,
      onPopperMouseLeave,
      onAfterEnter,
      onAfterLeave,
      onBeforeEnter,
      onBeforeLeave,
      popperClass,
      popperId,
      popperStyle,
      pure,
      showArrow,
      transition,
      visibility,
      stopPopperMouseEvent
    } = this;
    const isManual = this.isManualMode();
    const arrow = renderArrow(showArrow);
    const popper = renderPopper({
      effect,
      name: transition,
      popperClass,
      popperId,
      popperStyle,
      pure,
      stopPopperMouseEvent,
      onMouseenter: onPopperMouseEnter,
      onMouseleave: onPopperMouseLeave,
      onAfterEnter,
      onAfterLeave,
      onBeforeEnter,
      onBeforeLeave,
      visibility
    }, [
      vue.renderSlot($slots, "default", {}, () => {
        return [vue.toDisplayString(this.content)];
      }),
      arrow
    ]);
    const _t = (_a = $slots.trigger) == null ? void 0 : _a.call($slots);
    const triggerProps = __spreadValues$1({
      "aria-describedby": popperId,
      class: kls,
      style,
      ref: "triggerRef"
    }, this.events);
    const trigger = isManual ? renderTrigger(_t, triggerProps) : vue.withDirectives(renderTrigger(_t, triggerProps), [[directives.ClickOutside, hide]]);
    return vue.h(vue.Fragment, null, [
      trigger,
      vue.h(vue.Teleport, {
        to: "body",
        disabled: !appendToBody
      }, [popper])
    ]);
  }
});

script.__file = "packages/popper/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Popper = script;

exports.default = _Popper;
exports.defaultProps = defaultProps;
exports.renderArrow = renderArrow;
exports.renderPopper = renderPopper;
exports.renderTrigger = renderTrigger;
exports.usePopper = usePopper;
