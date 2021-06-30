'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

var script = vue.defineComponent({
  name: "ElBadge",
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    max: {
      type: Number,
      default: 99
    },
    isDot: Boolean,
    hidden: Boolean,
    type: {
      type: String,
      default: "primary",
      validator: (val) => {
        return ["primary", "success", "warning", "info", "danger"].includes(val);
      }
    }
  },
  setup(props) {
    const content = vue.computed(() => {
      if (props.isDot) {
        return;
      }
      if (typeof props.value === "number" && typeof props.max === "number") {
        return props.max < props.value ? `${props.max}+` : props.value;
      }
      return props.value;
    });
    return {
      content
    };
  }
});

const _hoisted_1 = { class: "el-badge" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("div", _hoisted_1, [
    vue.renderSlot(_ctx.$slots, "default"),
    vue.createVNode(vue.Transition, { name: "el-zoom-in-center" }, {
      default: vue.withCtx(() => [
        vue.withDirectives(vue.createVNode("sup", {
          class: ["el-badge__content", [
            "el-badge__content--" + _ctx.type,
            {
              "is-fixed": _ctx.$slots.default,
              "is-dot": _ctx.isDot
            }
          ]],
          textContent: vue.toDisplayString(_ctx.content)
        }, null, 10, ["textContent"]), [
          [vue.vShow, !_ctx.hidden && (_ctx.content || _ctx.content === 0 || _ctx.isDot)]
        ])
      ]),
      _: 1
    })
  ]);
}

script.render = render;
script.__file = "packages/badge/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Badge = script;

exports.default = _Badge;
