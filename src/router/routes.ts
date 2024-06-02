import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  //avales de publicacion///////////////////////////////////////////////////////
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('src/pages/HomePage.vue'),
      },
    ],
  },
  {
    path: '/lista_avales_public',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'ListaAvalesPublic',
        component: () => import('src/pages/AvalesPublic/ListaAvalesPublic.vue'),
      },
    ],
  },
  {
    path: '/detalles',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'detalles',
        component: () => import('src/pages/AvalesPublic/DetallesPage.vue'),
      },
    ],
  },
  {
    path: '/show/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'show',
        component: () => import('src/pages/AvalesPublic/ShowPage.vue'),
      },
    ],
  },
  {
    path: '/crear_aval_public',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/AvalesPublic/FormAvalPublic.vue'),
      },
    ],
  },
   //avales de tutorias///////////////////////////////////////////////////////
   {
    path: '/lista_avales_tuto',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'ListaAvalesTuto',
        component: () => import('src/pages/AvalesTuto/ListaAvalesTuto.vue'),
      },
    ],
  },
  {
    path: '/detallestuto',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'DetallesTuto',
        component: () => import('src/pages/AvalesTuto/DetallesPageTuto.vue'),
      },
    ],
  },
  {
    path: '/showtuto/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'ShowTuto',
        component: () => import('src/pages/AvalesTuto/ShowPageTuto.vue'),
      },
    ],
  },
  {
    path: '/crear_aval_tuto',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/AvalesTuto/FormAvalTuto.vue'),
      },
    ],
  },
  //login////////////////////////////////////////////////////
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/LoginPage.vue') },
    ],
  },
  //userss//////////////////////////////////////////////////////
  {
    path: '/user',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/users/UserPage.vue') },
    ],
  },
  {
    path: '/NuevoUsuario',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/users/CreateUserPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
