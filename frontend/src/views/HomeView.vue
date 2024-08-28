<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '@/utils/http/axios.js';

// Create a ref to store user details
const userDetails = ref(null);

const fetchUserDetails = async () => {
  try {
    const response = await apiClient.get('/user');
    userDetails.value = response.data;
  } catch (error) {
    console.error('Failed to fetch user details:', error);
  }
};

</script>

<template>
  <h2 class="text-center">HOME</h2>
  <button @click.prevent="fetchUserDetails">GET DETAILS</button>
  <pre>
    {{ userDetails}}
  </pre>
</template>
