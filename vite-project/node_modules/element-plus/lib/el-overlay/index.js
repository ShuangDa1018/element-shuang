'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var vnode = require('../utils/vnode');

var script = vue.defineComponent({
  name: "ElOverlay",
  props: {
    mask: {
      type: Boolean,
      default: true
    },
    overlayClass: {
      type: [String, Array, Object]
    },
    zIndex: {
      type: Number
    }
  },
  emits: ["click"],
  setup(props, { slots, emit }) {
    let mousedownTarget = false;
    let mouseupTarget = false;
    const onMaskClick = (e) => {
      if (mousedownTarget && mouseupTarget) {
        emit("click", e);
      }
      mousedownTarget = mouseupTarget = false;
    };
    return () => {
      return props.mask ? vue.createVNode("div", {
        class: ["el-overlay", props.overlayClass],
        style: {
          zIndex: props.zIndex
        },
        onClick: onMaskClick,
        onMousedown: (e) => {
          if (props.mask) {
            mousedownTarget = e.target === e.currentTarget;
          }
        },
        onMouseup: (e) => {
          if (props.mask) {
            mouseupTarget = e.target === e.currentTarget;
          }
        }
      }, [vue.renderSlot(slots, "default")], vnode.PatchFlags.STYLE | vnode.PatchFlags.CLASS | vnode.PatchFlags.PROPS, ["onClick", "onMouseup", "onMousedown"]) : vue.h("div", {
        class: props.overlayClass,
        style: {
          zIndex: props.zIndex,
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px"
        }
      }, [vue.renderSlot(slots, "default")]);
    };
  }
});

script.__file = "packages/overlay/src/index.vue";

exports.Overlay = script;
