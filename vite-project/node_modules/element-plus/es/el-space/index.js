import { defineComponent, computed, openBlock, createBlock, renderSlot, isVNode, ref, watch, createVNode, createTextVNode } from 'vue';
import { isFragment, PatchFlags, isValidElementNode } from '../utils/vnode';
import { isNumber, isString, isArray } from '../utils/util';
import { isValidComponentSize } from '../utils/validators';

var script = defineComponent({
  props: {
    prefixCls: {
      type: String,
      default: "el-space"
    }
  },
  setup(props) {
    return {
      classes: computed(() => `${props.prefixCls}__item`)
    };
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", { class: _ctx.classes }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}

script.render = render;
script.__file = "packages/space/src/item.vue";

const SizeMap = {
  mini: 4,
  small: 8,
  medium: 12,
  large: 16
};
const defaultProps = {
  direction: {
    type: String,
    default: "horizontal"
  },
  class: {
    type: [String, Object, Array],
    default: ""
  },
  style: {
    type: [String, Array, Object]
  },
  alignment: {
    type: String,
    default: "center"
  },
  prefixCls: {
    type: String
  },
  spacer: {
    type: [Object, String, Number],
    default: null,
    validator: (val) => {
      return isVNode(val) || isNumber(val) || isString(val);
    }
  },
  wrap: {
    type: Boolean,
    default: false
  },
  size: {
    type: [String, Array, Number],
    validator: (val) => {
      return isValidComponentSize(val) || isNumber(val) || isArray(val);
    }
  }
};
function useSpace(props) {
  const classes = computed(() => [
    "el-space",
    `el-space--${props.direction}`,
    props.class
  ]);
  const horizontalSize = ref(0);
  const verticalSize = ref(0);
  watch(() => [props.size, props.wrap, props.direction], ([size = "small", wrap, dir]) => {
    if (isArray(size)) {
      const [h = 0, v = 0] = size;
      horizontalSize.value = h;
      verticalSize.value = v;
    } else {
      let val;
      if (isNumber(size)) {
        val = size;
      } else {
        val = SizeMap[size] || SizeMap.small;
      }
      if (wrap && dir === "horizontal") {
        horizontalSize.value = verticalSize.value = val;
      } else {
        if (dir === "horizontal") {
          horizontalSize.value = val;
          verticalSize.value = 0;
        } else {
          verticalSize.value = val;
          horizontalSize.value = 0;
        }
      }
    }
  }, { immediate: true });
  const containerStyle = computed(() => {
    const wrapKls = props.wrap ? { flexWrap: "wrap", marginBottom: `-${verticalSize.value}px` } : null;
    const alignment = {
      alignItems: props.alignment
    };
    return [wrapKls, alignment, props.style];
  });
  const itemStyle = computed(() => {
    return {
      paddingBottom: `${verticalSize.value}px`,
      marginRight: `${horizontalSize.value}px`
    };
  });
  return {
    classes,
    containerStyle,
    itemStyle
  };
}

var Space = defineComponent({
  name: "ElSpace",
  props: defaultProps,
  setup(props) {
    return useSpace(props);
  },
  render(ctx) {
    const {
      classes,
      $slots,
      containerStyle,
      itemStyle,
      spacer,
      prefixCls,
      direction
    } = ctx;
    const children = renderSlot($slots, "default", { key: 0 }, () => []);
    if (children.children.length === 0)
      return null;
    if (isArray(children.children)) {
      let extractedChildren = [];
      children.children.forEach((child, loopKey) => {
        if (isFragment(child)) {
          if (isArray(child.children)) {
            child.children.forEach((nested, key) => {
              extractedChildren.push(createVNode(script, {
                style: itemStyle,
                prefixCls,
                key: `nested-${key}`
              }, {
                default: () => [nested]
              }, PatchFlags.PROPS | PatchFlags.STYLE, ["style", "prefixCls"]));
            });
          }
        } else if (isValidElementNode(child)) {
          extractedChildren.push(createVNode(script, {
            style: itemStyle,
            prefixCls,
            key: `LoopKey${loopKey}`
          }, {
            default: () => [child]
          }, PatchFlags.PROPS | PatchFlags.STYLE, ["style", "prefixCls"]));
        }
      });
      if (spacer) {
        const len = extractedChildren.length - 1;
        extractedChildren = extractedChildren.reduce((acc, child, idx) => {
          return idx === len ? [...acc, child] : [
            ...acc,
            child,
            createVNode("span", { style: [itemStyle, direction === "vertical" ? "width: 100%" : null], key: idx }, [
              isVNode(spacer) ? spacer : createTextVNode(spacer, PatchFlags.TEXT)
            ], PatchFlags.STYLE)
          ];
        }, []);
      }
      return createVNode("div", {
        class: classes,
        style: containerStyle
      }, extractedChildren, PatchFlags.STYLE | PatchFlags.CLASS);
    }
    return children.children;
  }
});

const _Space = Space;
_Space.install = (app) => {
  app.component(_Space.name, _Space);
};

export default _Space;
