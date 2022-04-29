import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CustomerService } from 'src/app/services/customer.service';
import { NotificacionService } from 'src/app/services/notification.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-modal-competition',
  templateUrl: './modal-competition.component.html',
  styleUrls: ['./modal-competition.component.scss'],
})
export class ModalCompetitionComponent implements OnInit {
  public filter = [];
  public teams = [];
  public typesCompetitions = [
    { id: 1, description: 'Liga' },
    { id: 2, description: 'Eliminatoria' },
    { id: 3, description: 'Copa' },
    { id: 4, description: 'SuperCopa' },
    { id: 5, description: 'Cuadrangular' },
    { id: 6, description: 'Triangular' },
  ];
  public data = {
    id_team: 0,
    array: []
  }

  constructor(
    private modalController: ModalController,
    private teamService: TeamService,
    private customerService: CustomerService,
    private notificacionService: NotificacionService
  ) { }

  ngOnInit() {
    this.getAllTeams();
  }

  //CERRAR MODAL
  closeModal() {
    this.modalController.dismiss();
  }

  /**
   * Obtener todos los equipos
   */
  getAllTeams() {
    this.teamService.get()
      .then((res) => {
        console.log(res)
        this.teams = [];
        this.teams = res.data;
      });
  }

  /**
   * Filtrar juegos
   */
  search() {
    this.customerService.report14(this.data.id_team, this.data.array)
      .then((res) => {
        console.log(res)
        this.filter = [];
        this.filter = res.data;
      })
      .catch((err) => {
        this.notificacionService.presentToast('An error has ocurred, please try again.');
      });
  }


}
