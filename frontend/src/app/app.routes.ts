import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'denomination',
    loadChildren: () =>
      import('./pages/euro-denomination/euro-denomination.routes').then(
        (m) => m.euroDenominationRoutes
      ),
  },
];
