export const shapesRoutes = [
  {
    path: '/shapes/catmullromcurve3',
    name: 'CatmullRomCurve3',
    component: () => import('../../pages/shapes/CatmullRomCurve3Demo.vue'),
  },
  {
    path: '/shapes/cylinder',
    name: 'Cylinder',
    component: () => import('../../pages/shapes/Cylinder.vue'),
  },
  {
    path: '/shapes/line2',
    name: 'Line2',
    component: () => import('../../pages/shapes/Line2Demo.vue'),
  },
  {
    path: '/shapes/superformula',
    name: 'Superformula',
    component: () => import('../../pages/shapes/SuperformulaDemo.vue'),
  },
  {
    path: '/shapes/roundedbox',
    name: 'RoundedBox',
    component: () => import('../../pages/shapes/RoundedBoxDemo.vue'),
  },
  {
    path: '/shapes/on-demand-shapes',
    name: 'on-demand Shapes',
    component: () => import('../../pages/shapes/OnDemandShapesDemo.vue'),
  },
]
