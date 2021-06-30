'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var mitt = require('mitt');
var constants = require('../utils/constants');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var mitt__default = /*#__PURE__*/_interopDefaultLegacy(mitt);

var script = vue.defineComponent({
  name: "ElCollapse",
  props: {
    accordion: Boolean,
    modelValue: {
      type: [Array, String, Number],
      default: () => []
    }
  },
  emits: [constants.UPDATE_MODEL_EVENT, constants.CHANGE_EVENT],
  setup(props, { emit }) {
    const activeNames = vue.ref([].concat(props.modelValue));
    const collapseMitt = mitt__default['default']();
    const setActiveNames = (_activeNames) => {
      activeNames.value = [].concat(_activeNames);
      const value = props.accordion ? activeNames.value[0] : activeNames.value;
      emit(constants.UPDATE_MODEL_EVENT, value);
      emit(constants.CHANGE_EVENT, value);
    };
    const handleItemClick = (name) => {
      if (props.accordion) {
        setActiveNames((activeNames.value[0] || activeNames.value[0] === 0) && activeNames.value[0] === name ? "" : name);
      } else {
        let _activeNames = activeNames.value.slice(0);
        const index = _activeNames.indexOf(name);
        if (index > -1) {
          _activeNames.splice(index, 1);
        } else {
          _activeNames.push(name);
        }
        setActiveNames(_activeNames);
      }
    };
    vue.watch(() => props.modelValue, () => {
      activeNames.value = [].concat(props.modelValue);
    });
    collapseMitt.on("item-click", handleItemClick);
    vue.onUnmounted(() => {
      collapseMitt.all.clear();
    });
    vue.provide("collapse", {
      activeNames,
      collapseMitt
    });
    return {
      activeNames,
      setActiveNames,
      handleItemClick
    };
  }
});

const _hoisted_1 = {
  class: "el-collapse",
  role: "tablist",
  "aria-multiselectable": "true"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("div", _hoisted_1, [
    vue.renderSlot(_ctx.$slots, "default")
  ]);
}

script.render = render;
script.__file = "packages/collapse/src/collapse.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Collapse = script;

exports.default = _Collapse;
