<template>
  <el-dialog v-model="visible" :title="props.title" width="500" @close="onClose">
    <el-form :model="Iform">
      <el-form-item label="角色名称" :label-width="formLabelWidth">
        <el-input v-model="Iform.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input v-model="Iform.remark" autocomplete="off" />
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
import { update, create } from '@/api/role'
import { reactive, onMounted, ref, watch, watchEffect } from "vue";
import { ElNotification } from "element-plus";

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
    create(Iform.value).then((res: any) => {
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

</script>