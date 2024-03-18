<template>
  <div class="common-layout">
    <el-container>
      <Aside />
      <el-container direction="vertical">
        <Header />
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import Aside from "../components/layout/Aside.vue";
import Header from "../components/layout/Header.vue";
</script>
<style scoped>
.el-main {
  height: calc(100vh - 60px);
}
</style>