import { defineComponent, computed, resolveComponent, openBlock, createBlock, withCtx, createVNode, Fragment, renderList } from 'vue';
import ElSelect from '../el-select';
import ElOption from '../el-option';

const parseTime = (time) => {
  const values = (time || "").split(":");
  if (values.length >= 2) {
    const hours = parseInt(values[0], 10);
    const minutes = parseInt(values[1], 10);
    return {
      hours,
      minutes
    };
  }
  return null;
};
const compareTime = (time1, time2) => {
  const value1 = parseTime(time1);
  const value2 = parseTime(time2);
  const minutes1 = value1.minutes + value1.hours * 60;
  const minutes2 = value2.minutes + value2.hours * 60;
  if (minutes1 === minutes2) {
    return 0;
  }
  return minutes1 > minutes2 ? 1 : -1;
};
const formatTime = (time) => {
  return (time.hours < 10 ? "0" + time.hours : time.hours) + ":" + (time.minutes < 10 ? "0" + time.minutes : time.minutes);
};
const nextTime = (time, step) => {
  const timeValue = parseTime(time);
  const stepValue = parseTime(step);
  const next = {
    hours: timeValue.hours,
    minutes: timeValue.minutes
  };
  next.minutes += stepValue.minutes;
  next.hours += stepValue.hours;
  next.hours += Math.floor(next.minutes / 60);
  next.minutes = next.minutes % 60;
  return formatTime(next);
};
var script = defineComponent({
  name: "ElTimeSelect",
  components: { ElSelect, ElOption },
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    modelValue: String,
    editable: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: "",
      validator: (value) => !value || ["medium", "small", "mini"].indexOf(value) !== -1
    },
    placeholder: {
      type: String,
      default: ""
    },
    start: {
      type: String,
      default: "09:00"
    },
    end: {
      type: String,
      default: "18:00"
    },
    step: {
      type: String,
      default: "00:30"
    },
    minTime: {
      type: String,
      default: ""
    },
    maxTime: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    prefixIcon: {
      type: String,
      default: "el-icon-time"
    },
    clearIcon: {
      type: String,
      default: "el-icon-circle-close"
    }
  },
  emits: ["change", "blur", "focus", "update:modelValue"],
  setup(props) {
    const value = computed(() => props.modelValue);
    const items = computed(() => {
      const result = [];
      if (props.start && props.end && props.step) {
        let current = props.start;
        while (compareTime(current, props.end) <= 0) {
          result.push({
            value: current,
            disabled: compareTime(current, props.minTime || "-1:-1") <= 0 || compareTime(current, props.maxTime || "100:100") >= 0
          });
          current = nextTime(current, props.step);
        }
      }
      return result;
    });
    return {
      value,
      items
    };
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_option = resolveComponent("el-option");
  const _component_el_select = resolveComponent("el-select");
  return openBlock(), createBlock(_component_el_select, {
    "model-value": _ctx.value,
    disabled: !_ctx.editable,
    clearable: _ctx.clearable,
    "clear-icon": _ctx.clearIcon,
    size: _ctx.size,
    placeholder: _ctx.placeholder,
    "default-first-option": "",
    filterable: "",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = (event) => _ctx.$emit("update:modelValue", event)),
    onChange: _cache[2] || (_cache[2] = (event) => _ctx.$emit("change", event)),
    onBlur: _cache[3] || (_cache[3] = (event) => _ctx.$emit("blur", event)),
    onFocus: _cache[4] || (_cache[4] = (event) => _ctx.$emit("focus", event))
  }, {
    prefix: withCtx(() => [
      createVNode("i", {
        class: `el-input__icon ${_ctx.prefixIcon}`
      }, null, 2)
    ]),
    default: withCtx(() => [
      (openBlock(true), createBlock(Fragment, null, renderList(_ctx.items, (item) => {
        return openBlock(), createBlock(_component_el_option, {
          key: item.value,
          label: item.value,
          value: item.value,
          disabled: item.disabled
        }, null, 8, ["label", "value", "disabled"]);
      }), 128))
    ]),
    _: 1
  }, 8, ["model-value", "disabled", "clearable", "clear-icon", "size", "placeholder"]);
}

script.render = render;
script.__file = "packages/time-select/src/time-select.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _TimeSelect = script;

export default _TimeSelect;
