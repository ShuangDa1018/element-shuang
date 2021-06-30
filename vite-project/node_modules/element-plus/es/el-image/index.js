import { defineComponent, ref, computed, watch, onMounted, nextTick, onBeforeUnmount, resolveComponent, openBlock, createBlock, renderSlot, createVNode, toDisplayString, mergeProps, Teleport, Fragment, createCommentVNode } from 'vue';
import throttle from 'lodash/throttle';
import { useAttrs } from '../hooks';
import isServer from '../utils/isServer';
import { getScrollContainer, on, off, isInContainer } from '../utils/dom';
import { t } from '../locale';
import ImageViewer from '../el-image-viewer';

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
var script = defineComponent({
  name: "ElImage",
  components: {
    ImageViewer
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
    const attrs = useAttrs();
    const hasLoadError = ref(false);
    const loading = ref(true);
    const imgWidth = ref(0);
    const imgHeight = ref(0);
    const showViewer = ref(false);
    const container = ref(null);
    let _scrollContainer = null;
    let _lazyLoadHandler = null;
    const imageStyle = computed(() => {
      const { fit } = props;
      if (!isServer && fit) {
        return isSupportObjectFit() ? { "object-fit": fit } : getImageStyle(fit);
      }
      return {};
    });
    const alignCenter = computed(() => {
      const { fit } = props;
      return !isServer && !isSupportObjectFit() && fit !== ObjectFit.FILL;
    });
    const preview = computed(() => {
      const { previewSrcList } = props;
      return Array.isArray(previewSrcList) && previewSrcList.length > 0;
    });
    const imageIndex = computed(() => {
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
      if (isServer)
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
      if (isInContainer(container.value, _scrollContainer)) {
        loadImage();
        removeLazyLoadListener();
      }
    }
    function addLazyLoadListener() {
      if (isServer)
        return;
      const { scrollContainer } = props;
      if (isHtmlEle(scrollContainer)) {
        _scrollContainer = scrollContainer;
      } else if (isString(scrollContainer) && scrollContainer !== "") {
        _scrollContainer = document.querySelector(scrollContainer);
      } else {
        _scrollContainer = getScrollContainer(container.value);
      }
      if (_scrollContainer) {
        _lazyLoadHandler = throttle(handleLazyLoad, 200);
        on(_scrollContainer, "scroll", _lazyLoadHandler);
        setTimeout(() => handleLazyLoad(), 100);
      }
    }
    function removeLazyLoadListener() {
      if (isServer || !_scrollContainer || !_lazyLoadHandler)
        return;
      off(_scrollContainer, "scroll", _lazyLoadHandler);
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
    watch(() => props.src, () => {
      loadImage();
    });
    onMounted(() => {
      if (props.lazy) {
        nextTick(addLazyLoadListener);
      } else {
        loadImage();
      }
    });
    onBeforeUnmount(() => {
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
      t
    };
  }
});

const _hoisted_1 = /* @__PURE__ */ createVNode("div", { class: "el-image__placeholder" }, null, -1);
const _hoisted_2 = { class: "el-image__error" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_image_viewer = resolveComponent("image-viewer");
  return openBlock(), createBlock("div", {
    ref: "container",
    class: ["el-image", _ctx.$attrs.class],
    style: _ctx.$attrs.style
  }, [
    _ctx.loading ? renderSlot(_ctx.$slots, "placeholder", { key: 0 }, () => [
      _hoisted_1
    ]) : _ctx.hasLoadError ? renderSlot(_ctx.$slots, "error", { key: 1 }, () => [
      createVNode("div", _hoisted_2, toDisplayString(_ctx.t("el.image.error")), 1)
    ]) : (openBlock(), createBlock("img", mergeProps({
      key: 2,
      class: "el-image__inner"
    }, _ctx.attrs, {
      src: _ctx.src,
      style: _ctx.imageStyle,
      class: { "el-image__inner--center": _ctx.alignCenter, "el-image__preview": _ctx.preview },
      onClick: _cache[1] || (_cache[1] = (...args) => _ctx.clickHandler && _ctx.clickHandler(...args))
    }), null, 16, ["src"])),
    (openBlock(), createBlock(Teleport, {
      to: "body",
      disabled: !_ctx.appendToBody
    }, [
      _ctx.preview ? (openBlock(), createBlock(Fragment, { key: 0 }, [
        _ctx.showViewer ? (openBlock(), createBlock(_component_image_viewer, {
          key: 0,
          "z-index": _ctx.zIndex,
          "initial-index": _ctx.imageIndex,
          "url-list": _ctx.previewSrcList,
          "hide-on-click-modal": _ctx.hideOnClickModal,
          onClose: _ctx.closeViewer
        }, null, 8, ["z-index", "initial-index", "url-list", "hide-on-click-modal", "onClose"])) : createCommentVNode("v-if", true)
      ], 2112)) : createCommentVNode("v-if", true)
    ], 8, ["disabled"]))
  ], 6);
}

script.render = render;
script.__file = "packages/image/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Image = script;

export default _Image;
