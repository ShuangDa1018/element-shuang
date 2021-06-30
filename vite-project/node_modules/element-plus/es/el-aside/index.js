import { defineComponent, openBlock, createBlock, renderSlot } from 'vue';

var script = defineComponent({
  name: "ElAside",
  props: {
    width: {
      type: String,
      default: "300px"
    }
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("aside", {
    class: "el-aside",
    style: { width: _ctx.width }
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 4);
}

script.render = render;
script.__file = "packages/container/src/aside.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Aside = script;

export default _Aside;
