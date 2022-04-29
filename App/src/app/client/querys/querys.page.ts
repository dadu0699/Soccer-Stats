import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalCompetitionComponent } from './modal-competition/modal-competition.component';
import { ModalGameComponent } from './modal-game/modal-game.component';
import { ModalPlayerComponent } from './modal-player/modal-player.component';
import { ModalStadiumComponent } from './modal-stadium/modal-stadium.component';
import { ModalTeamComponent } from './modal-team/modal-team.component';

@Component({
  selector: 'app-querys',
  templateUrl: './querys.page.html',
  styleUrls: ['./querys.page.scss'],
})
export class QuerysPage implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async presentModalCompetition(number: Number) {
    const modal = await this.modalController.create({
      component: ModalCompetitionComponent,
      componentProps: {
        number: number
      }
    });

    return await modal.present();
  }

  async presentModalGame(number: Number) {
    const modal = await this.modalController.create({
      component: ModalGameComponent,
      componentProps: {
        number: number
      }
    });

    return await modal.present();
  }

  async presentModalPlayer(number: Number) {
    const modal = await this.modalController.create({
      component: ModalPlayerComponent,
      componentProps: {
        number: number
      }
    });

    return await modal.present();
  }

  async presentModalStadium(number: Number) {
    const modal = await this.modalController.create({
      component: ModalStadiumComponent,
      componentProps: {
        number: number
      }
    });

    return await modal.present();
  }

  async presentModalTeams(number: Number) {
    const modal = await this.modalController.create({
      component: ModalTeamComponent,
      componentProps: {
        number: number
      }
    });

    return await modal.present();
  }

}
