<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <el-input
          v-model="inquiry"
          style="width: 240px; margin-right: 10px"
          placeholder="请输入要查询的用户"
        />
        <el-button @click="handleInquiry">查询</el-button>
        <el-button @click="handleClearable">清空</el-button>
      </div>
    </template>
    <el-table :data="!tableInquity ? tableData : tableInquity">
      <el-table-column prop="account" label="账号" />
      <el-table-column prop="username" label="昵称" />
      <el-table-column prop="role" label="角色" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="handleEdit(scope.row._id)"
            >修改</el-button
          >
          <el-popconfirm
            title="你确定删除此用户?"
            confirm-button-text="确定"
            cancel-button-text="取消"
            @confirm="handleDelete(scope.row._id)"
          >
            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <el-dialog v-model="dialogVisible" title="编辑用户" width="500">
    <el-form :model="form" :rules="formRules" ref="ruleFormRef">
      <el-form-item prop="account" label="账号">
        <el-input v-model="form.account" />
      </el-form-item>
      <el-form-item prop="username" label="昵称">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item prop="role" label="角色">
        <el-select v-model="form.role" placeholder size="large">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleEditChange"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import axios from "axios";
import { ElMessage } from "element-plus";
import { ref, reactive, onMounted } from "vue";
import { dialogVisible, tableData, ruleFormRef } from "../../utils";
const tableInquity = ref();
const inquiry = ref("");
const handleInquiry = async () => {
  await axios.post("/adminapi/user/inquiry", inquiry).then((res) => {
    if (res.data.ActionType === "OK") {
      const data = res.data.data;
      data.role =
        data.role === 0 ? "管理员" : data.role === 1 ? "编辑" : "普通用户";
      tableData.value = [data];
    } else {
      ElMessage.error(res.data.error);
    }
  });
};
const handleClearable = async () => {
  await handleList();
  tableInquity.value = "";
  inquiry.value = "";
};
const handleList = async () => {
  const userList = await axios.get("/adminapi/user/list");
  tableData.value = userList.data.data;
  tableData.value.forEach((user) => {
    user.role =
      user.role === 0 ? "管理员" : user.role === 1 ? "编辑" : "普通用户";
  });
};
onMounted(async () => {
  await handleList();
});
const form = reactive({
  account: "",
  username: "",
  role: 2,
});
const formRules = reactive({
  account: [{ required: true, message: "请输入账号", trigger: "blur" }],
  username: [{ required: true, message: "请输入昵称", trigger: "blur" }],
  role: [{ required: true, message: "请选择角色", trigger: "change" }],
});
const options = [
  {
    label: "管理员",
    value: 0,
  },
  {
    label: "编辑",
    value: 1,
  },
  {
    label: "普通用户",
    value: 2,
  },
];
const handleEdit = async (id) => {
  dialogVisible.value = true;
  const res = await axios.get(`/adminapi/user/list/${id}`);
  Object.assign(form, res.data.data[0]);
};
const handleEditChange = async () => {
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      // 发送修改请求
      axios.put(`/adminapi/user/edit/${form._id}`, form).then(async (res) => {
        if (res.data.ActionType === "OK") {
          await handleList();
          dialogVisible.value = false;
        }
      });
    }
  });
};
const handleDelete = async (id) => {
  // 发送删除请求
  await axios.delete(`/adminapi/user/delete/${id}`).then(async (res) => {
    if (res.data.ActionType === "OK") {
      // 等待删除操作完成
      await handleList();
    }
  });
};
</script>