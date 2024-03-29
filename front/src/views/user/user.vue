<template>

  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="Approved by">
        <el-input v-model="formInline.user" placeholder="Approved by" clearable />
      </el-form-item>

      <el-form-item label="Activity time">
        <el-date-picker v-model="formInline.date" type="date" placeholder="Pick a date" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Query</el-button>
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
  user: '',
  region: '',
  date: '',
})
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,

})

const onSubmit = () => {
  console.log('submit!')
}

const table = reactive({
  tableData: [],
  total: 0
})

const getTable = () => {
  getlist(queryParams).then((result) => {
    table.tableData = result.data.list
    table.total = result.data.total
  }).catch((err) => {
    console.log(err);
  });
}


onMounted(() => {
  getTable()
})

</script>
