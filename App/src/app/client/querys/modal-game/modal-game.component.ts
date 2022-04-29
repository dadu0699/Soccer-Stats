import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { CustomerService } from 'src/app/services/customer.service';
import { NotificacionService } from 'src/app/services/notification.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-modal-game',
  templateUrl: './modal-game.component.html',
  styleUrls: ['./modal-game.component.scss'],
})
export class ModalGameComponent implements OnInit {
  public filter = [];
  public teams1 = [];
  public teams2 = [];
  public number: Number = 0;
  public data = {
    age: 0,
    goals: 0,
    team1: 0,
    team2: 0,
  }

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private teamService: TeamService,
    private customerService: CustomerService,
    private notificacionService: NotificacionService
  ) { }

  ngOnInit() {
    this.number = this.navParams.get('number');
    if (this.number == 1 || this.number == 4 || this.number == 5) {
      this.getAllTeams();
    }
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
        this.teams1 = [];
        this.teams2 = [];
        this.teams1 = res.data;
        this.teams2 = res.data;
      });
  }

  /**
   * Filtrar juegos
   */
  search() {
    console.log(this.data)
    if (this.number == 1) {
      this.getReport9()
    } else if (this.number == 2) {
      this.getReport11()
    } else if (this.number == 3) {
      this.getReport15()
    } else if (this.number == 4) {
      this.getReport16()
    } else if (this.number == 5) {
      this.getReport17()
    }
  }

  getReport9() {
    this.customerService.report9(this.data.team1)
      .then((res) => {
        console.log(res)
        this.filter = [];
        this.filter = res.data.map((item) => {
          return {
            ...item,
            date: item.game_date.split(' ')[0]
          }
        });
      })
      .catch((err) => {
        this.notificacionService.presentToast('An error has ocurred, please try again.');
      });
  }

  getReport11() {
    this.customerService.report11(this.data.goals)
      .then((res) => {
        console.log(res)
        this.filter = [];
        this.filter = res.data.map((item) => {
          return {
            ...item,
            date: item.game_date.split(' ')[0]
          }
        });
      })
      .catch((err) => {
        this.notificacionService.presentToast('An error has ocurred, please try again.');
      });
  }

  getReport15() {
    this.customerService.report15(this.data.age)
      .then((res) => {
        console.log(res)
        this.filter = [];
        this.filter = res.data.map((item) => {
          return {
            ...item,
            date: item.game_date.split(' ')[0]
          }
        });
      })
      .catch((err) => {
        this.notificacionService.presentToast('An error has ocurred, please try again.');
      });
  }

  getReport16() {
    this.customerService.report16(this.data.team1, this.data.team2)
      .then((res) => {
        console.log(res)
        this.filter = [];
        this.filter = res.data.map((item) => {
          return {
            ...item,
            date: item.game_date.split(' ')[0]
          }
        });
      })
      .catch((err) => {
        this.notificacionService.presentToast('An error has ocurred, please try again.');
      });
  }

  getReport17() {
    this.customerService.report17(this.data.team1)
      .then((res) => {
        this.filter = [];
        this.filter = res.data.map((item) => {
          return {
            ...item,
            date: item.game_date.split(' ')[0]
          }
        });
      })
      .catch((err) => {
        this.notificacionService.presentToast('An error has ocurred, please try again.');
      });
  }

}
