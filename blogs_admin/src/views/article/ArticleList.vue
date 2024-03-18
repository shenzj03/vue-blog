<template>
  <el-card>
    <template #header></template>
    <el-table :data="tableData">
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="author" label="作者" />
      <el-table-column prop="category" label="分类" />
      <el-table-column prop="tags" label="标签">
        <template #default="{ row }">
          <el-tag v-for="tag in row.tags" :key="tag" type="success">{{
            tag
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="lastEditTime" label="编辑时间" />
      <el-table-column prop="isPublish" label="是否发布">
        <template #default="scope">
          <el-switch
            v-model="scope.row.isPublish"
            :active-value="true"
            :inactive-value="false"
            @change="handleSwitchChange(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            type="warning"
            :icon="Star"
            circle
            @click="handleStarClick(scope.row)"
          />
          <el-button
            type="primary"
            :icon="Edit"
            circle
            @click="handleEditClick(scope.row)"
          />
          <el-popconfirm
            title="你确定删除此用户?"
            confirm-button-text="确定"
            cancel-button-text="取消"
            @confirm="handleDeleteClick(scope.row._id)"
          >
            <template #reference>
              <el-button type="danger" :icon="Delete" circle />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <el-dialog
    v-model="dialogVisible"
    title="预览"
    width="50%"
    :before-close="handleClose"
  >
    <div>
      <h2>{{ rowData.title }}</h2>
      <p>{{ rowData.author }}</p>
      <p>{{ rowData.category }}</p>
      <p>
        <span v-for="tag in rowData.tags" :key="tag">
          {{ tag }}
        </span>
      </p>
      <p>{{ rowData.lastEditTime }}</p>
      <el-divider>
        <el-icon><star-filled /></el-icon>
      </el-divider>
      <div v-html="rowData.content"></div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >关闭</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import axios from "axios";
import { Delete, Edit, Star, StarFilled } from "@element-plus/icons-vue";
import { onMounted, reactive, ref } from "vue";
import {
  dialogVisible,
  getList,
  tableData,
  handleDialog,
  handleSame,
  exclusiveOr,
} from "../../utils";
import { form, formRules, getOptions, getValue } from "../../utils/article";
import { ElMessage } from "element-plus";
import wangEditor from "../../components/wangEditor/wangEditor.vue";
import Upload from "../../components/upload/Upload.vue";
import upload from "../../utils/upload";
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
const handleChange = (data) => {
  form.content = data;
};
onMounted(async () => {
  // 初始化数据
  await getList("/adminapi/article/list");
  for (const i in tableData.value) {
    await handleValue(tableData.value[i]);
  }
  await getAuthor();
  await handleOptions();
});
const handleValue = async (value) => {
  // 获取作者
  await getValue(`/adminapi/user/list/${value.author}`).then((res) => {
    value.author = res.username;
  });
  // 获取分类
  await getValue(`/adminapi/category/list/${value.category}`).then((res) => {
    value.category = res.category;
  });
  // 获取标签
  for (const i in value.tags) {
    // console.log(value.tags[i])
    await getValue(`/adminapi/tag/list/${value.tags[i]}`).then((res) => {
      value.tags[i] = res.tag;
    });
  }
  // 时间优化
  value.lastEditTime = new Date(value.lastEditTime).toLocaleString();
};
const rowData = ref({});
const handleClose = (done) => {
  rowData.value = done;
};
const handleSwitchChange = async (row) => {
  // 处理是否发布
  await axios.put(`/adminapi/article/publish`, {
    _id: row._id,
    isPublish: row.isPublish,
  });
};
const handleStarClick = (row) => {
  exclusiveOr();
  handleClose(row);
};
const handleEditClick = (row) => {
  router.push(`/article/articleedit/${row._id}`);
};
const handleDeleteClick = async (id) => {
  await axios.delete(`/adminapi/article/delete/${id}`).then(async (res) => {
    if (res.data.ActionType === "OK") {
      await getList("/adminapi/article/list");
      ElMessage.success("删除成功");
    }
  });
};
</script>
<style scoped>
@import url("../../style/article.css");
.el-tag {
  margin: 5px;
}
</style>