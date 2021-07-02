<template>
  <div class="container">
    <template v-if="searchFiled.length">
      <el-row>
        <div
          v-for="(item, i) in searchFiled"
          :key="i"
          :span="8"
          class="display-flex el-co"
        >
          <div class="head-label">{{ item.label }}:</div>
          <div :key="i" class="display-flex">
            <el-select
              v-if="Array.isArray(item.options)"
              v-model="searchValue[item.key]"
              :placeholder="item.label"
              filterable
              clearable
            >
              <el-option
                v-for="it in item.options"
                :key="it.key"
                :label="it.label"
                :value="it.value"
              ></el-option>
            </el-select>
            <el-date-picker
              v-else-if="item.type === 'DATE_PICKER'"
              :key="item.key"
              v-model="searchValue[item.key]"
              value-format="timestamp"
              type="daterange"
              unlink-panels
              range-separator="至"
              :start-placeholder="item.label + '开始'"
              :end-placeholder="item.label + '结束'"
            />
            <el-input
              v-else
              clearable
              :disabled="item.disabled"
              v-model="searchValue[item.key]"
              :placeholder="item.label"
            />
          </div>
        </div>
        <el-button
          type="primary"
          class="head-button"
          icon="el-icon-search"
          @click="handleSearch"
          >搜索</el-button
        >
      </el-row>
    </template>
    <el-table
      :data="tableData"
      border
      class="table"
      ref="multipleTable"
      header-cell-class-name="table-header"
    >
      <el-table-column
        type="index"
        v-if="tableMeta.index"
        align="center"
      ></el-table-column>
      <el-table-column
        type="selection"
        v-if="tableMeta.selection"
        align="center"
        width="55"
      />
      <template v-for="(item, index) in tableHeader" :key="index">
        <slot name="el-table-column" :item="item"></slot>
        <el-table-column
          v-if="item.type === 'DATE_PICKER'"
          :prop="item.key"
          :label="item.label"
          :align="item.align || 'center'"
        >
          <template #default="{ row }">{{
            getTime(row[item.key], item.format)
          }}</template>
        </el-table-column>
        <el-table-column
          v-else-if="item.type === 'IMAGE'"
          :prop="item.key"
          :label="item.label"
          :align="item.align || 'center'"
        >
          <template #default="{ row }">
            <el-image
              class="table-td-thumb"
              :src="row[item.key]"
              :preview-src-list="[row[item.key]]"
              hide-on-click-modal
            ></el-image
          ></template>
        </el-table-column>
        <el-table-column
          v-else-if="Array.isArray(item.options)"
          :prop="item.key"
          :label="item.label"
          :align="item.align || 'center'"
        >
          <template #default="{ row }">
            <div
              :style="{
                color: getOptionValue(item.options, row[item.key], 'color'),
              }"
            >
              {{ getOptionValue(item.options, row[item.key], "label") }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="item.type === 'count-to'"
          :prop="item.key"
          :label="item.label"
          :align="item.align || 'center'"
        >
          <template #default="{ row }">
            <Count-to :startVal="item.startVal" :endVal="row[item.key]" :duraction="item.duraction"/>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :prop="item.key"
          :label="item.label"
          :align="item.align || 'center'"
        ></el-table-column>
      </template>
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <slot name="operate" :scope="scope" />
          <el-button
            type="text"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑
          </el-button>
          <el-button
            type="text"
            icon="el-icon-delete"
            class="red"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :current-page="searchValue.pageIndex"
        :page-size="searchValue.pageSize"
        :total="pageTotal"
        @current-change="handlePageChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { fetchData } from "../api/index";
import moment from "moment";

export default {
  name: "tsTable",
  props: {
    // tableData: {
    //   type: Array,
    //   default: [],
    // },
    dataUrl: {
      type: String,
    },
    tableMeta: {
      type: Object,
    },
  },
  emits: ["editBtn", "deleteBtn", "saveBtn", "beforeSearch"],
  setup(props, ctx) {
    const getOptionValue = computed(() => {
      return (options, value, key) => {
        const optionVal = options.find((it) => it.value == value);
        return optionVal ? optionVal[key] : value;
      };
    });
    const getTime = (value, format = "YYYY-MM-DD HH:mm:ss") =>
      value ? moment(value).format(format) : "";
    const tableHeader = computed(() =>
      props.tableMeta.metaList.filter((it) => !it.displayList)
    );
    const searchFiled = computed(() =>
      props.tableMeta.metaList.filter((it) => it.searchable)
    );
    const searchValue = reactive({
      pageIndex: 1,
      pageSize: 10,
    });
    const tableData = ref([]);
    const pageTotal = ref(0);
    // 获取表格数据
    const getSearch = () => {
      ctx.emit("beforeSearch", searchValue);
      fetchData(searchValue, props.dataUrl).then((res) => {
        tableData.value = res.list;
        pageTotal.value = res.pageTotal || 50;
      });
    };
    getSearch();
    // 查询操作
    const handleSearch = () => {
      searchValue.pageIndex = 1;
      getSearch();
    };
    // 分页导航
    const handlePageChange = (val) => {
      searchValue.pageIndex = val;
      getSearch();
    };

    // 删除操作
    const handleDelete = (index) => {
      // 二次确认删除
      ElMessageBox.confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
        .then(() => {
          ElMessage.success("删除成功");
          ctx.emit("deleteBtn", index);
          tableData.value.splice(index, 1);
        })
        .catch(() => {});
    };

    // 表格编辑时弹窗和保存
    const editVisible = ref(false);
    let form = reactive({
      name: "",
      address: "",
    });
    let idx = -1;
    const handleEdit = (index, row) => {
      ctx.emit("editBtn");
      idx = index;
      Object.keys(form).forEach((item) => {
        form[item] = row[item];
      });
      editVisible.value = true;
    };
    const saveEdit = () => {
      editVisible.value = false;
      ElMessage.success(`修改第 ${idx + 1} 行成功`);
      Object.keys(form).forEach((item) => {
        tableData.value[idx][item] = form[item];
      });
      ctx.emit("saveBtn");
    };
    return {
      tableData,
      pageTotal,
      editVisible,
      form,
      handleSearch,
      handlePageChange,
      handleDelete,
      handleEdit,
      saveEdit,
      tableHeader,
      getOptionValue,
      getTime,
      searchFiled,
      searchValue,
    };
  },
};
</script>

<style scoped>
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
.display-flex {
  display: flex;
}
.el-co {
  align-items: center;
  margin-bottom: 15px;
  white-space: nowrap;
  width: auto;
  margin-right: 25px;
}
.head-label {
  margin-right: 10px;
  min-width: 2.2rem;
}
.head-button {
  height: 40px;
}
</style>
