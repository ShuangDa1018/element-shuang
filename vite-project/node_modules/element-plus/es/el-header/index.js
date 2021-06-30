import { defineComponent, openBlock, createBlock, renderSlot } from 'vue';

var script = defineComponent({
  name: "ElHeader",
  props: {
    height: {
      type: String,
      default: "60px"
    }
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("header", {
    class: "el-header",
    style: { height: _ctx.height }
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 4);
}

script.render = render;
script.__file = "packages/container/src/header.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Header = script;

export default _Header;
