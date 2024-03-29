<template>
  <div class="login-box">
    <div class="login">
      <div class="login_title">Login</div>
      <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="auto" style="max-width: 600px">
        <el-form-item label="" prop="name">
          <el-input v-model="form.name" placeholder="请输入账号">
            <template #prefix>
              <el-icon class="el-input__icon">
                <UserFilled />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码">
            <template #prefix>
              <el-icon class="el-input__icon">
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="repetPassword" prop="repetPassword">
          <el-input v-model="form.repetPassword" />
        </el-form-item> -->
        <el-form-item>
          <el-button class="button" type="primary" @click="onSubmit(ruleFormRef)">Login</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { login } from '@/api/login'

// do not use same name with ref
const ruleFormRef = ref()

const form = reactive({
  name: '123',
  password: '123',
  repetPassword: '123',
  roleId: 0
})

const rules = reactive({
  name: [
    { required: true, message: '请输入账号', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
  repetPassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
})

const onSubmit = async (formEl: any) => {
  if (!formEl) return
  await formEl.validate((valid: any, fields: any) => {
    if (valid) {
      form.roleId = 1
      login(form).then(res => {
        console.log('====================================');
        console.log(res);
        console.log('====================================');
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
<style>
.login-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-items: center;
  background: url('~@/assets/login.svg');
  background-size: 100%;

  .login {
    width: 400px;
    margin: auto;
    padding-top: 240px;
    padding: 50px;
    height: 350px;

    .login_title {
      padding-bottom: 50px;
      font-size: large;
    }

    .button {
      width: 100%;
    }

  }
}
</style>
