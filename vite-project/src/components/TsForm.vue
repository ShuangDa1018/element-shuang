

<template>
  <div>
    <div class="container">
      <el-form :mode="formDate" :label-width="formMeta.labelWidth || '70px'">
        <el-form-item
          v-for="(item, index) in formMeta.metaList"
          :key="index"
          :prop="item.key"
          :label="item.label"
        >
          <el-select
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
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
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
  setup({ defaultData }) {
    const rules = {
      name: [{ required: true, message: "请输入表单名称", trigger: "blur" }],
    };
    const formRef = ref(null);
    // 提交
    const onSubmit = () => {
      // 表单校验
      formRef.value.validate((valid) => {
        if (valid) {
          console.log(form);
          ElMessage.success("提交成功！");
        } else {
          return false;
        }
      });
    };
    // 重置
    const onReset = () => {
      formRef.value.resetFields();
    };
    const formData = reactive(defaultData);
    return {
      rules,
      formRef,
      onSubmit,
      onReset,
      formData,
    };
  },
};
</script>