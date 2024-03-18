<template>
  <el-header>
    <div class="header-left"></div>
    <div class="header-right">
      <el-dropdown>
        <el-avatar :size="40" :src="avatarUrl" />
        <template #dropdown>
          <el-dropdown-item @click="hanelPush">个人中心</el-dropdown-item>
          <el-dropdown-item @click="logout">退出</el-dropdown-item>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>
<script setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../../store";
const store = useStore();
const router = useRouter();
const avatarUrl = computed(() => {
  // 计算属性获取头像的 URL
  return store.$state.userInof.avatar
    ? "http://localhost:3000" + store.$state.userInof.avatar
    : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
});

const hanelPush = () => {
  router.push("/settings/center");
};
const logout = () => {
  router.push("/login");
  store.$state.userInof = {};
  localStorage.removeItem("token");
};
</script>
<style scoped>
.el-header {
  height: 60px;
  background-color: #afeeee;
  display: flex;
  justify-content: space-between;
}
.header-right {
  display: flex;
  align-items: center;
}
</style>