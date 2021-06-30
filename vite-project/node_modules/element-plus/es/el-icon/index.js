import { defineComponent, openBlock, createBlock } from 'vue';

var script = defineComponent({
  name: "ElIcon",
  props: {
    name: {
      type: String,
      default: ""
    }
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("i", {
    class: `el-icon-${_ctx.name}`
  }, null, 2);
}

script.render = render;
script.__file = "packages/icon/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Icon = script;

export default _Icon;
