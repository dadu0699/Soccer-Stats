import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { EmployeeRoutingModule } from './empolyee-routing.module';

import { SharedModule } from '../../shared/shared.module';
import { ComponentsModule } from '../../components/components.module';

import { MainComponent } from './main/main.component';

import { MatTabsModule } from '@angular/material/tabs';
import { ManagementComponent } from './management/management.component';


@NgModule({
  declarations: [
    MainComponent,
    ManagementComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    EmployeeRoutingModule,
    SharedModule,
    ComponentsModule,
    MatTabsModule,
  ]
})
export class EmployeeModule { }
