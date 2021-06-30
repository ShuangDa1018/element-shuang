'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var dom = require('../utils/dom');
var resizeEvent = require('../utils/resize-event');

var script = vue.defineComponent({
  name: "ElAffix",
  props: {
    zIndex: {
      type: Number,
      default: 100
    },
    target: {
      type: String,
      default: ""
    },
    offset: {
      type: Number,
      default: 0
    },
    position: {
      type: String,
      default: "top"
    }
  },
  emits: ["scroll", "change"],
  setup(props, { emit }) {
    const target = vue.ref(null);
    const root = vue.ref(null);
    const scrollContainer = vue.ref(null);
    const state = vue.reactive({
      fixed: false,
      height: 0,
      width: 0,
      scrollTop: 0,
      clientHeight: 0,
      transform: 0
    });
    const rootStyle = vue.computed(() => {
      return {
        height: state.fixed ? `${state.height}px` : "",
        width: state.fixed ? `${state.width}px` : ""
      };
    });
    const affixStyle = vue.computed(() => {
      if (!state.fixed) {
        return;
      }
      const offset = props.offset ? `${props.offset}px` : 0;
      const transform = state.transform ? `translateY(${state.transform}px)` : "";
      return {
        height: `${state.height}px`,
        width: `${state.width}px`,
        top: props.position === "top" ? offset : "",
        bottom: props.position === "bottom" ? offset : "",
        transform,
        zIndex: props.zIndex
      };
    });
    const updateState = () => {
      const rootRect = root.value.getBoundingClientRect();
      const targetRect = target.value.getBoundingClientRect();
      state.height = rootRect.height;
      state.width = rootRect.width;
      state.scrollTop = scrollContainer.value === window ? document.documentElement.scrollTop : scrollContainer.value.scrollTop;
      state.clientHeight = document.documentElement.clientHeight;
      if (props.position === "top") {
        if (props.target) {
          const difference = targetRect.bottom - props.offset - state.height;
          state.fixed = props.offset > rootRect.top && targetRect.bottom > 0;
          state.transform = difference < 0 ? difference : 0;
        } else {
          state.fixed = props.offset > rootRect.top;
        }
      } else {
        if (props.target) {
          const difference = state.clientHeight - targetRect.top - props.offset - state.height;
          state.fixed = state.clientHeight - props.offset < rootRect.bottom && state.clientHeight > targetRect.top;
          state.transform = difference < 0 ? -difference : 0;
        } else {
          state.fixed = state.clientHeight - props.offset < rootRect.bottom;
        }
      }
    };
    const onScroll = () => {
      updateState();
      emit("scroll", {
        scrollTop: state.scrollTop,
        fixed: state.fixed
      });
    };
    vue.watch(() => state.fixed, () => {
      emit("change", state.fixed);
    });
    vue.onMounted(() => {
      if (props.target) {
        target.value = document.querySelector(props.target);
        if (!target.value) {
          throw new Error(`target is not existed: ${props.target}`);
        }
      } else {
        target.value = document.documentElement;
      }
      scrollContainer.value = dom.getScrollContainer(root.value);
      dom.on(scrollContainer.value, "scroll", onScroll);
      resizeEvent.addResizeListener(root.value, updateState);
    });
    vue.onBeforeUnmount(() => {
      dom.off(scrollContainer.value, "scroll", onScroll);
      resizeEvent.removeResizeListener(root.value, updateState);
    });
    return {
      root,
      state,
      rootStyle,
      affixStyle
    };
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("div", {
    ref: "root",
    class: "el-affix",
    style: _ctx.rootStyle
  }, [
    vue.createVNode("div", {
      class: { "el-affix--fixed": _ctx.state.fixed },
      style: _ctx.affixStyle
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 6)
  ], 4);
}

script.render = render;
script.__file = "packages/affix/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Affix = script;

exports.default = _Affix;
