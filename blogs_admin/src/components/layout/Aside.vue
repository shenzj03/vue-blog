<template>
  <el-aside width="200px">
    <el-menu :router="true" :default-active="route.path" :unique-opened="true">
      <el-menu-item index="/">
        <template #title>首页</template>
      </el-menu-item>
      <el-sub-menu index="/user">
        <template #title>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/user/userlist">用户列表</el-menu-item>
        <el-menu-item index="/user/useradd">添加用户</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/article">
        <template #title>
          <span>文章管理</span>
        </template>
        <el-menu-item index="/article/articlelist">文章列表</el-menu-item>
        <el-menu-item index="/article/articleadd">添加文章</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/archive">
        <template #title>
          <span>归档管理</span>
        </template>
        <el-menu-item index="/archive/category">分类列表</el-menu-item>
        <el-menu-item index="/archive/tag">标签列表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/settings">
        <template #title>
          <span>设置</span>
        </template>
        <el-menu-item index="/settings/center">个人中心</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>
<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>
<style scoped>
.el-aside {
  height: 100vh;
}
.el-menu {
  height: 100%;
}
</style>