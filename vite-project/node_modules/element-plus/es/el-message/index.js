import { defineComponent, computed, ref, onMounted, onBeforeUnmount, openBlock, createBlock, Transition, withCtx, withDirectives, createVNode, createCommentVNode, renderSlot, toDisplayString, Fragment, withModifiers, vShow, render as render$1 } from 'vue';
import { isVNode } from '../utils/util';
import PopupManager from '../utils/popup-manager';
import isServer from '../utils/isServer';

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
var script = defineComponent({
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
    const typeClass = computed(() => {
      const type = props.type;
      return type && TypeMap[type] ? `el-message__icon el-icon-${TypeMap[type]}` : "";
    });
    const customStyle = computed(() => {
      return {
        top: `${props.offset}px`,
        zIndex: props.zIndex
      };
    });
    const visible = ref(false);
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
    onMounted(() => {
      startTimer();
      visible.value = true;
      on(document, "keydown", keydown);
    });
    onBeforeUnmount(() => {
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
  return openBlock(), createBlock(Transition, {
    name: "el-message-fade",
    onBeforeLeave: _ctx.onClose,
    onAfterLeave: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("destroy"))
  }, {
    default: withCtx(() => [
      withDirectives(createVNode("div", {
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
        _ctx.type || _ctx.iconClass ? (openBlock(), createBlock("i", {
          key: 0,
          class: [_ctx.typeClass, _ctx.iconClass]
        }, null, 2)) : createCommentVNode("v-if", true),
        renderSlot(_ctx.$slots, "default", {}, () => [
          !_ctx.dangerouslyUseHTMLString ? (openBlock(), createBlock("p", _hoisted_1, toDisplayString(_ctx.message), 1)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
            createCommentVNode(" Caution here, message could've been compromised, never use user's input as message "),
            createCommentVNode("  eslint-disable-next-line "),
            createVNode("p", {
              class: "el-message__content",
              innerHTML: _ctx.message
            }, null, 8, ["innerHTML"])
          ], 2112))
        ]),
        _ctx.showClose ? (openBlock(), createBlock("div", {
          key: 1,
          class: "el-message__closeBtn el-icon-close",
          onClick: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.close && _ctx.close(...args), ["stop"]))
        })) : createCommentVNode("v-if", true)
      ], 46, ["id"]), [
        [vShow, _ctx.visible]
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
  if (isServer)
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
    zIndex: PopupManager.nextZIndex()
  });
  const container = document.createElement("div");
  container.className = `container_${id}`;
  const message = options.message;
  const vm = createVNode(script, options, isVNode(options.message) ? { default: () => message } : null);
  vm.props.onDestroy = () => {
    render$1(null, container);
  };
  render$1(vm, container);
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

export default _Message;
