import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../guards/auth.guard';

import { FeedComponent } from './feed/feed.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { GamesListComponent } from './games-list/games-list.component';
import { PlayersTeamsComponent } from './players-teams/players-teams.component';
import { GamesCompetitionsComponent } from './games-competitions/games-competitions.component';
import { StadiumsComponent } from './stadiums/stadiums.component';
import { TeamListComponent } from './team-list/team-list.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'feed', component: FeedComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'teams', component: TeamListComponent },
      { path: 'games', component: GamesListComponent },
      { path: 'players-teams', component: PlayersTeamsComponent },
      { path: 'games-competitions', component: GamesCompetitionsComponent },
      { path: 'stadiums', component: StadiumsComponent },
      { path: '', redirectTo: 'feed', pathMatch: 'full' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
