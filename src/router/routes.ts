import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  //avales de publicacion///////////////////////////////////////////////////////
  {
    path: '/lista_avales',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'ListaAvales', component: () => import('src/pages/ListaAvales.vue') }],

  },
  {
    path: '/detalles',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name:'detalles', component: () => import('src/pages/DetallesPage.vue') }],
  },
  {
    path:'/show/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name:'show', component: () => import('src/pages/ShowPage.vue') }],
  },
  {
    path: '/recursos',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/FormRecursos.vue') }],
  },
//login////////////////////////////////////////////////////
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/LoginPage.vue') }],
  },
  //userss//////////////////////////////////////////////////////
  {
    path: '/user',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/users/UserPage.vue') }],
  },
  {
    path: '/NuevoUsuario',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/users/CreateUserPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
