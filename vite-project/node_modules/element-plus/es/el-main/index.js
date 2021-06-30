import { defineComponent, openBlock, createBlock, renderSlot } from 'vue';

var script = defineComponent({
  name: "ElMain"
});

const _hoisted_1 = { class: "el-main" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("main", _hoisted_1, [
    renderSlot(_ctx.$slots, "default")
  ]);
}

script.render = render;
script.__file = "packages/container/src/main.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Main = script;

export default _Main;
