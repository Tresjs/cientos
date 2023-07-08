import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./pages/index.vue'),
  },
  {
    path: '/controls/orbit-controls',
    name: 'OrbitControls',
    component: () => import('./pages/OrbitControlsDemo.vue'),
  },
  {
    path: '/controls/transform-controls',
    name: 'TransformControls',
    component: () => import('./pages/TransformControlsDemo.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
