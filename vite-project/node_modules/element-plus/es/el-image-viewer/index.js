import { defineComponent, ref, computed, watch, nextTick, onMounted, openBlock, createBlock, Transition, withCtx, createVNode, withModifiers, createCommentVNode, Fragment, renderList, withDirectives, vShow } from 'vue';
import { isFirefox, rafThrottle } from '../utils/util';
import { on, off } from '../utils/dom';
import { EVENT_CODE } from '../utils/aria';
import { t } from '../locale';

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
const Mode = {
  CONTAIN: {
    name: "contain",
    icon: "el-icon-full-screen"
  },
  ORIGINAL: {
    name: "original",
    icon: "el-icon-c-scale-to-original"
  }
};
const mousewheelEventName = isFirefox() ? "DOMMouseScroll" : "mousewheel";
const CLOSE_EVENT = "close";
const SWITCH_EVENT = "switch";
var script = defineComponent({
  name: "ElImageViewer",
  props: {
    urlList: {
      type: Array,
      default: []
    },
    zIndex: {
      type: Number,
      default: 2e3
    },
    initialIndex: {
      type: Number,
      default: 0
    },
    infinite: {
      type: Boolean,
      default: true
    },
    hideOnClickModal: {
      type: Boolean,
      default: false
    }
  },
  emits: [CLOSE_EVENT, SWITCH_EVENT],
  setup(props, { emit }) {
    let _keyDownHandler = null;
    let _mouseWheelHandler = null;
    let _dragHandler = null;
    const loading = ref(true);
    const index = ref(props.initialIndex);
    const wrapper = ref(null);
    const img = ref(null);
    const mode = ref(Mode.CONTAIN);
    let transform = ref({
      scale: 1,
      deg: 0,
      offsetX: 0,
      offsetY: 0,
      enableTransition: false
    });
    const isSingle = computed(() => {
      const { urlList } = props;
      return urlList.length <= 1;
    });
    const isFirst = computed(() => {
      return index.value === 0;
    });
    const isLast = computed(() => {
      return index.value === props.urlList.length - 1;
    });
    const currentImg = computed(() => {
      return props.urlList[index.value];
    });
    const imgStyle = computed(() => {
      const { scale, deg, offsetX, offsetY, enableTransition } = transform.value;
      const style = {
        transform: `scale(${scale}) rotate(${deg}deg)`,
        transition: enableTransition ? "transform .3s" : "",
        marginLeft: `${offsetX}px`,
        marginTop: `${offsetY}px`
      };
      if (mode.value.name === Mode.CONTAIN.name) {
        style.maxWidth = style.maxHeight = "100%";
      }
      return style;
    });
    function hide() {
      deviceSupportUninstall();
      emit(CLOSE_EVENT);
    }
    function deviceSupportInstall() {
      _keyDownHandler = rafThrottle((e) => {
        switch (e.code) {
          case EVENT_CODE.esc:
            hide();
            break;
          case EVENT_CODE.space:
            toggleMode();
            break;
          case EVENT_CODE.left:
            prev();
            break;
          case EVENT_CODE.up:
            handleActions("zoomIn");
            break;
          case EVENT_CODE.right:
            next();
            break;
          case EVENT_CODE.down:
            handleActions("zoomOut");
            break;
        }
      });
      _mouseWheelHandler = rafThrottle((e) => {
        const delta = e.wheelDelta ? e.wheelDelta : -e.detail;
        if (delta > 0) {
          handleActions("zoomIn", {
            zoomRate: 0.015,
            enableTransition: false
          });
        } else {
          handleActions("zoomOut", {
            zoomRate: 0.015,
            enableTransition: false
          });
        }
      });
      on(document, "keydown", _keyDownHandler);
      on(document, mousewheelEventName, _mouseWheelHandler);
    }
    function deviceSupportUninstall() {
      off(document, "keydown", _keyDownHandler);
      off(document, mousewheelEventName, _mouseWheelHandler);
      _keyDownHandler = null;
      _mouseWheelHandler = null;
    }
    function handleImgLoad() {
      loading.value = false;
    }
    function handleImgError(e) {
      loading.value = false;
      e.target.alt = t("el.image.error");
    }
    function handleMouseDown(e) {
      if (loading.value || e.button !== 0)
        return;
      const { offsetX, offsetY } = transform.value;
      const startX = e.pageX;
      const startY = e.pageY;
      _dragHandler = rafThrottle((ev) => {
        transform.value = __spreadProps(__spreadValues({}, transform.value), {
          offsetX: offsetX + ev.pageX - startX,
          offsetY: offsetY + ev.pageY - startY
        });
      });
      on(document, "mousemove", _dragHandler);
      on(document, "mouseup", () => {
        off(document, "mousemove", _dragHandler);
      });
      e.preventDefault();
    }
    function reset() {
      transform.value = {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false
      };
    }
    function toggleMode() {
      if (loading.value)
        return;
      const modeNames = Object.keys(Mode);
      const modeValues = Object.values(Mode);
      const currentMode = mode.value.name;
      const index2 = modeValues.findIndex((i) => i.name === currentMode);
      const nextIndex = (index2 + 1) % modeNames.length;
      mode.value = Mode[modeNames[nextIndex]];
      reset();
    }
    function prev() {
      if (isFirst.value && !props.infinite)
        return;
      const len = props.urlList.length;
      index.value = (index.value - 1 + len) % len;
    }
    function next() {
      if (isLast.value && !props.infinite)
        return;
      const len = props.urlList.length;
      index.value = (index.value + 1) % len;
    }
    function handleActions(action, options = {}) {
      if (loading.value)
        return;
      const { zoomRate, rotateDeg, enableTransition } = __spreadValues({
        zoomRate: 0.2,
        rotateDeg: 90,
        enableTransition: true
      }, options);
      switch (action) {
        case "zoomOut":
          if (transform.value.scale > 0.2) {
            transform.value.scale = parseFloat((transform.value.scale - zoomRate).toFixed(3));
          }
          break;
        case "zoomIn":
          transform.value.scale = parseFloat((transform.value.scale + zoomRate).toFixed(3));
          break;
        case "clocelise":
          transform.value.deg += rotateDeg;
          break;
        case "anticlocelise":
          transform.value.deg -= rotateDeg;
          break;
      }
      transform.value.enableTransition = enableTransition;
    }
    watch(currentImg, () => {
      nextTick(() => {
        const $img = img.value;
        if (!$img.complete) {
          loading.value = true;
        }
      });
    });
    watch(index, (val) => {
      reset();
      emit(SWITCH_EVENT, val);
    });
    onMounted(() => {
      var _a, _b;
      deviceSupportInstall();
      (_b = (_a = wrapper.value) == null ? void 0 : _a.focus) == null ? void 0 : _b.call(_a);
    });
    return {
      index,
      wrapper,
      img,
      isSingle,
      isFirst,
      isLast,
      currentImg,
      imgStyle,
      mode,
      handleActions,
      prev,
      next,
      hide,
      toggleMode,
      handleImgLoad,
      handleImgError,
      handleMouseDown
    };
  }
});

const _hoisted_1 = /* @__PURE__ */ createVNode("i", { class: "el-icon-close" }, null, -1);
const _hoisted_2 = /* @__PURE__ */ createVNode("i", { class: "el-icon-arrow-left" }, null, -1);
const _hoisted_3 = /* @__PURE__ */ createVNode("i", { class: "el-icon-arrow-right" }, null, -1);
const _hoisted_4 = { class: "el-image-viewer__btn el-image-viewer__actions" };
const _hoisted_5 = { class: "el-image-viewer__actions__inner" };
const _hoisted_6 = /* @__PURE__ */ createVNode("i", { class: "el-image-viewer__actions__divider" }, null, -1);
const _hoisted_7 = /* @__PURE__ */ createVNode("i", { class: "el-image-viewer__actions__divider" }, null, -1);
const _hoisted_8 = { class: "el-image-viewer__canvas" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Transition, { name: "viewer-fade" }, {
    default: withCtx(() => [
      createVNode("div", {
        ref: "wrapper",
        tabindex: -1,
        class: "el-image-viewer__wrapper",
        style: { zIndex: _ctx.zIndex }
      }, [
        createVNode("div", {
          class: "el-image-viewer__mask",
          onClick: _cache[1] || (_cache[1] = withModifiers(($event) => _ctx.hideOnClickModal && _ctx.hide(), ["self"]))
        }),
        createCommentVNode(" CLOSE "),
        createVNode("span", {
          class: "el-image-viewer__btn el-image-viewer__close",
          onClick: _cache[2] || (_cache[2] = (...args) => _ctx.hide && _ctx.hide(...args))
        }, [
          _hoisted_1
        ]),
        createCommentVNode(" ARROW "),
        !_ctx.isSingle ? (openBlock(), createBlock(Fragment, { key: 0 }, [
          createVNode("span", {
            class: ["el-image-viewer__btn el-image-viewer__prev", { "is-disabled": !_ctx.infinite && _ctx.isFirst }],
            onClick: _cache[3] || (_cache[3] = (...args) => _ctx.prev && _ctx.prev(...args))
          }, [
            _hoisted_2
          ], 2),
          createVNode("span", {
            class: ["el-image-viewer__btn el-image-viewer__next", { "is-disabled": !_ctx.infinite && _ctx.isLast }],
            onClick: _cache[4] || (_cache[4] = (...args) => _ctx.next && _ctx.next(...args))
          }, [
            _hoisted_3
          ], 2)
        ], 64)) : createCommentVNode("v-if", true),
        createCommentVNode(" ACTIONS "),
        createVNode("div", _hoisted_4, [
          createVNode("div", _hoisted_5, [
            createVNode("i", {
              class: "el-icon-zoom-out",
              onClick: _cache[5] || (_cache[5] = ($event) => _ctx.handleActions("zoomOut"))
            }),
            createVNode("i", {
              class: "el-icon-zoom-in",
              onClick: _cache[6] || (_cache[6] = ($event) => _ctx.handleActions("zoomIn"))
            }),
            _hoisted_6,
            createVNode("i", {
              class: _ctx.mode.icon,
              onClick: _cache[7] || (_cache[7] = (...args) => _ctx.toggleMode && _ctx.toggleMode(...args))
            }, null, 2),
            _hoisted_7,
            createVNode("i", {
              class: "el-icon-refresh-left",
              onClick: _cache[8] || (_cache[8] = ($event) => _ctx.handleActions("anticlocelise"))
            }),
            createVNode("i", {
              class: "el-icon-refresh-right",
              onClick: _cache[9] || (_cache[9] = ($event) => _ctx.handleActions("clocelise"))
            })
          ])
        ]),
        createCommentVNode(" CANVAS "),
        createVNode("div", _hoisted_8, [
          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.urlList, (url, i) => {
            return withDirectives((openBlock(), createBlock("img", {
              ref: "img",
              key: url,
              src: url,
              style: _ctx.imgStyle,
              class: "el-image-viewer__img",
              onLoad: _cache[10] || (_cache[10] = (...args) => _ctx.handleImgLoad && _ctx.handleImgLoad(...args)),
              onError: _cache[11] || (_cache[11] = (...args) => _ctx.handleImgError && _ctx.handleImgError(...args)),
              onMousedown: _cache[12] || (_cache[12] = (...args) => _ctx.handleMouseDown && _ctx.handleMouseDown(...args))
            }, null, 44, ["src"])), [
              [vShow, i === _ctx.index]
            ]);
          }), 128))
        ])
      ], 4)
    ]),
    _: 1
  });
}

script.render = render;
script.__file = "packages/image-viewer/src/index.vue";

script.install = (app) => {
  app.component(Image.name, Image);
};
const _ImageViewer = script;

export default _ImageViewer;
