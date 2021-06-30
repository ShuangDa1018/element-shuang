import { inject, computed, defineComponent, getCurrentInstance, openBlock, createBlock, createCommentVNode, renderSlot } from 'vue';
import { useGlobalConfig } from '../utils/util';
import '../utils/aria';
import '../utils/dom';

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

var script = defineComponent({
  name: "ElDropdownItem",
  props: {
    command: {
      type: [Object, String, Number],
      default: () => ({})
    },
    disabled: Boolean,
    divided: Boolean,
    icon: String
  },
  setup(props) {
    const { elDropdown } = useDropdown();
    const _instance = getCurrentInstance();
    function handleClick(e) {
      var _a, _b;
      if (props.disabled) {
        e.stopImmediatePropagation();
        return;
      }
      if (elDropdown.hideOnClick.value) {
        (_a = elDropdown.handleClick) == null ? void 0 : _a.call(elDropdown);
      }
      (_b = elDropdown.commandHandler) == null ? void 0 : _b.call(elDropdown, props.command, _instance, e);
    }
    return {
      handleClick
    };
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("li", {
    class: ["el-dropdown-menu__item", {
      "is-disabled": _ctx.disabled,
      "el-dropdown-menu__item--divided": _ctx.divided
    }],
    "aria-disabled": _ctx.disabled,
    tabindex: _ctx.disabled ? null : -1,
    onClick: _cache[1] || (_cache[1] = (...args) => _ctx.handleClick && _ctx.handleClick(...args))
  }, [
    _ctx.icon ? (openBlock(), createBlock("i", {
      key: 0,
      class: _ctx.icon
    }, null, 2)) : createCommentVNode("v-if", true),
    renderSlot(_ctx.$slots, "default")
  ], 10, ["aria-disabled", "tabindex"]);
}

script.render = render;
script.__file = "packages/dropdown/src/dropdown-item.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _DropdownItem = script;

export default _DropdownItem;
