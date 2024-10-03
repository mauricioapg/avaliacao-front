import { createRouter, createWebHistory } from 'vue-router'; 
import RegisterTransfer from '../components/RegisterTransfer.vue';
import ListTransfer from '../components/ListTransfer.vue';

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: RegisterTransfer,
  },
  {
    path: '/transfers',
    name: 'Transfers',
    component: ListTransfer,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/transfers',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
