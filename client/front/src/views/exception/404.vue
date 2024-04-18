<template>
  <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
      <a-button type="primary" @click="toHome"> Back Home </a-button>
    </template>
  </a-result>
</template>

<script setup lang="ts">
import { Router, useRouter } from "vue-router";
const $router: Router = useRouter();
function toHome(): void {
  $router.push('/home');
}
</script>

<style scoped></style>
