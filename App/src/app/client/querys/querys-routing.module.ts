import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuerysPage } from './querys.page';

const routes: Routes = [
  {
    path: '',
    component: QuerysPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuerysPageRoutingModule {}
