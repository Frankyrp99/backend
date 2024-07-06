import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('src/pages/HomePage.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/acerca_de',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'acerca',
        component: () => import('src/pages/AcercaDe.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  //avales de publicacion///////////////////////////////////////////////////////
  {
    path: '/lista_avales_public',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'ListaAvalesPublic',
        component: () => import('src/pages/AvalesPublic/ListaAvalesPublic.vue'),
        meta: { requiresAuth: true },
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
        meta: { requiresAuth: true },
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
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/crear_aval_public',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'CrearAvalPublic',
        component: () => import('src/pages/AvalesPublic/FormAvalPublic.vue'),
        meta: { requiresAuth: true },
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
        meta: { requiresAuth: true },
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
        meta: { requiresAuth: true },
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
        meta: { requiresAuth: true },
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
        meta: { requiresAuth: true },
      },
    ],
  },
  //avales de bibliografia///////////////////////////////////////////////////////
  {
    path: '/lista_avales_biblio',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'ListaAvalesBiblio',
        component: () => import('src/pages/AvalesBiblio/ListaAvalesBiblio.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/detallesbiblio',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'DetallesBiblio',
        component: () =>
          import('src/pages/AvalesBiblio/DetallesPageBiblio.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/showbiblio/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'ShowBiblio',
        component: () => import('src/pages/AvalesBiblio/ShowPageBiblio.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/crear_aval_biblio',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/AvalesBiblio/FormAvalBiblio.vue'),
        meta: { requiresAuth: true },
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
      {
        path: '',

        component: () => import('src/pages/users/UserPage.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/NuevoUsuario',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/users/CreateUserPage.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/Usuarios',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'usuarios',
        component: () => import('src/pages/users/ListUsers.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  //reportes//////////////////////////////////////////////////////
  {
    path: '/Report_depart',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/Reportes/ReportDepartamento.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/Report_fecha',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/Reportes/ReportFecha.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/Report_Autor',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/Reportes/ReportProfesor.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/Report_Autor_Aval/:id/:nombre/:apellidos',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'AvalesProfesor',
        component: () => import('src/pages/Reportes/ReportProfesorAval.vue'),
        meta: { requiresAuth: true },
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
