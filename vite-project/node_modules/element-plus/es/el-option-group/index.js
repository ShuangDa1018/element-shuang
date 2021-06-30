import { defineComponent, ref, provide, reactive, toRefs, inject, withDirectives, openBlock, createBlock, createVNode, toDisplayString, renderSlot, vShow } from 'vue';

const selectGroupKey = "ElSelectGroup";
const selectKey = "ElSelect";
const selectEvents = {
  queryChange: "elOptionQueryChange",
  groupQueryChange: "elOptionGroupQueryChange"
};

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var script = defineComponent({
  name: "ElOptionGroup",
  componentName: "ElOptionGroup",
  props: {
    label: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const visible = ref(true);
    provide(selectGroupKey, reactive(__spreadValues({}, toRefs(props))));
    const select = inject(selectKey);
    const queryChange = () => {
      var _a;
      visible.value = (_a = select == null ? void 0 : select.optionsArray) == null ? void 0 : _a.some((option) => option.visible === true);
    };
    select.selectEmitter.on(selectEvents.groupQueryChange, queryChange);
    return {
      visible
    };
  }
});

const _hoisted_1 = { class: "el-select-group__wrap" };
const _hoisted_2 = { class: "el-select-group__title" };
const _hoisted_3 = { class: "el-select-group" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return withDirectives((openBlock(), createBlock("ul", _hoisted_1, [
    createVNode("li", _hoisted_2, toDisplayString(_ctx.label), 1),
    createVNode("li", null, [
      createVNode("ul", _hoisted_3, [
        renderSlot(_ctx.$slots, "default")
      ])
    ])
  ], 512)), [
    [vShow, _ctx.visible]
  ]);
}

script.render = render;
script.__file = "packages/select/src/option-group.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _OptionGroup = script;

export default _OptionGroup;
