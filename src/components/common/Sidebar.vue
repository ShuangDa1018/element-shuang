<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.path" :key="item.path">
                        <template #title>
                            <i :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.path" :key="subItem.path">
                                <template #title>{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.path">
                                    {{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.path" :key="subItem.path">{{ subItem.title }}
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
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute ,useRouter} from "vue-router";
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
        const route = useRoute()
        // console.log(useRouter().getRoutes())
        // items = useRouter().getRoutes()
        const onRoutes = computed(() => {
            return route.path;
        });

        const store = useStore();
        const collapse = computed(() => store.state.collapse);

        return {
            items,
            onRoutes,
            collapse,
        };
    },
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
