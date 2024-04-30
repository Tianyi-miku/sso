<template>
  <div class="headbox">
    <div class="title">
      统一认证管理系统
    </div>
    <div class="avatar">
      <div class="logOut">
        <img class="img" src="../../assets/avatar.jpg" alt="avatar" />
        <el-button @click="loginOut" type="primary" link>退出登录</el-button>
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">
import { useRouter } from "vue-router"
import { GetLocalItem, RemoveLocalItem } from "@/utils/publicFuntion"
import store from "@/store";
import { loginout } from "@/api/login";

const router = useRouter()
const loginOut = () => {
  let token = GetLocalItem('token')
  if (token) {
    loginout(token).finally(() => {
      RemoveLocalItem('token')
      store.commit('setToken', '')
      router.push({ path: '/login' })
    })
  }

}

</script>
<style>
.headbox {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;

  .title {
    font-size: x-large;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logOut {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80px;


    .avatar {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-left: 20px;
    }
  }


}
</style>