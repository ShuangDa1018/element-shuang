'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var util = require('../utils/util');
var dom = require('../utils/dom');
var getScrollBarWidth = require('../utils/scrollbar-width');
var throwError = require('../utils/error');
var aria = require('../utils/aria');
var isServer = require('../utils/isServer');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var getScrollBarWidth__default = /*#__PURE__*/_interopDefaultLegacy(getScrollBarWidth);
var throwError__default = /*#__PURE__*/_interopDefaultLegacy(throwError);
var isServer__default = /*#__PURE__*/_interopDefaultLegacy(isServer);

const DEFAULT_EXCLUDE_KEYS = ["class", "style"];
const LISTENER_PREFIX = /^on[A-Z]/;
var index = (params = {}) => {
  const { excludeListeners = false, excludeKeys = [] } = params;
  const instance = vue.getCurrentInstance();
  const attrs = vue.shallowRef({});
  const allExcludeKeys = excludeKeys.concat(DEFAULT_EXCLUDE_KEYS);
  instance.attrs = vue.reactive(instance.attrs);
  vue.watchEffect(() => {
    const res = util.entries(instance.attrs).reduce((acm, [key, val]) => {
      if (!allExcludeKeys.includes(key) && !(excludeListeners && LISTENER_PREFIX.test(key))) {
        acm[key] = val;
      }
      return acm;
    }, {});
    attrs.value = res;
  });
  return attrs;
};

var index$1 = (el, events) => {
  vue.watch(el, (val) => {
    if (val) {
      events.forEach(({ name, handler }) => {
        dom.on(el.value, name, handler);
      });
    } else {
      events.forEach(({ name, handler }) => {
        dom.off(el.value, name, handler);
      });
    }
  });
};

var index$2 = (trigger) => {
  if (!vue.isRef(trigger)) {
    throwError__default['default']("[useLockScreen]", "You need to pass a ref param to this function");
  }
  let scrollBarWidth = 0;
  let withoutHiddenClass = false;
  let bodyPaddingRight = "0";
  let computedBodyPaddingRight = 0;
  vue.onUnmounted(() => {
    cleanup();
  });
  const cleanup = () => {
    dom.removeClass(document.body, "el-popup-parent--hidden");
    if (withoutHiddenClass) {
      document.body.style.paddingRight = bodyPaddingRight;
    }
  };
  vue.watch(trigger, (val) => {
    if (val) {
      withoutHiddenClass = !dom.hasClass(document.body, "el-popup-parent--hidden");
      if (withoutHiddenClass) {
        bodyPaddingRight = document.body.style.paddingRight;
        computedBodyPaddingRight = parseInt(dom.getStyle(document.body, "paddingRight"), 10);
      }
      scrollBarWidth = getScrollBarWidth__default['default']();
      const bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;
      const bodyOverflowY = dom.getStyle(document.body, "overflowY");
      if (scrollBarWidth > 0 && (bodyHasOverflow || bodyOverflowY === "scroll") && withoutHiddenClass) {
        document.body.style.paddingRight = computedBodyPaddingRight + scrollBarWidth + "px";
      }
      dom.addClass(document.body, "el-popup-parent--hidden");
    } else {
      cleanup();
    }
  });
};

var index$3 = (toggle, initialFocus) => {
  let previousActive;
  vue.watch(() => toggle.value, (val) => {
    var _a, _b;
    if (val) {
      previousActive = document.activeElement;
      if (vue.isRef(initialFocus)) {
        (_b = (_a = initialFocus.value).focus) == null ? void 0 : _b.call(_a);
      }
    } else {
      if (process.env.NODE_ENV === "testing") {
        previousActive.focus.call(previousActive);
      } else {
        previousActive.focus();
      }
    }
  });
};

const modalStack = [];
const closeModal = (e) => {
  if (modalStack.length === 0)
    return;
  if (e.code === aria.EVENT_CODE.esc) {
    e.stopPropagation();
    const topModal = modalStack[modalStack.length - 1];
    topModal.handleClose();
  }
};
var index$4 = (instance, visibleRef) => {
  vue.watch(() => visibleRef.value, (val) => {
    if (val) {
      modalStack.push(instance);
    } else {
      modalStack.splice(modalStack.findIndex((modal) => modal === instance), 1);
    }
  });
};
if (!isServer__default['default']) {
  dom.on(document, "keydown", closeModal);
}

const useMigrating = function() {
  vue.onMounted(() => {
    const instance = vue.getCurrentInstance();
    if (process.env.NODE_ENV === "production")
      return;
    if (!instance.vnode)
      return;
    const { props = {} } = getMigratingConfig();
    const { data } = instance;
    const definedProps = data.attrs || {};
    for (let propName in definedProps) {
      propName = util.kebabCase(propName);
      if (props[propName]) {
        console.warn(`[Element Migrating][${this.$options.name}][Attribute]: ${props[propName]}`);
      }
    }
  });
  const getMigratingConfig = function() {
    return {
      props: {},
      events: {}
    };
  };
  return {
    getMigratingConfig
  };
};

var index$5 = (el) => {
  return {
    focus: () => {
      var _a, _b;
      (_b = (_a = el.value) == null ? void 0 : _a.focus) == null ? void 0 : _b.call(_a);
    }
  };
};

function index$6(loading, throttle = 0) {
  if (throttle === 0)
    return loading;
  const throttled = vue.ref(false);
  let timeoutHandle = 0;
  const dispatchThrottling = () => {
    if (timeoutHandle) {
      clearTimeout(timeoutHandle);
    }
    timeoutHandle = window.setTimeout(() => {
      throttled.value = loading.value;
    }, throttle);
  };
  vue.onMounted(dispatchThrottling);
  vue.watch(() => loading.value, (val) => {
    if (val) {
      dispatchThrottling();
    } else {
      throttled.value = val;
    }
  });
  return throttled;
}

var index$7 = (indicator, evt, cb) => {
  const prevent = (e) => {
    if (cb(e)) {
      e.stopImmediatePropagation();
    }
  };
  vue.watch(() => indicator.value, (val) => {
    if (val) {
      dom.on(document, evt, prevent, true);
    } else {
      dom.off(document, evt, prevent, true);
    }
  }, { immediate: true });
};

exports.useAttrs = index;
exports.useEvents = index$1;
exports.useFocus = index$5;
exports.useLockScreen = index$2;
exports.useMigrating = useMigrating;
exports.useModal = index$4;
exports.usePreventGlobal = index$7;
exports.useRestoreActive = index$3;
exports.useThrottleRender = index$6;
