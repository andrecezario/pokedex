const routes = [
  {
    path: '/',
    component: () => import('src/layouts/PokedexLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/pokemon/:id',
    component: () => import('pages/Pokemon.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
