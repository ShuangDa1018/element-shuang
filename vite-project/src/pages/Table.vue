<template>
  <div>
    <Ts-table
      :tableData="tableData"
      :tableMeta="tableMeta"
      @editBtn="editBtn"
      @deleteBtn="deleteBtn"
    ></Ts-table>
    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" v-model="editVisible" width="30%">
      <el-form label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import TsTable from "../components/TsTable.vue";
import { ref, reactive } from "vue";
import { fetchData } from "../api/index";
export default {
  name: "Table",
  components: {
    TsTable,
  },
  setup() {
    const query = reactive({
      address: "",
      name: "",
      pageIndex: 1,
      pageSize: 10,
    });
    const editVisible = ref(false);
    let form = reactive({
      name: "",
      address: "",
    });
    const tableMeta = {
      index: true,
      selection: true,
      metaList: [
        { type: "IMAGE", key: "thumb", label: "图片" },
        { key: "name", label: "名称", type: "INPUT", searchable: true },
        { key: "address", label: "普通", searchable: true },
        { key: "address", label: "普通", searchable: true },
        { key: "address", label: "普通", searchable: true },
        { key: "address", label: "普通", searchable: true },
        { key: "address", label: "普通", searchable: true },
        {
          key: "state",
          label: "驶入",
          searchable: true,
          options: [
            { value: "success", label: "成功", color: "red" },
            { value: "file", label: "失败", color: "#67c23a" },
            { value: "padding", label: "处理中" },
          ],
        },
        { type: "DATE_PICKER", key: "date", label: "日期", searchable: true },
      ],
    };
    let tableData = ref([]);
    const pageTotal = ref(0);
    const editBtn = () => {
      console.log(editVisible.value);
      editVisible.value = true;
    };
    const deleteBtn = (index) => {
      console.log(index);
    };
    const saveEdit =() =>{
      console.log('saveEdit')
    }
    return {
      editVisible,
      editBtn,
      saveEdit,
      form,
      deleteBtn,
      tableData,
      tableMeta,
    };
  },
};
</script>

<style>
</style>