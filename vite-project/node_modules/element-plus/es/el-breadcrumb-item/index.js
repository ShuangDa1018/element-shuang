import { defineComponent, ref, inject, getCurrentInstance, onMounted, openBlock, createBlock, createVNode, renderSlot, toDisplayString } from 'vue';

var script = defineComponent({
  name: "ElBreadcrumbItem",
  props: {
    to: {
      type: [String, Object],
      default: ""
    },
    replace: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const link = ref(null);
    const parent = inject("breadcrumb");
    const instance = getCurrentInstance();
    const router = instance.appContext.config.globalProperties.$router;
    onMounted(() => {
      link.value.setAttribute("role", "link");
      link.value.addEventListener("click", () => {
        if (!props.to || !router)
          return;
        props.replace ? router.replace(props.to) : router.push(props.to);
      });
    });
    return {
      link,
      separator: parent == null ? void 0 : parent.separator,
      separatorClass: parent == null ? void 0 : parent.separatorClass
    };
  }
});

const _hoisted_1 = { class: "el-breadcrumb__item" };
const _hoisted_2 = {
  key: 1,
  class: "el-breadcrumb__separator",
  role: "presentation"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("span", _hoisted_1, [
    createVNode("span", {
      ref: "link",
      class: ["el-breadcrumb__inner", _ctx.to ? "is-link" : ""],
      role: "link"
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 2),
    _ctx.separatorClass ? (openBlock(), createBlock("i", {
      key: 0,
      class: ["el-breadcrumb__separator", _ctx.separatorClass]
    }, null, 2)) : (openBlock(), createBlock("span", _hoisted_2, toDisplayString(_ctx.separator), 1))
  ]);
}

script.render = render;
script.__file = "packages/breadcrumb/src/item.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _BreadcrumbItem = script;

export default _BreadcrumbItem;
