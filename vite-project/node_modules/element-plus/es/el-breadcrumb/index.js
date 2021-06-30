import { defineComponent, ref, provide, onMounted, openBlock, createBlock, renderSlot } from 'vue';

var script = defineComponent({
  name: "ElBreadcrumb",
  props: {
    separator: {
      type: String,
      default: "/"
    },
    separatorClass: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const breadcrumb = ref(null);
    provide("breadcrumb", props);
    onMounted(() => {
      const items = breadcrumb.value.querySelectorAll(".el-breadcrumb__item");
      if (items.length) {
        items[items.length - 1].setAttribute("aria-current", "page");
      }
    });
    return {
      breadcrumb
    };
  }
});

const _hoisted_1 = {
  ref: "breadcrumb",
  class: "el-breadcrumb",
  "aria-label": "Breadcrumb",
  role: "navigation"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", _hoisted_1, [
    renderSlot(_ctx.$slots, "default")
  ], 512);
}

script.render = render;
script.__file = "packages/breadcrumb/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Breadcrumb = script;

export default _Breadcrumb;
