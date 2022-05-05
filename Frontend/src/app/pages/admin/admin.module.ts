import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';

import { SharedModule } from '../../shared/shared.module';
import { ComponentsModule } from '../../components/components.module';

import { UserManagementComponent } from './user-management/user-management.component';
import { MainComponent } from './main/main.component';
import { LogsComponent } from './logs/logs.component';
import { UserReportsComponent } from './user-reports/user-reports.component';
import { EmployeeReportsComponent } from './employee-reports/employee-reports.component';
import { EsbManagementComponent } from './esb-management/esb-management.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    MainComponent,
    UserManagementComponent,
    LogsComponent,
    UserReportsComponent,
    EmployeeReportsComponent,
    EsbManagementComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    AdminRoutingModule,
    SharedModule,
    ComponentsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule,
    MatGridListModule,
    MatListModule,
    LayoutModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class AdminModule {}
