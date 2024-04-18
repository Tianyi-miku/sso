<template>
  <el-menu :default-active="active.toString()" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
    <el-menu-item index="1" @click="menuClick('client')">
      <el-icon><icon-menu /></el-icon>
      <span>子系统管理</span>
    </el-menu-item>
    <el-menu-item index="2" @click="menuClick('user')">
      <el-icon><icon-menu /></el-icon>
      <span>用户管理</span>
    </el-menu-item>
    <el-menu-item index="3" @click="menuClick('role')">
      <el-icon>
        <setting />
      </el-icon>
      <span>角色管理</span>
    </el-menu-item>
    <el-menu-item index="4" @click="menuClick('logger')">
      <el-icon>
        <document />
      </el-icon>
      <span>操作日志</span>
    </el-menu-item>
    <el-menu-item index="5" @click="menuClick('loginlogger')">
      <el-icon>
        <document />
      </el-icon>
      <span>登录日志</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue';
import { RouteLocationRaw, useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const menuClick = (url: RouteLocationRaw) => {
  router.push(url)
}

let active = ref(1)

onMounted(() => {
  if (route.path === '/client') {
    active.value = 1
  }
  if (route.path === '/user') {
    active.value = 2
  }
  if (route.path === '/role') {
    active.value = 3
  }
  if (route.path === '/logger') {
    active.value = 4
  }
  if (route.path === '/loginlogger') {
    active.value = 5
  }
})

</script>
