<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue';
import LayoutWrapper from '@/layouts/LayoutWrapper.vue'
import apiClient from '@/utils//http/axios.js';
async function getData() {
  const url = "http://localhost:3000/api/contacts";
  try {
    const response = await apiClient.get(url);
    console.log(response, "response");
  } catch (error) {
    console.error(error.message);
  }
}

onMounted(() =>{
  // getData()
})
</script>

<template>
      <LayoutWrapper />
</template>

<style scoped>
</style>
