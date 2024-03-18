<template>
  <el-card>
    <template #header>
      <div class="header-left"></div>
      <div class="header-right">
        <el-button @click="handleSame">添加标签</el-button>
      </div>
    </template>
    <div>
      <!-- 分类列表内容 -->
      <el-row :gutter="20">
        <el-col :span="6" v-for="i in tableData" :key="i.index">
          <el-card body-style="display: flex;width:400px;">
            <div class="title">
              <span>标签名称： {{ i.tag }} </span>
              <span>文章数量：{{ i.tag_article }}</span>
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
    <el-dialog v-model="dialogVisible" title="添加标签" width="500">
      <el-form :model="form" :rules="formRules" ref="ruleFormRef">
        <el-form-item prop="tag" label="标签">
          <el-input v-model="form.tag" />
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
    <el-dialog v-model="dialogVisible" title="修改标签" width="500">
      <el-form :model="form" :rules="formRules" ref="ruleFormRef">
        <el-form-item prop="tag" label="标签">
          <el-input v-model="form.tag" />
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
} from "../../utils";
const form = reactive({
  tag: "",
  tag_article: 0,
});
const formRules = reactive({
  tag: [{ required: true, message: "请输入标签", trigger: "blur" }],
});
const handleList = async () => {
  await getList("/adminapi/tag/list");
};
onMounted(async () => {
  await handleList();
});
const handleEdit = async (id) => {
  exclusiveOr();
  await axios.get(`/adminapi/tag/list/${id}`).then(async (res) => {
    if (res.data.ActionType === "OK") {
      form._id = res.data.data[0]._id;
      form.tag = res.data.data[0].tag;
      form.tag_article = res.data.data[0].tag_article;
    }
  });
};
const handleDelet = async (id) => {
  await axios.delete(`/adminapi/tag/delete/${id}`).then(async (res) => {
    if (res.data.ActionType === "OK") {
      await handleList();
    }
  });
};
const cancel = () => {
  dialogVisible.value = false;
  form.tag = "";
};
const confirm = async () => {
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      if (handleDialog.value) {
        // 发送添加标签的请求
        await axios.post("/adminapi/tag/add", form).then(async (res) => {
          if (res.data.ActionType === "OK") {
            dialogVisible.value = false;
            form.tag = "";
            await handleList();
            ElMessage.success("添加成功");
          } else {
            ElMessage.error(res.data.error);
          }
        });
      } else {
        // 发送修改标签的请求
        await axios
          .put(`/adminapi/tag/edit/${form._id}`, form)
          .then(async (res) => {
            if (res.data.ActionType === "OK") {
              dialogVisible.value = false;
              form.tag = "";
              form.tag_article = 0;
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