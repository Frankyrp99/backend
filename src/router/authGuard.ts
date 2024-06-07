// authGuard.ts
import { NavigationGuardNext, RouteRecordRaw } from 'vue-router';

export default function authGuard(to: any, from: any, next: NavigationGuardNext) {
  // Verifica si el usuario está autenticado
  const isAuthenticated =!!localStorage.getItem('authToken');

  if (!isAuthenticated && to.matched.some((record: RouteRecordRaw) => record.meta?.requiresAuth)) {
    // Redirige al usuario a la página de login si no está autenticado y la ruta requiere autenticación
    next('/');
  } else {
    // Permite el acceso a la ruta si el usuario está autenticado
    next();
  }
}
