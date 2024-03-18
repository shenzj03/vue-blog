<template>
  <el-card>
    <el-form :model="form" :rules="formRules" ref="ruleFormRef">
      <el-form-item prop="title" label="标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item prop="author" label="作者">
        <el-input v-model="form.author" disabled />
      </el-form-item>
      <el-form-item prop="category" label="分类">
        <el-select
          v-model="form.category"
          placeholder="请选择分类"
          size="large"
          style="width: 240px"
        >
          <el-option
            v-for="item in categoryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="tags" label="标签">
        <el-checkbox-group v-model="form.tags">
          <el-checkbox
            v-for="tag in tagsOptions"
            :key="tag.value"
            :label="tag.label"
            :value="tag.value"
          >
            {{ tag.label }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item prop="cover" label="封面">
        <Upload @update:avatar="changeUpload" :avatar="form.cover" />
      </el-form-item>
      <el-form-item prop="content" label="内容">
        <wangEditor @wangEditor:content="handleChange" />
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm">添加</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script setup>
import axios from "axios";
import { reactive, ref, onMounted } from "vue";
import { form, formRules, getOptions, getValue } from "../../utils/article";
import { ruleFormRef } from "../../utils";
import wangEditor from "../../components/wangEditor/wangEditor.vue";
import Upload from "../../components/upload/Upload.vue";
import upload from "../../utils/upload";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter();
const getAuthor = async () => {
  await getValue("/adminapi/user/list").then((res) => {
    form.author = res.username;
  });
};
const categoryOptions = ref();
const tagsOptions = ref();
const handleOptions = async () => {
  await getOptions("/adminapi/category/list", categoryOptions);
  await getOptions("/adminapi/tag/list", tagsOptions);
};
const changeUpload = (file) => {
  // 处理上传文件的操作
  form.cover = URL.createObjectURL(file);
  form.file = file;
};
onMounted(async () => {
  Object.assign(form, {});
  await getAuthor();
  await handleOptions();
});
const handleChange = (data) => {
  form.content = data;
};
const submitForm = async () => {
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      await upload("/adminapi/article/add", form).then((res) => {
        if (res.ActionType === "OK") {
          router.push("/article/articlelist");
          ElMessage.success("添加成功");
        }
      });
    }
  });
};
</script>
<style scoped>
@import url("../../style/article.css");
</style>