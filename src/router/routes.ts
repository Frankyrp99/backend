import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  //avales de publicacion///////////////////////////////////////////////////////
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'ListaAvales', component: () => import('src/pages/HomePage.vue') }],

  },
  {
    path: '/lista_avales',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'ListaAvales', component: () => import('src/pages/AvalesPublic/ListaAvales.vue') }],

  },
  {
    path: '/detalles',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name:'detalles', component: () => import('src/pages/AvalesPublic/DetallesPage.vue') }],
  },
  {
    path:'/show/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name:'show', component: () => import('src/pages/AvalesPublic/ShowPage.vue') }],
  },
  {
    path: '/crear_aval_public',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/AvalesPublic/FormAvalPublic.vue') }],
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
