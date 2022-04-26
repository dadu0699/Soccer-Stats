import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalRegisterComponent } from './modal-register/modal-register.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  disabledBtn: boolean = false;
  passwordType: string = 'password';
  passwordShow: boolean = false;
  data = {
    email: '',
    password: ''
  }

  constructor(
    private modalController: ModalController
  ) { }

  //TOGGLE PASSWORD
  togglePassword() {
    if (this.passwordShow) {
      this.passwordShow = false;
      this.passwordType = 'password';
    } else {
      this.passwordShow = true;
      this.passwordType = 'text';
    }
  }

  async presentModalRegistro() {
    const modal = await this.modalController.create({
      component: ModalRegisterComponent
    });
    modal.onDidDismiss().then((data) => {
      //DATOS
    });
    return await modal.present();
  }
}
