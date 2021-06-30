'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

var script = vue.defineComponent({
  name: "ElTabPane",
  props: {
    label: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    closable: Boolean,
    disabled: Boolean,
    lazy: Boolean
  },
  setup(props) {
    const index = vue.ref(null);
    const loaded = vue.ref(false);
    const rootTabs = vue.inject("rootTabs");
    const updatePaneState = vue.inject("updatePaneState");
    if (!rootTabs || !updatePaneState) {
      throw new Error(`ElTabPane must use with ElTabs`);
    }
    const isClosable = vue.computed(() => {
      return props.closable || rootTabs.props.closable;
    });
    const active = vue.computed(() => {
      const active2 = rootTabs.currentName.value === (props.name || index.value);
      if (active2) {
        loaded.value = true;
      }
      return active2;
    });
    const paneName = vue.computed(() => {
      return props.name || index.value;
    });
    const shouldBeRender = vue.computed(() => {
      return !props.lazy || loaded.value || active.value;
    });
    const instance = vue.getCurrentInstance();
    updatePaneState({
      uid: instance.uid,
      instance,
      props,
      paneName,
      active,
      index,
      isClosable
    });
    return {
      index,
      loaded,
      isClosable,
      active,
      paneName,
      shouldBeRender
    };
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _ctx.shouldBeRender ? vue.withDirectives((vue.openBlock(), vue.createBlock("div", {
    key: 0,
    id: `pane-${_ctx.paneName}`,
    class: "el-tab-pane",
    role: "tabpanel",
    "aria-hidden": !_ctx.active,
    "aria-labelledby": `tab-${_ctx.paneName}`
  }, [
    vue.renderSlot(_ctx.$slots, "default")
  ], 8, ["id", "aria-hidden", "aria-labelledby"])), [
    [vue.vShow, _ctx.active]
  ]) : vue.createCommentVNode("v-if", true);
}

script.render = render;
script.__file = "packages/tabs/src/tab-pane.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _TabPane = script;

exports.default = _TabPane;
