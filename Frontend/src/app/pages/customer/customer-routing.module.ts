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
import { HasMembershipGuard } from 'src/app/guards/has-membership.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'feed', component: FeedComponent },
      { path: 'profile', component: ProfileComponent },
      {
        path: 'teams',
        component: TeamListComponent,
        canActivate: [HasMembershipGuard],
      },
      { path: 'games', component: GamesListComponent },
      {
        path: 'players-teams',
        component: PlayersTeamsComponent,
        canActivate: [HasMembershipGuard],
      },
      {
        path: 'games-competitions',
        component: GamesCompetitionsComponent,
        canActivate: [HasMembershipGuard],
      },
      {
        path: 'stadiums',
        component: StadiumsComponent,
        canActivate: [HasMembershipGuard],
      },
      { path: '', redirectTo: 'feed', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
