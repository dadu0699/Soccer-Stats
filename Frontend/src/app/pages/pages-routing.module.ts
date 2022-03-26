import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { FeedComponent } from './feed/feed.component';
import { EmployeeComponent } from './employee/employee.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'feed', component: FeedComponent },
      { path: 'employee', component: EmployeeComponent },
      { path: 'admin', component: AdminComponent },
      { path: '', redirectTo: 'feed', pathMatch: 'full' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
