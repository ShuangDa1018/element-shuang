'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var dom = require('../utils/dom');
var isServer = require('../utils/isServer');
var vue = require('vue');
var aria = require('../utils/aria');
var normalizeWheel = require('normalize-wheel');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var isServer__default = /*#__PURE__*/_interopDefaultLegacy(isServer);
var normalizeWheel__default = /*#__PURE__*/_interopDefaultLegacy(normalizeWheel);

const nodeList = new Map();
let startClick;
if (!isServer__default['default']) {
  dom.on(document, "mousedown", (e) => startClick = e);
  dom.on(document, "mouseup", (e) => {
    for (const { documentHandler } of nodeList.values()) {
      documentHandler(e, startClick);
    }
  });
}
function createDocumentHandler(el, binding) {
  let excludes = [];
  if (Array.isArray(binding.arg)) {
    excludes = binding.arg;
  } else {
    excludes.push(binding.arg);
  }
  return function(mouseup, mousedown) {
    const popperRef = binding.instance.popperRef;
    const mouseUpTarget = mouseup.target;
    const mouseDownTarget = mousedown == null ? void 0 : mousedown.target;
    const isBound = !binding || !binding.instance;
    const isTargetExists = !mouseUpTarget || !mouseDownTarget;
    const isContainedByEl = el.contains(mouseUpTarget) || el.contains(mouseDownTarget);
    const isSelf = el === mouseUpTarget;
    const isTargetExcluded = excludes.length && excludes.some((item) => item == null ? void 0 : item.contains(mouseUpTarget)) || excludes.length && excludes.includes(mouseDownTarget);
    const isContainedByPopper = popperRef && (popperRef.contains(mouseUpTarget) || popperRef.contains(mouseDownTarget));
    if (isBound || isTargetExists || isContainedByEl || isSelf || isTargetExcluded || isContainedByPopper) {
      return;
    }
    binding.value(mouseup, mousedown);
  };
}
const ClickOutside = {
  beforeMount(el, binding) {
    nodeList.set(el, {
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value
    });
  },
  updated(el, binding) {
    nodeList.set(el, {
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value
    });
  },
  unmounted(el) {
    nodeList.delete(el);
  }
};

var index = {
  beforeMount(el, binding) {
    let interval = null;
    let startTime;
    const handler = () => binding.value && binding.value();
    const clear = () => {
      if (Date.now() - startTime < 100) {
        handler();
      }
      clearInterval(interval);
      interval = null;
    };
    dom.on(el, "mousedown", (e) => {
      if (e.button !== 0)
        return;
      startTime = Date.now();
      dom.once(document, "mouseup", clear);
      clearInterval(interval);
      interval = setInterval(handler, 100);
    });
  }
};

const FOCUSABLE_CHILDREN = "_trap-focus-children";
const FOCUS_STACK = [];
const FOCUS_HANDLER = (e) => {
  var _a;
  if (FOCUS_STACK.length === 0)
    return;
  const focusableElement = FOCUS_STACK[FOCUS_STACK.length - 1][FOCUSABLE_CHILDREN];
  if (focusableElement.length > 0 && e.code === aria.EVENT_CODE.tab) {
    if (focusableElement.length === 1) {
      e.preventDefault();
      if (document.activeElement !== focusableElement[0]) {
        focusableElement[0].focus();
      }
      return;
    }
    const goingBackward = e.shiftKey;
    const isFirst = e.target === focusableElement[0];
    const isLast = e.target === focusableElement[focusableElement.length - 1];
    if (isFirst && goingBackward) {
      e.preventDefault();
      focusableElement[focusableElement.length - 1].focus();
    }
    if (isLast && !goingBackward) {
      e.preventDefault();
      focusableElement[0].focus();
    }
    if (process.env.NODE_ENV === "test") {
      const index = focusableElement.findIndex((element) => element === e.target);
      if (index !== -1) {
        (_a = focusableElement[goingBackward ? index - 1 : index + 1]) == null ? void 0 : _a.focus();
      }
    }
  }
};
const TrapFocus = {
  beforeMount(el) {
    el[FOCUSABLE_CHILDREN] = aria.obtainAllFocusableElements(el);
    FOCUS_STACK.push(el);
    if (FOCUS_STACK.length <= 1) {
      dom.on(document, "keydown", FOCUS_HANDLER);
    }
  },
  updated(el) {
    vue.nextTick(() => {
      el[FOCUSABLE_CHILDREN] = aria.obtainAllFocusableElements(el);
    });
  },
  unmounted() {
    FOCUS_STACK.shift();
    if (FOCUS_STACK.length === 0) {
      dom.off(document, "keydown", FOCUS_HANDLER);
    }
  }
};

const isFirefox = typeof navigator !== "undefined" && navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
const mousewheel = function(element, callback) {
  if (element && element.addEventListener) {
    const fn = function(event) {
      const normalized = normalizeWheel__default['default'](event);
      callback && callback.apply(this, [event, normalized]);
    };
    if (isFirefox) {
      element.addEventListener("DOMMouseScroll", fn);
    } else {
      element.onmousewheel = fn;
    }
  }
};
const Mousewheel = {
  beforeMount(el, binding) {
    mousewheel(el, binding.value);
  }
};

exports.ClickOutside = ClickOutside;
exports.Mousewheel = Mousewheel;
exports.RepeatClick = index;
exports.TrapFocus = TrapFocus;
