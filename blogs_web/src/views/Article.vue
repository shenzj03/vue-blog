<template>
  {{ articleData.title }}
  {{ articleData.author }}
  {{ articleData.category }}
  <!-- {{ articleData.tags }} -->
  <el-tag v-for="(item, index) in articleData.tags" :key="index">
    {{ item }}
  </el-tag>
  {{ articleData.lastEditTime }}
  <el-divider>
    <el-icon><star-filled /></el-icon>
  </el-divider>
  <div v-html="articleData.content"></div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { StarFilled } from "@element-plus/icons-vue";
import axios from "axios";
import { useRoute } from "vue-router";
const route = useRoute();
const articleData = ref([]);
onMounted(async () => {
  // 代码逻辑
  await getList(route.params.id);
});
const getList = async (id) => {
  // 代码逻辑
  await axios.get(`/webapi/article/list/${id}`).then((res) => {
    articleData.value = res.data.data[0];
    handleValue(articleData.value);
  });
};
const handleValue = async (value) => {
  // 获取作者
  await axios.get(`/webapi/user/list/${value.author}`).then((res) => {
    value.author = res.data.data;
  });
  // 获取分类
  await axios.get(`/webapi/category/list/${value.category}`).then((res) => {
    value.category = res.data.data;
  });
  // 获取标签
  for (const i in value.tags) {
    await axios.get(`/webapi/tag/list/${value.tags[i]}`).then((res) => {
      value.tags[i] = res.data.data;
    });
  }
  // 时间优化
  value.lastEditTime = new Date(value.lastEditTime).toLocaleString();
};
</script>
<style scoped>
li {
  height: 200px;
}
</style>
