import { defineComponent, openBlock, createBlock, createCommentVNode, renderSlot } from 'vue';

var script = defineComponent({
  name: "ElLink",
  props: {
    type: {
      type: String,
      default: "default",
      validator: (val) => {
        return ["default", "primary", "success", "warning", "info", "danger"].includes(val);
      }
    },
    underline: {
      type: Boolean,
      default: true
    },
    disabled: { type: Boolean, default: false },
    href: { type: String, default: "" },
    icon: { type: String, default: "" }
  },
  emits: ["click"],
  setup(props, { emit }) {
    function handleClick(event) {
      if (!props.disabled) {
        emit("click", event);
      }
    }
    return {
      handleClick
    };
  }
});

const _hoisted_1 = {
  key: 1,
  class: "el-link--inner"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("a", {
    class: [
      "el-link",
      _ctx.type ? `el-link--${_ctx.type}` : "",
      _ctx.disabled && "is-disabled",
      _ctx.underline && !_ctx.disabled && "is-underline"
    ],
    href: _ctx.disabled ? null : _ctx.href,
    onClick: _cache[1] || (_cache[1] = (...args) => _ctx.handleClick && _ctx.handleClick(...args))
  }, [
    _ctx.icon ? (openBlock(), createBlock("i", {
      key: 0,
      class: _ctx.icon
    }, null, 2)) : createCommentVNode("v-if", true),
    _ctx.$slots.default ? (openBlock(), createBlock("span", _hoisted_1, [
      renderSlot(_ctx.$slots, "default")
    ])) : createCommentVNode("v-if", true),
    _ctx.$slots.icon ? renderSlot(_ctx.$slots, "icon", { key: 2 }) : createCommentVNode("v-if", true)
  ], 10, ["href"]);
}

script.render = render;
script.__file = "packages/link/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Link = script;

export default _Link;
