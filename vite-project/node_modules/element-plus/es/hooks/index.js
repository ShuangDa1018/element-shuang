import { getCurrentInstance, shallowRef, reactive, watchEffect, watch, isRef, onUnmounted, onMounted, ref } from 'vue';
import { entries, kebabCase } from '../utils/util';
import { on, off, removeClass, hasClass, getStyle, addClass } from '../utils/dom';
import getScrollBarWidth from '../utils/scrollbar-width';
import throwError from '../utils/error';
import { EVENT_CODE } from '../utils/aria';
import isServer from '../utils/isServer';

const DEFAULT_EXCLUDE_KEYS = ["class", "style"];
const LISTENER_PREFIX = /^on[A-Z]/;
var index = (params = {}) => {
  const { excludeListeners = false, excludeKeys = [] } = params;
  const instance = getCurrentInstance();
  const attrs = shallowRef({});
  const allExcludeKeys = excludeKeys.concat(DEFAULT_EXCLUDE_KEYS);
  instance.attrs = reactive(instance.attrs);
  watchEffect(() => {
    const res = entries(instance.attrs).reduce((acm, [key, val]) => {
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
  watch(el, (val) => {
    if (val) {
      events.forEach(({ name, handler }) => {
        on(el.value, name, handler);
      });
    } else {
      events.forEach(({ name, handler }) => {
        off(el.value, name, handler);
      });
    }
  });
};

var index$2 = (trigger) => {
  if (!isRef(trigger)) {
    throwError("[useLockScreen]", "You need to pass a ref param to this function");
  }
  let scrollBarWidth = 0;
  let withoutHiddenClass = false;
  let bodyPaddingRight = "0";
  let computedBodyPaddingRight = 0;
  onUnmounted(() => {
    cleanup();
  });
  const cleanup = () => {
    removeClass(document.body, "el-popup-parent--hidden");
    if (withoutHiddenClass) {
      document.body.style.paddingRight = bodyPaddingRight;
    }
  };
  watch(trigger, (val) => {
    if (val) {
      withoutHiddenClass = !hasClass(document.body, "el-popup-parent--hidden");
      if (withoutHiddenClass) {
        bodyPaddingRight = document.body.style.paddingRight;
        computedBodyPaddingRight = parseInt(getStyle(document.body, "paddingRight"), 10);
      }
      scrollBarWidth = getScrollBarWidth();
      const bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;
      const bodyOverflowY = getStyle(document.body, "overflowY");
      if (scrollBarWidth > 0 && (bodyHasOverflow || bodyOverflowY === "scroll") && withoutHiddenClass) {
        document.body.style.paddingRight = computedBodyPaddingRight + scrollBarWidth + "px";
      }
      addClass(document.body, "el-popup-parent--hidden");
    } else {
      cleanup();
    }
  });
};

var index$3 = (toggle, initialFocus) => {
  let previousActive;
  watch(() => toggle.value, (val) => {
    var _a, _b;
    if (val) {
      previousActive = document.activeElement;
      if (isRef(initialFocus)) {
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
  if (e.code === EVENT_CODE.esc) {
    e.stopPropagation();
    const topModal = modalStack[modalStack.length - 1];
    topModal.handleClose();
  }
};
var index$4 = (instance, visibleRef) => {
  watch(() => visibleRef.value, (val) => {
    if (val) {
      modalStack.push(instance);
    } else {
      modalStack.splice(modalStack.findIndex((modal) => modal === instance), 1);
    }
  });
};
if (!isServer) {
  on(document, "keydown", closeModal);
}

const useMigrating = function() {
  onMounted(() => {
    const instance = getCurrentInstance();
    if (process.env.NODE_ENV === "production")
      return;
    if (!instance.vnode)
      return;
    const { props = {} } = getMigratingConfig();
    const { data } = instance;
    const definedProps = data.attrs || {};
    for (let propName in definedProps) {
      propName = kebabCase(propName);
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
  const throttled = ref(false);
  let timeoutHandle = 0;
  const dispatchThrottling = () => {
    if (timeoutHandle) {
      clearTimeout(timeoutHandle);
    }
    timeoutHandle = window.setTimeout(() => {
      throttled.value = loading.value;
    }, throttle);
  };
  onMounted(dispatchThrottling);
  watch(() => loading.value, (val) => {
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
  watch(() => indicator.value, (val) => {
    if (val) {
      on(document, evt, prevent, true);
    } else {
      off(document, evt, prevent, true);
    }
  }, { immediate: true });
};

export { index as useAttrs, index$1 as useEvents, index$5 as useFocus, index$2 as useLockScreen, useMigrating, index$4 as useModal, index$7 as usePreventGlobal, index$3 as useRestoreActive, index$6 as useThrottleRender };
