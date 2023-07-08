import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./pages/index.vue'),
  },
  {
    path: '/demo/orbit-controls',
    name: 'OrbitControls',
    component: () => import('./pages/OrbitControlsDemo.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
