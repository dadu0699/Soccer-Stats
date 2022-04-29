import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { CompetitionService } from 'src/app/services/competition.service';
import { CountryService } from 'src/app/services/country.service';
import { CustomerService } from 'src/app/services/customer.service';
import { NotificacionService } from 'src/app/services/notification.service';
import { PlayerService } from 'src/app/services/player.service';
import { TechnicalDirectorService } from 'src/app/services/technical-director.service';

@Component({
  selector: 'app-modal-team',
  templateUrl: './modal-team.component.html',
  styleUrls: ['./modal-team.component.scss'],
})
export class ModalTeamComponent implements OnInit {
  public personType = [
    { id: 0, description: 'Player' },
    { id: 1, description: 'Technical Director' },
  ];
  public number: Number = 0;
  public countries = []
  public competitions = []
  public filter = [];
  public persons = [];
  public data = {
    competition: 0,
    country: 0,
    type_person: 0,
    person: 0,
    age: 0
  }

  constructor(
    private modalController: ModalController,
    private competitionService: CompetitionService,
    private navParams: NavParams,
    private customerService: CustomerService,
    private notificacionService: NotificacionService,
    private countryService: CountryService,
    private technicalDirectorService: TechnicalDirectorService,
    private playerService: PlayerService,
  ) { }

  ngOnInit() {
    this.number = this.navParams.get('number');
    if (this.number == 1) {
      this.getAllCompetitions();
    } else if (this.number == 2) {
      this.getAllCountries();
    }
  }

  //CERRAR MODAL
  closeModal() {
    this.modalController.dismiss();
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

  /**
   * Obtener todos los paises
   */
  getAllCountries = () => {
    this.countryService.get()
      .then((res) => {
        console.log(res)
        this.countries = [];
        this.countries = res.data;
      });
  }

  /**
   * Filtrar equipos
   */
  search() {
    console.log(this.data)
    if (this.number == 1) {
      this.getReport4()
    } else if (this.number == 2) {
      this.getReport5()
    } else if (this.number == 3) {
      this.getReport6()
    } else if (this.number == 4) {
      this.getReport10()
    }
  }

  getReport4() {
    this.customerService.report4(this.data.competition)
      .then((res) => {
        console.log(res)
        this.filter = [];
        this.filter = res.data;
      })
      .catch((err) => {
        this.notificacionService.presentToast('An error has ocurred, please try again.');
      });
  }

  getReport5() {
    this.customerService.report5(this.data.country)
      .then((res) => {
        console.log(res)
        this.filter = [];
        this.filter = res.data;
      })
      .catch((err) => {
        this.notificacionService.presentToast('An error has ocurred, please try again.');
      });
  }

  getReport6() {
    this.customerService.report6(this.data.age)
      .then((res) => {
        console.log(res)
        this.filter = [];
        this.filter = res.data;
      })
      .catch((err) => {
        this.notificacionService.presentToast('An error has ocurred, please try again.');
      });
  }

  getReport10() {
    this.customerService.report10(this.data.person, this.data.type_person)
      .then((res) => {
        console.log(res)
        this.filter = [];
        this.filter = res.data;
      })
      .catch((err) => {
        this.notificacionService.presentToast('An error has ocurred, please try again.');
      });
  }

  segmentChanged(event) {
    console.log(event.detail.value)
    if (event.detail.value == '0') {
      /**
       * Obtener todos los jugadores
       */
      this.playerService.get()
        .then((res) => {
          console.log(res)
          this.persons = [];
          this.persons = res.data;
        }
        );
    } else {
      /**
       * Obtener todos los directores técnicos
       */
      this.technicalDirectorService.get()
        .then((res) => {
          console.log(res)
          this.persons = [];
          this.persons = res.data;
        });
    }
  }
}
