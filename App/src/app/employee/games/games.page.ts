import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Game } from 'src/app/models/game.model';
import { MatchService } from 'src/app/services/match.service';
import { ModalGameComponent } from './modal-game/modal-game.component';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {
  private games = [];

  constructor(
    private gameService: MatchService,
    private modalController: ModalController
  ) {
  }

  ngOnInit() {
    this.getAllGames();
  }

  getAllGames = () => {
    this.gameService.get()
      .then((res) => {
        console.log(res)
        this.games = [];
        this.games = res.data.reverse();
      });
  }

  async presentModal(game?: Game) {
    const modal = await this.modalController.create({
      component: ModalGameComponent,
      componentProps: {
        game: game
      }
    });

    modal.onDidDismiss().then((data: any) => {
      if (data.data) {
        this.getAllGames();
      }
    });

    return await modal.present();
  }

}
