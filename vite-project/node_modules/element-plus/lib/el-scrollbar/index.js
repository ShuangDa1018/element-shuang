'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var resizeEvent = require('../utils/resize-event');
var util = require('../utils/util');
var vue = require('vue');
var dom = require('../utils/dom');

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

var script = vue.defineComponent({
  name: "Bar",
  props: {
    vertical: Boolean,
    size: String,
    move: Number
  },
  setup(props) {
    const instance = vue.ref(null);
    const thumb = vue.ref(null);
    const scrollbar = vue.inject("scrollbar", {});
    const wrap = vue.inject("scrollbar-wrap", {});
    const bar = vue.computed(() => BAR_MAP[props.vertical ? "vertical" : "horizontal"]);
    const barStore = vue.ref({});
    const cursorDown = vue.ref(null);
    const cursorLeave = vue.ref(null);
    const visible = vue.ref(false);
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
      dom.on(document, "mousemove", mouseMoveDocumentHandler);
      dom.on(document, "mouseup", mouseUpDocumentHandler);
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
      dom.off(document, "mousemove", mouseMoveDocumentHandler);
      document.onselectstart = onselectstartStore;
      if (cursorLeave.value) {
        visible.value = false;
      }
    };
    const thumbStyle = vue.computed(() => renderThumbStyle({
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
    vue.onMounted(() => {
      dom.on(scrollbar.value, "mousemove", mouseMoveScrollbarHandler);
      dom.on(scrollbar.value, "mouseleave", mouseLeaveScrollbarHandler);
    });
    vue.onBeforeUnmount(() => {
      dom.off(document, "mouseup", mouseUpDocumentHandler);
      dom.off(scrollbar.value, "mousemove", mouseMoveScrollbarHandler);
      dom.off(scrollbar.value, "mouseleave", mouseLeaveScrollbarHandler);
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
  return vue.openBlock(), vue.createBlock(vue.Transition, { name: "el-scrollbar-fade" }, {
    default: vue.withCtx(() => [
      vue.withDirectives(vue.createVNode("div", {
        ref: "instance",
        class: ["el-scrollbar__bar", "is-" + _ctx.bar.key],
        onMousedown: _cache[2] || (_cache[2] = (...args) => _ctx.clickTrackHandler && _ctx.clickTrackHandler(...args))
      }, [
        vue.createVNode("div", {
          ref: "thumb",
          class: "el-scrollbar__thumb",
          style: _ctx.thumbStyle,
          onMousedown: _cache[1] || (_cache[1] = (...args) => _ctx.clickThumbHandler && _ctx.clickThumbHandler(...args))
        }, null, 36)
      ], 34), [
        [vue.vShow, _ctx.visible]
      ])
    ]),
    _: 1
  });
}

script.render = render;
script.__file = "packages/scrollbar/src/bar.vue";

var script$1 = vue.defineComponent({
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
    const sizeWidth = vue.ref("0");
    const sizeHeight = vue.ref("0");
    const moveX = vue.ref(0);
    const moveY = vue.ref(0);
    const scrollbar = vue.ref(null);
    const wrap = vue.ref(null);
    const resize = vue.ref(null);
    vue.provide("scrollbar", scrollbar);
    vue.provide("scrollbar-wrap", wrap);
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
    const style = vue.computed(() => {
      let style2 = props.wrapStyle;
      if (util.isArray(style2)) {
        style2 = util.toObject(style2);
        style2.height = util.addUnit(props.height);
        style2.maxHeight = util.addUnit(props.maxHeight);
      } else if (util.isString(style2)) {
        style2 += util.addUnit(props.height) ? `height: ${util.addUnit(props.height)};` : "";
        style2 += util.addUnit(props.maxHeight) ? `max-height: ${util.addUnit(props.maxHeight)};` : "";
      }
      return style2;
    });
    vue.onMounted(() => {
      if (!props.native) {
        vue.nextTick(update);
      }
      if (!props.noresize) {
        resizeEvent.addResizeListener(resize.value, update);
        addEventListener("resize", update);
      }
    });
    vue.onBeforeUnmount(() => {
      if (!props.noresize) {
        resizeEvent.removeResizeListener(resize.value, update);
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
  const _component_bar = vue.resolveComponent("bar");
  return vue.openBlock(), vue.createBlock("div", _hoisted_1, [
    vue.createVNode("div", {
      ref: "wrap",
      class: [
        _ctx.wrapClass,
        "el-scrollbar__wrap",
        _ctx.native ? "" : "el-scrollbar__wrap--hidden-default"
      ],
      style: _ctx.style,
      onScroll: _cache[1] || (_cache[1] = (...args) => _ctx.handleScroll && _ctx.handleScroll(...args))
    }, [
      (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.tag), {
        ref: "resize",
        class: ["el-scrollbar__view", _ctx.viewClass],
        style: _ctx.viewStyle
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["class", "style"]))
    ], 38),
    !_ctx.native ? (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 0 }, [
      vue.createVNode(_component_bar, {
        move: _ctx.moveX,
        size: _ctx.sizeWidth
      }, null, 8, ["move", "size"]),
      vue.createVNode(_component_bar, {
        vertical: "",
        move: _ctx.moveY,
        size: _ctx.sizeHeight
      }, null, 8, ["move", "size"])
    ], 64)) : vue.createCommentVNode("v-if", true)
  ], 512);
}

script$1.render = render$1;
script$1.__file = "packages/scrollbar/src/index.vue";

script$1.install = (app) => {
  app.component(script$1.name, script$1);
};
const _Scrollbar = script$1;

exports.default = _Scrollbar;
