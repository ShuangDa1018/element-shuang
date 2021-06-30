import { defineComponent, computed, resolveComponent, openBlock, createBlock, mergeProps, Fragment, renderList, renderSlot, createVNode, createCommentVNode } from 'vue';
import SkeletonItem from '../el-skeleton-item';
import { useThrottleRender } from '../hooks';

var script = defineComponent({
  name: "ElSkeleton",
  components: {
    [SkeletonItem.name]: SkeletonItem
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
    const innerLoading = computed(() => {
      return props.loading;
    });
    const uiLoading = useThrottleRender(innerLoading, props.throttle);
    return {
      uiLoading
    };
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_skeleton_item = resolveComponent("el-skeleton-item");
  return _ctx.uiLoading ? (openBlock(), createBlock("div", mergeProps({
    key: 0,
    class: ["el-skeleton", _ctx.animated ? "is-animated" : ""]
  }, _ctx.$attrs), [
    (openBlock(true), createBlock(Fragment, null, renderList(_ctx.count, (i) => {
      return openBlock(), createBlock(Fragment, { key: i }, [
        _ctx.loading ? renderSlot(_ctx.$slots, "template", { key: 0 }, () => [
          createVNode(_component_el_skeleton_item, {
            class: "is-first",
            variant: "p"
          }),
          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.rows, (item) => {
            return openBlock(), createBlock(_component_el_skeleton_item, {
              key: item,
              class: {
                "el-skeleton__paragraph": true,
                "is-last": item === _ctx.rows && _ctx.rows > 1
              },
              variant: "p"
            }, null, 8, ["class"]);
          }), 128))
        ]) : createCommentVNode("v-if", true)
      ], 64);
    }), 128))
  ], 16)) : renderSlot(_ctx.$slots, "default", mergeProps({ key: 1 }, _ctx.$attrs));
}

script.render = render;
script.__file = "packages/skeleton/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Skeleton = script;

export default _Skeleton;
