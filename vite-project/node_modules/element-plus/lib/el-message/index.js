'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var util = require('../utils/util');
var PopupManager = require('../utils/popup-manager');
var isServer = require('../utils/isServer');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var PopupManager__default = /*#__PURE__*/_interopDefaultLegacy(PopupManager);
var isServer__default = /*#__PURE__*/_interopDefaultLegacy(isServer);

const EVENT_CODE = {
  tab: "Tab",
  enter: "Enter",
  space: "Space",
  left: "ArrowLeft",
  up: "ArrowUp",
  right: "ArrowRight",
  down: "ArrowDown",
  esc: "Escape",
  delete: "Delete",
  backspace: "Backspace"
};

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

const on = function(element, event, handler, useCapture = false) {
  if (element && event && handler) {
    element.addEventListener(event, handler, useCapture);
  }
};
const off = function(element, event, handler, useCapture = false) {
  if (element && event && handler) {
    element.removeEventListener(event, handler, useCapture);
  }
};

const TypeMap = {
  success: "success",
  info: "info",
  warning: "warning",
  error: "error"
};
var script = vue.defineComponent({
  name: "ElMessage",
  props: {
    customClass: { type: String, default: "" },
    center: { type: Boolean, default: false },
    dangerouslyUseHTMLString: { type: Boolean, default: false },
    duration: { type: Number, default: 3e3 },
    iconClass: { type: String, default: "" },
    id: { type: String, default: "" },
    message: {
      type: [String, Object],
      default: ""
    },
    onClose: {
      type: Function,
      required: true
    },
    showClose: { type: Boolean, default: false },
    type: { type: String, default: "info" },
    offset: { type: Number, default: 20 },
    zIndex: { type: Number, default: 0 }
  },
  emits: ["destroy"],
  setup(props) {
    const typeClass = vue.computed(() => {
      const type = props.type;
      return type && TypeMap[type] ? `el-message__icon el-icon-${TypeMap[type]}` : "";
    });
    const customStyle = vue.computed(() => {
      return {
        top: `${props.offset}px`,
        zIndex: props.zIndex
      };
    });
    const visible = vue.ref(false);
    let timer = null;
    function startTimer() {
      if (props.duration > 0) {
        timer = setTimeout(() => {
          if (visible.value) {
            close();
          }
        }, props.duration);
      }
    }
    function clearTimer() {
      clearTimeout(timer);
      timer = null;
    }
    function close() {
      visible.value = false;
    }
    function keydown({ code }) {
      if (code === EVENT_CODE.esc) {
        if (visible.value) {
          close();
        }
      } else {
        startTimer();
      }
    }
    vue.onMounted(() => {
      startTimer();
      visible.value = true;
      on(document, "keydown", keydown);
    });
    vue.onBeforeUnmount(() => {
      off(document, "keydown", keydown);
    });
    return {
      typeClass,
      customStyle,
      visible,
      close,
      clearTimer,
      startTimer
    };
  }
});

const _hoisted_1 = {
  key: 0,
  class: "el-message__content"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock(vue.Transition, {
    name: "el-message-fade",
    onBeforeLeave: _ctx.onClose,
    onAfterLeave: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("destroy"))
  }, {
    default: vue.withCtx(() => [
      vue.withDirectives(vue.createVNode("div", {
        id: _ctx.id,
        class: [
          "el-message",
          _ctx.type && !_ctx.iconClass ? `el-message--${_ctx.type}` : "",
          _ctx.center ? "is-center" : "",
          _ctx.showClose ? "is-closable" : "",
          _ctx.customClass
        ],
        style: _ctx.customStyle,
        role: "alert",
        onMouseenter: _cache[2] || (_cache[2] = (...args) => _ctx.clearTimer && _ctx.clearTimer(...args)),
        onMouseleave: _cache[3] || (_cache[3] = (...args) => _ctx.startTimer && _ctx.startTimer(...args))
      }, [
        _ctx.type || _ctx.iconClass ? (vue.openBlock(), vue.createBlock("i", {
          key: 0,
          class: [_ctx.typeClass, _ctx.iconClass]
        }, null, 2)) : vue.createCommentVNode("v-if", true),
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          !_ctx.dangerouslyUseHTMLString ? (vue.openBlock(), vue.createBlock("p", _hoisted_1, vue.toDisplayString(_ctx.message), 1)) : (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 1 }, [
            vue.createCommentVNode(" Caution here, message could've been compromised, never use user's input as message "),
            vue.createCommentVNode("  eslint-disable-next-line "),
            vue.createVNode("p", {
              class: "el-message__content",
              innerHTML: _ctx.message
            }, null, 8, ["innerHTML"])
          ], 2112))
        ]),
        _ctx.showClose ? (vue.openBlock(), vue.createBlock("div", {
          key: 1,
          class: "el-message__closeBtn el-icon-close",
          onClick: _cache[1] || (_cache[1] = vue.withModifiers((...args) => _ctx.close && _ctx.close(...args), ["stop"]))
        })) : vue.createCommentVNode("v-if", true)
      ], 46, ["id"]), [
        [vue.vShow, _ctx.visible]
      ])
    ]),
    _: 3
  }, 8, ["onBeforeLeave"]);
}

script.render = render;
script.__file = "packages/message/src/index.vue";

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
const instances = [];
let seed = 1;
const Message = function(opts = {}) {
  if (isServer__default['default'])
    return;
  if (typeof opts === "string") {
    opts = {
      message: opts
    };
  }
  let options = opts;
  let verticalOffset = opts.offset || 20;
  instances.forEach(({ vm: vm2 }) => {
    verticalOffset += (vm2.el.offsetHeight || 0) + 16;
  });
  verticalOffset += 16;
  const id = "message_" + seed++;
  const userOnClose = options.onClose;
  options = __spreadProps(__spreadValues({}, options), {
    onClose: () => {
      close(id, userOnClose);
    },
    offset: verticalOffset,
    id,
    zIndex: PopupManager__default['default'].nextZIndex()
  });
  const container = document.createElement("div");
  container.className = `container_${id}`;
  const message = options.message;
  const vm = vue.createVNode(script, options, util.isVNode(options.message) ? { default: () => message } : null);
  vm.props.onDestroy = () => {
    vue.render(null, container);
  };
  vue.render(vm, container);
  instances.push({ vm });
  document.body.appendChild(container.firstElementChild);
  return {
    close: () => vm.component.proxy.visible = false
  };
};
function close(id, userOnClose) {
  const idx = instances.findIndex(({ vm: vm2 }) => {
    const { id: _id } = vm2.component.props;
    return id === _id;
  });
  if (idx === -1) {
    return;
  }
  const { vm } = instances[idx];
  if (!vm)
    return;
  userOnClose == null ? void 0 : userOnClose(vm);
  const removedHeight = vm.el.offsetHeight;
  instances.splice(idx, 1);
  const len = instances.length;
  if (len < 1)
    return;
  for (let i = idx; i < len; i++) {
    const pos = parseInt(instances[i].vm.el.style["top"], 10) - removedHeight - 16;
    instances[i].vm.component.props.offset = pos;
  }
}
function closeAll() {
  for (let i = instances.length - 1; i >= 0; i--) {
    const instance = instances[i].vm.component;
    instance.ctx.close();
  }
}
["success", "warning", "info", "error"].forEach((type) => {
  Message[type] = (options) => {
    if (typeof options === "string") {
      options = {
        message: options,
        type
      };
    } else {
      options.type = type;
    }
    return Message(options);
  };
});
Message.closeAll = closeAll;

const _Message = Message;
_Message.install = (app) => {
  app.config.globalProperties.$message = _Message;
};

exports.default = _Message;
