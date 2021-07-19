<template>
  <div class="sidebar">
    <div class="log-title" :class="{ 'no-title': collapse }">
      <img
        class="log"
        src="https://i.gtimg.cn/club/item/face/img/2/15922_100.gif"
        alt=""
      />
      <span class="title" v-if="!collapse">element-shuang后台管理</span>
    </div>
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.path" :key="item.path">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                v-if="subItem.subs"
                :index="subItem.path"
                :key="subItem.path"
              >
                <template #title>{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.path"
                >
                  {{ threeItem.title }}</el-menu-item
                >
              </el-submenu>
              <el-menu-item v-else :index="subItem.path" :key="subItem.path"
                >{{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.path" :key="item.path">
            <i :class="item.icon"></i>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {
    const items = [
      {
        icon: "el-icon-lx-home",
        path: "/index",
        title: "系统首页",
      },
      {
        icon: "el-icon-lx-home",
        path: "/dashboard",
        title: "基础首页",
      },
      {
        icon: "el-icon-lx-cascades",
        path: "/table",
        title: "基础表格",
      },
      {
        icon: "el-icon-lx-copy",
        path: "/tabs",
        title: "tab选项卡",
      },
      {
        icon: "el-icon-lx-calendar",
        path: "3",
        title: "表单相关",
        subs: [
          {
            path: "/form",
            title: "基本表单",
          },
          {
            path: "/upload",
            title: "文件上传",
          },
          {
            path: "4",
            title: "三级菜单",
            subs: [
              {
                path: "/editor",
                title: "富文本编辑器",
              },
            ],
          },
        ],
      },
      {
        icon: "el-icon-lx-emoji",
        path: "/icon",
        title: "自定义图标",
      },
      {
        icon: "el-icon-pie-chart",
        path: "/charts",
        title: "schart图表",
      },
      {
        icon: "el-icon-lx-global",
        path: "/i18n",
        title: "国际化功能",
      },
      {
        icon: "el-icon-lx-warn",
        path: "7",
        title: "错误处理",
        subs: [
          {
            path: "/401",
            title: "401页面",
          },
          {
            path: "/404",
            title: "404页面",
          },
        ],
      },
      {
        icon: "el-icon-lx-redpacket_fill",
        path: "/donate",
        title: "支持作者",
      },
    ];
    const route = useRoute();
    // items = useRouter().getRoutes()
    const onRoutes = computed(() => {
      return route.path;
    });

    const store = useStore();
    const collapse = computed(() => {
      return store.state.collapse;
    });

    return {
      items,
      onRoutes,
      collapse,
    };
  },
};
</script>

<style scoped lang='scss'>
@import "../../assets/scss/variables.scss";
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  height: 100vh;
  width: $base-sidebar-width;
  bottom: 0;
  background: rgb(50, 65, 87);
  overflow-y: scroll;
}
.log-title {
  height: 56px;
  line-height: 56px;
  display: flex;
  color: rgb(191, 203, 217);
  justify-content: center;
  align-items: center;
  width: $base-sidebar-width;
  .log {
    border-radius: 50%;
    height: 28px;
  }
  .title{
    margin-left:10px ;

  }
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: $base-sidebar-width;
}
.no-title{
    transition:$base-transition;
    width: $base-sidebar-min-width;
}
</style>
