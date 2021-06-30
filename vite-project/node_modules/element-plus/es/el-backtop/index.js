import { defineComponent, ref, computed, onMounted, onBeforeUnmount, openBlock, createBlock, Transition, withCtx, withModifiers, renderSlot, createCommentVNode, createVNode } from 'vue';
import throttle from 'lodash/throttle';
import { on, off } from '../utils/dom';
import { easeInOutCubic } from '../utils/animation';
import throwError from '../utils/error';

var script = defineComponent({
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
    const el = ref(null);
    const container = ref(null);
    const visible = ref(false);
    const styleBottom = computed(() => `${props.bottom}px`);
    const styleRight = computed(() => `${props.right}px`);
    const scope = "ElBackTop";
    const scrollToTop = () => {
      const beginTime = Date.now();
      const beginValue = el.value.scrollTop;
      const rAF = window.requestAnimationFrame || ((func) => setTimeout(func, 16));
      const frameFunc = () => {
        const progress = (Date.now() - beginTime) / 500;
        if (progress < 1) {
          el.value.scrollTop = beginValue * (1 - easeInOutCubic(progress));
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
    const throttledScrollHandler = throttle(onScroll, 300);
    onMounted(() => {
      container.value = document;
      el.value = document.documentElement;
      if (props.target) {
        el.value = document.querySelector(props.target);
        if (!el.value) {
          throwError(scope, `target is not existed: ${props.target}`);
        }
        container.value = el.value;
      }
      on(container.value, "scroll", throttledScrollHandler);
    });
    onBeforeUnmount(() => {
      off(container.value, "scroll", throttledScrollHandler);
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

const _hoisted_1 = /* @__PURE__ */ createVNode("i", { class: "el-icon-caret-top" }, null, -1);
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Transition, { name: "el-fade-in" }, {
    default: withCtx(() => [
      _ctx.visible ? (openBlock(), createBlock("div", {
        key: 0,
        style: {
          "right": _ctx.styleRight,
          "bottom": _ctx.styleBottom
        },
        class: "el-backtop",
        onClick: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.handleClick && _ctx.handleClick(...args), ["stop"]))
      }, [
        renderSlot(_ctx.$slots, "default", {}, () => [
          _hoisted_1
        ])
      ], 4)) : createCommentVNode("v-if", true)
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

export default _Backtop;
