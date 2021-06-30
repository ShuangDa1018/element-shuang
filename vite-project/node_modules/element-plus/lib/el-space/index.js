'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var vnode = require('../utils/vnode');
var util = require('../utils/util');
var validators = require('../utils/validators');

var script = vue.defineComponent({
  props: {
    prefixCls: {
      type: String,
      default: "el-space"
    }
  },
  setup(props) {
    return {
      classes: vue.computed(() => `${props.prefixCls}__item`)
    };
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("div", { class: _ctx.classes }, [
    vue.renderSlot(_ctx.$slots, "default")
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
      return vue.isVNode(val) || util.isNumber(val) || util.isString(val);
    }
  },
  wrap: {
    type: Boolean,
    default: false
  },
  size: {
    type: [String, Array, Number],
    validator: (val) => {
      return validators.isValidComponentSize(val) || util.isNumber(val) || util.isArray(val);
    }
  }
};
function useSpace(props) {
  const classes = vue.computed(() => [
    "el-space",
    `el-space--${props.direction}`,
    props.class
  ]);
  const horizontalSize = vue.ref(0);
  const verticalSize = vue.ref(0);
  vue.watch(() => [props.size, props.wrap, props.direction], ([size = "small", wrap, dir]) => {
    if (util.isArray(size)) {
      const [h = 0, v = 0] = size;
      horizontalSize.value = h;
      verticalSize.value = v;
    } else {
      let val;
      if (util.isNumber(size)) {
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
  const containerStyle = vue.computed(() => {
    const wrapKls = props.wrap ? { flexWrap: "wrap", marginBottom: `-${verticalSize.value}px` } : null;
    const alignment = {
      alignItems: props.alignment
    };
    return [wrapKls, alignment, props.style];
  });
  const itemStyle = vue.computed(() => {
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

var Space = vue.defineComponent({
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
    const children = vue.renderSlot($slots, "default", { key: 0 }, () => []);
    if (children.children.length === 0)
      return null;
    if (util.isArray(children.children)) {
      let extractedChildren = [];
      children.children.forEach((child, loopKey) => {
        if (vnode.isFragment(child)) {
          if (util.isArray(child.children)) {
            child.children.forEach((nested, key) => {
              extractedChildren.push(vue.createVNode(script, {
                style: itemStyle,
                prefixCls,
                key: `nested-${key}`
              }, {
                default: () => [nested]
              }, vnode.PatchFlags.PROPS | vnode.PatchFlags.STYLE, ["style", "prefixCls"]));
            });
          }
        } else if (vnode.isValidElementNode(child)) {
          extractedChildren.push(vue.createVNode(script, {
            style: itemStyle,
            prefixCls,
            key: `LoopKey${loopKey}`
          }, {
            default: () => [child]
          }, vnode.PatchFlags.PROPS | vnode.PatchFlags.STYLE, ["style", "prefixCls"]));
        }
      });
      if (spacer) {
        const len = extractedChildren.length - 1;
        extractedChildren = extractedChildren.reduce((acc, child, idx) => {
          return idx === len ? [...acc, child] : [
            ...acc,
            child,
            vue.createVNode("span", { style: [itemStyle, direction === "vertical" ? "width: 100%" : null], key: idx }, [
              vue.isVNode(spacer) ? spacer : vue.createTextVNode(spacer, vnode.PatchFlags.TEXT)
            ], vnode.PatchFlags.STYLE)
          ];
        }, []);
      }
      return vue.createVNode("div", {
        class: classes,
        style: containerStyle
      }, extractedChildren, vnode.PatchFlags.STYLE | vnode.PatchFlags.CLASS);
    }
    return children.children;
  }
});

const _Space = Space;
_Space.install = (app) => {
  app.component(_Space.name, _Space);
};

exports.default = _Space;
