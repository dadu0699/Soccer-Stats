import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CustomerRoutingModule } from './customer-routing.module';

import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '../../shared/shared.module';
import { ComponentsModule } from '../../components/components.module';

import { MainComponent } from './main/main.component';
import { FeedComponent } from './feed/feed.component';
import { ProfileComponent } from './profile/profile.component';
import { GamesListComponent } from './games-list/games-list.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    MainComponent,
    FeedComponent,
    ProfileComponent,
    GamesListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    CustomerRoutingModule,
    FlexLayoutModule,
    SharedModule,
    ComponentsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule,
    MatGridListModule,
    MatListModule,
    LayoutModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
  ]
})
export class CustomerModule { }
