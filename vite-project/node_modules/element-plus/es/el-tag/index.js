import { defineComponent, computed, openBlock, createBlock, renderSlot, createCommentVNode, Transition, withCtx, createVNode } from 'vue';
import { useGlobalConfig } from '../utils/util';
import { isValidComponentSize } from '../utils/validators';

var script = defineComponent({
  name: "ElTag",
  props: {
    closable: Boolean,
    type: {
      type: String,
      default: ""
    },
    hit: Boolean,
    disableTransitions: Boolean,
    color: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      validator: isValidComponentSize
    },
    effect: {
      type: String,
      default: "light",
      validator: (val) => {
        return ["dark", "light", "plain"].indexOf(val) !== -1;
      }
    }
  },
  emits: ["close", "click"],
  setup(props, ctx) {
    const ELEMENT = useGlobalConfig();
    const tagSize = computed(() => {
      return props.size || ELEMENT.size;
    });
    const classes = computed(() => {
      const { type, hit, effect } = props;
      return [
        "el-tag",
        type ? `el-tag--${type}` : "",
        tagSize.value ? `el-tag--${tagSize.value}` : "",
        effect ? `el-tag--${effect}` : "",
        hit && "is-hit"
      ];
    });
    const handleClose = (event) => {
      event.stopPropagation();
      ctx.emit("close", event);
    };
    const handleClick = (event) => {
      ctx.emit("click", event);
    };
    return {
      tagSize,
      classes,
      handleClose,
      handleClick
    };
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return !_ctx.disableTransitions ? (openBlock(), createBlock("span", {
    key: 0,
    class: _ctx.classes,
    style: { backgroundColor: _ctx.color },
    onClick: _cache[2] || (_cache[2] = (...args) => _ctx.handleClick && _ctx.handleClick(...args))
  }, [
    renderSlot(_ctx.$slots, "default"),
    _ctx.closable ? (openBlock(), createBlock("i", {
      key: 0,
      class: "el-tag__close el-icon-close",
      onClick: _cache[1] || (_cache[1] = (...args) => _ctx.handleClose && _ctx.handleClose(...args))
    })) : createCommentVNode("v-if", true)
  ], 6)) : (openBlock(), createBlock(Transition, {
    key: 1,
    name: "el-zoom-in-center"
  }, {
    default: withCtx(() => [
      createVNode("span", {
        class: _ctx.classes,
        style: { backgroundColor: _ctx.color },
        onClick: _cache[4] || (_cache[4] = (...args) => _ctx.handleClick && _ctx.handleClick(...args))
      }, [
        renderSlot(_ctx.$slots, "default"),
        _ctx.closable ? (openBlock(), createBlock("i", {
          key: 0,
          class: "el-tag__close el-icon-close",
          onClick: _cache[3] || (_cache[3] = (...args) => _ctx.handleClose && _ctx.handleClose(...args))
        })) : createCommentVNode("v-if", true)
      ], 6)
    ]),
    _: 3
  }));
}

script.render = render;
script.__file = "packages/tag/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Tag = script;

export default _Tag;
