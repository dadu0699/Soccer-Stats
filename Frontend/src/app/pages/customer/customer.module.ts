import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CustomerRoutingModule } from './customer-routing.module';

import { SharedModule } from '../../shared/shared.module';
import { ComponentsModule } from '../../components/components.module';

import { MainComponent } from './main/main.component';
import { FeedComponent } from './feed/feed.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    MainComponent,
    FeedComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    CustomerRoutingModule,
    SharedModule,
    ComponentsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule,
    MatListModule,
    LayoutModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class CustomerModule { }
