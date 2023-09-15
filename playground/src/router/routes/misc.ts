export const miscRoutes = [
  {
    path: '/misc/html',
    name: 'HTML',
    component: () => import('../../pages/misc/HTMLDemo.vue'),
  },
  {
    path: '/misc/laptop',
    name: 'Laptop',
    component: () => import('../../pages/misc/LaptopDemo.vue'),
  },
]