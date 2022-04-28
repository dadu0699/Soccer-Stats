import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuerysPageRoutingModule } from './querys-routing.module';

import { QuerysPage } from './querys.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuerysPageRoutingModule
  ],
  declarations: [QuerysPage]
})
export class QuerysPageModule {}
