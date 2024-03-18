<template>
  <el-card>
    <template #header>
      <div class="header-left"></div>
      <div class="header-right">
        <el-button @click="handleSame">添加分类</el-button>
      </div>
    </template>
    <div>
      <!-- 分类列表内容 -->
      <el-row :gutter="20">
        <el-col :span="6" v-for="i in tableData" :key="i.index">
          <el-card body-style="display: flex;width:400px;">
            <div class="title">
              <span>分类名称： {{ i.category }} </span>
              <span>文章数量：{{ i.category_article }}</span>
            </div>
            <div class="card-button">
              <el-button type="primary" @click="handleEdit(i._id)"
                >修改</el-button
              >
              <el-button type="danger" @click="handleDelet(i._id)"
                >删除</el-button
              >
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-card>
  <div v-if="handleDialog">
    <el-dialog v-model="dialogVisible" title="添加分类" width="500">
      <el-form :model="form" :rules="formRules" ref="ruleFormRef">
        <el-form-item prop="category" label="分类">
          <el-input v-model="form.category" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
  <div v-else>
    <el-dialog v-model="dialogVisible" title="修改分类" width="500">
      <el-form :model="form" :rules="formRules" ref="ruleFormRef">
        <el-form-item prop="category" label="分类">
          <el-input v-model="form.category" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import axios from "axios";
import { ElMessage } from "element-plus";
import { reactive, ref, onMounted } from "vue";
import {
  dialogVisible,
  handleDialog,
  tableData,
  ruleFormRef,
  getList,
  handleSame,
  exclusiveOr
} from "../../utils";
const form = reactive({
  category: "",
  category_article: 0,
});
const formRules = reactive({
  category: [{ required: true, message: "请输入分类", trigger: "blur" }],
});
const handleList = async () => {
  await getList("/adminapi/category/list");
};
onMounted(async () => {
  await handleList();
});
const handleEdit = async (id) => {
  exclusiveOr()
  await axios.get(`/adminapi/category/list/${id}`).then(async (res) => {
    if (res.data.ActionType === "OK") {
      form._id = res.data.data[0]._id;
      form.category = res.data.data[0].category;
      form.category_article = res.data.data[0].category_article;
    }
  });
};
const handleDelet = async (id) => {
  await axios.delete(`/adminapi/category/delete/${id}`).then(async (res) => {
    if (res.data.ActionType === "OK") {
      await handleList();
    }
  });
};
const cancel = () => {
  dialogVisible.value = false;
  form.category = "";
};
const confirm = async () => {
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      if (handleDialog.value) {
        // 发送添加分类的请求
        await axios.post("/adminapi/category/add", form).then(async (res) => {
          if (res.data.ActionType === "OK") {
            dialogVisible.value = false;
            form.category = "";
            await handleList();
            ElMessage.success("添加成功");
          } else {
            ElMessage.error(res.data.error);
          }
        });
      } else {
        // 发送编辑分类的请求
        await axios
          .put(`/adminapi/category/edit/${form._id}`, form)
          .then(async (res) => {
            if (res.data.ActionType === "OK") {
              dialogVisible.value = false;
              form.category = "";
              form.category_article = 0;
              await handleList();
              ElMessage.success("编辑成功");
            }
          });
      }
    }
  });
};
</script>
<style scoped>
@import url("../../style/archive.css");
</style>