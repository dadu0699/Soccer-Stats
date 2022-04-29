import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { CompetitionService } from 'src/app/services/competition.service';
import { CustomerService } from 'src/app/services/customer.service';
import { NotificacionService } from 'src/app/services/notification.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-modal-player',
  templateUrl: './modal-player.component.html',
  styleUrls: ['./modal-player.component.scss'],
})
export class ModalPlayerComponent implements OnInit {
  public number: Number = 0;
  public teams = [];
  public competitions = [];
  public personType = [
    { id: 0, description: 'Player' },
    { id: 1, description: 'Technical Director' },
  ];
  public types = [
    { id: 1, description: 'Gol' },
    { id: 2, description: 'Autogol' },
    { id: 3, description: 'Tarjeta Amarilla' },
    { id: 4, description: 'Tarjeta Roja' },
  ];
  public typesCompetitions = [
    { id: 1, description: 'Liga' },
    { id: 2, description: 'Eliminatoria' },
    { id: 3, description: 'Copa' },
    { id: 4, description: 'SuperCopa' },
    { id: 5, description: 'Cuadrangular' },
    { id: 6, description: 'Triangular' },
  ];
  public filter = [];
  public data = {
    type_person: 0,
    id_team: 0,
    age: 0,
    incidence: 0,
    year: 2022,
    competition: 0,
    array: []
  }

  constructor(
    private modalController: ModalController,
    private teamService: TeamService,
    private navParams: NavParams,
    private customerService: CustomerService,
    private notificacionService: NotificacionService,
    private competitionService: CompetitionService
  ) { }

  ngOnInit() {
    this.number = this.navParams.get('number');
    if (this.number == 1) {
      this.getAllTeams();
    } else if (this.number == 4) {
      this.getAllCompetitions();
    }
  }

  //CERRAR MODAL
  closeModal() {
    this.modalController.dismiss();
  }

  /**
   * Obtener todos los equipos
   */
  getAllTeams = () => {
    this.teamService.get()
      .then((res) => {
        console.log(res)
        this.teams = [];
        this.teams = res.data;
      });
  }

  /**
   * Obtener todos las competiciones
   */
  getAllCompetitions = () => {
    this.competitionService.get()
      .then((res) => {
        console.log(res)
        this.competitions = [];
        this.competitions = res.data;
      });
  }

  search() {
    console.log(this.data)
    if (this.number == 1) {
      this.getReport1()
    } else if (this.number == 2) {
      this.getReport2()
    } else if (this.number == 3) {
      this.getReport3()
    } else if (this.number == 4) {
      this.getReport12()
    } else if (this.number == 5) {
      this.getReport13()
    }
  }

  getReport1() {
    this.customerService.report1(this.data.id_team, this.data.type_person)
      .then((res) => {
        console.log(res)
        this.filter = [];
        this.filter = res.data;
      })
      .catch((err) => {
        this.notificacionService.presentToast('An error has ocurred, please try again.');
      });
  }

  getReport2() {
    this.customerService.report2(this.data.age, this.data.type_person)
      .then((res) => {
        console.log(res)
        this.filter = [];
        this.filter = res.data;
      })
      .catch((err) => {
        this.notificacionService.presentToast('An error has ocurred, please try again.');
      });
  }

  getReport3() {
    this.customerService.report3(this.data.age, this.data.type_person)
      .then((res) => {
        console.log(res)
        this.filter = [];
        this.filter = res.data;
      })
      .catch((err) => {
        this.notificacionService.presentToast('An error has ocurred, please try again.');
      });
  }

  getReport12() {
    this.customerService.report12(this.data.incidence, this.data.competition)
      .then((res) => {
        console.log(res)
        this.filter = [];
        this.filter = res.data;
      })
      .catch((err) => {
        this.notificacionService.presentToast('An error has ocurred, please try again.');
      });
  }

  getReport13() {
    this.customerService.report13(this.data.incidence, this.data.year, this.data.array)
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
