const routes = [
  {
    path: "/",component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "usuarios", component: () => import("pages/usuarios/index.vue") },
      { path: "instituciones", component: () => import("pages/instituciones/usuarios.vue") },
      { path: "locales", component: () => import("pages/locales/index.vue") },
      { path: "proveedores", component: () => import("pages/proveedores/index.vue") },
      { path: "administrador", component: () => import("pages/administrador/index.vue") },
      { path: "categorias", component: () => import("pages/categorias/index.vue") },
      { path: "productos", component: () => import("pages/productos/index.vue") },
      { path: "ventas", component: () => import("pages/ventas/index.vue") },
      { path: "compras", component: () => import("pages/compras/index.vue") },
      { path: "caja", component: () => import("pages/caja/index.vue") },

    ],

  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
  {
    path: "/login",
    component: () => import("pages/Login.vue"),
  },
];

export default routes;
