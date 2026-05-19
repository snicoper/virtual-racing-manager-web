import { Routes } from '@angular/router';
import { Profile } from './pages/profile/profile';
import { Update } from './pages/update/update';

export const routes: Routes = [
  {
    path: '',
    component: Profile,
    title: 'Profile',
  },
  {
    path: 'update',
    component: Update,
    title: 'Update Profile',
  },
];
