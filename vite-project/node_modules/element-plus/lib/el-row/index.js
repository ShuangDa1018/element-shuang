'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

var Row = vue.defineComponent({
  name: "ElRow",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    gutter: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: ""
    },
    justify: {
      type: String,
      default: "start"
    },
    align: {
      type: String,
      default: "top"
    }
  },
  setup(props, { slots }) {
    const gutter = vue.computed(() => props.gutter);
    vue.provide("ElRow", {
      gutter
    });
    const style = vue.computed(() => {
      const ret = {
        marginLeft: "",
        marginRight: ""
      };
      if (props.gutter) {
        ret.marginLeft = `-${props.gutter / 2}px`;
        ret.marginRight = ret.marginLeft;
      }
      return ret;
    });
    return () => {
      var _a;
      return vue.h(props.tag, {
        class: [
          "el-row",
          props.justify !== "start" ? `is-justify-${props.justify}` : "",
          props.align !== "top" ? `is-align-${props.align}` : "",
          props.type === "flex" ? "el-row--flex" : ""
        ],
        style: style.value
      }, (_a = slots.default) == null ? void 0 : _a.call(slots));
    };
  }
});

const _Row = Row;
_Row.install = (app) => {
  app.component(_Row.name, _Row);
};

exports.default = _Row;
