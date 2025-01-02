export const loadersRoutes = [
  {
    path: '/loaders/svg',
    name: 'SVG',
    component: () => import('../../pages/loaders/SVGDemo.vue'),
  },
  {
    path: '/loaders/use-gltf',
    name: 'useGLTF',
    component: () => import('../../pages/loaders/UseGLTFDemo.vue'),
  },
  {
    path: '/loaders/use-video-texture',
    name: 'useVideoTexture',
    component: () => import('../../pages/loaders/useVideoTextureDemo.vue'),
  },
  {
    path: '/loaders/use-progress',
    name: 'useProgress',
    component: () => import('../../pages/loaders/use-progress/index.vue'),
  },
]
