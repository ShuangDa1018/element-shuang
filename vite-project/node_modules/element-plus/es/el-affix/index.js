import { defineComponent, ref, reactive, computed, watch, onMounted, onBeforeUnmount, openBlock, createBlock, createVNode, renderSlot } from 'vue';
import { getScrollContainer, on, off } from '../utils/dom';
import { addResizeListener, removeResizeListener } from '../utils/resize-event';

var script = defineComponent({
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
    const target = ref(null);
    const root = ref(null);
    const scrollContainer = ref(null);
    const state = reactive({
      fixed: false,
      height: 0,
      width: 0,
      scrollTop: 0,
      clientHeight: 0,
      transform: 0
    });
    const rootStyle = computed(() => {
      return {
        height: state.fixed ? `${state.height}px` : "",
        width: state.fixed ? `${state.width}px` : ""
      };
    });
    const affixStyle = computed(() => {
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
    watch(() => state.fixed, () => {
      emit("change", state.fixed);
    });
    onMounted(() => {
      if (props.target) {
        target.value = document.querySelector(props.target);
        if (!target.value) {
          throw new Error(`target is not existed: ${props.target}`);
        }
      } else {
        target.value = document.documentElement;
      }
      scrollContainer.value = getScrollContainer(root.value);
      on(scrollContainer.value, "scroll", onScroll);
      addResizeListener(root.value, updateState);
    });
    onBeforeUnmount(() => {
      off(scrollContainer.value, "scroll", onScroll);
      removeResizeListener(root.value, updateState);
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
  return openBlock(), createBlock("div", {
    ref: "root",
    class: "el-affix",
    style: _ctx.rootStyle
  }, [
    createVNode("div", {
      class: { "el-affix--fixed": _ctx.state.fixed },
      style: _ctx.affixStyle
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 6)
  ], 4);
}

script.render = render;
script.__file = "packages/affix/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Affix = script;

export default _Affix;
