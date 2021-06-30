'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var directives = require('../directives');
var util = require('../utils/util');
var aria = require('../utils/aria');
var dom = require('../utils/dom');

const useDropdown = () => {
  const ELEMENT = util.useGlobalConfig();
  const elDropdown = vue.inject("elDropdown", {});
  const _elDropdownSize = vue.computed(() => elDropdown == null ? void 0 : elDropdown.dropdownSize);
  return {
    ELEMENT,
    elDropdown,
    _elDropdownSize
  };
};
const initDropdownDomEvent = (dropdownChildren, triggerElm, _instance) => {
  const menuItems = vue.ref(null);
  const menuItemsArray = vue.ref(null);
  const dropdownElm = vue.ref(null);
  const listId = vue.ref(`dropdown-menu-${util.generateId()}`);
  dropdownElm.value = dropdownChildren == null ? void 0 : dropdownChildren.subTree.el;
  function removeTabindex() {
    var _a;
    triggerElm.setAttribute("tabindex", "-1");
    (_a = menuItemsArray.value) == null ? void 0 : _a.forEach((item) => {
      item.setAttribute("tabindex", "-1");
    });
  }
  function resetTabindex(ele) {
    removeTabindex();
    ele == null ? void 0 : ele.setAttribute("tabindex", "0");
  }
  function handleTriggerKeyDown(ev) {
    const code = ev.code;
    if ([aria.EVENT_CODE.up, aria.EVENT_CODE.down].includes(code)) {
      removeTabindex();
      resetTabindex(menuItems.value[0]);
      menuItems.value[0].focus();
      ev.preventDefault();
      ev.stopPropagation();
    } else if (code === aria.EVENT_CODE.enter) {
      _instance.handleClick();
    } else if ([aria.EVENT_CODE.tab, aria.EVENT_CODE.esc].includes(code)) {
      _instance.hide();
    }
  }
  function handleItemKeyDown(ev) {
    const code = ev.code;
    const target = ev.target;
    const currentIndex = menuItemsArray.value.indexOf(target);
    const max = menuItemsArray.value.length - 1;
    let nextIndex;
    if ([aria.EVENT_CODE.up, aria.EVENT_CODE.down].includes(code)) {
      if (code === aria.EVENT_CODE.up) {
        nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0;
      } else {
        nextIndex = currentIndex < max ? currentIndex + 1 : max;
      }
      removeTabindex();
      resetTabindex(menuItems.value[nextIndex]);
      menuItems.value[nextIndex].focus();
      ev.preventDefault();
      ev.stopPropagation();
    } else if (code === aria.EVENT_CODE.enter) {
      triggerElmFocus();
      target.click();
      if (_instance.props.hideOnClick) {
        _instance.hide();
      }
    } else if ([aria.EVENT_CODE.tab, aria.EVENT_CODE.esc].includes(code)) {
      _instance.hide();
      triggerElmFocus();
    }
  }
  function initAria() {
    dropdownElm.value.setAttribute("id", listId.value);
    triggerElm.setAttribute("aria-haspopup", "list");
    triggerElm.setAttribute("aria-controls", listId.value);
    if (!_instance.props.splitButton) {
      triggerElm.setAttribute("role", "button");
      triggerElm.setAttribute("tabindex", _instance.props.tabindex);
      dom.addClass(triggerElm, "el-dropdown-selfdefine");
    }
  }
  function initEvent() {
    dom.on(triggerElm, "keydown", handleTriggerKeyDown);
    dom.on(dropdownElm.value, "keydown", handleItemKeyDown, true);
  }
  function initDomOperation() {
    menuItems.value = dropdownElm.value.querySelectorAll("[tabindex='-1']");
    menuItemsArray.value = [].slice.call(menuItems.value);
    initEvent();
    initAria();
  }
  function triggerElmFocus() {
    triggerElm.focus();
  }
  initDomOperation();
};

var script = vue.defineComponent({
  name: "ElDropdownMenu",
  directives: {
    ClickOutside: directives.ClickOutside
  },
  setup() {
    const { _elDropdownSize, elDropdown } = useDropdown();
    const size = _elDropdownSize.value;
    function show() {
      var _a;
      if (["click", "contextmenu"].includes(elDropdown.trigger.value))
        return;
      (_a = elDropdown.show) == null ? void 0 : _a.call(elDropdown);
    }
    function hide() {
      if (["click", "contextmenu"].includes(elDropdown.trigger.value))
        return;
      _hide();
    }
    function _hide() {
      var _a;
      (_a = elDropdown.hide) == null ? void 0 : _a.call(elDropdown);
    }
    vue.onMounted(() => {
      const dropdownMenu = vue.getCurrentInstance();
      initDropdownDomEvent(dropdownMenu, elDropdown.triggerElm.value, elDropdown.instance);
    });
    return {
      size,
      show,
      hide,
      innerHide: _hide,
      triggerElm: elDropdown.triggerElm
    };
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_clickOutside = vue.resolveDirective("clickOutside");
  return vue.withDirectives((vue.openBlock(), vue.createBlock("ul", {
    class: [[_ctx.size && `el-dropdown-menu--${_ctx.size}`], "el-dropdown-menu"],
    onMouseenter: _cache[1] || (_cache[1] = vue.withModifiers((...args) => _ctx.show && _ctx.show(...args), ["stop"])),
    onMouseleave: _cache[2] || (_cache[2] = vue.withModifiers((...args) => _ctx.hide && _ctx.hide(...args), ["stop"]))
  }, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 34)), [
    [_directive_clickOutside, _ctx.innerHide, _ctx.triggerElm]
  ]);
}

script.render = render;
script.__file = "packages/dropdown/src/dropdown-menu.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _DropdownMenu = script;

exports.default = _DropdownMenu;
