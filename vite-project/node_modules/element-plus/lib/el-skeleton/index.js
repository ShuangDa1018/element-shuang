'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var SkeletonItem = require('../el-skeleton-item');
var hooks = require('../hooks');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var SkeletonItem__default = /*#__PURE__*/_interopDefaultLegacy(SkeletonItem);

var script = vue.defineComponent({
  name: "ElSkeleton",
  components: {
    [SkeletonItem__default['default'].name]: SkeletonItem__default['default']
  },
  props: {
    animated: {
      type: Boolean,
      default: false
    },
    count: {
      type: Number,
      default: 1
    },
    rows: {
      type: Number,
      default: 3
    },
    loading: {
      type: Boolean,
      default: true
    },
    throttle: {
      type: Number
    }
  },
  setup(props) {
    const innerLoading = vue.computed(() => {
      return props.loading;
    });
    const uiLoading = hooks.useThrottleRender(innerLoading, props.throttle);
    return {
      uiLoading
    };
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_skeleton_item = vue.resolveComponent("el-skeleton-item");
  return _ctx.uiLoading ? (vue.openBlock(), vue.createBlock("div", vue.mergeProps({
    key: 0,
    class: ["el-skeleton", _ctx.animated ? "is-animated" : ""]
  }, _ctx.$attrs), [
    (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.count, (i) => {
      return vue.openBlock(), vue.createBlock(vue.Fragment, { key: i }, [
        _ctx.loading ? vue.renderSlot(_ctx.$slots, "template", { key: 0 }, () => [
          vue.createVNode(_component_el_skeleton_item, {
            class: "is-first",
            variant: "p"
          }),
          (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.rows, (item) => {
            return vue.openBlock(), vue.createBlock(_component_el_skeleton_item, {
              key: item,
              class: {
                "el-skeleton__paragraph": true,
                "is-last": item === _ctx.rows && _ctx.rows > 1
              },
              variant: "p"
            }, null, 8, ["class"]);
          }), 128))
        ]) : vue.createCommentVNode("v-if", true)
      ], 64);
    }), 128))
  ], 16)) : vue.renderSlot(_ctx.$slots, "default", vue.mergeProps({ key: 1 }, _ctx.$attrs));
}

script.render = render;
script.__file = "packages/skeleton/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Skeleton = script;

exports.default = _Skeleton;
