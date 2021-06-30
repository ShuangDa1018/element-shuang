import { defineComponent, openBlock, createBlock, renderSlot } from 'vue';

var script = defineComponent({
  name: "ElFooter",
  props: {
    height: {
      type: String,
      default: "60px"
    }
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("footer", {
    class: "el-footer",
    style: { height: _ctx.height }
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 4);
}

script.render = render;
script.__file = "packages/container/src/footer.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Footer = script;

export default _Footer;
