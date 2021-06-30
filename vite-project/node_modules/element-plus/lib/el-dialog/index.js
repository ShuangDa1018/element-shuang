'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var directives = require('../directives');
var validators = require('../utils/validators');
var overlay = require('../el-overlay');
var isServer = require('../utils/isServer');
var constants = require('../utils/constants');
var PopupManager = require('../utils/popup-manager');
var util = require('../utils/util');
var hooks = require('../hooks');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var isServer__default = /*#__PURE__*/_interopDefaultLegacy(isServer);
var PopupManager__default = /*#__PURE__*/_interopDefaultLegacy(PopupManager);

const CLOSE_EVENT = "close";
const OPEN_EVENT = "open";
const CLOSED_EVENT = "closed";
const OPENED_EVENT = "opened";
function useDialog(props, ctx, targetRef) {
  const visible = vue.ref(false);
  const closed = vue.ref(false);
  const dialogRef = vue.ref(null);
  const openTimer = vue.ref(null);
  const closeTimer = vue.ref(null);
  const rendered = vue.ref(false);
  const zIndex = vue.ref(props.zIndex || PopupManager__default['default'].nextZIndex());
  const modalRef = vue.ref(null);
  const normalizeWidth = () => {
    if (util.isNumber(props.width))
      return `${props.width}px`;
    else
      return props.width;
  };
  const style = vue.computed(() => {
    const style2 = {};
    if (!props.fullscreen) {
      style2.marginTop = props.top;
      if (props.width) {
        style2.width = normalizeWidth();
      }
    }
    return style2;
  });
  function afterEnter() {
    ctx.emit(OPENED_EVENT);
  }
  function afterLeave() {
    ctx.emit(CLOSED_EVENT);
    ctx.emit(constants.UPDATE_MODEL_EVENT, false);
    if (props.destroyOnClose) {
      rendered.value = false;
    }
  }
  function beforeLeave() {
    ctx.emit(CLOSE_EVENT);
  }
  function open() {
    util.clearTimer(closeTimer);
    util.clearTimer(openTimer);
    if (props.openDelay && props.openDelay > 0) {
      openTimer.value = window.setTimeout(() => {
        openTimer.value = null;
        doOpen();
      }, props.openDelay);
    } else {
      doOpen();
    }
  }
  function close() {
    util.clearTimer(openTimer);
    util.clearTimer(closeTimer);
    if (props.closeDelay && props.closeDelay > 0) {
      closeTimer.value = window.setTimeout(() => {
        closeTimer.value = null;
        doClose();
      }, props.closeDelay);
    } else {
      doClose();
    }
  }
  function hide(shouldCancel) {
    if (shouldCancel)
      return;
    closed.value = true;
    visible.value = false;
  }
  function handleClose() {
    if (props.beforeClose) {
      props.beforeClose(hide);
    } else {
      close();
    }
  }
  function onModalClick() {
    if (props.closeOnClickModal) {
      handleClose();
    }
  }
  function doOpen() {
    if (isServer__default['default']) {
      return;
    }
    visible.value = true;
  }
  function doClose() {
    visible.value = false;
  }
  if (props.lockScroll) {
    hooks.useLockScreen(visible);
  }
  if (props.closeOnPressEscape) {
    hooks.useModal({
      handleClose
    }, visible);
  }
  hooks.useRestoreActive(visible);
  vue.watch(() => props.modelValue, (val) => {
    if (val) {
      closed.value = false;
      open();
      rendered.value = true;
      ctx.emit(OPEN_EVENT);
      zIndex.value = props.zIndex ? zIndex.value++ : PopupManager__default['default'].nextZIndex();
      vue.nextTick(() => {
        if (targetRef.value) {
          targetRef.value.scrollTop = 0;
        }
      });
    } else {
      if (visible.value) {
        close();
      }
    }
  });
  vue.onMounted(() => {
    if (props.modelValue) {
      visible.value = true;
      rendered.value = true;
      open();
    }
  });
  return {
    afterEnter,
    afterLeave,
    beforeLeave,
    handleClose,
    onModalClick,
    closed,
    dialogRef,
    style,
    rendered,
    modalRef,
    visible,
    zIndex
  };
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
var script = vue.defineComponent({
  name: "ElDialog",
  components: {
    "el-overlay": overlay.Overlay
  },
  directives: {
    TrapFocus: directives.TrapFocus
  },
  props: {
    appendToBody: {
      type: Boolean,
      default: false
    },
    beforeClose: {
      type: Function
    },
    destroyOnClose: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
    customClass: {
      type: String,
      default: ""
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    modal: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ""
    },
    openDelay: {
      type: Number,
      default: 0
    },
    closeDelay: {
      type: Number,
      default: 0
    },
    top: {
      type: String,
      default: "15vh"
    },
    modelValue: {
      type: Boolean,
      required: true
    },
    modalClass: String,
    width: {
      type: [String, Number],
      default: "50%",
      validator: validators.isValidWidthUnit
    },
    zIndex: {
      type: Number
    }
  },
  emits: [
    OPEN_EVENT,
    OPENED_EVENT,
    CLOSE_EVENT,
    CLOSED_EVENT,
    constants.UPDATE_MODEL_EVENT
  ],
  setup(props, ctx) {
    const dialogRef = vue.ref(null);
    return __spreadProps(__spreadValues({}, useDialog(props, ctx, dialogRef)), {
      dialogRef
    });
  }
});

const _hoisted_1 = { class: "el-dialog__header" };
const _hoisted_2 = { class: "el-dialog__title" };
const _hoisted_3 = /* @__PURE__ */ vue.createVNode("i", { class: "el-dialog__close el-icon el-icon-close" }, null, -1);
const _hoisted_4 = {
  key: 0,
  class: "el-dialog__body"
};
const _hoisted_5 = {
  key: 1,
  class: "el-dialog__footer"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_overlay = vue.resolveComponent("el-overlay");
  const _directive_trap_focus = vue.resolveDirective("trap-focus");
  return vue.openBlock(), vue.createBlock(vue.Teleport, {
    to: "body",
    disabled: !_ctx.appendToBody
  }, [
    vue.createVNode(vue.Transition, {
      name: "dialog-fade",
      onAfterEnter: _ctx.afterEnter,
      onAfterLeave: _ctx.afterLeave,
      onBeforeLeave: _ctx.beforeLeave
    }, {
      default: vue.withCtx(() => [
        vue.withDirectives(vue.createVNode(_component_el_overlay, {
          mask: _ctx.modal,
          "overlay-class": _ctx.modalClass,
          "z-index": _ctx.zIndex,
          onClick: _ctx.onModalClick
        }, {
          default: vue.withCtx(() => [
            vue.withDirectives(vue.createVNode("div", {
              ref: "dialogRef",
              class: [
                "el-dialog",
                {
                  "is-fullscreen": _ctx.fullscreen,
                  "el-dialog--center": _ctx.center
                },
                _ctx.customClass
              ],
              "aria-modal": "true",
              role: "dialog",
              "aria-label": _ctx.title || "dialog",
              style: _ctx.style,
              onClick: _cache[2] || (_cache[2] = vue.withModifiers(() => {
              }, ["stop"]))
            }, [
              vue.createVNode("div", _hoisted_1, [
                vue.renderSlot(_ctx.$slots, "title", {}, () => [
                  vue.createVNode("span", _hoisted_2, vue.toDisplayString(_ctx.title), 1)
                ]),
                _ctx.showClose ? (vue.openBlock(), vue.createBlock("button", {
                  key: 0,
                  "aria-label": "close",
                  class: "el-dialog__headerbtn",
                  type: "button",
                  onClick: _cache[1] || (_cache[1] = (...args) => _ctx.handleClose && _ctx.handleClose(...args))
                }, [
                  _hoisted_3
                ])) : vue.createCommentVNode("v-if", true)
              ]),
              _ctx.rendered ? (vue.openBlock(), vue.createBlock("div", _hoisted_4, [
                vue.renderSlot(_ctx.$slots, "default")
              ])) : vue.createCommentVNode("v-if", true),
              _ctx.$slots.footer ? (vue.openBlock(), vue.createBlock("div", _hoisted_5, [
                vue.renderSlot(_ctx.$slots, "footer")
              ])) : vue.createCommentVNode("v-if", true)
            ], 14, ["aria-label"]), [
              [_directive_trap_focus]
            ])
          ]),
          _: 3
        }, 8, ["mask", "overlay-class", "z-index", "onClick"]), [
          [vue.vShow, _ctx.visible]
        ])
      ]),
      _: 1
    }, 8, ["onAfterEnter", "onAfterLeave", "onBeforeLeave"])
  ], 8, ["disabled"]);
}

script.render = render;
script.__file = "packages/dialog/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Dialog = script;

exports.default = _Dialog;
exports.useDialog = useDialog;
