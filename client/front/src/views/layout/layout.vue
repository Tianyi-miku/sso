<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header>

          <Head></Head>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
        <el-footer>
          <Footer></Footer>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import Footer from "@/components/footer/footer.vue"
import Head from "@/components/head/head.vue"
import Aside from "@/components/aside/aside.vue"
</script>
<style>
.common-layout {
  height: 100%;

  .el-container {
    height: 100%;
  }
}
</style>