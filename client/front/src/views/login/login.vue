<template>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { goToSSOLogin, SetLocalItem } from "@/utils/publicFuntion";
import store from '@/store';
import { useRouter } from 'vue-router';
import { Login } from '@/api/login'


const router = useRouter()

onMounted(() => {

  const params = router.currentRoute.value.query;
  const token = params.token || store.state.token || localStorage.getItem('token');

  if (token) {
    Login(token).then((result: any) => {
      if (result.access_token) {
        console.log(result.access_token);
        SetLocalItem('token', result.access_token)
        store.commit('setToken', result.access_token)
        router.push('/home')
      }
    }).catch((err) => {
      goToSSOLogin()
    });
  } else {
    goToSSOLogin()
  }
})
</script>
<style></style>
