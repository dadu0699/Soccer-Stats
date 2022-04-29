import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { CountryService } from 'src/app/services/country.service';
import { CustomerService } from 'src/app/services/customer.service';
import { NotificacionService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-modal-stadium',
  templateUrl: './modal-stadium.component.html',
  styleUrls: ['./modal-stadium.component.scss'],
})
export class ModalStadiumComponent implements OnInit {
  public filter = [];
  public countries = [];
  public number: Number = 0;
  public data = {
    country: 0,
    capacity: 0,
  }

  constructor(
    private modalController: ModalController,
    private countryService: CountryService,
    private customerService: CustomerService,
    private navParams: NavParams,
    private notificacionService: NotificacionService
  ) {
  }

  ngOnInit() {
    this.number = this.navParams.get('number');
    if (this.number == 1) {
      this.getAllCountries()
    }
  }

  //CERRAR MODAL
  closeModal() {
    this.modalController.dismiss();
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

  search() {
    console.log(this.data)
    if (this.number == 1) {
      this.getReport7()
    } else if (this.number == 2) {
      this.getReport8()
    }
  }

  getReport7() {
    this.customerService.report7(this.data.country)
      .then((res) => {
        console.log(res)
        this.filter = [];
        this.filter = res.data;
      })
      .catch((err) => {
        this.notificacionService.presentToast('An error has ocurred, please try again.');
      });
  }

  getReport8() {
    this.customerService.report8(this.data.capacity)
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
