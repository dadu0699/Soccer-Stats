import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../guards/auth.guard';

import { EmployeeReportsComponent } from './employee-reports/employee-reports.component';
import { LogsComponent } from './logs/logs.component';
import { MainComponent } from './main/main.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserReportsComponent } from './user-reports/user-reports.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'user-management', component: UserManagementComponent },
      { path: 'user-reports', component: UserReportsComponent },
      { path: 'employee-reports', component: EmployeeReportsComponent },
      { path: 'logs', component: LogsComponent },
      { path: '', redirectTo: 'user-management', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
