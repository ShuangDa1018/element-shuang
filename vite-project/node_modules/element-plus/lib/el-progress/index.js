'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

var script = vue.defineComponent({
  name: "ElProgress",
  props: {
    type: {
      type: String,
      default: "line",
      validator: (val) => ["line", "circle", "dashboard"].indexOf(val) > -1
    },
    percentage: {
      type: Number,
      default: 0,
      required: true,
      validator: (val) => val >= 0 && val <= 100
    },
    status: {
      type: String,
      default: "",
      validator: (val) => ["", "success", "exception", "warning"].indexOf(val) > -1
    },
    indeterminate: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 3
    },
    strokeWidth: {
      type: Number,
      default: 6
    },
    strokeLinecap: {
      type: String,
      default: "round"
    },
    textInside: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 126
    },
    showText: {
      type: Boolean,
      default: true
    },
    color: {
      type: [String, Array, Function],
      default: ""
    },
    format: {
      type: Function,
      default: (percentage) => `${percentage}%`
    }
  },
  setup(props) {
    const barStyle = vue.computed(() => {
      return {
        width: `${props.percentage}%`,
        animationDuration: `${props.duration}s`,
        backgroundColor: getCurrentColor(props.percentage)
      };
    });
    const relativeStrokeWidth = vue.computed(() => {
      return (props.strokeWidth / props.width * 100).toFixed(1);
    });
    const radius = vue.computed(() => {
      if (props.type === "circle" || props.type === "dashboard") {
        return parseInt(`${50 - parseFloat(relativeStrokeWidth.value) / 2}`, 10);
      } else {
        return 0;
      }
    });
    const trackPath = vue.computed(() => {
      const r = radius.value;
      const isDashboard = props.type === "dashboard";
      return `
          M 50 50
          m 0 ${isDashboard ? "" : "-"}${r}
          a ${r} ${r} 0 1 1 0 ${isDashboard ? "-" : ""}${r * 2}
          a ${r} ${r} 0 1 1 0 ${isDashboard ? "" : "-"}${r * 2}
          `;
    });
    const perimeter = vue.computed(() => {
      return 2 * Math.PI * radius.value;
    });
    const rate = vue.computed(() => {
      return props.type === "dashboard" ? 0.75 : 1;
    });
    const strokeDashoffset = vue.computed(() => {
      const offset = -1 * perimeter.value * (1 - rate.value) / 2;
      return `${offset}px`;
    });
    const trailPathStyle = vue.computed(() => {
      return {
        strokeDasharray: `${perimeter.value * rate.value}px, ${perimeter.value}px`,
        strokeDashoffset: strokeDashoffset.value
      };
    });
    const circlePathStyle = vue.computed(() => {
      return {
        strokeDasharray: `${perimeter.value * rate.value * (props.percentage / 100)}px, ${perimeter.value}px`,
        strokeDashoffset: strokeDashoffset.value,
        transition: "stroke-dasharray 0.6s ease 0s, stroke 0.6s ease"
      };
    });
    const stroke = vue.computed(() => {
      let ret;
      if (props.color) {
        ret = getCurrentColor(props.percentage);
      } else {
        switch (props.status) {
          case "success":
            ret = "#13ce66";
            break;
          case "exception":
            ret = "#ff4949";
            break;
          case "warning":
            ret = "#e6a23c";
            break;
          default:
            ret = "#20a0ff";
        }
      }
      return ret;
    });
    const iconClass = vue.computed(() => {
      if (props.status === "warning") {
        return "el-icon-warning";
      }
      if (props.type === "line") {
        return props.status === "success" ? "el-icon-circle-check" : "el-icon-circle-close";
      } else {
        return props.status === "success" ? "el-icon-check" : "el-icon-close";
      }
    });
    const progressTextSize = vue.computed(() => {
      return props.type === "line" ? 12 + props.strokeWidth * 0.4 : props.width * 0.111111 + 2;
    });
    const content = vue.computed(() => {
      return props.format(props.percentage);
    });
    const getCurrentColor = (percentage) => {
      var _a;
      const { color } = props;
      if (typeof color === "function") {
        return color(percentage);
      } else if (typeof color === "string") {
        return color;
      } else {
        const span = 100 / color.length;
        const seriesColors = color.map((seriesColor, index) => {
          if (typeof seriesColor === "string") {
            return {
              color: seriesColor,
              percentage: (index + 1) * span
            };
          }
          return seriesColor;
        });
        const colorArray = seriesColors.sort((a, b) => a.percentage - b.percentage);
        for (let i = 0; i < colorArray.length; i++) {
          if (colorArray[i].percentage > percentage) {
            return colorArray[i].color;
          }
        }
        return (_a = colorArray[colorArray.length - 1]) == null ? void 0 : _a.color;
      }
    };
    const slotData = vue.computed(() => {
      return {
        percentage: props.percentage
      };
    });
    return {
      barStyle,
      relativeStrokeWidth,
      radius,
      trackPath,
      perimeter,
      rate,
      strokeDashoffset,
      trailPathStyle,
      circlePathStyle,
      stroke,
      iconClass,
      progressTextSize,
      content,
      getCurrentColor,
      slotData
    };
  }
});

const _hoisted_1 = {
  key: 0,
  class: "el-progress-bar"
};
const _hoisted_2 = {
  key: 0,
  class: "el-progress-bar__innerText"
};
const _hoisted_3 = { viewBox: "0 0 100 100" };
const _hoisted_4 = { key: 0 };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("div", {
    class: ["el-progress", [
      `el-progress--${_ctx.type}`,
      _ctx.status ? `is-${_ctx.status}` : "",
      {
        "el-progress--without-text": !_ctx.showText,
        "el-progress--text-inside": _ctx.textInside
      }
    ]],
    role: "progressbar",
    "aria-valuenow": _ctx.percentage,
    "aria-valuemin": "0",
    "aria-valuemax": "100"
  }, [
    _ctx.type === "line" ? (vue.openBlock(), vue.createBlock("div", _hoisted_1, [
      vue.createVNode("div", {
        class: "el-progress-bar__outer",
        style: { height: `${_ctx.strokeWidth}px` }
      }, [
        vue.createVNode("div", {
          class: [
            "el-progress-bar__inner",
            { "el-progress-bar__inner--indeterminate": _ctx.indeterminate }
          ],
          style: _ctx.barStyle
        }, [
          (_ctx.showText || _ctx.$slots.default) && _ctx.textInside ? (vue.openBlock(), vue.createBlock("div", _hoisted_2, [
            vue.renderSlot(_ctx.$slots, "default", _ctx.slotData, () => [
              vue.createVNode("span", null, vue.toDisplayString(_ctx.content), 1)
            ])
          ])) : vue.createCommentVNode("v-if", true)
        ], 6)
      ], 4)
    ])) : (vue.openBlock(), vue.createBlock("div", {
      key: 1,
      class: "el-progress-circle",
      style: { height: `${_ctx.width}px`, width: `${_ctx.width}px` }
    }, [
      (vue.openBlock(), vue.createBlock("svg", _hoisted_3, [
        vue.createVNode("path", {
          class: "el-progress-circle__track",
          d: _ctx.trackPath,
          stroke: "#e5e9f2",
          "stroke-width": _ctx.relativeStrokeWidth,
          fill: "none",
          style: _ctx.trailPathStyle
        }, null, 12, ["d", "stroke-width"]),
        vue.createVNode("path", {
          class: "el-progress-circle__path",
          d: _ctx.trackPath,
          stroke: _ctx.stroke,
          fill: "none",
          "stroke-linecap": _ctx.strokeLinecap,
          "stroke-width": _ctx.percentage ? _ctx.relativeStrokeWidth : 0,
          style: _ctx.circlePathStyle
        }, null, 12, ["d", "stroke", "stroke-linecap", "stroke-width"])
      ]))
    ], 4)),
    (_ctx.showText || _ctx.$slots.default) && !_ctx.textInside ? (vue.openBlock(), vue.createBlock("div", {
      key: 2,
      class: "el-progress__text",
      style: { fontSize: `${_ctx.progressTextSize}px` }
    }, [
      vue.renderSlot(_ctx.$slots, "default", _ctx.slotData, () => [
        !_ctx.status ? (vue.openBlock(), vue.createBlock("span", _hoisted_4, vue.toDisplayString(_ctx.content), 1)) : (vue.openBlock(), vue.createBlock("i", {
          key: 1,
          class: _ctx.iconClass
        }, null, 2))
      ])
    ], 4)) : vue.createCommentVNode("v-if", true)
  ], 10, ["aria-valuenow"]);
}

script.render = render;
script.__file = "packages/progress/src/index.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Progress = script;

exports.default = _Progress;
