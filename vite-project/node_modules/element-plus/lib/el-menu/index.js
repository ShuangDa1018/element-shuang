'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var mitt = require('mitt');
var Menubar = require('../utils/menu/menu-bar');
var dom = require('../utils/dom');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var mitt__default = /*#__PURE__*/_interopDefaultLegacy(mitt);
var Menubar__default = /*#__PURE__*/_interopDefaultLegacy(Menubar);

var script = vue.defineComponent({
  name: "ElMenuCollapseTransition",
  setup() {
    return {
      on: {
        beforeEnter(el) {
          el.style.opacity = 0.2;
        },
        enter(el, done) {
          dom.addClass(el, "el-opacity-transition");
          el.style.opacity = 1;
          done();
        },
        afterEnter(el) {
          dom.removeClass(el, "el-opacity-transition");
          el.style.opacity = "";
        },
        beforeLeave(el) {
          if (!el.dataset)
            el.dataset = {};
          if (dom.hasClass(el, "el-menu--collapse")) {
            dom.removeClass(el, "el-menu--collapse");
            el.dataset.oldOverflow = el.style.overflow;
            el.dataset.scrollWidth = el.clientWidth;
            dom.addClass(el, "el-menu--collapse");
          } else {
            dom.addClass(el, "el-menu--collapse");
            el.dataset.oldOverflow = el.style.overflow;
            el.dataset.scrollWidth = el.clientWidth;
            dom.removeClass(el, "el-menu--collapse");
          }
          el.style.width = el.scrollWidth + "px";
          el.style.overflow = "hidden";
        },
        leave(el) {
          dom.addClass(el, "horizontal-collapse-transition");
          el.style.width = el.dataset.scrollWidth + "px";
        }
      }
    };
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock(vue.Transition, vue.mergeProps({ mode: "out-in" }, vue.toHandlers(_ctx.on)), {
    default: vue.withCtx(() => [
      vue.renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 16);
}

script.render = render;
script.__file = "packages/menu/src/menu-collapse-transition.vue";

function useMenuColor(color = "") {
  const menuBarColor = vue.ref("");
  function calcColorChannels(c) {
    let rawColor = c.replace("#", "");
    if (/^[0-9a-fA-F]{3}$/.test(rawColor)) {
      const color2 = rawColor.split("");
      for (let i = 2; i >= 0; i--) {
        color2.splice(i, 0, color2[i]);
      }
      rawColor = color2.join("");
    }
    if (/^[0-9a-fA-F]{6}$/.test(rawColor)) {
      return {
        red: parseInt(rawColor.slice(0, 2), 16),
        green: parseInt(rawColor.slice(2, 4), 16),
        blue: parseInt(rawColor.slice(4, 6), 16)
      };
    } else {
      return {
        red: 255,
        green: 255,
        blue: 255
      };
    }
  }
  function mixColor(color2, percent = 0.2) {
    let { red, green, blue } = calcColorChannels(color2);
    if (percent > 0) {
      red *= 1 - percent;
      green *= 1 - percent;
      blue *= 1 - percent;
    } else {
      red += (255 - red) * percent;
      green += (255 - green) * percent;
      blue += (255 - blue) * percent;
    }
    return `rgb(${Math.round(red)}, ${Math.round(green)}, ${Math.round(blue)})`;
  }
  if (!color) {
    return menuBarColor;
  }
  menuBarColor.value = mixColor(color);
  return menuBarColor;
}

var script$1 = vue.defineComponent({
  name: "ElMenu",
  componentName: "ElMenu",
  components: {
    ElMenuCollapseTransition: script
  },
  props: {
    mode: {
      type: String,
      default: "vertical"
    },
    defaultActive: {
      type: String,
      default: ""
    },
    defaultOpeneds: Array,
    uniqueOpened: Boolean,
    router: Boolean,
    menuTrigger: {
      type: String,
      default: "hover"
    },
    collapse: Boolean,
    backgroundColor: { type: String },
    textColor: { type: String },
    activeTextColor: { type: String },
    collapseTransition: {
      type: Boolean,
      default: true
    }
  },
  emits: ["close", "open", "select"],
  setup(props, ctx) {
    const openedMenus = vue.ref(props.defaultOpeneds && !props.collapse ? props.defaultOpeneds.slice(0) : []);
    const instance = vue.getCurrentInstance();
    const activeIndex = vue.ref(props.defaultActive);
    const items = vue.ref({});
    const submenus = vue.ref({});
    const alteredCollapse = vue.ref(false);
    const rootMenuEmitter = mitt__default['default']();
    const router = instance.appContext.config.globalProperties.$router;
    const hoverBackground = useMenuColor(props.backgroundColor);
    const isMenuPopup = vue.computed(() => {
      return props.mode === "horizontal" || props.mode === "vertical" && props.collapse;
    });
    const initializeMenu = () => {
      const index = activeIndex.value;
      const activeItem = items.value[index];
      if (!activeItem || props.mode === "horizontal" || props.collapse)
        return;
      let indexPath = activeItem.indexPath;
      indexPath.forEach((index2) => {
        let submenu = submenus.value[index2];
        submenu && openMenu(index2, submenu == null ? void 0 : submenu.indexPath);
      });
    };
    const addSubMenu = (item) => {
      submenus.value[item.index] = item;
    };
    const removeSubMenu = (item) => {
      delete submenus.value[item.index];
    };
    const addMenuItem = (item) => {
      items.value[item.index] = item;
    };
    const removeMenuItem = (item) => {
      delete items.value[item.index];
    };
    const openMenu = (index, indexPath) => {
      if (openedMenus.value.includes(index))
        return;
      if (props.uniqueOpened) {
        openedMenus.value = openedMenus.value.filter((index2) => {
          return (vue.isRef(indexPath) ? indexPath.value : indexPath).indexOf(index2) !== -1;
        });
      }
      openedMenus.value.push(index);
    };
    const closeMenu = (index) => {
      const i = openedMenus.value.indexOf(index);
      if (i !== -1) {
        openedMenus.value.splice(i, 1);
      }
    };
    const open = (index) => {
      const { indexPath } = submenus.value[index.toString()];
      indexPath.forEach((i) => openMenu(i, indexPath));
    };
    const close = (index) => {
      closeMenu(index);
    };
    const handleSubmenuClick = (submenu) => {
      const { index, indexPath } = submenu;
      let isOpened = openedMenus.value.includes(index);
      if (isOpened) {
        closeMenu(index);
        ctx.emit("close", index, indexPath.value);
      } else {
        openMenu(index, indexPath);
        ctx.emit("open", index, indexPath.value);
      }
    };
    const handleItemClick = (item) => {
      const { index, indexPath } = item;
      const hasIndex = item.index !== null;
      const oldActiveIndex = activeIndex.value;
      if (hasIndex) {
        activeIndex.value = item.index;
      }
      ctx.emit("select", index, indexPath.value, item);
      if (props.mode === "horizontal" || props.collapse) {
        openedMenus.value = [];
      }
      if (props.router && router && hasIndex) {
        routeToItem(item, (error) => {
          activeIndex.value = oldActiveIndex;
          if (error) {
            if (error.name === "NavigationDuplicated")
              return;
            console.error(error);
          }
        });
      }
    };
    const routeToItem = (item, onError) => {
      let route = item.route || item.index;
      try {
        router == null ? void 0 : router.push(route, () => null, onError);
      } catch (e) {
        console.error(e);
      }
    };
    const updateActiveIndex = (val) => {
      const itemsInData = items.value;
      const item = itemsInData[val] || itemsInData[activeIndex.value] || itemsInData[props.defaultActive];
      if (item) {
        activeIndex.value = item.index;
        initializeMenu();
      } else {
        if (!alteredCollapse.value) {
          activeIndex.value = null;
        } else {
          alteredCollapse.value = false;
        }
      }
    };
    vue.watch(() => props.defaultActive, (currentActive) => {
      if (!items.value[currentActive]) {
        activeIndex.value = "";
      }
      updateActiveIndex(currentActive);
    });
    vue.watch(items.value, () => {
      updateActiveIndex();
    });
    vue.watch(() => props.collapse, (value, prev) => {
      if (value !== prev) {
        alteredCollapse.value = true;
      }
      if (value)
        openedMenus.value = [];
      rootMenuEmitter.emit("rootMenu:toggle-collapse", Boolean(props.collapse));
    });
    vue.provide("rootMenu", {
      props,
      openedMenus,
      items,
      submenus,
      hoverBackground,
      activeIndex,
      isMenuPopup,
      methods: {
        addMenuItem,
        removeMenuItem,
        addSubMenu,
        removeSubMenu,
        openMenu,
        closeMenu
      },
      rootMenuEmit: rootMenuEmitter.emit,
      rootMenuOn: rootMenuEmitter.on
    });
    vue.provide(`subMenu:${instance.uid}`, {
      addSubMenu,
      removeSubMenu
    });
    vue.onMounted(() => {
      initializeMenu();
      rootMenuEmitter.on("menuItem:item-click", handleItemClick);
      rootMenuEmitter.on("submenu:submenu-click", handleSubmenuClick);
      if (props.mode === "horizontal") {
        new Menubar__default['default'](instance.vnode.el);
      }
    });
    return {
      hoverBackground,
      isMenuPopup,
      props,
      open,
      close
    };
  }
});

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_menu_collapse_transition = vue.resolveComponent("el-menu-collapse-transition");
  return _ctx.props.collapseTransition ? (vue.openBlock(), vue.createBlock(_component_el_menu_collapse_transition, { key: 0 }, {
    default: vue.withCtx(() => [
      (vue.openBlock(), vue.createBlock("ul", {
        key: +_ctx.props.collapse,
        role: "menubar",
        style: { backgroundColor: _ctx.props.backgroundColor || "" },
        class: {
          "el-menu": true,
          "el-menu--horizontal": _ctx.mode === "horizontal",
          "el-menu--collapse": _ctx.props.collapse
        }
      }, [
        vue.renderSlot(_ctx.$slots, "default")
      ], 6))
    ]),
    _: 3
  })) : (vue.openBlock(), vue.createBlock("ul", {
    key: +_ctx.props.collapse,
    role: "menubar",
    style: { backgroundColor: _ctx.props.backgroundColor || "" },
    class: {
      "el-menu": true,
      "el-menu--horizontal": _ctx.mode === "horizontal",
      "el-menu--collapse": _ctx.props.collapse
    }
  }, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 6));
}

script$1.render = render$1;
script$1.__file = "packages/menu/src/menu.vue";

script$1.install = (app) => {
  app.component(script$1.name, script$1);
};
const _Menu = script$1;

exports.default = _Menu;
