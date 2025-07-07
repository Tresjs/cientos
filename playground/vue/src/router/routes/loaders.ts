export const loadersRoutes = [
  {
    path: '/loaders/svg',
    name: 'SVG',
    component: () => import('../../pages/loaders/SVGDemo.vue'),
  },
  {
    path: '/loaders/use-gltf',
    name: 'useGLTF',
    component: () => import('../../pages/loaders/use-gltf/index.vue'),
  },
  {
    path: '/loaders/gltf-model',
    name: 'GLTFModel',
    component: () => import('../../pages/loaders/use-gltf/GLTFModelDemo.vue'),
  },
  {
    path: '/loaders/use-texture',
    name: 'useTexture',
    component: () => import('../../pages/loaders/use-texture/index.vue'),
  },
  {
    path: '/loaders/use-texture-component',
    name: 'UseTexture',
    component: () => import('../../pages/loaders/use-texture/UseTextureComponent.vue'),
  },
  {
    path: '/loaders/use-fbx',
    name: 'useFBX',
    component: () => import('../../pages/loaders/use-fbx/index.vue'),
  },
  {
    path: '/loaders/fbx-model',
    name: 'FBXModel',
    component: () => import('../../pages/loaders/use-fbx/FBXModelDemo.vue'),
  },
  {
    path: '/loaders/use-video-texture',
    name: 'useVideoTexture',
    component: () => import('../../pages/loaders/useVideoTextureDemo.vue'),
  },
  {
    path: '/loaders/pbr-textures',
    name: 'PBRTextures',
    component: () => import('../../pages/loaders/use-texture/PBRTextures.vue'),
  },
]
