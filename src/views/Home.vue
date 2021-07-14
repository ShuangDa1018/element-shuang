<template>
  <div class="about">
    <v-sidebar />
    <div class="content-box" :class="collapse ? 'yes-collapse':'no-collapse' ">
      <v-header />
      <v-tags></v-tags>
      <div class="content">
        <router-view v-slot="{ Component }">
          <transition name="bounce" mode="out-in">
            <keep-alive :include="tagsList">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
        <!-- <el-backtop target=".content"></el-backtop> -->
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import vHeader from "../components/common/Header.vue";
import vSidebar from "../components/common/Sidebar.vue";
import vTags from "../components/common/Tags.vue";
export default {
  components: {
    vHeader,
    vSidebar,
    vTags,
  },
  setup() {
    const store = useStore();
    const tagsList = computed(() =>
      store.state.tagsList.map((item) => item.name)
    );
    const collapse = computed(() => store.state.collapse);
    const isModile = computed(() => {
      console.log(document.body.getBoundingClientRect().width - 1 < 992);
      return document.body.getBoundingClientRect().width - 1 < 992;
    });
    const handleResize = () => {
      if (!document.hidden) {
        if (isModile) store.commit();
        else store.commit();
      }
    };
    return {
      tagsList,
      collapse,
      isModile,
    };
  },
  beforeMount() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>
<style lang='scss' scoped>
@import "../assets/scss/variables.scss";
.content-box {
  transition: .35s;
}
.yes-collapse{
 width: calc(100vh-$base-sidebar-min-width) ;
 margin-left: $base-sidebar-min-width;
}
.no-collapse{
 width: calc(100vh-$base-sidebar-width) ;
 margin-left: $base-sidebar-width;
}
</style>