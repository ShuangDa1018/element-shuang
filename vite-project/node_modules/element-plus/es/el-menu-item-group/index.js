import { defineComponent, reactive, getCurrentInstance, computed, inject, openBlock, createBlock, createVNode, Fragment, createTextVNode, toDisplayString, renderSlot } from 'vue';

var script = defineComponent({
  name: "ElMenuItemGroup",
  componentName: "ElMenuItemGroup",
  props: {
    title: {
      type: String
    }
  },
  setup(props, { slots }) {
    const data = reactive({
      paddingLeft: 20
    });
    const instance = getCurrentInstance();
    const levelPadding = computed(() => {
      let padding = 20;
      let parent = instance.parent;
      if (rootProps.collapse)
        return 20;
      while (parent && parent.type.name !== "ElMenu") {
        if (parent.type.name === "ElSubmenu") {
          padding += 20;
        }
        parent = parent.parent;
      }
      return padding;
    });
    const { props: rootProps } = inject("rootMenu");
    return {
      data,
      levelPadding,
      props,
      slots
    };
  }
});

const _hoisted_1 = { class: "el-menu-item-group" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("li", _hoisted_1, [
    createVNode("div", {
      class: "el-menu-item-group__title",
      style: { paddingLeft: _ctx.levelPadding + "px" }
    }, [
      !_ctx.slots.title ? (openBlock(), createBlock(Fragment, { key: 0 }, [
        createTextVNode(toDisplayString(_ctx.title), 1)
      ], 2112)) : renderSlot(_ctx.$slots, "title", { key: 1 })
    ], 4),
    createVNode("ul", null, [
      renderSlot(_ctx.$slots, "default")
    ])
  ]);
}

script.render = render;
script.__file = "packages/menu/src/menuItemGroup.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _MenuItemGroup = script;

export default _MenuItemGroup;
