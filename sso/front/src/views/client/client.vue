<template>

  <div class="form">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="子系统名称">
        <el-input v-model="formInline.name" placeholder="请输入子系统名称" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="buttons">
      <el-button type="primary" @click="add">新增</el-button>
    </div>
  </div>

  <el-table :data="table.tableData" class="table">
    <el-table-column prop="name" label="系统名称" width="180" />
    <el-table-column prop="address" label="系统地址" />
    <el-table-column prop="remark" label="备注" />
    <el-table-column prop="createdAt" label="创建日期">
      <template #default="scope">
        <span style="margin-left: 10px">{{ dayjs(scope.row.createdAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="150">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="open(scope.row)">访问</el-button>
        <el-button link type="primary" size="small" @click="edit(scope.row)">修改</el-button>
        <el-button link type="primary" size="small" @click="deleteRow(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination small background :pageSize=queryParams.pageSize :total="table.total" layout="prev, pager, next"
    class="mt-4 pagination" @currentChange="currentChange" />
  <EditDialog :title="title" :dialogFormVisible="dialogFormVisible" :form="form" @onClose="close()" @seach="getTable">
  </EditDialog>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue'
import { getlist } from "@/api/client"
import dayjs from 'dayjs';
import store from '@/store';
import EditDialog from './editDialog.vue'
import { cloneDeep } from 'lodash'
import { delet } from "@/api/client"
import { ElNotification } from 'element-plus';

const formInline = reactive({
  name: '',
})
const queryParams: any = reactive({
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
  getlist(queryParams).then((result: any) => {
    table.tableData = result.list
    table.total = result.total
  }).catch((err) => {
    console.log(err);
  });
}

let form = {}
const dialogFormVisible = ref(false)
const title = ref('新增')
const edit = (row: any) => {
  form = cloneDeep(row)
  dialogFormVisible.value = true
  title.value = '修改'
}

const add = () => {
  form = {}
  dialogFormVisible.value = true
  title.value = '新增'
}

function close() {
  dialogFormVisible.value = false
}

function open(row: any) {
  const token = store.state.token || localStorage.getItem('token')
  window.open(`${row.address}?token=${token}`)
  // window.location.href = `${row.address}?token=${token}`
}

function deleteRow(row: any) {

  delet(row.id).then(res => {
    if (res) {
      ElNotification({
        title: '成功',
        message: '删除成功',
        type: 'success',
      })
      getTable()
    }
  })
}


onMounted(() => {
  getTable()
})

function currentChange(val: number) {
  queryParams.pageNum = val
  getTable()
}

</script>

<style>
.form {
  width: 100%;
  display: flex;
  justify-content: space-between;

  .buttons {
    padding-right: 80px;
  }
}

.table {
  width: 98%;
  margin: auto;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>