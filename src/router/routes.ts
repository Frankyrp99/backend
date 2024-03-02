import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'HomePage', component: () => import('pages/IndexPage.vue') }],

  },
  {
    path: '/detalles',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name:'detalles', component: () => import('src/pages/DetallesPage.vue') }],
  },
  {
    path: '/show',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name:'show', component: () => import('src/pages/ShowPage.vue') }],
  },
  {
    path: '/recursos',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/FormRecursos.vue') }],
  },

  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/LoginPage.vue') }],
  },
  {
    path: '/user',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/UserPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
