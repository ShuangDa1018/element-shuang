import { inject, computed, ref, defineComponent, onMounted, getCurrentInstance, resolveDirective, withDirectives, openBlock, createBlock, withModifiers, renderSlot } from 'vue';
import { ClickOutside } from '../directives';
import { useGlobalConfig, generateId } from '../utils/util';
import { EVENT_CODE } from '../utils/aria';
import { addClass, on } from '../utils/dom';

const useDropdown = () => {
  const ELEMENT = useGlobalConfig();
  const elDropdown = inject("elDropdown", {});
  const _elDropdownSize = computed(() => elDropdown == null ? void 0 : elDropdown.dropdownSize);
  return {
    ELEMENT,
    elDropdown,
    _elDropdownSize
  };
};
const initDropdownDomEvent = (dropdownChildren, triggerElm, _instance) => {
  const menuItems = ref(null);
  const menuItemsArray = ref(null);
  const dropdownElm = ref(null);
  const listId = ref(`dropdown-menu-${generateId()}`);
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
    if ([EVENT_CODE.up, EVENT_CODE.down].includes(code)) {
      removeTabindex();
      resetTabindex(menuItems.value[0]);
      menuItems.value[0].focus();
      ev.preventDefault();
      ev.stopPropagation();
    } else if (code === EVENT_CODE.enter) {
      _instance.handleClick();
    } else if ([EVENT_CODE.tab, EVENT_CODE.esc].includes(code)) {
      _instance.hide();
    }
  }
  function handleItemKeyDown(ev) {
    const code = ev.code;
    const target = ev.target;
    const currentIndex = menuItemsArray.value.indexOf(target);
    const max = menuItemsArray.value.length - 1;
    let nextIndex;
    if ([EVENT_CODE.up, EVENT_CODE.down].includes(code)) {
      if (code === EVENT_CODE.up) {
        nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0;
      } else {
        nextIndex = currentIndex < max ? currentIndex + 1 : max;
      }
      removeTabindex();
      resetTabindex(menuItems.value[nextIndex]);
      menuItems.value[nextIndex].focus();
      ev.preventDefault();
      ev.stopPropagation();
    } else if (code === EVENT_CODE.enter) {
      triggerElmFocus();
      target.click();
      if (_instance.props.hideOnClick) {
        _instance.hide();
      }
    } else if ([EVENT_CODE.tab, EVENT_CODE.esc].includes(code)) {
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
      addClass(triggerElm, "el-dropdown-selfdefine");
    }
  }
  function initEvent() {
    on(triggerElm, "keydown", handleTriggerKeyDown);
    on(dropdownElm.value, "keydown", handleItemKeyDown, true);
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

var script = defineComponent({
  name: "ElDropdownMenu",
  directives: {
    ClickOutside
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
    onMounted(() => {
      const dropdownMenu = getCurrentInstance();
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
  const _directive_clickOutside = resolveDirective("clickOutside");
  return withDirectives((openBlock(), createBlock("ul", {
    class: [[_ctx.size && `el-dropdown-menu--${_ctx.size}`], "el-dropdown-menu"],
    onMouseenter: _cache[1] || (_cache[1] = withModifiers((...args) => _ctx.show && _ctx.show(...args), ["stop"])),
    onMouseleave: _cache[2] || (_cache[2] = withModifiers((...args) => _ctx.hide && _ctx.hide(...args), ["stop"]))
  }, [
    renderSlot(_ctx.$slots, "default")
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

export default _DropdownMenu;
