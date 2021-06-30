import mitt from 'mitt';
import { inject, computed, defineComponent, reactive, ref, getCurrentInstance, provide, onBeforeMount, onMounted, onBeforeUnmount, h, Fragment, withDirectives, vShow } from 'vue';
import ElCollapseTransition from '../el-collapse-transition';
import ElPopper from '../el-popper';

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
  name: "ElSubmenu",
  componentName: "ElSubmenu",
  props: {
    index: {
      type: String,
      required: true
    },
    showTimeout: {
      type: Number,
      default: 300
    },
    hideTimeout: {
      type: Number,
      default: 300
    },
    popperClass: String,
    disabled: Boolean,
    popperAppendToBody: {
      type: Boolean,
      default: void 0
    }
  },
  setup(props) {
    const data = reactive({
      popperJS: null,
      timeout: null,
      items: {},
      submenus: {},
      currentPlacement: "",
      mouseInChild: false,
      opened: false
    });
    const verticalTitleRef = ref(null);
    const popperVnode = ref(null);
    const instance = getCurrentInstance();
    const { paddingStyle, indexPath, parentMenu } = useMenu(instance, props.index);
    const {
      openedMenus,
      isMenuPopup,
      hoverBackground: rootHoverBackground,
      methods: rootMethods,
      props: rootProps,
      methods: { closeMenu },
      rootMenuOn,
      rootMenuEmit
    } = inject("rootMenu");
    const {
      addSubMenu: parentAddSubmenu,
      removeSubMenu: parentRemoveSubmenu,
      handleMouseleave: parentHandleMouseleave
    } = inject(`subMenu:${parentMenu.value.uid}`);
    const submenuTitleIcon = computed(() => {
      return mode.value === "horizontal" && isFirstLevel.value || mode.value === "vertical" && !rootProps.collapse ? "el-icon-arrow-down" : "el-icon-arrow-right";
    });
    const isFirstLevel = computed(() => {
      let isFirstLevel2 = true;
      let parent = instance.parent;
      while (parent && parent.type.name !== "ElMenu") {
        if (["ElSubmenu", "ElMenuItemGroup"].includes(parent.type.name)) {
          isFirstLevel2 = false;
          break;
        } else {
          parent = parent.parent;
        }
      }
      return isFirstLevel2;
    });
    const appendToBody = computed(() => {
      return props.popperAppendToBody === void 0 ? isFirstLevel.value : Boolean(props.popperAppendToBody);
    });
    const menuTransitionName = computed(() => {
      return rootProps.collapse ? "el-zoom-in-left" : "el-zoom-in-top";
    });
    const opened = computed(() => {
      return openedMenus.value.includes(props.index);
    });
    const active = computed(() => {
      let isActive = false;
      const submenus = data.submenus;
      const items = data.items;
      Object.keys(items).forEach((index) => {
        if (items[index].active) {
          isActive = true;
        }
      });
      Object.keys(submenus).forEach((index) => {
        if (submenus[index].active) {
          isActive = true;
        }
      });
      return isActive;
    });
    const backgroundColor = computed(() => {
      return rootProps.backgroundColor || "";
    });
    const activeTextColor = computed(() => {
      return rootProps.activeTextColor || "";
    });
    const textColor = computed(() => {
      return rootProps.textColor || "";
    });
    const mode = computed(() => {
      return rootProps.mode;
    });
    const titleStyle = computed(() => {
      if (mode.value !== "horizontal") {
        return {
          color: textColor.value
        };
      }
      return {
        borderBottomColor: active.value ? rootProps.activeTextColor ? activeTextColor.value : "" : "transparent",
        color: active.value ? activeTextColor.value : textColor.value
      };
    });
    const subMenuEmitter = mitt();
    const doDestroy = () => {
      var _a;
      (_a = popperVnode.value) == null ? void 0 : _a.doDestroy();
    };
    const handleCollapseToggle = (value) => {
      if (value) {
        updatePlacement();
      } else {
        doDestroy();
      }
    };
    const addItem = (item) => {
      data.items[item.index] = item;
    };
    const removeItem = (item) => {
      delete data.items[item.index];
    };
    const addSubMenu = (item) => {
      data.submenus[item.index] = item;
    };
    const removeSubMenu = (item) => {
      delete data.submenus[item.index];
    };
    const handleClick = () => {
      const disabled = props.disabled;
      if (rootProps.menuTrigger === "hover" && rootProps.mode === "horizontal" || rootProps.collapse && rootProps.mode === "vertical" || disabled) {
        return;
      }
      rootMenuEmit("submenu:submenu-click", { index: props.index, indexPath });
    };
    const handleMouseenter = (event, showTimeout = props.showTimeout) => {
      if (!("ActiveXObject" in window) && event.type === "focus" && !event.relatedTarget) {
        return;
      }
      const disabled = props.disabled;
      if (rootProps.menuTrigger === "click" && rootProps.mode === "horizontal" || !rootProps.collapse && rootProps.mode === "vertical" || disabled) {
        return;
      }
      subMenuEmitter.emit("submenu:mouse-enter-child");
      clearTimeout(data.timeout);
      data.timeout = setTimeout(() => {
        rootMethods.openMenu(props.index, indexPath);
      }, showTimeout);
      if (appendToBody.value) {
        parentMenu.value.vnode.el.dispatchEvent(new MouseEvent("mouseenter"));
      }
    };
    const handleMouseleave = (deepDispatch = false) => {
      if (rootProps.menuTrigger === "click" && rootProps.mode === "horizontal" || !rootProps.collapse && rootProps.mode === "vertical") {
        return;
      }
      subMenuEmitter.emit("submenu:mouse-leave-child");
      clearTimeout(data.timeout);
      data.timeout = setTimeout(() => {
        !data.mouseInChild && closeMenu(props.index);
      }, props.hideTimeout);
      if (appendToBody.value && deepDispatch) {
        if (instance.parent.type.name === "ElSubmenu") {
          parentHandleMouseleave(true);
        }
      }
    };
    const handleTitleMouseenter = () => {
      var _a;
      if (mode.value === "horizontal" && !rootProps.backgroundColor)
        return;
      const title = ((_a = popperVnode.value) == null ? void 0 : _a.triggerRef) || verticalTitleRef.value;
      title && (title.style.backgroundColor = rootHoverBackground.value);
    };
    const handleTitleMouseleave = () => {
      var _a;
      if (mode.value === "horizontal" && !rootProps.backgroundColor)
        return;
      const title = ((_a = popperVnode.value) == null ? void 0 : _a.triggerRef) || verticalTitleRef.value;
      title && (title.style.backgroundColor = rootProps.backgroundColor || "");
    };
    const updatePlacement = () => {
      data.currentPlacement = mode.value === "horizontal" && isFirstLevel.value ? "bottom-start" : "right-start";
    };
    provide(`subMenu:${instance.uid}`, {
      addSubMenu,
      removeSubMenu,
      handleMouseleave
    });
    onBeforeMount(() => {
      rootMenuOn("rootMenu:toggle-collapse", (val) => {
        handleCollapseToggle(val);
      });
      subMenuEmitter.on("submenu:mouse-enter-child", () => {
        data.mouseInChild = true;
        clearTimeout(data.timeout);
      });
      subMenuEmitter.on("submenu:mouse-leave-child", () => {
        data.mouseInChild = false;
        clearTimeout(data.timeout);
      });
    });
    onMounted(() => {
      rootMethods.addSubMenu({
        index: props.index,
        indexPath,
        active
      });
      parentAddSubmenu({
        index: props.index,
        indexPath,
        active
      });
      updatePlacement();
    });
    onBeforeUnmount(() => {
      parentRemoveSubmenu({
        index: props.index,
        indexPath,
        active
      });
      rootMethods.removeSubMenu({
        index: props.index,
        indexPath,
        active
      });
    });
    return {
      data,
      props,
      mode,
      active,
      isMenuPopup,
      opened,
      paddingStyle,
      titleStyle,
      backgroundColor,
      rootProps,
      menuTransitionName,
      submenuTitleIcon,
      appendToBody,
      handleClick,
      handleMouseenter,
      handleMouseleave,
      handleTitleMouseenter,
      handleTitleMouseleave,
      addItem,
      removeItem,
      addSubMenu,
      removeSubMenu,
      popperVnode,
      verticalTitleRef
    };
  },
  render() {
    var _a, _b;
    const titleTag = [
      (_b = (_a = this.$slots).title) == null ? void 0 : _b.call(_a),
      h("i", {
        class: ["el-submenu__icon-arrow", this.submenuTitleIcon]
      }, null)
    ];
    const ulStyle = {
      backgroundColor: this.rootProps.backgroundColor || ""
    };
    const child = this.isMenuPopup ? h(ElPopper, {
      ref: "popperVNode",
      manualMode: true,
      visible: this.opened,
      "onUpdate:visible": (val) => this.opened = val,
      effect: "light",
      pure: true,
      offset: 6,
      showArrow: false,
      popperClass: this.popperClass,
      placement: this.data.currentPlacement,
      appendToBody: this.appendToBody,
      transition: this.menuTransitionName,
      gpuAcceleration: false
    }, {
      default: () => {
        var _a2, _b2;
        return h("div", {
          ref: "menu",
          class: [
            `el-menu--${this.mode}`,
            this.popperClass
          ],
          onMouseenter: ($event) => this.handleMouseenter($event, 100),
          onMouseleave: () => this.handleMouseleave(true),
          onFocus: ($event) => this.handleMouseenter($event, 100)
        }, [
          h("ul", {
            class: [
              "el-menu el-menu--popup",
              `el-menu--popup-${this.data.currentPlacement}`
            ],
            style: ulStyle
          }, [(_b2 = (_a2 = this.$slots).default) == null ? void 0 : _b2.call(_a2)])
        ]);
      },
      trigger: () => h("div", {
        class: "el-submenu__title",
        style: [this.paddingStyle, this.titleStyle, { backgroundColor: this.backgroundColor }],
        onClick: this.handleClick,
        onMouseenter: this.handleTitleMouseenter,
        onMouseleave: this.handleTitleMouseleave
      }, titleTag)
    }) : h(Fragment, {}, [
      h("div", {
        class: "el-submenu__title",
        style: [this.paddingStyle, this.titleStyle, { backgroundColor: this.backgroundColor }],
        ref: "verticalTitleRef",
        onClick: this.handleClick,
        onMouseenter: this.handleTitleMouseenter,
        onMouseleave: this.handleTitleMouseleave
      }, titleTag),
      h(ElCollapseTransition, {}, {
        default: () => {
          var _a2, _b2;
          return withDirectives(h("ul", {
            role: "menu",
            class: "el-menu el-menu--inline",
            style: ulStyle
          }, [(_b2 = (_a2 = this.$slots).default) == null ? void 0 : _b2.call(_a2)]), [[vShow, this.opened]]);
        }
      })
    ]);
    return h("li", {
      class: [
        "el-submenu",
        {
          "is-active": this.active,
          "is-opened": this.opened,
          "is-disabled": this.disabled
        }
      ],
      role: "menuitem",
      ariaHaspopup: true,
      ariaExpanded: this.opened,
      onMouseenter: this.handleMouseenter,
      onMouseleave: () => this.handleMouseleave(true),
      onFocus: this.handleMouseenter
    }, [child]);
  }
});

script.__file = "packages/menu/src/submenu.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Submenu = script;

export default _Submenu;
