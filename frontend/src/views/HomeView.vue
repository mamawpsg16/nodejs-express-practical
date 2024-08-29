<script setup>
import { ref } from 'vue';
import axios from 'axios'; // Import axios if not using apiClient
import apiClient from '@/utils/http/axios.js';

// Create refs to store data
const userDetails = ref(null);
const uploadStatus = ref('');

// Fetch user details
const fetchUserDetails = async () => {
  try {
    const response = await apiClient.get('/user');
    userDetails.value = response.data;
  } catch (error) {
    console.error('Failed to fetch user details:', error);
  }
};

// Upload file
const uploadFile = async () => {
  const fileInput = document.querySelector('input[type="file"]');
  if (!fileInput.files.length) {
    uploadStatus.value = 'No file selected.';
    return;
  }
  const formData = new FormData();
  formData.append('profile', fileInput.files[0]);

  try {
    const response = await apiClient.post('/upload-profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    uploadStatus.value = `Upload successful: ${response.data.message}`;
  } catch (error) {
    uploadStatus.value = `Upload failed: ${error.response ? error.response.data.errors : error.message}`;
  }
};
</script>

<template>
  <h2 class="text-center">HOME</h2>
  <form @submit.prevent="uploadFile">
    <input type="file" />
    <button type="submit">Upload</button>
  </form>
  <button @click="fetchUserDetails">GET DETAILS</button>
  <p v-if="uploadStatus">{{ uploadStatus }}</p>
  <pre>{{ userDetails }}</pre>
</template>
