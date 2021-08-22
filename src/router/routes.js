const routes = [
  {
    path: "/",
    component: () => import("src/layouts/PokedexLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }],
  },
  {
    path: "/pokemon/:id",
    component: () => import("pages/Pokemon.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
