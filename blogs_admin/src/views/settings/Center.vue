<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <el-card>
        <el-avatar :src="avatarUrl" />
        {{ account }}
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-card>
        <el-form :model="form" :rules="formRules" ref="ruleFormRef">
          <el-form-item prop="account" label="账号">
            <el-input v-model="form.account" />
          </el-form-item>
          <el-form-item prop="username" label="昵称">
            <el-input v-model="form.username" />
          </el-form-item>
          <el-form-item prop="avatar" label="头像">
            <Upload @update:avatar="changeUpload" :avatar="form.avatar" />
          </el-form-item>
          <el-form-item>
            <el-button @click="submitForm">更新</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>
<script setup>
import { computed, reactive, ref } from "vue";
import { useStore } from "../../store";
import { ruleFormRef } from "../../utils";
import { ElMessage } from "element-plus";
import Upload from "../../components/upload/Upload.vue";
import upload from "../../utils/upload";
const store = useStore();
const { _id, account, username, avatar, role } = store.$state.userInof;
const form = reactive({
  _id: _id,
  account: account,
  username: username,
  role: role,
  avatar: avatar,
  file: null,
});
const formRules = reactive({
  account: [{ required: true, message: "请输入账号", trigger: "blur" }],
  username: [{ required: true, message: "请输入昵称", trigger: "blur" }],
  avatar: [{ required: true, message: "请上传头像", trigger: "blur" }],
});
const avatarUrl = computed(() => {
  // 计算属性获取头像的 URL
  return store.$state.userInof.avatar
    ? "http://localhost:3000" + store.$state.userInof.avatar
    : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
});
const changeUpload = (file) => {
  // 处理上传文件的操作
  form.avatar = URL.createObjectURL(file);
  form.file = file;
};
const submitForm = () => {
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      await upload("/adminapi/user/upload", form).then((res) => {
        if (res.ActionType === "OK") {
          store.$state.userInof = {
            ...store.$state.userInof,
            ...res.data,
          };
          ElMessage("更新成功");
        }
      });
    }
  });
};
</script>
