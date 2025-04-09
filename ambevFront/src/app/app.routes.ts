import { Routes } from '@angular/router';
import { SignComponent } from './core/auth/sign/sign.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./core/pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'login',
    component: SignComponent
  }
];
