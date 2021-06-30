'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var throttle = require('lodash/throttle');
var dom = require('../utils/dom');
var animation = require('../utils/animation');
var throwError = require('../utils/error');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var throttle__default = /*#__PURE__*/_interopDefaultLegacy(throttle);
var throwError__default = /*#__PURE__*/_interopDefaultLegacy(throwError);

var script = vue.defineComponent({
  name: "ElBacktop",
  props: {
    visibilityHeight: {
      type: Number,
      default: 200
    },
    target: {
      type: String,
      default: ""
    },
    right: {
      type: Number,
      default: 40
    },
    bottom: {
      type: Number,
      default: 40
    }
  },
  emits: ["click"],
  setup(props, ctx) {
    const el = vue.ref(null);
    const container = vue.ref(null);
    const visible = vue.ref(false);
    const styleBottom = vue.computed(() => `${props.bottom}px`);
    const styleRight = vue.computed(() => `${props.right}px`);
    const scope = "ElBackTop";
    const scrollToTop = () => {
      const beginTime = Date.now();
      const beginValue = el.value.scrollTop;
      const rAF = window.requestAnimationFrame || ((func) => setTimeout(func, 16));
      const frameFunc = () => {
        const progress = (Date.now() - beginTime) / 500;
        if (progress < 1) {
          el.value.scrollTop = beginValue * (1 - animation.easeInOutCubic(progress));
          rAF(frameFunc);
        } else {
          el.value.scrollTop = 0;
        }
      };
      rAF(frameFunc);
    };
    const onScroll = () => {
      visible.value = el.value.scrollTop >= props.visibilityHeight;
    };
    const handleClick = (event) => {
      scrollToTop();
      ctx.emit("click", event);
    };
    const throttledScrollHandler = throttle__default['default'](onScroll, 300);
    vue.onMounted(() => {
      container.value = document;
      el.value = document.documentElement;
      if (props.target) {
        el.value = document.querySelector(props.target);
        if (!el.value) {
          throwError__default['default'](scope, `target is not existed: ${props.target}`);
        }
        container.value = el.value;
      }
      dom.on(container.value, "scroll", throttledScrollHandler);
    });
    vue.onBeforeUnmount(() => {
      dom.off(container.value, "scroll", throttledScrollHandler);
    });
    return {
      el,
      container,
      visible,
      styleBottom,
      styleRight,
      handleClick
    };
  }
});

const _hoisted_1 = /* @__PURE__ */ vue.createVNode("i", { class: "el-icon-caret-top" }, null, -1);
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock(vue.Transition, { name: "el-fade-in" }, {
    default: vue.withCtx(() => [
      _ctx.visible ? (vue.openBlock(), vue.createBlock("div", {
        key: 0,
        style: {
          "right": _ctx.styleRight,
          "bottom": _ctx.styleBottom
        },
        class: "el-backtop",
        onClick: _cache[1] || (_cache[1] = vue.withModifiers((...args) => _ctx.handleClick && _ctx.handleClick(...args), ["stop"]))
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          _hoisted_1
        ])
      ], 4)) : vue.createCommentVNode("v-if", true)
    ]),
    _: 3
  });
}

script.render = render;
script.__file = "packages/backtop/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Backtop = script;

exports.default = _Backtop;
