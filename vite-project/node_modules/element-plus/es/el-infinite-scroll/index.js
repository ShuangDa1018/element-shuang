import { nextTick } from 'vue';
import throttle from 'lodash/throttle';
import { entries } from '../utils/util';
import { getScrollContainer, getOffsetTopDistance } from '../utils/dom';
import throwError from '../utils/error';

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
const isFunction = (val) => typeof val === 'function';

var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const SCOPE = "ElInfiniteScroll";
const CHECK_INTERVAL = 50;
const DEFAULT_DELAY = 200;
const DEFAULT_DISTANCE = 0;
const attributes = {
  delay: {
    type: Number,
    default: DEFAULT_DELAY
  },
  distance: {
    type: Number,
    default: DEFAULT_DISTANCE
  },
  disabled: {
    type: Boolean,
    default: false
  },
  immediate: {
    type: Boolean,
    default: true
  }
};
const getScrollOptions = (el, instance) => {
  return entries(attributes).reduce((acm, [name, option]) => {
    var _a, _b;
    const { type, default: defaultValue } = option;
    const attrVal = el.getAttribute(`infinite-scroll-${name}`);
    let value = (_b = (_a = instance[attrVal]) != null ? _a : attrVal) != null ? _b : defaultValue;
    value = value === "false" ? false : value;
    value = type(value);
    acm[name] = Number.isNaN(value) ? defaultValue : value;
    return acm;
  }, {});
};
const destroyObserver = (el) => {
  const { observer } = el[SCOPE];
  if (observer) {
    observer.disconnect();
    delete el[SCOPE].observer;
  }
};
const handleScroll = (el, cb) => {
  const {
    container,
    containerEl,
    instance,
    observer,
    lastScrollTop
  } = el[SCOPE];
  const { disabled, distance } = getScrollOptions(el, instance);
  const { clientHeight, scrollHeight, scrollTop } = containerEl;
  const delta = scrollTop - lastScrollTop;
  el[SCOPE].lastScrollTop = scrollTop;
  if (observer || disabled || delta < 0)
    return;
  let shouldTrigger = false;
  if (container === el) {
    shouldTrigger = scrollHeight - (clientHeight + scrollTop) <= distance;
  } else {
    const { clientTop, scrollHeight: height } = el;
    const offsetTop = getOffsetTopDistance(el, containerEl);
    shouldTrigger = scrollTop + clientHeight >= offsetTop + clientTop + height - distance;
  }
  if (shouldTrigger) {
    cb.call(instance);
  }
};
function checkFull(el, cb) {
  const { containerEl, instance } = el[SCOPE];
  const { disabled } = getScrollOptions(el, instance);
  if (disabled)
    return;
  if (containerEl.scrollHeight <= containerEl.clientHeight) {
    cb.call(instance);
  } else {
    destroyObserver(el);
  }
}
const InfiniteScroll = {
  mounted(el, binding) {
    return __async(this, null, function* () {
      const { instance, value: cb } = binding;
      if (!isFunction(cb)) {
        throwError(SCOPE, "'v-infinite-scroll' binding value must be a function");
      }
      yield nextTick();
      const { delay, immediate } = getScrollOptions(el, instance);
      const container = getScrollContainer(el, true);
      const containerEl = container === window ? document.documentElement : container;
      const onScroll = throttle(handleScroll.bind(null, el, cb), delay);
      if (!container)
        return;
      el[SCOPE] = {
        instance,
        container,
        containerEl,
        delay,
        cb,
        onScroll,
        lastScrollTop: containerEl.scrollTop
      };
      if (immediate) {
        const observer = new MutationObserver(throttle(checkFull.bind(null, el, cb), CHECK_INTERVAL));
        el[SCOPE].observer = observer;
        observer.observe(el, { childList: true, subtree: true });
        checkFull(el, cb);
      }
      container.addEventListener("scroll", onScroll);
    });
  },
  unmounted(el) {
    const { container, onScroll } = el[SCOPE];
    container == null ? void 0 : container.removeEventListener("scroll", onScroll);
    destroyObserver(el);
  }
};

const _InfiniteScroll = InfiniteScroll;
_InfiniteScroll.install = (app) => {
  app.directive("InfiniteScroll", _InfiniteScroll);
};

export default _InfiniteScroll;
