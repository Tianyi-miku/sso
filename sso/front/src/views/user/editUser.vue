<template>
  <el-dialog v-model="visible" :title="props.title" width="500" @close="onClose">
    <el-form :model="Iform" :rules="rules">
      <el-form-item label="用户名称" :label-width="formLabelWidth" prop="username">
        <el-input v-model="Iform.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-select v-model="Iform.sex" placeholder="请选择性别">
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item label="角色" :label-width="formLabelWidth" required>
        <el-select v-model="Iform.roleId" placeholder="请选择角色">
          <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth">
        <el-input v-model="Iform.telephone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="email" :label-width="formLabelWidth">
        <el-input v-model="Iform.email" autocomplete="off" />
      </el-form-item>
      <el-form-item v-if="props.title === '新增'" label="密码" :label-width="formLabelWidth" prop="password">
        <el-input v-model="Iform.password" autocomplete="off" />
      </el-form-item>
      <el-form-item v-if="props.title === '新增'" label="重复输入密码" :label-width="formLabelWidth"  prop="repetPassword">
        <el-input v-model="Iform.repetPassword" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" @click="submit()">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { register } from '@/api/login'
import { update } from '@/api/user'
import { reactive, onMounted, ref, watch, watchEffect } from "vue";
import { ElNotification } from "element-plus";
import { getlist } from "@/api/role"

const props = defineProps({
  form: {
    type: Object,
    default: {},
  },
  dialogFormVisible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '新增',
  },
  close: {
    type: Function,
    default() {
      return function () { }
    }
  }
})

const rules = reactive({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度需要超过6位', trigger: 'blur' },
  ],
  repetPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
  ],
})

let Iform = ref<any>({})

const visible = ref(props.dialogFormVisible);
watch(
  () => props,
  (newProps) => {
    visible.value = newProps.dialogFormVisible;
  },
  { immediate: true, deep: true }
);

watchEffect(() => {
  Iform.value = props.form
})

const emit = defineEmits(["onClose", "seach"]);
const onClose = (): void => {
  emit("onClose");
};

const formLabelWidth = '140px'

const submit = () => {
  if (Iform.value.id) {
    update(Iform.value).then((res: any) => {
      if (res) {
        ElNotification({
          title: '成功',
          message: '修改成功',
          type: 'success',
        })
        emit("onClose");
        emit("seach");
      }
    })
  } else {
    register(Iform.value).then((res: any) => {
      if (res) {
        ElNotification({
          title: '成功',
          message: '创建成功',
          type: 'success',
        })
        emit("onClose");
        emit("seach");
      }
    })
  }
}

const queryParams = reactive({
  pageNum: 1,
  pageSize: 1000,
})

let roleList = reactive<any>([])

onMounted(() => {
  getlist(queryParams).then((result: any) => {
    roleList = result.list
  }).catch((err) => {
    console.log(err);
  });
})




</script>