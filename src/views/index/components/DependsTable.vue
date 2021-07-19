<template>
  <el-card
    class="card"
    shadow="never"
    style="border-radius: 8px;"
  >
    <div>
      <span>依赖信息</span>
      <div style="float: right">
        部署时间:{{ updateTime }}
      </div>
    </div>

    <div class="bottom-btn">
      <a
        target="_blank"
        href="https://github.com/vuejs/vue-next"
      >
        <el-button type="success">
          vue3.x
        </el-button>
      </a>
      <a
        target="_blank"
        href="https://element-plus.gitee.io/#/zh-CN"
      >
        <el-button type="primary">
          element-plus
        </el-button>
      </a>
      <a
        target="_blank"
        href="https://github.com/koajs/koa"
      >
        <el-button type="info">
          vuex
        </el-button>
      </a>
      <a
        target="_blank"
        href="https://github.com/apache/echarts"
      >
        <el-button type="danger">echarts5</el-button>
      </a>
      <a
        target="_blank"
        href="https://github.com/intlify/vue-i18n-next"
      >
        <el-button type="warning">vue-i18n</el-button>
      </a>
      <a
        target="_blank"
        href="https://www.tslang.cn/docs/home.html"
      >
        <el-button type="primary">vue3-count-to</el-button>
      </a>
    </div>
    <table class="table">
      <tr>
        <td>@vitejs/plugin-vue版本</td>
        <td>{{ devDependencies["@vitejs/plugin-vue"] }}</td>
        <td>vue版本</td>
        <td>{{ dependencies["vue"] }}</td>
      </tr>
      <tr>
        <td>vue-router版本</td>
        <td>{{ dependencies["vue-router"] }}</td>
        <td>vuex版本</td>
        <td>{{ dependencies["vuex"] }}</td>
      </tr>
      <tr>
        <td>echarts版本</td>
        <td>{{ dependencies["echarts"] }}</td>
        <td>wangeditor版本</td>
        <td>{{ dependencies["wangeditor"] }}</td>
      </tr>
      <tr>
        <td>element-plus版本</td>
        <td>{{ dependencies["element-plus"] }}</td>
        <td>normalize版本</td>
        <td>{{ dependencies["moment"] }}</td>
      </tr>
      <tr>
        <td>@vue/compiler-sfc版本</td>
        <td>{{ devDependencies["@vue/compiler-sfc"] }}</td>
        <td>vuex版本</td>
        <td>{{ dependencies["vuex"] }}</td>
      </tr>
      <tr>
        <td>sass-loader版本</td>
        <td>{{ devDependencies["sass-loader"] }}</td>
        <td>sass版本</td>
        <td>{{ devDependencies["sass"] }}</td>
      </tr>
      <tr>
        <td>vite版本</td>
        <td>{{ devDependencies["vite"] }}</td>
        <td>vue-i18n版本</td>
        <td>{{ dependencies["vue-i18n"] }}</td>
      </tr>
    </table>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { dependencies, devDependencies } from '../../../../package.json'
export default defineComponent({
  setup() {
    const state = reactive({
      // updateTime: process.env.VUE_APP_UPDATE_TIME
      updateTime: new Date()
    })
    return {
      dependencies,
      devDependencies,
      ...toRefs(state)
    }
  }
})
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  color: #666;
  border-collapse: collapse;
  background-color: #fff;

  td {
    position: relative;
    min-height: 20px;
    padding: 9px 15px;
    font-size: 14px;
    line-height: 20px;
    border: 1px solid #e6e6e6;

    &:nth-child(odd) {
      width: 20%;
      text-align: right;
      background-color: #f7f7f7;
    }
  }
}

.bottom-btn {
  button {
    margin: 16px 10px 15px 0;
  }
}
</style>
