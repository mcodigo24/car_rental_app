import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RentalFormComponent } from './pages/rental-form/rental-form.component';
import { RentalListComponent } from './pages/rental-list/rental-list.component';

const routes: Routes = [
  { path: 'register', component: RentalFormComponent },
  { path: 'list', component: RentalListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentalsRoutingModule { }
