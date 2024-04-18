<template>
  <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
    <el-menu-item index="1" @click="menuClick('home')">
      <el-icon><icon-menu /></el-icon>
      <span>首页</span>
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
      <span>日志管理</span>
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
import { useRouter } from 'vue-router'

const router = useRouter()
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const menuClick = (url) => {
  router.push(url)
}
</script>
