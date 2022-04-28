import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientPage } from './client.page';

const routes: Routes = [
  {
    path: '',
    component: ClientPage,
    children: [
      {
        path: 'querys',
        loadChildren: () => import('./querys/querys.module').then(m => m.QuerysPageModule)
      },
      {
        path: 'teams',
        loadChildren: () => import('./teams/teams.module').then(m => m.TeamsPageModule)
      },
      {
        path: 'prediction',
        loadChildren: () => import('./prediction/prediction.module').then(m => m.PredictionPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: '',
        redirectTo: '/client/querys',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientPageRoutingModule { }
