import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuerysPageRoutingModule } from './querys-routing.module';

import { QuerysPage } from './querys.page';
import { ModalCompetitionComponent } from './modal-competition/modal-competition.component';
import { ModalGameComponent } from './modal-game/modal-game.component';
import { ModalPlayerComponent } from './modal-player/modal-player.component';
import { ModalStadiumComponent } from './modal-stadium/modal-stadium.component';
import { ModalTeamComponent } from './modal-team/modal-team.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuerysPageRoutingModule
  ],
  declarations: [
    QuerysPage,
    ModalCompetitionComponent,
    ModalGameComponent,
    ModalPlayerComponent,
    ModalStadiumComponent,
    ModalTeamComponent
  ]
})
export class QuerysPageModule { }
