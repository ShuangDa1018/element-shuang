import { defineComponent, ref, watch, provide, openBlock, createBlock, renderSlot } from 'vue';
import { CHANGE_EVENT } from '../utils/constants';

var script = defineComponent({
  name: "ElSteps",
  props: {
    space: {
      type: [Number, String],
      default: ""
    },
    active: {
      type: Number,
      default: 0
    },
    direction: {
      type: String,
      default: "horizontal",
      validator: (val) => ["horizontal", "vertical"].includes(val)
    },
    alignCenter: {
      type: Boolean,
      default: false
    },
    simple: {
      type: Boolean,
      default: false
    },
    finishStatus: {
      type: String,
      default: "finish",
      validator: (val) => ["wait", "process", "finish", "error", "success"].includes(val)
    },
    processStatus: {
      type: String,
      default: "process",
      validator: (val) => ["wait", "process", "finish", "error", "success"].includes(val)
    }
  },
  emits: [CHANGE_EVENT],
  setup(props, { emit }) {
    const steps = ref([]);
    watch(steps, () => {
      steps.value.forEach((instance, index) => {
        instance.setIndex(index);
      });
    });
    provide("ElSteps", { props, steps });
    watch(() => props.active, (newVal, oldVal) => {
      emit(CHANGE_EVENT, newVal, oldVal);
    });
    return {
      steps
    };
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", {
    class: ["el-steps", _ctx.simple ? "el-steps--simple" : `el-steps--${_ctx.direction}`]
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}

script.render = render;
script.__file = "packages/steps/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Steps = script;

export default _Steps;
