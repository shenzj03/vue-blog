<template>
  <div class="login">
    <el-form :model="form" :rules="formRules" ref="ruleFormRef">
      <el-form-item prop="account" label="账号">
        <el-input v-model="form.account" />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "../store/index";
const router = useRouter();
const store = useStore();
const ruleFormRef = ref();
const form = reactive({
  account: "",
  password: "",
});
const formRules = reactive({
  account: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
const submitForm = () => {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      axios.post("/adminapi/user/login", form).then((res) => {
        if (res.data.ActionType === "OK") {
          store.$state.userInof = res.data.data;
          router.push("/");
          localStorage.setItem("token", "shen");
        } else {
          ElMessage.error(res.data.error);
        }
      });
    }
  });
};
</script>
<style scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-image: url("../assets/login.jpg");
  background-size: cover; */
}
.el-form {
  padding: 20px;
  width: 400px;
  height: 300px;
  border-radius: 10px;
  background: rgba(255, 255, 241, 0.5);
}
</style>