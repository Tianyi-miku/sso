<template>

  <div class="form">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="用户名称">
        <el-input v-model="formInline.name" placeholder="请输入名称" clearable />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>

  <el-table :data="table.tableData" style="width: 100%">
    <el-table-column prop="name" label="name" width="180" />
    <el-table-column prop="sex" label="sex" width="180" />
    <el-table-column prop="email" label="email" />
  </el-table>
  <el-pagination small background :pageSize=queryParams.pageSize :total="table.total" :page-count="queryParams.pageNum"
    layout="prev, pager, next" class="mt-4" />
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue'
import { getlist } from "@/api/user.ts"

const formInline = reactive({
  name: '',
})
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
})

const onSubmit = () => {
  getTable()
}

const table = reactive({
  tableData: [],
  total: 0
})

const getTable = () => {
  queryParams.name = formInline.name
  getlist(queryParams).then((result) => {
    table.tableData = result.list
    table.total = result.total
  }).catch((err) => {
    console.log(err);
  });
}


onMounted(() => {
  getTable()
})

</script>

<style>
.form {
  float: left;
}
</style>