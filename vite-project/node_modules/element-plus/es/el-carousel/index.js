import { defineComponent, reactive, ref, computed, watch, onMounted, nextTick, onBeforeUnmount, provide, openBlock, createBlock, withModifiers, createVNode, Transition, withCtx, withDirectives, vShow, createCommentVNode, renderSlot, Fragment, renderList, toDisplayString } from 'vue';
import throttle from 'lodash/throttle';
import { addResizeListener, removeResizeListener } from '../utils/resize-event';

var script = defineComponent({
  name: "ElCarousel",
  props: {
    initialIndex: {
      type: Number,
      default: 0
    },
    height: { type: String, default: "" },
    trigger: {
      type: String,
      default: "hover"
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3e3
    },
    indicatorPosition: { type: String, default: "" },
    indicator: {
      type: Boolean,
      default: true
    },
    arrow: {
      type: String,
      default: "hover"
    },
    type: { type: String, default: "" },
    loop: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String,
      default: "horizontal",
      validator(val) {
        return ["horizontal", "vertical"].includes(val);
      }
    },
    pauseOnHover: {
      type: Boolean,
      default: true
    }
  },
  emits: ["change"],
  setup(props, { emit }) {
    const data = reactive({
      activeIndex: -1,
      containerWidth: 0,
      timer: null,
      hover: false
    });
    const root = ref(null);
    const items = ref([]);
    const offsetWidth = ref(0);
    const offsetHeight = ref(0);
    const arrowDisplay = computed(() => props.arrow !== "never" && props.direction !== "vertical");
    const hasLabel = computed(() => {
      return items.value.some((item) => item.label.toString().length > 0);
    });
    const carouselClasses = computed(() => {
      const classes = ["el-carousel", "el-carousel--" + props.direction];
      if (props.type === "card") {
        classes.push("el-carousel--card");
      }
      return classes;
    });
    const indicatorsClasses = computed(() => {
      const classes = [
        "el-carousel__indicators",
        "el-carousel__indicators--" + props.direction
      ];
      if (hasLabel.value) {
        classes.push("el-carousel__indicators--labels");
      }
      if (props.indicatorPosition === "outside" || props.type === "card") {
        classes.push("el-carousel__indicators--outside");
      }
      return classes;
    });
    const throttledArrowClick = throttle((index) => {
      setActiveItem(index);
    }, 300, { trailing: true });
    const throttledIndicatorHover = throttle((index) => {
      handleIndicatorHover(index);
    }, 300);
    function pauseTimer() {
      if (data.timer) {
        clearInterval(data.timer);
        data.timer = null;
      }
    }
    function startTimer() {
      if (props.interval <= 0 || !props.autoplay || data.timer)
        return;
      data.timer = setInterval(() => playSlides(), props.interval);
    }
    const playSlides = () => {
      if (data.activeIndex < items.value.length - 1) {
        data.activeIndex = data.activeIndex + 1;
      } else if (props.loop) {
        data.activeIndex = 0;
      }
    };
    function setActiveItem(index) {
      if (typeof index === "string") {
        const filteredItems = items.value.filter((item) => item.name === index);
        if (filteredItems.length > 0) {
          index = items.value.indexOf(filteredItems[0]);
        }
      }
      index = Number(index);
      if (isNaN(index) || index !== Math.floor(index)) {
        console.warn("[Element Warn][Carousel]index must be an integer.");
        return;
      }
      let length = items.value.length;
      const oldIndex = data.activeIndex;
      if (index < 0) {
        data.activeIndex = props.loop ? length - 1 : 0;
      } else if (index >= length) {
        data.activeIndex = props.loop ? 0 : length - 1;
      } else {
        data.activeIndex = index;
      }
      if (oldIndex === data.activeIndex) {
        resetItemPosition(oldIndex);
      }
    }
    function resetItemPosition(oldIndex) {
      items.value.forEach((item, index) => {
        item.translateItem(index, data.activeIndex, oldIndex);
      });
    }
    function addItem(item) {
      items.value.push(item);
    }
    function removeItem(uid) {
      const index = items.value.findIndex((item) => item.uid === uid);
      if (index !== -1) {
        items.value.splice(index, 1);
        if (data.activeIndex === index)
          next();
      }
    }
    function itemInStage(item, index) {
      const length = items.value.length;
      if (index === length - 1 && item.inStage && items.value[0].active || item.inStage && items.value[index + 1] && items.value[index + 1].active) {
        return "left";
      } else if (index === 0 && item.inStage && items.value[length - 1].active || item.inStage && items.value[index - 1] && items.value[index - 1].active) {
        return "right";
      }
      return false;
    }
    function handleMouseEnter() {
      data.hover = true;
      if (props.pauseOnHover) {
        pauseTimer();
      }
    }
    function handleMouseLeave() {
      data.hover = false;
      startTimer();
    }
    function handleButtonEnter(arrow) {
      if (props.direction === "vertical")
        return;
      items.value.forEach((item, index) => {
        if (arrow === itemInStage(item, index)) {
          item.hover = true;
        }
      });
    }
    function handleButtonLeave() {
      if (props.direction === "vertical")
        return;
      items.value.forEach((item) => {
        item.hover = false;
      });
    }
    function handleIndicatorClick(index) {
      data.activeIndex = index;
    }
    function handleIndicatorHover(index) {
      if (props.trigger === "hover" && index !== data.activeIndex) {
        data.activeIndex = index;
      }
    }
    function prev() {
      setActiveItem(data.activeIndex - 1);
    }
    function next() {
      setActiveItem(data.activeIndex + 1);
    }
    watch(() => data.activeIndex, (current, prev2) => {
      resetItemPosition(prev2);
      if (prev2 > -1) {
        emit("change", current, prev2);
      }
    });
    watch(() => props.autoplay, (current) => {
      current ? startTimer() : pauseTimer();
    });
    watch(() => props.loop, () => {
      setActiveItem(data.activeIndex);
    });
    onMounted(() => {
      nextTick(() => {
        addResizeListener(root.value, resetItemPosition);
        if (root.value) {
          offsetWidth.value = root.value.offsetWidth;
          offsetHeight.value = root.value.offsetHeight;
        }
        if (props.initialIndex < items.value.length && props.initialIndex >= 0) {
          data.activeIndex = props.initialIndex;
        }
        startTimer();
      });
    });
    onBeforeUnmount(() => {
      if (root.value)
        removeResizeListener(root.value, resetItemPosition);
      pauseTimer();
    });
    provide("injectCarouselScope", {
      direction: props.direction,
      offsetWidth,
      offsetHeight,
      type: props.type,
      items,
      loop: props.loop,
      addItem,
      removeItem,
      setActiveItem
    });
    return {
      data,
      props,
      items,
      arrowDisplay,
      carouselClasses,
      indicatorsClasses,
      hasLabel,
      handleMouseEnter,
      handleMouseLeave,
      handleIndicatorClick,
      throttledArrowClick,
      throttledIndicatorHover,
      handleButtonEnter,
      handleButtonLeave,
      prev,
      next,
      setActiveItem,
      root
    };
  }
});

const _hoisted_1 = /* @__PURE__ */ createVNode("i", { class: "el-icon-arrow-left" }, null, -1);
const _hoisted_2 = /* @__PURE__ */ createVNode("i", { class: "el-icon-arrow-right" }, null, -1);
const _hoisted_3 = { class: "el-carousel__button" };
const _hoisted_4 = { key: 0 };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", {
    ref: "root",
    class: _ctx.carouselClasses,
    onMouseenter: _cache[7] || (_cache[7] = withModifiers((...args) => _ctx.handleMouseEnter && _ctx.handleMouseEnter(...args), ["stop"])),
    onMouseleave: _cache[8] || (_cache[8] = withModifiers((...args) => _ctx.handleMouseLeave && _ctx.handleMouseLeave(...args), ["stop"]))
  }, [
    createVNode("div", {
      class: "el-carousel__container",
      style: { height: _ctx.height }
    }, [
      _ctx.arrowDisplay ? (openBlock(), createBlock(Transition, {
        key: 0,
        name: "carousel-arrow-left"
      }, {
        default: withCtx(() => [
          withDirectives(createVNode("button", {
            type: "button",
            class: "el-carousel__arrow el-carousel__arrow--left",
            onMouseenter: _cache[1] || (_cache[1] = ($event) => _ctx.handleButtonEnter("left")),
            onMouseleave: _cache[2] || (_cache[2] = (...args) => _ctx.handleButtonLeave && _ctx.handleButtonLeave(...args)),
            onClick: _cache[3] || (_cache[3] = withModifiers(($event) => _ctx.throttledArrowClick(_ctx.data.activeIndex - 1), ["stop"]))
          }, [
            _hoisted_1
          ], 544), [
            [
              vShow,
              (_ctx.arrow === "always" || _ctx.data.hover) && (_ctx.props.loop || _ctx.data.activeIndex > 0)
            ]
          ])
        ]),
        _: 1
      })) : createCommentVNode("v-if", true),
      _ctx.arrowDisplay ? (openBlock(), createBlock(Transition, {
        key: 1,
        name: "carousel-arrow-right"
      }, {
        default: withCtx(() => [
          withDirectives(createVNode("button", {
            type: "button",
            class: "el-carousel__arrow el-carousel__arrow--right",
            onMouseenter: _cache[4] || (_cache[4] = ($event) => _ctx.handleButtonEnter("right")),
            onMouseleave: _cache[5] || (_cache[5] = (...args) => _ctx.handleButtonLeave && _ctx.handleButtonLeave(...args)),
            onClick: _cache[6] || (_cache[6] = withModifiers(($event) => _ctx.throttledArrowClick(_ctx.data.activeIndex + 1), ["stop"]))
          }, [
            _hoisted_2
          ], 544), [
            [
              vShow,
              (_ctx.arrow === "always" || _ctx.data.hover) && (_ctx.props.loop || _ctx.data.activeIndex < _ctx.items.length - 1)
            ]
          ])
        ]),
        _: 1
      })) : createCommentVNode("v-if", true),
      renderSlot(_ctx.$slots, "default")
    ], 4),
    _ctx.indicatorPosition !== "none" ? (openBlock(), createBlock("ul", {
      key: 0,
      class: _ctx.indicatorsClasses
    }, [
      (openBlock(true), createBlock(Fragment, null, renderList(_ctx.items, (item, index) => {
        return openBlock(), createBlock("li", {
          key: index,
          class: [
            "el-carousel__indicator",
            "el-carousel__indicator--" + _ctx.direction,
            { "is-active": index === _ctx.data.activeIndex }
          ],
          onMouseenter: ($event) => _ctx.throttledIndicatorHover(index),
          onClick: withModifiers(($event) => _ctx.handleIndicatorClick(index), ["stop"])
        }, [
          createVNode("button", _hoisted_3, [
            _ctx.hasLabel ? (openBlock(), createBlock("span", _hoisted_4, toDisplayString(item.label), 1)) : createCommentVNode("v-if", true)
          ])
        ], 42, ["onMouseenter", "onClick"]);
      }), 128))
    ], 2)) : createCommentVNode("v-if", true)
  ], 34);
}

script.render = render;
script.__file = "packages/carousel/src/main.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Carousel = script;

export default _Carousel;
