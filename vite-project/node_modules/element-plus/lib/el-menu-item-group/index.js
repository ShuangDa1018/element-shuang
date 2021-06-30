'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

var script = vue.defineComponent({
  name: "ElMenuItemGroup",
  componentName: "ElMenuItemGroup",
  props: {
    title: {
      type: String
    }
  },
  setup(props, { slots }) {
    const data = vue.reactive({
      paddingLeft: 20
    });
    const instance = vue.getCurrentInstance();
    const levelPadding = vue.computed(() => {
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
    const { props: rootProps } = vue.inject("rootMenu");
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
  return vue.openBlock(), vue.createBlock("li", _hoisted_1, [
    vue.createVNode("div", {
      class: "el-menu-item-group__title",
      style: { paddingLeft: _ctx.levelPadding + "px" }
    }, [
      !_ctx.slots.title ? (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 0 }, [
        vue.createTextVNode(vue.toDisplayString(_ctx.title), 1)
      ], 2112)) : vue.renderSlot(_ctx.$slots, "title", { key: 1 })
    ], 4),
    vue.createVNode("ul", null, [
      vue.renderSlot(_ctx.$slots, "default")
    ])
  ]);
}

script.render = render;
script.__file = "packages/menu/src/menuItemGroup.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _MenuItemGroup = script;

exports.default = _MenuItemGroup;
