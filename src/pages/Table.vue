<template>
  <div>
    <S-table
      :tableData="tableData"
      :tableMeta="tableMeta"
      @editBtn="editBtn"
      @addBtn="addBtn"
      @deleteBtn="deleteBtn"
    ></S-table>
    <!-- 编辑弹出框 -->
    <el-dialog
      :title="form.id ? '编辑' : '新增'"
      v-model="dialogVisible"
      width="30%"
    >
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
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import STable from "@/components/STable.vue";
import { ref, reactive } from "vue";
import { fetchData } from "../api/index";
export default {
  name: "Table",
  components: {
    STable,
  },
  setup() {
    const dialogVisible = ref(false);
    let form = reactive({
      name: "213",
      address: "321",
      id: "",
      status: "",
    });
    console.log(form);
    /*  
    type:类型 IMAGE，INPUT ,SELECT(options为数组即可),TIME,COUNTTO
    key：绑定字段
    label：显示名称
    showSearch:是否搜索
    sort：排序,默认值为其索引
    */
    const tableMeta = {
      index: true, // 是否显示 index ，默认 true
      selection: true, // 是否选择 默认true
      searchMinWidth: "70px", // 搜索框名称最小宽度，宽度默认70px
      metaList: [
        { type: "IMAGE", key: "thumb", label: "图片" },
        {
          type: "INPUT",
          key: "name",
          label: "名称",
          type: "INPUT",
          showSearch: true,
        },
        {
          key: "address",
          label: "地址",
          showSearch: true,
          width: "200px",
          maxLength: 50,
        },
        {
          type: "COUNTTO",
          key: "countTo",
          label: "countTo",
          startVal: 0, // 开始数字，默认0
          duration: 1000110, // 持续时间
        },
        {
          key: "state",
          label: "驶入",
          showSearch: true,
          options: [
            { value: "success", label: "成功", color: "red" },
            { value: "file", label: "失败", color: "#67c23a" },
            { value: "padding", label: "处理中" },
          ],
        },
        {
          key: "select",
          label: "远程搜索",
          showSearch: true,
          hiddenColumn: true,
          options: [],
          searchUrl: "./table.json",
          searchParams: {
            a: 1,
          },
          optionLabel: "name",
          optionValue: "id",
        },
        { type: "TIME", key: "date", label: "日期", showSearch: true },
      ],
    };
    let tableData = ref([]);
    const pageTotal = ref(0);
    const editBtn = (row) => {
      Object.keys(form).forEach((item) => {
        form[item] = row[item];
      });
      console.log(form);
      dialogVisible.value = true;
    };
    const deleteBtn = (index) => {
      console.log("deleteBtn");
    };
    const addBtn = () => {
      dialogVisible.value = true;
    };
    const saveEdit = () => {
      console.log("saveEdit");
    };
    return {
      dialogVisible,
      editBtn,
      saveEdit,
      deleteBtn,
      form,
      addBtn,
      tableData,
      tableMeta,
    };
  },
};
</script>

<style>
</style>