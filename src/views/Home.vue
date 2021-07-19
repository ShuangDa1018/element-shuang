<template>
  <div class="about" :class="classObj">
    <v-sidebar class="sidebar-container" />
    <div v-if="classObj.openModile" class="mask" @click="handleFoldSideBar" />
    <div class="main-container">
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
import { computed, onMounted, onUnmounted } from "vue";
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
    const classObj = computed(() => {
      const { modile, collapse } = store.state;
      return {
        hideModile: collapse && modile,
        openModile: !collapse && modile,
        hidePc: collapse,
        openPc: !collapse,
      };
    });
    const handleResize = () => {
      if (!document.hidden) {
        const is = document.body.getBoundingClientRect().width - 1 < 992;
        if (is) store.commit("isModile", true);
        else store.commit("isModile", false);
      }
    };
    const handleFoldSideBar = () => store.commit("handleCollapse", true);
    onMounted(() => {
      window.addEventListener("resize", handleResize);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });
    return {
      tagsList,
      classObj,
      handleFoldSideBar,
    };
  },
};
</script>
<style lang='scss' scoped>
@import "../assets/scss/variables.scss";
.about {
  z-index: $base-z-index;
}
.main-container {
  min-height: 100%;
  transition: $base-transition;
  margin-left: $base-sidebar-width;
  position: relative;
}
.sidebar-container {
  transition: $base-transition;
  width: $base-sidebar-width;
  z-index: $base-z-index + 2;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.hidePc {
  .main-container {
    margin-left: $base-sidebar-min-width;
  }
  .sidebar-container {
    width: $base-sidebar-min-width;
  }
}
.hideModile {
  .sidebar-container {
    width: $base-sidebar-min-width;
    transform: translate3d(-$base-sidebar-min-width, 0, 0);
  }
}
.openModile,
.hideModile {
  .main-container {
    margin-left: 0;
  }
}
.mask {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #000;
  opacity: 0.5;
  z-index: $base-z-index + 1;
}

</style>