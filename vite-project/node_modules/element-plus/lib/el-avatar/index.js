'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

const ERROR_EVENT = "error";
var script = vue.defineComponent({
  name: "ElAvatar",
  props: {
    size: {
      type: [Number, String],
      validator(val) {
        if (typeof val === "string") {
          return ["large", "medium", "small"].includes(val);
        }
        return typeof val === "number";
      },
      default: "large"
    },
    shape: {
      type: String,
      default: "circle",
      validator(val) {
        return ["circle", "square"].includes(val);
      }
    },
    icon: String,
    src: {
      type: String,
      default: ""
    },
    alt: String,
    srcSet: String,
    fit: {
      type: String,
      default: "cover"
    }
  },
  emits: [ERROR_EVENT],
  setup(props, { emit }) {
    const hasLoadError = vue.ref(false);
    const src = vue.toRef(props, "src");
    vue.watch(src, () => {
      hasLoadError.value = false;
    });
    const avatarClass = vue.computed(() => {
      const { size, icon, shape } = props;
      let classList = ["el-avatar"];
      if (size && typeof size === "string") {
        classList.push(`el-avatar--${size}`);
      }
      if (icon) {
        classList.push("el-avatar--icon");
      }
      if (shape) {
        classList.push(`el-avatar--${shape}`);
      }
      return classList;
    });
    const sizeStyle = vue.computed(() => {
      const { size } = props;
      return typeof size === "number" ? {
        height: `${size}px`,
        width: `${size}px`,
        lineHeight: `${size}px`
      } : {};
    });
    const fitStyle = vue.computed(() => ({
      objectFit: props.fit
    }));
    function handleError(e) {
      hasLoadError.value = true;
      emit(ERROR_EVENT, e);
    }
    return {
      hasLoadError,
      avatarClass,
      sizeStyle,
      handleError,
      fitStyle
    };
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("span", {
    class: _ctx.avatarClass,
    style: _ctx.sizeStyle
  }, [
    (_ctx.src || _ctx.srcSet) && !_ctx.hasLoadError ? (vue.openBlock(), vue.createBlock("img", {
      key: 0,
      src: _ctx.src,
      alt: _ctx.alt,
      srcset: _ctx.srcSet,
      style: _ctx.fitStyle,
      onError: _cache[1] || (_cache[1] = (...args) => _ctx.handleError && _ctx.handleError(...args))
    }, null, 44, ["src", "alt", "srcset"])) : _ctx.icon ? (vue.openBlock(), vue.createBlock("i", {
      key: 1,
      class: _ctx.icon
    }, null, 2)) : vue.renderSlot(_ctx.$slots, "default", { key: 2 })
  ], 6);
}

script.render = render;
script.__file = "packages/avatar/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Avatar = script;

exports.default = _Avatar;
