import { createRouter, createWebHistory } from 'vue-router'
const HomeView = () => import('@/views/HomeView.vue')
const AboutView = () => import('@/views/AboutView.vue')
const Login = () => import('@/views/authentication/Login.vue')
const Register = () => import('@/views/authentication/Register.vue')
import apiClient from '@/utils/http/axios.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { layout: 'auth' }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { layout: 'auth' }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AboutView,
      meta: { requiresAuth: true }
    }
  ]
})
router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token');
  const requiresAuth = to.meta.requiresAuth;

  if (requiresAuth) {
    if (token) {
      try {
        await apiClient.get('/user'); // Verify token
        next(); // Proceed to the route
      } catch {
        localStorage.removeItem('token');
        next('/login'); // Redirect to login if token verification fails
      }
    } else {
      next('/login'); // Redirect to login if no token
    }
  }else{
    if (token) {
      next('/'); // Redirect authenticated user away from noAuth routes
    } else {
      next(); // Proceed to the route if no token
    }
  }
});


export default router
