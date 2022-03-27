import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../guards/auth.guard';

import { FeedComponent } from './feed/feed.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { GamesListComponent } from './games-list/games-list.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'feed', component: FeedComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'games', component: GamesListComponent },
      { path: '', redirectTo: 'feed', pathMatch: 'full' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
