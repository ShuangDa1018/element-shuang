import { defineComponent, watch, reactive, toRefs, provide, ref, computed, openBlock, createBlock, renderSlot } from 'vue';
import mitt from 'mitt';

const elFormKey = "elForm";
const elFormItemKey = "elFormItem";
const elFormEvents = {
  addField: "el.form.addField",
  removeField: "el.form.removeField"
};

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
function useFormLabelWidth() {
  const potentialLabelWidthArr = ref([]);
  const autoLabelWidth = computed(() => {
    if (!potentialLabelWidthArr.value.length)
      return "0";
    const max = Math.max(...potentialLabelWidthArr.value);
    return max ? `${max}px` : "";
  });
  function getLabelWidthIndex(width) {
    const index = potentialLabelWidthArr.value.indexOf(width);
    if (index === -1) {
      console.warn("[Element Warn][ElementForm]unexpected width " + width);
    }
    return index;
  }
  function registerLabelWidth(val, oldVal) {
    if (val && oldVal) {
      const index = getLabelWidthIndex(oldVal);
      potentialLabelWidthArr.value.splice(index, 1, val);
    } else if (val) {
      potentialLabelWidthArr.value.push(val);
    }
  }
  function deregisterLabelWidth(val) {
    const index = getLabelWidthIndex(val);
    index > -1 && potentialLabelWidthArr.value.splice(index, 1);
  }
  return {
    autoLabelWidth,
    registerLabelWidth,
    deregisterLabelWidth
  };
}
var script = defineComponent({
  name: "ElForm",
  props: {
    model: Object,
    rules: Object,
    labelPosition: String,
    labelWidth: String,
    labelSuffix: {
      type: String,
      default: ""
    },
    inline: Boolean,
    inlineMessage: Boolean,
    statusIcon: Boolean,
    showMessage: {
      type: Boolean,
      default: true
    },
    size: String,
    disabled: Boolean,
    validateOnRuleChange: {
      type: Boolean,
      default: true
    },
    hideRequiredAsterisk: {
      type: Boolean,
      default: false
    }
  },
  emits: ["validate"],
  setup(props, { emit }) {
    const formMitt = mitt();
    const fields = [];
    watch(() => props.rules, () => {
      fields.forEach((field) => {
        field.removeValidateEvents();
        field.addValidateEvents();
      });
      if (props.validateOnRuleChange) {
        validate(() => ({}));
      }
    });
    formMitt.on(elFormEvents.addField, (field) => {
      if (field) {
        fields.push(field);
      }
    });
    formMitt.on(elFormEvents.removeField, (field) => {
      if (field.prop) {
        fields.splice(fields.indexOf(field), 1);
      }
    });
    const resetFields = () => {
      if (!props.model) {
        console.warn("[Element Warn][Form]model is required for resetFields to work.");
        return;
      }
      fields.forEach((field) => {
        field.resetField();
      });
    };
    const clearValidate = (props2 = []) => {
      const fds = props2.length ? typeof props2 === "string" ? fields.filter((field) => props2 === field.prop) : fields.filter((field) => props2.indexOf(field.prop) > -1) : fields;
      fds.forEach((field) => {
        field.clearValidate();
      });
    };
    const validate = (callback) => {
      if (!props.model) {
        console.warn("[Element Warn][Form]model is required for validate to work!");
        return;
      }
      let promise;
      if (typeof callback !== "function") {
        promise = new Promise((resolve, reject) => {
          callback = function(valid2, invalidFields2) {
            if (valid2) {
              resolve(true);
            } else {
              reject(invalidFields2);
            }
          };
        });
      }
      if (fields.length === 0) {
        callback(true);
      }
      let valid = true;
      let count = 0;
      let invalidFields = {};
      for (const field of fields) {
        field.validate("", (message, field2) => {
          if (message) {
            valid = false;
          }
          invalidFields = __spreadValues(__spreadValues({}, invalidFields), field2);
          if (++count === fields.length) {
            callback(valid, invalidFields);
          }
        });
      }
      return promise;
    };
    const validateField = (props2, cb) => {
      props2 = [].concat(props2);
      const fds = fields.filter((field) => props2.indexOf(field.prop) !== -1);
      if (!fields.length) {
        console.warn("[Element Warn]please pass correct props!");
        return;
      }
      fds.forEach((field) => {
        field.validate("", cb);
      });
    };
    const elForm = reactive(__spreadValues(__spreadProps(__spreadValues({
      formMitt
    }, toRefs(props)), {
      resetFields,
      clearValidate,
      validateField,
      emit
    }), useFormLabelWidth()));
    provide(elFormKey, elForm);
    return {
      validate,
      resetFields,
      clearValidate,
      validateField
    };
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("form", {
    class: ["el-form", [
      _ctx.labelPosition ? "el-form--label-" + _ctx.labelPosition : "",
      { "el-form--inline": _ctx.inline }
    ]]
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}

script.render = render;
script.__file = "packages/form/src/form.vue";

script.install = (app) => {
  app.component(script.name, script);
};
const _Form = script;

export default _Form;
export { elFormEvents, elFormItemKey, elFormKey };
