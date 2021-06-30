import { defineComponent, provide, h } from 'vue';

var script = defineComponent({
  name: "ElTimeline",
  setup(props, ctx) {
    provide("timeline", ctx);
    return () => {
      var _a, _b;
      return h("ul", {
        class: { "el-timeline": true }
      }, (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a));
    };
  }
});

script.__file = "packages/timeline/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Timeline = script;

export default _Timeline;
