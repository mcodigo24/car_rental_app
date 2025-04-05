import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RentalFormComponent } from './pages/rental-form/rental-form.component';

const routes: Routes = [
  { path: 'register', component: RentalFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentalsRoutingModule { }
