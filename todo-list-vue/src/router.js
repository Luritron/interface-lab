// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Register from './components/Register.vue';
import Login from './components/Login.vue';
import TodoPage from './components/TodoPage.vue';
import About from './components/About.vue';
import Profile from './components/Profile.vue';
import store from './store';

const routes = [
  { path: '/', redirect: '/register' },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  {
    path: '/todos',
    component: TodoPage,
    beforeEnter: (to, from, next) => {
      if (store.getters.isAuthenticated) {
        next();
      } else {
        next('/login');
      }
    }
  },
  { path: '/about', component: About },
  { path: '/profile', component: Profile },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;