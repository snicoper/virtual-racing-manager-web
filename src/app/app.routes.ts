import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.routes').then((m) => m.routes),
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.routes),
  },
  {
    path: 'user-profiles',
    loadChildren: () =>
      import('./features/user-profiles/user-profiles.routes').then((m) => m.routes),
  },
];
