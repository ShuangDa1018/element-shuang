'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var aria = require('../utils/aria');
var dom = require('../utils/dom');
var isServer = require('../utils/isServer');
var PopupManager = require('../utils/popup-manager');
var util = require('../utils/util');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var isServer__default = /*#__PURE__*/_interopDefaultLegacy(isServer);
var PopupManager__default = /*#__PURE__*/_interopDefaultLegacy(PopupManager);

const TypeMap = {
  success: "success",
  info: "info",
  warning: "warning",
  error: "error"
};
var script = vue.defineComponent({
  name: "ElNotification",
  props: {
    customClass: { type: String, default: "" },
    dangerouslyUseHTMLString: { type: Boolean, default: false },
    duration: { type: Number, default: 4500 },
    iconClass: { type: String, default: "" },
    id: { type: String, default: "" },
    message: {
      type: [String, Object],
      default: ""
    },
    offset: { type: Number, default: 0 },
    onClick: {
      type: Function,
      default: () => void 0
    },
    onClose: {
      type: Function,
      required: true
    },
    position: {
      type: String,
      default: "top-right"
    },
    showClose: { type: Boolean, default: true },
    title: { type: String, default: "" },
    type: { type: String, default: "" },
    zIndex: { type: Number, default: 0 }
  },
  emits: ["destroy"],
  setup(props) {
    const visible = vue.ref(false);
    let timer = null;
    const typeClass = vue.computed(() => {
      const type = props.type;
      return type && TypeMap[type] ? `el-icon-${TypeMap[type]}` : "";
    });
    const horizontalClass = vue.computed(() => {
      return props.position.indexOf("right") > 1 ? "right" : "left";
    });
    const verticalProperty = vue.computed(() => {
      return props.position.startsWith("top") ? "top" : "bottom";
    });
    const positionStyle = vue.computed(() => {
      return {
        [verticalProperty.value]: `${props.offset}px`,
        "z-index": props.zIndex
      };
    });
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
    function onKeydown({ code }) {
      if (code === aria.EVENT_CODE.delete || code === aria.EVENT_CODE.backspace) {
        clearTimer();
      } else if (code === aria.EVENT_CODE.esc) {
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
      dom.on(document, "keydown", onKeydown);
    });
    vue.onBeforeUnmount(() => {
      dom.off(document, "keydown", onKeydown);
    });
    return {
      horizontalClass,
      typeClass,
      positionStyle,
      visible,
      close,
      clearTimer,
      startTimer
    };
  }
});

const _hoisted_1 = { key: 0 };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock(vue.Transition, {
    name: "el-notification-fade",
    onBeforeLeave: _ctx.onClose,
    onAfterLeave: _cache[5] || (_cache[5] = ($event) => _ctx.$emit("destroy"))
  }, {
    default: vue.withCtx(() => [
      vue.withDirectives(vue.createVNode("div", {
        id: _ctx.id,
        class: ["el-notification", _ctx.customClass, _ctx.horizontalClass],
        style: _ctx.positionStyle,
        role: "alert",
        onMouseenter: _cache[2] || (_cache[2] = (...args) => _ctx.clearTimer && _ctx.clearTimer(...args)),
        onMouseleave: _cache[3] || (_cache[3] = (...args) => _ctx.startTimer && _ctx.startTimer(...args)),
        onClick: _cache[4] || (_cache[4] = (...args) => _ctx.onClick && _ctx.onClick(...args))
      }, [
        _ctx.type || _ctx.iconClass ? (vue.openBlock(), vue.createBlock("i", {
          key: 0,
          class: ["el-notification__icon", [_ctx.typeClass, _ctx.iconClass]]
        }, null, 2)) : vue.createCommentVNode("v-if", true),
        vue.createVNode("div", {
          class: ["el-notification__group", { "is-with-icon": _ctx.typeClass || _ctx.iconClass }]
        }, [
          vue.createVNode("h2", {
            class: "el-notification__title",
            textContent: vue.toDisplayString(_ctx.title)
          }, null, 8, ["textContent"]),
          vue.withDirectives(vue.createVNode("div", {
            class: "el-notification__content",
            style: !!_ctx.title ? null : "margin: 0"
          }, [
            vue.renderSlot(_ctx.$slots, "default", {}, () => [
              !_ctx.dangerouslyUseHTMLString ? (vue.openBlock(), vue.createBlock("p", _hoisted_1, vue.toDisplayString(_ctx.message), 1)) : (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 1 }, [
                vue.createCommentVNode(" Caution here, message could've been compromized, nerver use user's input as message "),
                vue.createCommentVNode(" eslint-disable-next-line "),
                vue.createVNode("p", { innerHTML: _ctx.message }, null, 8, ["innerHTML"])
              ], 2112))
            ])
          ], 4), [
            [vue.vShow, _ctx.message]
          ]),
          _ctx.showClose ? (vue.openBlock(), vue.createBlock("div", {
            key: 0,
            class: "el-notification__closeBtn el-icon-close",
            onClick: _cache[1] || (_cache[1] = vue.withModifiers((...args) => _ctx.close && _ctx.close(...args), ["stop"]))
          })) : vue.createCommentVNode("v-if", true)
        ], 2)
      ], 46, ["id"]), [
        [vue.vShow, _ctx.visible]
      ])
    ]),
    _: 3
  }, 8, ["onBeforeLeave"]);
}

script.render = render;
script.__file = "packages/notification/src/index.vue";

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
const notifications = {
  "top-left": [],
  "top-right": [],
  "bottom-left": [],
  "bottom-right": []
};
const GAP_SIZE = 16;
let seed = 1;
const Notification = function(options = {}) {
  if (isServer__default['default'])
    return;
  const position = options.position || "top-right";
  let verticalOffset = options.offset || 0;
  notifications[position].forEach(({ vm: vm2 }) => {
    verticalOffset += (vm2.el.offsetHeight || 0) + GAP_SIZE;
  });
  verticalOffset += GAP_SIZE;
  const id = "notification_" + seed++;
  const userOnClose = options.onClose;
  options = __spreadProps(__spreadValues({}, options), {
    onClose: () => {
      close(id, position, userOnClose);
    },
    offset: verticalOffset,
    id,
    zIndex: PopupManager__default['default'].nextZIndex()
  });
  const container = document.createElement("div");
  const vm = vue.createVNode(script, options, util.isVNode(options.message) ? {
    default: () => options.message
  } : null);
  vm.props.onDestroy = () => {
    vue.render(null, container);
  };
  vue.render(vm, container);
  notifications[position].push({ vm });
  document.body.appendChild(container.firstElementChild);
  return {
    close: () => {
      vm.component.proxy.visible = false;
    }
  };
};
["success", "warning", "info", "error"].forEach((type) => {
  Object.assign(Notification, {
    [type]: (options = {}) => {
      if (typeof options === "string" || util.isVNode(options)) {
        options = {
          message: options
        };
      }
      options.type = type;
      return Notification(options);
    }
  });
});
function close(id, position, userOnClose) {
  const orientedNotifications = notifications[position];
  const idx = orientedNotifications.findIndex(({ vm: vm2 }) => vm2.component.props.id === id);
  if (idx === -1)
    return;
  const { vm } = orientedNotifications[idx];
  if (!vm)
    return;
  userOnClose == null ? void 0 : userOnClose(vm);
  const removedHeight = vm.el.offsetHeight;
  const verticalPos = position.split("-")[0];
  orientedNotifications.splice(idx, 1);
  const len = orientedNotifications.length;
  if (len < 1)
    return;
  for (let i = idx; i < len; i++) {
    const { el, component } = orientedNotifications[i].vm;
    const pos = parseInt(el.style[verticalPos], 10) - removedHeight - GAP_SIZE;
    component.props.offset = pos;
  }
}

const _Notify = Notification;
_Notify.install = (app) => {
  app.config.globalProperties.$notify = _Notify;
};

exports.default = _Notify;
