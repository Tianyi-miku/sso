<template>
  <div class="headbox">
    <div class="title">
      第一管理系统
    </div>
    <div class="avatar">
      <div class="logOut">
        <img class="img" src="../../assets/avatar.jpg" alt="avatar" />
        <el-button @click="loginOut" type="primary" link>退出登录</el-button>
      </div>
    </div>
  </div>

</template>
<script setup>
import { useRouter } from "vue-router"
import { RemoveLocalItem, goToSSOLogin } from "@/utils/publicFuntion"

const router = useRouter()
const loginOut = () => {
  RemoveLocalItem('token')
  goToSSOLogin()
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