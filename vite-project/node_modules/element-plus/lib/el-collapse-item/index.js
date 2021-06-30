'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var util = require('../utils/util');
var ElCollapseTransition = require('../el-collapse-transition');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ElCollapseTransition__default = /*#__PURE__*/_interopDefaultLegacy(ElCollapseTransition);

var script = vue.defineComponent({
  name: "ElCollapseItem",
  components: { ElCollapseTransition: ElCollapseTransition__default['default'] },
  props: {
    title: {
      type: String,
      default: ""
    },
    name: {
      type: [String, Number],
      default: () => {
        return util.generateId();
      }
    },
    disabled: Boolean
  },
  setup(props) {
    const collapse = vue.inject("collapse");
    const collapseMitt = collapse == null ? void 0 : collapse.collapseMitt;
    const contentWrapStyle = vue.ref({
      height: "auto",
      display: "block"
    });
    const contentHeight = vue.ref(0);
    const focusing = vue.ref(false);
    const isClick = vue.ref(false);
    const id = vue.ref(util.generateId());
    const isActive = vue.computed(() => {
      return (collapse == null ? void 0 : collapse.activeNames.value.indexOf(props.name)) > -1;
    });
    const handleFocus = () => {
      setTimeout(() => {
        if (!isClick.value) {
          focusing.value = true;
        } else {
          isClick.value = false;
        }
      }, 50);
    };
    const handleHeaderClick = () => {
      if (props.disabled)
        return;
      collapseMitt == null ? void 0 : collapseMitt.emit("item-click", props.name);
      focusing.value = false;
      isClick.value = true;
    };
    const handleEnterClick = () => {
      collapseMitt == null ? void 0 : collapseMitt.emit("item-click", props.name);
    };
    return {
      isActive,
      contentWrapStyle,
      contentHeight,
      focusing,
      isClick,
      id,
      handleFocus,
      handleHeaderClick,
      handleEnterClick,
      collapse
    };
  }
});

const _hoisted_1 = { class: "el-collapse-item__content" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_collapse_transition = vue.resolveComponent("el-collapse-transition");
  return vue.openBlock(), vue.createBlock("div", {
    class: ["el-collapse-item", { "is-active": _ctx.isActive, "is-disabled": _ctx.disabled }]
  }, [
    vue.createVNode("div", {
      role: "tab",
      "aria-expanded": _ctx.isActive,
      "aria-controls": `el-collapse-content-${_ctx.id}`,
      "aria-describedby": `el-collapse-content-${_ctx.id}`
    }, [
      vue.createVNode("div", {
        id: `el-collapse-head-${_ctx.id}`,
        class: ["el-collapse-item__header", {
          "focusing": _ctx.focusing,
          "is-active": _ctx.isActive
        }],
        role: "button",
        tabindex: _ctx.disabled ? -1 : 0,
        onClick: _cache[1] || (_cache[1] = (...args) => _ctx.handleHeaderClick && _ctx.handleHeaderClick(...args)),
        onKeyup: _cache[2] || (_cache[2] = vue.withKeys(vue.withModifiers((...args) => _ctx.handleEnterClick && _ctx.handleEnterClick(...args), ["stop"]), ["space", "enter"])),
        onFocus: _cache[3] || (_cache[3] = (...args) => _ctx.handleFocus && _ctx.handleFocus(...args)),
        onBlur: _cache[4] || (_cache[4] = ($event) => _ctx.focusing = false)
      }, [
        vue.renderSlot(_ctx.$slots, "title", {}, () => [
          vue.createTextVNode(vue.toDisplayString(_ctx.title), 1)
        ]),
        vue.createVNode("i", {
          class: ["el-collapse-item__arrow el-icon-arrow-right", { "is-active": _ctx.isActive }]
        }, null, 2)
      ], 42, ["id", "tabindex"])
    ], 8, ["aria-expanded", "aria-controls", "aria-describedby"]),
    vue.createVNode(_component_el_collapse_transition, null, {
      default: vue.withCtx(() => [
        vue.withDirectives(vue.createVNode("div", {
          id: `el-collapse-content-${_ctx.id}`,
          class: "el-collapse-item__wrap",
          role: "tabpanel",
          "aria-hidden": !_ctx.isActive,
          "aria-labelledby": `el-collapse-head-${_ctx.id}`
        }, [
          vue.createVNode("div", _hoisted_1, [
            vue.renderSlot(_ctx.$slots, "default")
          ])
        ], 8, ["id", "aria-hidden", "aria-labelledby"]), [
          [vue.vShow, _ctx.isActive]
        ])
      ]),
      _: 3
    })
  ], 2);
}

script.render = render;
script.__file = "packages/collapse/src/collapse-item.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _CollapseItem = script;

exports.default = _CollapseItem;
