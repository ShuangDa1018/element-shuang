

<template>
  <div class="container">
    <el-form
      ref="postFormNode"
      :model="formData"
      :rules="rules"
      :label-width="formMeta.labelWidth || '70px'"
      class="demo-ruleForm"
    >
      <el-form-item
        v-for="(item, index) in formMeta.metaList"
        :key="index"
        :prop="item.key"
        :label="item.label"
      >
        <el-select
          class="ele-select"
          v-if="item.type == 'select'"
          v-model="formData[item.key]"
          :disabled="item.disabled"
          :placeholder="`请选择${item.label}`"
        >
          <ep-option
            v-for="it in item.option"
            :key="it.value"
            :label="it.label"
            :value="it.value"
          />
        </el-select>
        <el-switch
          v-else-if="item.type == 'switch'"
          :disabled="item.disabled"
          v-model="formData[item.key]"
        />
        <el-date-picker
          v-else-if="item.type == 'date-picker'"
          v-model="formData[item.key]"
          :type="item.timeType || 'datetime'"
          :placeholder="`请选择${item.label}`"
        >
        </el-date-picker>
        <el-input-number
          v-else-if="item.type == 'input-number'"
          v-model="formData[item.key]"
          :disabled="item.disabled"
        />
        <el-checkbox-group
          v-else-if="item.type == 'checkbox-group'"
          v-model="formData[item.key]"
          :min="item.min"
          :max="item.max"
        >
          <el-checkbox v-for="it in item.checkbox" :label="it" :key="it">{{
            it
          }}</el-checkbox>
        </el-checkbox-group>
        <el-input
          v-else-if="item.type == 'textarea'"
          type="textarea"
          :placeholder="`请输入${item.label}`"
          v-model="formData[item.key]"
          :disabled="item.disabled"
        />
        <el-input
          v-else
          :placeholder="`请输入${item.label}`"
          v-model="formData[item.key]"
          :disabled="item.disabled"
          :type="item.password"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">表单提交</el-button>
        <el-button @click="onReset">重置表单</el-button>
        <slot name="foot-buttion"></slot>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, ref, computed, unref } from "vue";
import { ElMessage, ElForm } from "element-plus";
export default {
  name: "tsForm",
  props: {
    formMeta: {
      type: Object,
      default: () => {
        return {};
      },
    },
    defaultData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props) {
    const palceholder = {
      img: "上传",
      input: "输入",
      select: "选择",
      time: "选择",
      switch: "选择",
      checkboxGroup: "选择",
    };
    const rules = computed(() => {
      let rule = {};
      props.formMeta.metaList.forEach((it) => {
        let arr = [];
        if (it.required) {
          arr.push({
            required: true,
            type: it.ValidateType,
            message: "请" + (palceholder[it.type] || "输入") + it.label,
            trigger: it.trigger || "change",
          });
        }
        if (it.validator) {
          arr.push({
            validator: it.validator,
            message:
              it.message ||
              "请" + (palceholder[it.type] || "输入") + "正确的" + it.label,
            trigger: it.trigger || "change",
          });
        }
        if (arr.length) rule[it.key] = arr;
      });
      return rule;
    });
    const postFormNode = ref(ElForm);
    const onSubmit = () => {
      unref(postFormNode).validate((valid) => {
        if (valid) {
          ElMessage.success("提交成功！");
        } else {
          return false;
        }
      });
    };
    // 重置
    const onReset = () => {
      unref(postFormNode).resetFields();
    };
    const formData = reactive({ ...props.defaultData });
    return {
      rules,
      onSubmit,
      onReset,
      formData,
      postFormNode,
    };
  },
};
</script>

<style scoped lang="scss">
.demo-ruleForm {
  width: 460px;
  .ele-select {
    width: 100%;
  }
}
</style>