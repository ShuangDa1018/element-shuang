'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var util = require('../utils/util');
var validators = require('../utils/validators');

var script = vue.defineComponent({
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
      validator: validators.isValidComponentSize
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
    const ELEMENT = util.useGlobalConfig();
    const tagSize = vue.computed(() => {
      return props.size || ELEMENT.size;
    });
    const classes = vue.computed(() => {
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
  return !_ctx.disableTransitions ? (vue.openBlock(), vue.createBlock("span", {
    key: 0,
    class: _ctx.classes,
    style: { backgroundColor: _ctx.color },
    onClick: _cache[2] || (_cache[2] = (...args) => _ctx.handleClick && _ctx.handleClick(...args))
  }, [
    vue.renderSlot(_ctx.$slots, "default"),
    _ctx.closable ? (vue.openBlock(), vue.createBlock("i", {
      key: 0,
      class: "el-tag__close el-icon-close",
      onClick: _cache[1] || (_cache[1] = (...args) => _ctx.handleClose && _ctx.handleClose(...args))
    })) : vue.createCommentVNode("v-if", true)
  ], 6)) : (vue.openBlock(), vue.createBlock(vue.Transition, {
    key: 1,
    name: "el-zoom-in-center"
  }, {
    default: vue.withCtx(() => [
      vue.createVNode("span", {
        class: _ctx.classes,
        style: { backgroundColor: _ctx.color },
        onClick: _cache[4] || (_cache[4] = (...args) => _ctx.handleClick && _ctx.handleClick(...args))
      }, [
        vue.renderSlot(_ctx.$slots, "default"),
        _ctx.closable ? (vue.openBlock(), vue.createBlock("i", {
          key: 0,
          class: "el-tag__close el-icon-close",
          onClick: _cache[3] || (_cache[3] = (...args) => _ctx.handleClose && _ctx.handleClose(...args))
        })) : vue.createCommentVNode("v-if", true)
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

exports.default = _Tag;
