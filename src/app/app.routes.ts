import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/pages/home/home.component';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'rentals',
    loadChildren: () =>
      import('./features/rentals/rentals.module').then(m => m.RentalsModule)
  }
];
