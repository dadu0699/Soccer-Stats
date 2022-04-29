import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Game } from 'src/app/models/game.model';
import { MatchService } from 'src/app/services/match.service';
import { NotificacionService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-modal-game',
  templateUrl: './modal-game.component.html',
  styleUrls: ['./modal-game.component.scss'],
})
export class ModalGameComponent implements OnInit {
  public status: any[] = [
    { id: 1, description: 'Sin Iniciar' },
    { id: 2, description: 'Iniciado' },
    { id: 3, description: 'Finalizado' },
    { id: 4, description: 'Suspendido' },
  ];
  public disabledBtn = false;
  public game: Game = new Game();

  constructor(
    private matchService: MatchService,
    private navParams: NavParams,
    private modalController: ModalController,
    private notificacionService: NotificacionService
  ) { }

  ngOnInit() {
    this.game = this.navParams.get('game');
  }

  //CERRAR MODAL
  closeModal() {
    this.modalController.dismiss();
  }

  /**
   * Guardar cambios
   */
  saveChanges() {
    this.disabledBtn = true;
    this.matchService.update(this.game)
      .then((res) => {
        this.disabledBtn = false;
        this.modalController.dismiss(res.data);
      })
      .catch((err) => {
        this.disabledBtn = false;
        this.notificacionService.presentToast('An error has ocurred, please try again.');
      });
  }

}
