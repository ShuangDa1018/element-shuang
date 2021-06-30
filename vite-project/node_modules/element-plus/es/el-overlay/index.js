import { defineComponent, createVNode, renderSlot, h } from 'vue';
import { PatchFlags } from '../utils/vnode';

var script = defineComponent({
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
      return props.mask ? createVNode("div", {
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
      }, [renderSlot(slots, "default")], PatchFlags.STYLE | PatchFlags.CLASS | PatchFlags.PROPS, ["onClick", "onMouseup", "onMousedown"]) : h("div", {
        class: props.overlayClass,
        style: {
          zIndex: props.zIndex,
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px"
        }
      }, [renderSlot(slots, "default")]);
    };
  }
});

script.__file = "packages/overlay/src/index.vue";

export { script as Overlay };
