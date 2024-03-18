<template>
  <el-card>
    <el-form :model="form" :rules="formRules" ref="ruleFormRef">
      <el-form-item prop="account" label="账号">
        <el-input v-model="form.account" />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="form.password" type="password" />
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
      <el-form-item>
        <el-button @click="submitForm">添加</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script setup>
import axios from "axios";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { ruleFormRef } from "../../utils";
const router = useRouter();
const form = reactive({
  account: "",
  password: "",
  role: 2,
});
const formRules = reactive({
  account: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
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
const submitForm = () => {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      // 提交表单的逻辑
      axios.post("/adminapi/user/add", form).then((res) => {
        if (res.data.ActionType === "OK") {
          router.push("/user/userlist");
        } else {
          ElMessage.error(res.data.error);
        }
      });
    } else {
      return false;
    }
  });
};
</script>