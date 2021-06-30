import { defineComponent, computed, openBlock, createBlock, renderSlot, createVNode, Transition, withCtx, withDirectives, toDisplayString, vShow } from 'vue';

var script = defineComponent({
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
    const content = computed(() => {
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
  return openBlock(), createBlock("div", _hoisted_1, [
    renderSlot(_ctx.$slots, "default"),
    createVNode(Transition, { name: "el-zoom-in-center" }, {
      default: withCtx(() => [
        withDirectives(createVNode("sup", {
          class: ["el-badge__content", [
            "el-badge__content--" + _ctx.type,
            {
              "is-fixed": _ctx.$slots.default,
              "is-dot": _ctx.isDot
            }
          ]],
          textContent: toDisplayString(_ctx.content)
        }, null, 10, ["textContent"]), [
          [vShow, !_ctx.hidden && (_ctx.content || _ctx.content === 0 || _ctx.isDot)]
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

export default _Badge;
