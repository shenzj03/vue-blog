<template>
  <div>
    <ul>
      <li v-for="(item, index) in articleData" :key="index">
        <router-link :to="'/article/' + item._id">
          <img :src="getCoverUrl(item)" />
          {{ item.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { computed } from "vue";
const articleData = ref([]);
onMounted(() => {
  // 代码逻辑
  getList();
});
const getCoverUrl = (item) => {
  return "http://localhost:3000" + item.cover;
};
const getList = () => {
  // 代码逻辑
  axios.get("/webapi/article/list").then((res) => {
    if (res.data.ActionType === "OK") {
      articleData.value = res.data.data;
    }
  });
};
</script>
<style scoped>
li {
  height: 200px;
  margin-bottom: 10px;
}
img{
  height: 200px;
  width: 300px;
}
</style>
