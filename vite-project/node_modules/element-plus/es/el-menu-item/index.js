import { inject, computed, defineComponent, getCurrentInstance, onMounted, onBeforeUnmount, resolveComponent, openBlock, createBlock, withCtx, renderSlot, createVNode, Fragment } from 'vue';
import ElTooltip from '../el-tooltip';

function useMenu(instance, currentIndex) {
  const rootMenu = inject("rootMenu");
  const indexPath = computed(() => {
    let parent = instance.parent;
    const path = [currentIndex];
    while (parent.type.name !== "ElMenu") {
      if (parent.props.index) {
        path.unshift(parent.props.index);
      }
      parent = parent.parent;
    }
    return path;
  });
  const parentMenu = computed(() => {
    let parent = instance.parent;
    while (parent && ["ElMenu", "ElSubmenu"].indexOf(parent.type.name) === -1) {
      parent = parent.parent;
    }
    return parent;
  });
  const paddingStyle = computed(() => {
    let parent = instance.parent;
    if (rootMenu.props.mode !== "vertical")
      return {};
    let padding = 20;
    if (rootMenu.props.collapse) {
      padding = 20;
    } else {
      while (parent && parent.type.name !== "ElMenu") {
        if (parent.type.name === "ElSubmenu") {
          padding += 20;
        }
        parent = parent.parent;
      }
    }
    return { paddingLeft: padding + "px" };
  });
  return { parentMenu, paddingStyle, indexPath };
}

var script = defineComponent({
  name: "ElMenuItem",
  componentName: "ElMenuItem",
  components: { ElTooltip },
  props: {
    index: {
      default: null,
      validator: (val) => typeof val === "string" || val === null
    },
    route: [String, Object],
    disabled: Boolean
  },
  emits: ["click"],
  setup(props, { emit, slots }) {
    const instance = getCurrentInstance();
    const rootMenu = inject("rootMenu");
    const { parentMenu, paddingStyle, indexPath } = useMenu(instance, props.index);
    const { addSubMenu, removeSubMenu } = inject(`subMenu:${parentMenu.value.uid}`);
    const active = computed(() => {
      return props.index === rootMenu.activeIndex.value;
    });
    const hoverBackground = computed(() => {
      return rootMenu.hoverBackground.value;
    });
    const backgroundColor = computed(() => {
      return rootMenu.props.backgroundColor || "";
    });
    const activeTextColor = computed(() => {
      return rootMenu.props.activeTextColor || "";
    });
    const textColor = computed(() => {
      return rootMenu.props.textColor || "";
    });
    const mode = computed(() => {
      return rootMenu.props.mode;
    });
    const isNested = computed(() => {
      return parentMenu.value.type.name !== "ElMenu";
    });
    const itemStyle = computed(() => {
      const style = {
        color: active.value ? activeTextColor.value : textColor.value,
        borderBottomColor: ""
      };
      if (mode.value === "horizontal" && !isNested.value) {
        style.borderBottomColor = active.value ? rootMenu.props.activeTextColor ? activeTextColor.value : "" : "transparent";
      }
      return style;
    });
    const onMouseEnter = () => {
      if (mode.value === "horizontal" && !rootMenu.props.backgroundColor)
        return;
      instance.vnode.el.style.backgroundColor = hoverBackground.value;
    };
    const onMouseLeave = () => {
      if (mode.value === "horizontal" && !rootMenu.props.backgroundColor)
        return;
      instance.vnode.el.style.backgroundColor = backgroundColor.value;
    };
    const handleClick = () => {
      if (!props.disabled) {
        rootMenu.rootMenuEmit("menuItem:item-click", {
          index: props.index,
          indexPath,
          route: props.route
        });
        emit("click", {
          index: props.index,
          indexPath: indexPath.value
        });
      }
    };
    onMounted(() => {
      addSubMenu({ index: props.index, indexPath, active });
      rootMenu.methods.addMenuItem({ index: props.index, indexPath, active });
    });
    onBeforeUnmount(() => {
      removeSubMenu({ index: props.index, indexPath, active });
      rootMenu.methods.removeMenuItem({ index: props.index, indexPath, active });
    });
    return {
      parentMenu,
      rootMenu,
      slots,
      paddingStyle,
      itemStyle,
      backgroundColor,
      active,
      handleClick,
      onMouseEnter,
      onMouseLeave
    };
  }
});

const _hoisted_1 = { style: { "position": "absolute", "left": "0", "top": "0", "height": "100%", "width": "100%", "display": "inline-block", "box-sizing": "border-box", "padding": "0 20px" } };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_tooltip = resolveComponent("el-tooltip");
  return openBlock(), createBlock("li", {
    class: ["el-menu-item", {
      "is-active": _ctx.active,
      "is-disabled": _ctx.disabled
    }],
    role: "menuitem",
    tabindex: "-1",
    style: [_ctx.paddingStyle, _ctx.itemStyle, { backgroundColor: _ctx.backgroundColor }],
    onClick: _cache[1] || (_cache[1] = (...args) => _ctx.handleClick && _ctx.handleClick(...args)),
    onMouseenter: _cache[2] || (_cache[2] = (...args) => _ctx.onMouseEnter && _ctx.onMouseEnter(...args)),
    onFocus: _cache[3] || (_cache[3] = (...args) => _ctx.onMouseEnter && _ctx.onMouseEnter(...args)),
    onBlur: _cache[4] || (_cache[4] = (...args) => _ctx.onMouseLeave && _ctx.onMouseLeave(...args)),
    onMouseleave: _cache[5] || (_cache[5] = (...args) => _ctx.onMouseLeave && _ctx.onMouseLeave(...args))
  }, [
    _ctx.parentMenu.type.name === "ElMenu" && _ctx.rootMenu.props.collapse && _ctx.slots.title ? (openBlock(), createBlock(_component_el_tooltip, {
      key: 0,
      effect: "dark",
      placement: "right"
    }, {
      content: withCtx(() => [
        renderSlot(_ctx.$slots, "title")
      ]),
      default: withCtx(() => [
        createVNode("div", _hoisted_1, [
          renderSlot(_ctx.$slots, "default")
        ])
      ]),
      _: 3
    })) : (openBlock(), createBlock(Fragment, { key: 1 }, [
      renderSlot(_ctx.$slots, "default"),
      renderSlot(_ctx.$slots, "title")
    ], 64))
  ], 38);
}

script.render = render;
script.__file = "packages/menu/src/menuItem.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _MenuItem = script;

export default _MenuItem;
