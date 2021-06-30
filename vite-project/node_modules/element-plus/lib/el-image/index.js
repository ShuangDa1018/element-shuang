'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var throttle = require('lodash/throttle');
var hooks = require('../hooks');
var isServer = require('../utils/isServer');
var dom = require('../utils/dom');
var locale = require('../locale');
var ImageViewer = require('../el-image-viewer');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var throttle__default = /*#__PURE__*/_interopDefaultLegacy(throttle);
var isServer__default = /*#__PURE__*/_interopDefaultLegacy(isServer);
var ImageViewer__default = /*#__PURE__*/_interopDefaultLegacy(ImageViewer);

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 * IMPORTANT: all calls of this function must be prefixed with
 * \/\*#\_\_PURE\_\_\*\/
 * So that rollup can tree-shake them if necessary.
 */
const EMPTY_OBJ = (process.env.NODE_ENV !== 'production')
    ? Object.freeze({})
    : {};
const EMPTY_ARR = (process.env.NODE_ENV !== 'production') ? Object.freeze([]) : [];
const isString = (val) => typeof val === 'string';

const isSupportObjectFit = () => document.documentElement.style.objectFit !== void 0;
const isHtmlEle = (e) => e && e.nodeType === 1;
const ObjectFit = {
  NONE: "none",
  CONTAIN: "contain",
  COVER: "cover",
  FILL: "fill",
  SCALE_DOWN: "scale-down"
};
let prevOverflow = "";
var script = vue.defineComponent({
  name: "ElImage",
  components: {
    ImageViewer: ImageViewer__default['default']
  },
  inheritAttrs: false,
  props: {
    appendToBody: {
      type: Boolean,
      default: false
    },
    hideOnClickModal: {
      type: Boolean,
      default: false
    },
    src: {
      type: String,
      default: ""
    },
    fit: {
      type: String,
      default: ""
    },
    lazy: {
      type: Boolean,
      default: false
    },
    scrollContainer: {
      type: [String, Object],
      default: null
    },
    previewSrcList: {
      type: Array,
      default: () => []
    },
    zIndex: {
      type: Number,
      default: 2e3
    }
  },
  emits: ["error"],
  setup(props, { emit }) {
    const attrs = hooks.useAttrs();
    const hasLoadError = vue.ref(false);
    const loading = vue.ref(true);
    const imgWidth = vue.ref(0);
    const imgHeight = vue.ref(0);
    const showViewer = vue.ref(false);
    const container = vue.ref(null);
    let _scrollContainer = null;
    let _lazyLoadHandler = null;
    const imageStyle = vue.computed(() => {
      const { fit } = props;
      if (!isServer__default['default'] && fit) {
        return isSupportObjectFit() ? { "object-fit": fit } : getImageStyle(fit);
      }
      return {};
    });
    const alignCenter = vue.computed(() => {
      const { fit } = props;
      return !isServer__default['default'] && !isSupportObjectFit() && fit !== ObjectFit.FILL;
    });
    const preview = vue.computed(() => {
      const { previewSrcList } = props;
      return Array.isArray(previewSrcList) && previewSrcList.length > 0;
    });
    const imageIndex = vue.computed(() => {
      const { src, previewSrcList } = props;
      let previewIndex = 0;
      const srcIndex = previewSrcList.indexOf(src);
      if (srcIndex >= 0) {
        previewIndex = srcIndex;
      }
      return previewIndex;
    });
    function getImageStyle(fit) {
      const imageWidth = imgWidth.value;
      const imageHeight = imgHeight.value;
      if (!container.value)
        return {};
      const {
        clientWidth: containerWidth,
        clientHeight: containerHeight
      } = container.value;
      if (!imageWidth || !imageHeight || !containerWidth || !containerHeight)
        return {};
      const imageAspectRatio = imageWidth / imageHeight;
      const containerAspectRatio = containerWidth / containerHeight;
      if (fit === ObjectFit.SCALE_DOWN) {
        const isSmaller = imageWidth < containerWidth && imageHeight < containerHeight;
        fit = isSmaller ? ObjectFit.NONE : ObjectFit.CONTAIN;
      }
      switch (fit) {
        case ObjectFit.NONE:
          return { width: "auto", height: "auto" };
        case ObjectFit.CONTAIN:
          return imageAspectRatio < containerAspectRatio ? { width: "auto" } : { height: "auto" };
        case ObjectFit.COVER:
          return imageAspectRatio < containerAspectRatio ? { height: "auto" } : { width: "auto" };
        default:
          return {};
      }
    }
    const loadImage = () => {
      if (isServer__default['default'])
        return;
      const attributes = attrs.value;
      loading.value = true;
      hasLoadError.value = false;
      const img = new Image();
      img.onload = (e) => handleLoad(e, img);
      img.onerror = handleError;
      Object.keys(attributes).forEach((key) => {
        if (key.toLowerCase() === "onload")
          return;
        const value = attributes[key];
        img.setAttribute(key, value);
      });
      img.src = props.src;
    };
    function handleLoad(e, img) {
      imgWidth.value = img.width;
      imgHeight.value = img.height;
      loading.value = false;
      hasLoadError.value = false;
    }
    function handleError(e) {
      loading.value = false;
      hasLoadError.value = true;
      emit("error", e);
    }
    function handleLazyLoad() {
      if (dom.isInContainer(container.value, _scrollContainer)) {
        loadImage();
        removeLazyLoadListener();
      }
    }
    function addLazyLoadListener() {
      if (isServer__default['default'])
        return;
      const { scrollContainer } = props;
      if (isHtmlEle(scrollContainer)) {
        _scrollContainer = scrollContainer;
      } else if (isString(scrollContainer) && scrollContainer !== "") {
        _scrollContainer = document.querySelector(scrollContainer);
      } else {
        _scrollContainer = dom.getScrollContainer(container.value);
      }
      if (_scrollContainer) {
        _lazyLoadHandler = throttle__default['default'](handleLazyLoad, 200);
        dom.on(_scrollContainer, "scroll", _lazyLoadHandler);
        setTimeout(() => handleLazyLoad(), 100);
      }
    }
    function removeLazyLoadListener() {
      if (isServer__default['default'] || !_scrollContainer || !_lazyLoadHandler)
        return;
      dom.off(_scrollContainer, "scroll", _lazyLoadHandler);
      _scrollContainer = null;
      _lazyLoadHandler = null;
    }
    function clickHandler() {
      if (!preview.value) {
        return;
      }
      prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      showViewer.value = true;
    }
    function closeViewer() {
      document.body.style.overflow = prevOverflow;
      showViewer.value = false;
    }
    vue.watch(() => props.src, () => {
      loadImage();
    });
    vue.onMounted(() => {
      if (props.lazy) {
        vue.nextTick(addLazyLoadListener);
      } else {
        loadImage();
      }
    });
    vue.onBeforeUnmount(() => {
      props.lazy && removeLazyLoadListener();
    });
    return {
      attrs,
      loading,
      hasLoadError,
      showViewer,
      imgWidth,
      imgHeight,
      imageStyle,
      alignCenter,
      preview,
      imageIndex,
      clickHandler,
      closeViewer,
      container,
      handleError,
      t: locale.t
    };
  }
});

const _hoisted_1 = /* @__PURE__ */ vue.createVNode("div", { class: "el-image__placeholder" }, null, -1);
const _hoisted_2 = { class: "el-image__error" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_image_viewer = vue.resolveComponent("image-viewer");
  return vue.openBlock(), vue.createBlock("div", {
    ref: "container",
    class: ["el-image", _ctx.$attrs.class],
    style: _ctx.$attrs.style
  }, [
    _ctx.loading ? vue.renderSlot(_ctx.$slots, "placeholder", { key: 0 }, () => [
      _hoisted_1
    ]) : _ctx.hasLoadError ? vue.renderSlot(_ctx.$slots, "error", { key: 1 }, () => [
      vue.createVNode("div", _hoisted_2, vue.toDisplayString(_ctx.t("el.image.error")), 1)
    ]) : (vue.openBlock(), vue.createBlock("img", vue.mergeProps({
      key: 2,
      class: "el-image__inner"
    }, _ctx.attrs, {
      src: _ctx.src,
      style: _ctx.imageStyle,
      class: { "el-image__inner--center": _ctx.alignCenter, "el-image__preview": _ctx.preview },
      onClick: _cache[1] || (_cache[1] = (...args) => _ctx.clickHandler && _ctx.clickHandler(...args))
    }), null, 16, ["src"])),
    (vue.openBlock(), vue.createBlock(vue.Teleport, {
      to: "body",
      disabled: !_ctx.appendToBody
    }, [
      _ctx.preview ? (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 0 }, [
        _ctx.showViewer ? (vue.openBlock(), vue.createBlock(_component_image_viewer, {
          key: 0,
          "z-index": _ctx.zIndex,
          "initial-index": _ctx.imageIndex,
          "url-list": _ctx.previewSrcList,
          "hide-on-click-modal": _ctx.hideOnClickModal,
          onClose: _ctx.closeViewer
        }, null, 8, ["z-index", "initial-index", "url-list", "hide-on-click-modal", "onClose"])) : vue.createCommentVNode("v-if", true)
      ], 2112)) : vue.createCommentVNode("v-if", true)
    ], 8, ["disabled"]))
  ], 6);
}

script.render = render;
script.__file = "packages/image/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Image = script;

exports.default = _Image;
