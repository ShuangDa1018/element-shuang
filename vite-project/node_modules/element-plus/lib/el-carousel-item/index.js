'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var util = require('../utils/util');

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
const CARD_SCALE = 0.83;
var script = vue.defineComponent({
  name: "ElCarouselItem",
  props: {
    name: { type: String, default: "" },
    label: {
      type: [String, Number],
      default: ""
    }
  },
  setup(props) {
    const instance = vue.getCurrentInstance();
    instance.uid;
    const data = vue.reactive({
      hover: false,
      translate: 0,
      scale: 1,
      active: false,
      ready: false,
      inStage: false,
      animating: false
    });
    const injectCarouselScope = vue.inject("injectCarouselScope");
    const parentDirection = vue.computed(() => {
      return injectCarouselScope.direction;
    });
    const itemStyle = vue.computed(() => {
      const translateType = parentDirection.value === "vertical" ? "translateY" : "translateX";
      const value = `${translateType}(${data.translate}px) scale(${data.scale})`;
      const style = {
        transform: value
      };
      return util.autoprefixer(style);
    });
    function processIndex(index, activeIndex, length) {
      if (activeIndex === 0 && index === length - 1) {
        return -1;
      } else if (activeIndex === length - 1 && index === 0) {
        return length;
      } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
        return length + 1;
      } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
        return -2;
      }
      return index;
    }
    function calcCardTranslate(index, activeIndex) {
      const parentWidth = injectCarouselScope.offsetWidth.value;
      if (data.inStage) {
        return parentWidth * ((2 - CARD_SCALE) * (index - activeIndex) + 1) / 4;
      } else if (index < activeIndex) {
        return -(1 + CARD_SCALE) * parentWidth / 4;
      } else {
        return (3 + CARD_SCALE) * parentWidth / 4;
      }
    }
    function calcTranslate(index, activeIndex, isVertical) {
      const distance = injectCarouselScope[isVertical ? "offsetHeight" : "offsetWidth"].value;
      return distance * (index - activeIndex);
    }
    const translateItem = (index, activeIndex, oldIndex) => {
      const parentType = injectCarouselScope.type;
      const length = injectCarouselScope.items.value.length;
      if (parentType !== "card" && oldIndex !== void 0) {
        data.animating = index === activeIndex || index === oldIndex;
      }
      if (index !== activeIndex && length > 2 && injectCarouselScope.loop) {
        index = processIndex(index, activeIndex, length);
      }
      if (parentType === "card") {
        if (parentDirection.value === "vertical") {
          console.warn("[Element Warn][Carousel]vertical direction is not supported in card mode");
        }
        data.inStage = Math.round(Math.abs(index - activeIndex)) <= 1;
        data.active = index === activeIndex;
        data.translate = calcCardTranslate(index, activeIndex);
        data.scale = data.active ? 1 : CARD_SCALE;
      } else {
        data.active = index === activeIndex;
        const isVertical = parentDirection.value === "vertical";
        data.translate = calcTranslate(index, activeIndex, isVertical);
      }
      data.ready = true;
    };
    function handleItemClick() {
      if (injectCarouselScope && injectCarouselScope.type === "card") {
        const index = injectCarouselScope.items.value.map((d) => d.uid).indexOf(instance.uid);
        injectCarouselScope.setActiveItem(index);
      }
    }
    vue.onMounted(() => {
      if (injectCarouselScope.addItem) {
        injectCarouselScope.addItem(__spreadProps(__spreadValues(__spreadValues({
          uid: instance.uid
        }, props), vue.toRefs(data)), {
          translateItem
        }));
      }
    });
    vue.onUnmounted(() => {
      if (injectCarouselScope.removeItem) {
        injectCarouselScope.removeItem(instance.uid);
      }
    });
    return {
      data,
      itemStyle,
      translateItem,
      type: injectCarouselScope.type,
      handleItemClick
    };
  }
});

const _hoisted_1 = {
  key: 0,
  class: "el-carousel__mask"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.withDirectives((vue.openBlock(), vue.createBlock("div", {
    class: ["el-carousel__item", {
      "is-active": _ctx.data.active,
      "el-carousel__item--card": _ctx.type === "card",
      "is-in-stage": _ctx.data.inStage,
      "is-hover": _ctx.data.hover,
      "is-animating": _ctx.data.animating
    }],
    style: _ctx.itemStyle,
    onClick: _cache[1] || (_cache[1] = (...args) => _ctx.handleItemClick && _ctx.handleItemClick(...args))
  }, [
    _ctx.type === "card" ? vue.withDirectives((vue.openBlock(), vue.createBlock("div", _hoisted_1, null, 512)), [
      [vue.vShow, !_ctx.data.active]
    ]) : vue.createCommentVNode("v-if", true),
    vue.renderSlot(_ctx.$slots, "default")
  ], 6)), [
    [vue.vShow, _ctx.data.ready]
  ]);
}

script.render = render;
script.__file = "packages/carousel/src/item.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _CarouselItem = script;

exports.default = _CarouselItem;
