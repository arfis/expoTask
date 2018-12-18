import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerFilterComponent } from './components/customer-filter/customer-filter.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerFilterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
