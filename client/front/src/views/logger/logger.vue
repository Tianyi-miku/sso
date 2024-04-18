<template>

  <div class="form">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="日志名称">
        <el-input v-model="formInline.name" placeholder="请输入名称" clearable />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>

  <el-table :data="table.tableData" style="width: 100%">
    <el-table-column prop="user.name" label="用户" width="180" />
    <el-table-column prop="controls" label="操作" />
    <el-table-column prop="createdAt" label="日期">
      <template #default="scope">
        <span style="margin-left: 10px">{{ dayjs(scope.row.createdAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination small background :pageSize=queryParams.pageSize :total="table.total" :page-count="queryParams.pageNum"
    layout="prev, pager, next" class="mt-4" />
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue'
import { getlist } from "@/api/logger"
import dayjs from 'dayjs';

const formInline = reactive({
  name: '',
})
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  name: ''
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
  getlist(queryParams).then((result: any) => {
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