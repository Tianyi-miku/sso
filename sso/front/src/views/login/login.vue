<template>
  <div class="login-box">
    <div class="login">
      <div class="login_title">Login</div>
      <div class="login_title">统一认证中心</div>
      <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="auto" style="max-width: 600px">
        <el-form-item label="" prop="username">
          <el-input v-model="form.username" placeholder="请输入账号">
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
        <el-form-item v-show="!isLogin" label="" prop="repetPassword">
          <el-input v-model="form.repetPassword">
            <template #prefix>
              <el-icon class="el-input__icon">
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" @click="onSubmit(ruleFormRef)">{{ isLogin ? 'Login' : 'Register'
            }}</el-button>
        </el-form-item>
        <div class="reg">
          <span class="reginOrlogin" v-show="isLogin" @click="isLogin = !isLogin">注册</span>
          <span class="reginOrlogin" v-show="!isLogin" @click="isLogin = !isLogin">登录</span>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { login, register } from '@/api/login'
import { SetLocalItem, openNotification } from "@/utils/publicFuntion"
import { useRoute, useRouter } from "vue-router"
import store from '@/store';

// do not use same name with ref
const ruleFormRef = ref()

const form = reactive({
  username: '123',
  password: '123',
  repetPassword: '123',
  roleId: 1
})

const isLogin = ref(true)

const rules = reactive({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
  repetPassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
})

const router = useRouter()

const onSubmit = async (formEl: any) => {
  if (!formEl) return
  await formEl.validate((valid: any, fields: any) => {
    if (valid) {

      const params = router.currentRoute.value.query;
      const clientCode = params.clientCode
      const skipUrl = params.skip;

      if (clientCode) {
        form.clientCode = parseInt(clientCode as string)
      }
      if (isLogin.value) {
        login(form).then((res: any) => {
          if (res) {
            SetLocalItem('token', res.access_token)
            store.commit('setToken', res.access_token)
            if (skipUrl) {
              window.location.href = skipUrl + `?token=${res.access_token}`
            } else {
              router.push({ path: '/client' })
            }
          }
        })
      } else {
        register(form).then((res: any) => {
          if (res) {
            isLogin.value = true
            openNotification(1, '注册成功', '请登录')
          }
        })
      }

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

    .reg {
      .reginOrlogin {
        cursor: pointer;
      }

      :hover {
        color: rgb(0, 162, 255);
      }
    }

  }
}
</style>
