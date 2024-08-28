<template>
  <nav class="navbar bg-body-tertiary">
    <div class="d-flex justify-content-between container-fluid">
      <router-link :to="{name:'home'}" class="btn">Home</router-link>
      <div>
        <router-link :to="{name:'login'}" class="btn">Login</router-link>
        <router-link :to="{name:'register'}" class="btn">Register</router-link>
      </div>
    </div>
  </nav>
  <component :is="layout || 'router-view'" />
</template>
  
<script>
  import AuthLayout from '@/layouts/AuthLayout.vue'
  
  export default {
    name: 'LayoutWrapper',
    computed: {
      layout() {
        const route = this.$route
        if (route.meta.layout === 'auth') {
          return AuthLayout
        }
        // Return default layout
        return null
      }
    }
  }
</script>