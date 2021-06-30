import { defineComponent, ref, computed, openBlock, createBlock, Transition, withCtx, withDirectives, createVNode, createCommentVNode, renderSlot, createTextVNode, toDisplayString, vShow } from 'vue';

const TYPE_CLASSES_MAP = {
  "success": "el-icon-success",
  "warning": "el-icon-warning",
  "error": "el-icon-error"
};
var script = defineComponent({
  name: "ElAlert",
  props: {
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "info"
    },
    closable: {
      type: Boolean,
      default: true
    },
    closeText: {
      type: String,
      default: ""
    },
    showIcon: Boolean,
    center: Boolean,
    effect: {
      type: String,
      default: "light",
      validator: (value) => ["light", "dark"].indexOf(value) > -1
    }
  },
  emits: ["close"],
  setup(props, ctx) {
    const visible = ref(true);
    const typeClass = computed(() => `el-alert--${props.type}`);
    const iconClass = computed(() => TYPE_CLASSES_MAP[props.type] || "el-icon-info");
    const isBigIcon = computed(() => props.description || ctx.slots.default ? "is-big" : "");
    const isBoldTitle = computed(() => props.description || ctx.slots.default ? "is-bold" : "");
    const close = (evt) => {
      visible.value = false;
      ctx.emit("close", evt);
    };
    return {
      visible,
      typeClass,
      iconClass,
      isBigIcon,
      isBoldTitle,
      close
    };
  }
});

const _hoisted_1 = { class: "el-alert__content" };
const _hoisted_2 = {
  key: 1,
  class: "el-alert__description"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Transition, { name: "el-alert-fade" }, {
    default: withCtx(() => [
      withDirectives(createVNode("div", {
        class: ["el-alert", [_ctx.typeClass, _ctx.center ? "is-center" : "", "is-" + _ctx.effect]],
        role: "alert"
      }, [
        _ctx.showIcon ? (openBlock(), createBlock("i", {
          key: 0,
          class: ["el-alert__icon", [_ctx.iconClass, _ctx.isBigIcon]]
        }, null, 2)) : createCommentVNode("v-if", true),
        createVNode("div", _hoisted_1, [
          _ctx.title || _ctx.$slots.title ? (openBlock(), createBlock("span", {
            key: 0,
            class: ["el-alert__title", [_ctx.isBoldTitle]]
          }, [
            renderSlot(_ctx.$slots, "title", {}, () => [
              createTextVNode(toDisplayString(_ctx.title), 1)
            ])
          ], 2)) : createCommentVNode("v-if", true),
          _ctx.$slots.default || !!_ctx.description ? (openBlock(), createBlock("p", _hoisted_2, [
            renderSlot(_ctx.$slots, "default", {}, () => [
              createTextVNode(toDisplayString(_ctx.description), 1)
            ])
          ])) : createCommentVNode("v-if", true),
          _ctx.closable ? (openBlock(), createBlock("i", {
            key: 2,
            class: ["el-alert__closebtn", { "is-customed": _ctx.closeText !== "", "el-icon-close": _ctx.closeText === "" }],
            onClick: _cache[1] || (_cache[1] = (...args) => _ctx.close && _ctx.close(...args))
          }, toDisplayString(_ctx.closeText), 3)) : createCommentVNode("v-if", true)
        ])
      ], 2), [
        [vShow, _ctx.visible]
      ])
    ]),
    _: 3
  });
}

script.render = render;
script.__file = "packages/alert/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Alert = script;

export default _Alert;
