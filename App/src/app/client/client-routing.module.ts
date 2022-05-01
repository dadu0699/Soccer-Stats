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
        path: 'games',
        loadChildren: () => import('./games/games.module').then(m => m.GamesPageModule)
      },
      {
        path: '',
        redirectTo: '/client/games',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'news/:id',
    loadChildren: () => import('./news/news.module').then(m => m.NewsPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then(m => m.NotificationPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientPageRoutingModule { }
