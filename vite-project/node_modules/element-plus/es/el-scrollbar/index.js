import { addResizeListener, removeResizeListener } from '../utils/resize-event';
import { isArray, toObject, addUnit, isString } from '../utils/util';
import { defineComponent, ref, inject, computed, onMounted, onBeforeUnmount, openBlock, createBlock, Transition, withCtx, withDirectives, createVNode, vShow, provide, nextTick, resolveComponent, resolveDynamicComponent, renderSlot, Fragment, createCommentVNode } from 'vue';
import { on, off } from '../utils/dom';

const BAR_MAP = {
  vertical: {
    offset: "offsetHeight",
    scroll: "scrollTop",
    scrollSize: "scrollHeight",
    size: "height",
    key: "vertical",
    axis: "Y",
    client: "clientY",
    direction: "top"
  },
  horizontal: {
    offset: "offsetWidth",
    scroll: "scrollLeft",
    scrollSize: "scrollWidth",
    size: "width",
    key: "horizontal",
    axis: "X",
    client: "clientX",
    direction: "left"
  }
};
function renderThumbStyle({ move, size, bar }) {
  const style = {};
  const translate = `translate${bar.axis}(${move}%)`;
  style[bar.size] = size;
  style.transform = translate;
  style.msTransform = translate;
  style.webkitTransform = translate;
  return style;
}

var script = defineComponent({
  name: "Bar",
  props: {
    vertical: Boolean,
    size: String,
    move: Number
  },
  setup(props) {
    const instance = ref(null);
    const thumb = ref(null);
    const scrollbar = inject("scrollbar", {});
    const wrap = inject("scrollbar-wrap", {});
    const bar = computed(() => BAR_MAP[props.vertical ? "vertical" : "horizontal"]);
    const barStore = ref({});
    const cursorDown = ref(null);
    const cursorLeave = ref(null);
    const visible = ref(false);
    let onselectstartStore = null;
    const clickThumbHandler = (e) => {
      e.stopPropagation();
      if (e.ctrlKey || [1, 2].includes(e.button)) {
        return;
      }
      window.getSelection().removeAllRanges();
      startDrag(e);
      barStore.value[bar.value.axis] = e.currentTarget[bar.value.offset] - (e[bar.value.client] - e.currentTarget.getBoundingClientRect()[bar.value.direction]);
    };
    const clickTrackHandler = (e) => {
      const offset = Math.abs(e.target.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]);
      const thumbHalf = thumb.value[bar.value.offset] / 2;
      const thumbPositionPercentage = (offset - thumbHalf) * 100 / instance.value[bar.value.offset];
      wrap.value[bar.value.scroll] = thumbPositionPercentage * wrap.value[bar.value.scrollSize] / 100;
    };
    const startDrag = (e) => {
      e.stopImmediatePropagation();
      cursorDown.value = true;
      on(document, "mousemove", mouseMoveDocumentHandler);
      on(document, "mouseup", mouseUpDocumentHandler);
      onselectstartStore = document.onselectstart;
      document.onselectstart = () => false;
    };
    const mouseMoveDocumentHandler = (e) => {
      if (cursorDown.value === false)
        return;
      const prevPage = barStore.value[bar.value.axis];
      if (!prevPage)
        return;
      const offset = (instance.value.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]) * -1;
      const thumbClickPosition = thumb.value[bar.value.offset] - prevPage;
      const thumbPositionPercentage = (offset - thumbClickPosition) * 100 / instance.value[bar.value.offset];
      wrap.value[bar.value.scroll] = thumbPositionPercentage * wrap.value[bar.value.scrollSize] / 100;
    };
    const mouseUpDocumentHandler = () => {
      cursorDown.value = false;
      barStore.value[bar.value.axis] = 0;
      off(document, "mousemove", mouseMoveDocumentHandler);
      document.onselectstart = onselectstartStore;
      if (cursorLeave.value) {
        visible.value = false;
      }
    };
    const thumbStyle = computed(() => renderThumbStyle({
      size: props.size,
      move: props.move,
      bar: bar.value
    }));
    const mouseMoveScrollbarHandler = () => {
      cursorLeave.value = false;
      visible.value = !!props.size;
    };
    const mouseLeaveScrollbarHandler = () => {
      cursorLeave.value = true;
      visible.value = cursorDown.value;
    };
    onMounted(() => {
      on(scrollbar.value, "mousemove", mouseMoveScrollbarHandler);
      on(scrollbar.value, "mouseleave", mouseLeaveScrollbarHandler);
    });
    onBeforeUnmount(() => {
      off(document, "mouseup", mouseUpDocumentHandler);
      off(scrollbar.value, "mousemove", mouseMoveScrollbarHandler);
      off(scrollbar.value, "mouseleave", mouseLeaveScrollbarHandler);
    });
    return {
      instance,
      thumb,
      bar,
      clickTrackHandler,
      clickThumbHandler,
      thumbStyle,
      visible
    };
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Transition, { name: "el-scrollbar-fade" }, {
    default: withCtx(() => [
      withDirectives(createVNode("div", {
        ref: "instance",
        class: ["el-scrollbar__bar", "is-" + _ctx.bar.key],
        onMousedown: _cache[2] || (_cache[2] = (...args) => _ctx.clickTrackHandler && _ctx.clickTrackHandler(...args))
      }, [
        createVNode("div", {
          ref: "thumb",
          class: "el-scrollbar__thumb",
          style: _ctx.thumbStyle,
          onMousedown: _cache[1] || (_cache[1] = (...args) => _ctx.clickThumbHandler && _ctx.clickThumbHandler(...args))
        }, null, 36)
      ], 34), [
        [vShow, _ctx.visible]
      ])
    ]),
    _: 1
  });
}

script.render = render;
script.__file = "packages/scrollbar/src/bar.vue";

var script$1 = defineComponent({
  name: "ElScrollbar",
  components: { Bar: script },
  props: {
    height: {
      type: [String, Number],
      default: ""
    },
    maxHeight: {
      type: [String, Number],
      default: ""
    },
    native: {
      type: Boolean,
      default: false
    },
    wrapStyle: {
      type: [String, Array],
      default: ""
    },
    wrapClass: {
      type: [String, Array],
      default: ""
    },
    viewClass: {
      type: [String, Array],
      default: ""
    },
    viewStyle: {
      type: [String, Array],
      default: ""
    },
    noresize: Boolean,
    tag: {
      type: String,
      default: "div"
    }
  },
  emits: ["scroll"],
  setup(props, { emit }) {
    const sizeWidth = ref("0");
    const sizeHeight = ref("0");
    const moveX = ref(0);
    const moveY = ref(0);
    const scrollbar = ref(null);
    const wrap = ref(null);
    const resize = ref(null);
    provide("scrollbar", scrollbar);
    provide("scrollbar-wrap", wrap);
    const handleScroll = () => {
      if (wrap.value) {
        moveY.value = wrap.value.scrollTop * 100 / wrap.value.clientHeight;
        moveX.value = wrap.value.scrollLeft * 100 / wrap.value.clientWidth;
        emit("scroll", {
          scrollLeft: moveX.value,
          scrollTop: moveY.value
        });
      }
    };
    const update = () => {
      if (!wrap.value)
        return;
      const heightPercentage = wrap.value.clientHeight * 100 / wrap.value.scrollHeight;
      const widthPercentage = wrap.value.clientWidth * 100 / wrap.value.scrollWidth;
      sizeHeight.value = heightPercentage < 100 ? heightPercentage + "%" : "";
      sizeWidth.value = widthPercentage < 100 ? widthPercentage + "%" : "";
    };
    const style = computed(() => {
      let style2 = props.wrapStyle;
      if (isArray(style2)) {
        style2 = toObject(style2);
        style2.height = addUnit(props.height);
        style2.maxHeight = addUnit(props.maxHeight);
      } else if (isString(style2)) {
        style2 += addUnit(props.height) ? `height: ${addUnit(props.height)};` : "";
        style2 += addUnit(props.maxHeight) ? `max-height: ${addUnit(props.maxHeight)};` : "";
      }
      return style2;
    });
    onMounted(() => {
      if (!props.native) {
        nextTick(update);
      }
      if (!props.noresize) {
        addResizeListener(resize.value, update);
        addEventListener("resize", update);
      }
    });
    onBeforeUnmount(() => {
      if (!props.noresize) {
        removeResizeListener(resize.value, update);
        removeEventListener("resize", update);
      }
    });
    return {
      moveX,
      moveY,
      sizeWidth,
      sizeHeight,
      style,
      scrollbar,
      wrap,
      resize,
      update,
      handleScroll
    };
  }
});

const _hoisted_1 = {
  ref: "scrollbar",
  class: "el-scrollbar"
};
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bar = resolveComponent("bar");
  return openBlock(), createBlock("div", _hoisted_1, [
    createVNode("div", {
      ref: "wrap",
      class: [
        _ctx.wrapClass,
        "el-scrollbar__wrap",
        _ctx.native ? "" : "el-scrollbar__wrap--hidden-default"
      ],
      style: _ctx.style,
      onScroll: _cache[1] || (_cache[1] = (...args) => _ctx.handleScroll && _ctx.handleScroll(...args))
    }, [
      (openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
        ref: "resize",
        class: ["el-scrollbar__view", _ctx.viewClass],
        style: _ctx.viewStyle
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["class", "style"]))
    ], 38),
    !_ctx.native ? (openBlock(), createBlock(Fragment, { key: 0 }, [
      createVNode(_component_bar, {
        move: _ctx.moveX,
        size: _ctx.sizeWidth
      }, null, 8, ["move", "size"]),
      createVNode(_component_bar, {
        vertical: "",
        move: _ctx.moveY,
        size: _ctx.sizeHeight
      }, null, 8, ["move", "size"])
    ], 64)) : createCommentVNode("v-if", true)
  ], 512);
}

script$1.render = render$1;
script$1.__file = "packages/scrollbar/src/index.vue";

script$1.install = (app) => {
  app.component(script$1.name, script$1);
};
const _Scrollbar = script$1;

export default _Scrollbar;
