<template>
  <div>
    <S-form :formMeta="formMeta" :defaultData="defaultData"></S-form>
  </div>
</template>

<script>
import SForm from "@/components/SForm.vue";
import { reactive } from "vue";
export default {
  name: "form",
  components: {
    SForm,
  },
  setup() {
    const defaultData = reactive({
      checkboxKey: [], // checkbox类型,需默认值
    });
    const formMeta = reactive({
      labelWidth: "90px", // 表单label宽度|| 默认70px
      metaList: [
        {
          // 类型默认 input
          label: "基本信息",
          key: "common",
          required: true, // 校验必填
        },
        {
          type: "input",
          label: "输入框", // label名
          key: "inputkey", //v-model绑定的字段
          required: true, // 校验必填
          validator: (rule, value, back) => {
            if (10 < value < 20) {
              back();
            }
          },
        },
        {
          type: "select",
          label: "请求下拉框",
          key: "label",
          value: "label",
          selectUrl: "commodity/commodityUnit", // 请求地址
        },
        {
          type: "select",
          label: "选择器",
          key: "selectKey",
          option: [
            { label: 1, value: "下拉框" },
            { label: 1, value: "下拉框" },
          ],
        },
        {
          type: "date-picker",
          key: "dateKey",
          label: "时间选择器",
        },
        {
          type: "input-number",
          key: "numberKey",
          label: "计数器",
          validator: (rule, value, back) => {
            if (10 < value < 20) {
              back();
            }
          },
        },
        {
          type: "switch",
          key: "switchKey",
          label: "开关",
          disabled: true, // 能否编辑
        },
        {
          type: "checkbox-group",
          key: "checkboxKey",
          label: "多选框",
          checkbox: ["vue", "react", "angular"],
        },
        {
          type: "upload",
          key: "uploadKey",
          label: "上传",
          required: true,
        },
        {
          type: "textarea",
          key: "textarea",
          label: "富文本",
          required: true,
        },
      ],
    });
    return {
      formMeta,
      defaultData,
    };
  },
};
</script>

<style>
</style>