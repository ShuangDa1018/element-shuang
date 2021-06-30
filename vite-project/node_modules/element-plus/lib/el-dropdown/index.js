'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var dom = require('../utils/dom');
var ElButton = require('../el-button');
var ElButtonGroup = require('../el-button-group');
var ElScrollbar = require('../el-scrollbar');
var ElPopper = require('../el-popper');
var util = require('../utils/util');
require('../utils/aria');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ElButton__default = /*#__PURE__*/_interopDefaultLegacy(ElButton);
var ElButtonGroup__default = /*#__PURE__*/_interopDefaultLegacy(ElButtonGroup);
var ElScrollbar__default = /*#__PURE__*/_interopDefaultLegacy(ElScrollbar);
var ElPopper__default = /*#__PURE__*/_interopDefaultLegacy(ElPopper);

const useDropdown = () => {
  const ELEMENT = util.useGlobalConfig();
  const elDropdown = vue.inject("elDropdown", {});
  const _elDropdownSize = vue.computed(() => elDropdown == null ? void 0 : elDropdown.dropdownSize);
  return {
    ELEMENT,
    elDropdown,
    _elDropdownSize
  };
};

var script = vue.defineComponent({
  name: "ElDropdown",
  components: {
    ElButton: ElButton__default['default'],
    ElButtonGroup: ElButtonGroup__default['default'],
    ElScrollbar: ElScrollbar__default['default'],
    ElPopper: ElPopper__default['default']
  },
  props: {
    trigger: {
      type: String,
      default: "hover"
    },
    type: String,
    size: {
      type: String,
      default: ""
    },
    splitButton: Boolean,
    hideOnClick: {
      type: Boolean,
      default: true
    },
    placement: {
      type: String,
      default: "bottom"
    },
    showTimeout: {
      type: Number,
      default: 150
    },
    hideTimeout: {
      type: Number,
      default: 150
    },
    tabindex: {
      type: [Number, String],
      default: 0
    },
    effect: {
      type: String,
      default: "light"
    },
    maxHeight: {
      type: [Number, String],
      default: ""
    }
  },
  emits: ["visible-change", "click", "command"],
  setup(props, { emit }) {
    const _instance = vue.getCurrentInstance();
    const { ELEMENT } = useDropdown();
    const timeout = vue.ref(null);
    const visible = vue.ref(false);
    const scrollbar = vue.ref(null);
    const wrapStyle = vue.computed(() => `max-height: ${util.addUnit(props.maxHeight)}`);
    vue.watch(() => visible.value, (val) => {
      if (val)
        triggerElmFocus();
      if (!val)
        triggerElmBlur();
      emit("visible-change", val);
    });
    const focusing = vue.ref(false);
    vue.watch(() => focusing.value, (val) => {
      const selfDefine = triggerElm.value;
      if (selfDefine) {
        if (val) {
          dom.addClass(selfDefine, "focusing");
        } else {
          dom.removeClass(selfDefine, "focusing");
        }
      }
    });
    const triggerVnode = vue.ref(null);
    const triggerElm = vue.computed(() => {
      var _a, _b, _c, _d;
      const _ = (_c = (_b = (_a = triggerVnode.value) == null ? void 0 : _a.$refs.triggerRef) == null ? void 0 : _b.children[0]) != null ? _c : {};
      return !props.splitButton ? _ : (_d = _.children) == null ? void 0 : _d[1];
    });
    function handleClick() {
      var _a;
      if ((_a = triggerElm.value) == null ? void 0 : _a.disabled)
        return;
      if (visible.value) {
        hide();
      } else {
        show();
      }
    }
    function show() {
      var _a;
      if ((_a = triggerElm.value) == null ? void 0 : _a.disabled)
        return;
      timeout.value && clearTimeout(timeout.value);
      timeout.value = window.setTimeout(() => {
        visible.value = true;
      }, ["click", "contextmenu"].includes(props.trigger) ? 0 : props.showTimeout);
    }
    function hide() {
      var _a;
      if ((_a = triggerElm.value) == null ? void 0 : _a.disabled)
        return;
      removeTabindex();
      if (props.tabindex >= 0) {
        resetTabindex(triggerElm.value);
      }
      clearTimeout(timeout.value);
      timeout.value = window.setTimeout(() => {
        visible.value = false;
      }, ["click", "contextmenu"].includes(props.trigger) ? 0 : props.hideTimeout);
    }
    function removeTabindex() {
      var _a;
      (_a = triggerElm.value) == null ? void 0 : _a.setAttribute("tabindex", "-1");
    }
    function resetTabindex(ele) {
      removeTabindex();
      ele == null ? void 0 : ele.setAttribute("tabindex", "0");
    }
    function triggerElmFocus() {
      var _a, _b;
      (_b = (_a = triggerElm.value) == null ? void 0 : _a.focus) == null ? void 0 : _b.call(_a);
    }
    function triggerElmBlur() {
      var _a, _b;
      (_b = (_a = triggerElm.value) == null ? void 0 : _a.blur) == null ? void 0 : _b.call(_a);
    }
    const dropdownSize = vue.computed(() => props.size || ELEMENT.size);
    function commandHandler(...args) {
      emit("command", ...args);
    }
    vue.provide("elDropdown", {
      instance: _instance,
      dropdownSize,
      visible,
      handleClick,
      commandHandler,
      show,
      hide,
      trigger: vue.computed(() => props.trigger),
      hideOnClick: vue.computed(() => props.hideOnClick),
      triggerElm
    });
    vue.onMounted(() => {
      if (!props.splitButton) {
        dom.on(triggerElm.value, "focus", () => {
          focusing.value = true;
        });
        dom.on(triggerElm.value, "blur", () => {
          focusing.value = false;
        });
        dom.on(triggerElm.value, "click", () => {
          focusing.value = false;
        });
      }
      if (props.trigger === "hover") {
        dom.on(triggerElm.value, "mouseenter", show);
        dom.on(triggerElm.value, "mouseleave", hide);
      } else if (props.trigger === "click") {
        dom.on(triggerElm.value, "click", handleClick);
      } else if (props.trigger === "contextmenu") {
        dom.on(triggerElm.value, "contextmenu", (e) => {
          e.preventDefault();
          handleClick();
        });
      }
      Object.assign(_instance, {
        handleClick,
        hide,
        resetTabindex
      });
    });
    const handlerMainButtonClick = (event) => {
      emit("click", event);
      hide();
    };
    return {
      visible,
      scrollbar,
      wrapStyle,
      dropdownSize,
      handlerMainButtonClick,
      triggerVnode
    };
  }
});

const _hoisted_1 = /* @__PURE__ */ vue.createVNode("i", { class: "el-dropdown__icon el-icon-arrow-down" }, null, -1);
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_scrollbar = vue.resolveComponent("el-scrollbar");
  const _component_el_button = vue.resolveComponent("el-button");
  const _component_el_button_group = vue.resolveComponent("el-button-group");
  const _component_el_popper = vue.resolveComponent("el-popper");
  return vue.openBlock(), vue.createBlock(_component_el_popper, {
    ref: "triggerVnode",
    visible: _ctx.visible,
    "onUpdate:visible": _cache[1] || (_cache[1] = ($event) => _ctx.visible = $event),
    placement: _ctx.placement,
    "fallback-placements": ["bottom", "top", "right", "left"],
    effect: _ctx.effect,
    pure: "",
    "manual-mode": true,
    trigger: [_ctx.trigger],
    "popper-class": "el-dropdown__popper",
    "append-to-body": "",
    transition: "el-zoom-in-top",
    "stop-popper-mouse-event": false,
    "gpu-acceleration": false
  }, {
    default: vue.withCtx(() => [
      vue.createVNode(_component_el_scrollbar, {
        ref: "scrollbar",
        tag: "ul",
        "wrap-style": _ctx.wrapStyle,
        "view-class": "el-dropdown__list"
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "dropdown")
        ]),
        _: 3
      }, 8, ["wrap-style"])
    ]),
    trigger: vue.withCtx(() => [
      vue.createVNode("div", {
        class: ["el-dropdown", _ctx.dropdownSize ? "el-dropdown--" + _ctx.dropdownSize : ""]
      }, [
        !_ctx.splitButton ? vue.renderSlot(_ctx.$slots, "default", { key: 0 }) : (vue.openBlock(), vue.createBlock(_component_el_button_group, { key: 1 }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_el_button, {
              size: _ctx.dropdownSize,
              type: _ctx.type,
              onClick: _ctx.handlerMainButtonClick
            }, {
              default: vue.withCtx(() => [
                vue.renderSlot(_ctx.$slots, "default")
              ]),
              _: 3
            }, 8, ["size", "type", "onClick"]),
            vue.createVNode(_component_el_button, {
              size: _ctx.dropdownSize,
              type: _ctx.type,
              class: "el-dropdown__caret-button"
            }, {
              default: vue.withCtx(() => [
                _hoisted_1
              ]),
              _: 1
            }, 8, ["size", "type"])
          ]),
          _: 1
        }))
      ], 2)
    ]),
    _: 1
  }, 8, ["visible", "placement", "effect", "trigger"]);
}

script.render = render;
script.__file = "packages/dropdown/src/dropdown.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Dropdown = script;

exports.default = _Dropdown;
