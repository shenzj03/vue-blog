<template>
  <div class="common-layout">
    <el-container direction="vertical">
      <Header />
      <el-container>
        <el-aside width="200px">Left</el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-aside width="200px">Righy</el-aside>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import Header from "../components/layout/Header.vue";
</script>
<style scoped>
</style>
