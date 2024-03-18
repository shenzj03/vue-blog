<template>
  <el-header>
    <el-menu
      :router="true"
      mode="horizontal"
      :default-active="route.path"
      :unique-opened="true"
    >
      <el-menu-item index="/">首页</el-menu-item>
    </el-menu>
  </el-header>
</template>
<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>
<style scoped>
.el-header {
  height: 60px;
}
</style>