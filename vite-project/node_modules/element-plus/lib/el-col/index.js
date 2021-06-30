'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

const ElCol = vue.defineComponent({
  name: "ElCol",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    span: {
      type: Number,
      default: 24
    },
    offset: {
      type: Number,
      default: 0
    },
    pull: {
      type: Number,
      default: 0
    },
    push: {
      type: Number,
      default: 0
    },
    xs: {
      type: [Number, Object],
      default: () => ({})
    },
    sm: {
      type: [Number, Object],
      default: () => ({})
    },
    md: {
      type: [Number, Object],
      default: () => ({})
    },
    lg: {
      type: [Number, Object],
      default: () => ({})
    },
    xl: {
      type: [Number, Object],
      default: () => ({})
    }
  },
  setup(props, { slots }) {
    const { gutter } = vue.inject("ElRow", { gutter: { value: 0 } });
    const style = vue.computed(() => {
      if (gutter.value) {
        return {
          paddingLeft: gutter.value / 2 + "px",
          paddingRight: gutter.value / 2 + "px"
        };
      }
      return {};
    });
    const classList = vue.computed(() => {
      const ret = [];
      const pos = ["span", "offset", "pull", "push"];
      pos.forEach((prop) => {
        const size = props[prop];
        if (typeof size === "number") {
          if (prop === "span")
            ret.push(`el-col-${props[prop]}`);
          else if (size > 0)
            ret.push(`el-col-${prop}-${props[prop]}`);
        }
      });
      const sizes = ["xs", "sm", "md", "lg", "xl"];
      sizes.forEach((size) => {
        if (typeof props[size] === "number") {
          ret.push(`el-col-${size}-${props[size]}`);
        } else if (typeof props[size] === "object") {
          const sizeProps = props[size];
          Object.keys(sizeProps).forEach((prop) => {
            ret.push(prop !== "span" ? `el-col-${size}-${prop}-${sizeProps[prop]}` : `el-col-${size}-${sizeProps[prop]}`);
          });
        }
      });
      if (gutter.value) {
        ret.push("is-guttered");
      }
      return ret;
    });
    return () => {
      var _a;
      return vue.h(props.tag, {
        class: ["el-col", classList.value],
        style: style.value
      }, (_a = slots.default) == null ? void 0 : _a.call(slots));
    };
  }
});

const _Col = ElCol;
_Col.install = (app) => {
  app.component(_Col.name, _Col);
};

exports.default = _Col;
