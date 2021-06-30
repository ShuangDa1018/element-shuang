'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

var script = vue.defineComponent({
  name: "ElTimeline",
  setup(props, ctx) {
    vue.provide("timeline", ctx);
    return () => {
      var _a, _b;
      return vue.h("ul", {
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

exports.default = _Timeline;
