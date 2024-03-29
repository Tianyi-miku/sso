<template>
  <div>
    首页
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
})

</script>
