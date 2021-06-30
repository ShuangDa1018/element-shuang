import { ref, reactive, toRefs, createVNode, render, h, Transition, withCtx, withDirectives, vShow, nextTick } from 'vue';
import { removeClass, getStyle, addClass } from '../utils/dom';
import PopupManager from '../utils/popup-manager';
import isServer from '../utils/isServer';

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
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);

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
function createLoadingComponent({
  options,
  globalLoadingOption
}) {
  let vm = null;
  let afterLeaveTimer = null;
  const afterLeaveFlag = ref(false);
  const data = reactive(__spreadProps(__spreadValues({}, options), {
    originalPosition: "",
    originalOverflow: "",
    visible: false
  }));
  function setText(text) {
    data.text = text;
  }
  function destroySelf() {
    const target = data.parent;
    if (!target.vLoadingAddClassList) {
      let loadingNumber = target.getAttribute("loading-number");
      loadingNumber = Number.parseInt(loadingNumber) - 1;
      if (!loadingNumber) {
        removeClass(target, "el-loading-parent--relative");
        target.removeAttribute("loading-number");
      } else {
        target.setAttribute("loading-number", loadingNumber.toString());
      }
      removeClass(target, "el-loading-parent--hidden");
    }
    if (vm.el && vm.el.parentNode) {
      vm.el.parentNode.removeChild(vm.el);
    }
  }
  function close() {
    const target = data.parent;
    target.vLoadingAddClassList = null;
    if (data.fullscreen) {
      globalLoadingOption.fullscreenLoading = void 0;
    }
    afterLeaveFlag.value = true;
    clearTimeout(afterLeaveTimer);
    afterLeaveTimer = window.setTimeout(() => {
      if (afterLeaveFlag.value) {
        afterLeaveFlag.value = false;
        destroySelf();
      }
    }, 400);
    data.visible = false;
  }
  function handleAfterLeave() {
    if (!afterLeaveFlag.value)
      return;
    afterLeaveFlag.value = false;
    destroySelf();
  }
  const componentSetupConfig = __spreadProps(__spreadValues({}, toRefs(data)), {
    setText,
    close,
    handleAfterLeave
  });
  const elLoadingComponent = {
    name: "ElLoading",
    setup() {
      return componentSetupConfig;
    },
    render() {
      const spinner = h("svg", {
        class: "circular",
        viewBox: "25 25 50 50"
      }, [
        h("circle", { class: "path", cx: "50", cy: "50", r: "20", fill: "none" })
      ]);
      const noSpinner = h("i", { class: this.spinner });
      const spinnerText = h("p", { class: "el-loading-text" }, [this.text]);
      return h(Transition, {
        name: "el-loading-fade",
        onAfterLeave: this.handleAfterLeave
      }, {
        default: withCtx(() => [withDirectives(createVNode("div", {
          style: {
            backgroundColor: this.background || ""
          },
          class: [
            "el-loading-mask",
            this.customClass,
            this.fullscreen ? "is-fullscreen" : ""
          ]
        }, [
          h("div", {
            class: "el-loading-spinner"
          }, [
            !this.spinner ? spinner : noSpinner,
            this.text ? spinnerText : null
          ])
        ]), [[vShow, this.visible]])])
      });
    }
  };
  vm = createVNode(elLoadingComponent);
  render(vm, document.createElement("div"));
  return __spreadProps(__spreadValues({}, componentSetupConfig), {
    vm,
    get $el() {
      return vm.el;
    }
  });
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
const defaults = {
  parent: null,
  background: "",
  spinner: false,
  text: null,
  fullscreen: true,
  body: false,
  lock: false,
  customClass: ""
};
const globalLoadingOption = {
  fullscreenLoading: null
};
const addStyle = (options, parent, instance) => __async(undefined, null, function* () {
  const maskStyle = {};
  if (options.fullscreen) {
    instance.originalPosition.value = getStyle(document.body, "position");
    instance.originalOverflow.value = getStyle(document.body, "overflow");
    maskStyle.zIndex = String(PopupManager.nextZIndex());
  } else if (options.body) {
    instance.originalPosition.value = getStyle(document.body, "position");
    yield nextTick();
    ["top", "left"].forEach((property) => {
      const scroll = property === "top" ? "scrollTop" : "scrollLeft";
      maskStyle[property] = options.target.getBoundingClientRect()[property] + document.body[scroll] + document.documentElement[scroll] - parseInt(getStyle(document.body, `margin-${property}`), 10) + "px";
    });
    ["height", "width"].forEach((property) => {
      maskStyle[property] = options.target.getBoundingClientRect()[property] + "px";
    });
  } else {
    instance.originalPosition.value = getStyle(parent, "position");
  }
  Object.keys(maskStyle).forEach((property) => {
    instance.$el.style[property] = maskStyle[property];
  });
});
const addClassList = (options, parent, instance) => {
  if (instance.originalPosition.value !== "absolute" && instance.originalPosition.value !== "fixed") {
    addClass(parent, "el-loading-parent--relative");
  } else {
    removeClass(parent, "el-loading-parent--relative");
  }
  if (options.fullscreen && options.lock) {
    addClass(parent, "el-loading-parent--hidden");
  } else {
    removeClass(parent, "el-loading-parent--hidden");
  }
};
const Loading = function(options = {}) {
  if (isServer)
    return;
  options = __spreadValues$1(__spreadValues$1({}, defaults), options);
  if (typeof options.target === "string") {
    options.target = document.querySelector(options.target);
  }
  options.target = options.target || document.body;
  if (options.target !== document.body) {
    options.fullscreen = false;
  } else {
    options.body = true;
  }
  if (options.fullscreen && globalLoadingOption.fullscreenLoading) {
    globalLoadingOption.fullscreenLoading.close();
  }
  const parent = options.body ? document.body : options.target;
  options.parent = parent;
  const instance = createLoadingComponent({
    options,
    globalLoadingOption
  });
  addStyle(options, parent, instance);
  addClassList(options, parent, instance);
  options.parent.vLoadingAddClassList = () => {
    addClassList(options, parent, instance);
  };
  let loadingNumber = parent.getAttribute("loading-number");
  if (!loadingNumber) {
    loadingNumber = 1;
  } else {
    loadingNumber = Number.parseInt(loadingNumber) + 1;
  }
  parent.setAttribute("loading-number", loadingNumber.toString());
  parent.appendChild(instance.$el);
  nextTick().then(() => {
    instance.visible.value = hasOwn(options, "visible") ? options.visible : true;
  });
  if (options.fullscreen) {
    globalLoadingOption.fullscreenLoading = instance;
  }
  return instance;
};

const createInstance = (el, binding) => {
  const textExr = el.getAttribute("element-loading-text");
  const spinnerExr = el.getAttribute("element-loading-spinner");
  const backgroundExr = el.getAttribute("element-loading-background");
  const customClassExr = el.getAttribute("element-loading-custom-class");
  const vm = binding.instance;
  el.instance = Loading({
    text: vm && vm[textExr] || textExr,
    spinner: vm && vm[spinnerExr] || spinnerExr,
    background: vm && vm[backgroundExr] || backgroundExr,
    customClass: vm && vm[customClassExr] || customClassExr,
    fullscreen: !!binding.modifiers.fullscreen,
    target: !!binding.modifiers.fullscreen ? null : el,
    body: !!binding.modifiers.body,
    visible: true,
    lock: !!binding.modifiers.lock
  });
};
const vLoading = {
  mounted(el, binding) {
    if (!!binding.value) {
      createInstance(el, binding);
    }
  },
  updated(el, binding) {
    const instance = el.instance;
    if (binding.oldValue !== binding.value) {
      if (binding.value) {
        createInstance(el, binding);
      } else {
        instance.close();
      }
    }
  },
  unmounted(el) {
    var _a;
    (_a = el == null ? void 0 : el.instance) == null ? void 0 : _a.close();
  }
};

var index = {
  install(app) {
    app.directive("loading", vLoading);
    app.config.globalProperties.$loading = Loading;
  },
  directive: vLoading,
  service: Loading
};

export default index;
