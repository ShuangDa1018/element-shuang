import { defineComponent, ref, inject, computed, getCurrentInstance, withDirectives, openBlock, createBlock, renderSlot, vShow, createCommentVNode } from 'vue';

var script = defineComponent({
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
    const index = ref(null);
    const loaded = ref(false);
    const rootTabs = inject("rootTabs");
    const updatePaneState = inject("updatePaneState");
    if (!rootTabs || !updatePaneState) {
      throw new Error(`ElTabPane must use with ElTabs`);
    }
    const isClosable = computed(() => {
      return props.closable || rootTabs.props.closable;
    });
    const active = computed(() => {
      const active2 = rootTabs.currentName.value === (props.name || index.value);
      if (active2) {
        loaded.value = true;
      }
      return active2;
    });
    const paneName = computed(() => {
      return props.name || index.value;
    });
    const shouldBeRender = computed(() => {
      return !props.lazy || loaded.value || active.value;
    });
    const instance = getCurrentInstance();
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
  return _ctx.shouldBeRender ? withDirectives((openBlock(), createBlock("div", {
    key: 0,
    id: `pane-${_ctx.paneName}`,
    class: "el-tab-pane",
    role: "tabpanel",
    "aria-hidden": !_ctx.active,
    "aria-labelledby": `tab-${_ctx.paneName}`
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 8, ["id", "aria-hidden", "aria-labelledby"])), [
    [vShow, _ctx.active]
  ]) : createCommentVNode("v-if", true);
}

script.render = render;
script.__file = "packages/tabs/src/tab-pane.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _TabPane = script;

export default _TabPane;
