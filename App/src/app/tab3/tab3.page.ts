import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { NotificacionPushService } from '../services/notificacion-push.service';
import { NotificacionService } from '../services/notification.service';
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
    private modalController: ModalController,
    private authService: AuthService,
    private router: Router,
    private notificacionService: NotificacionService,
    private notificacionPushService: NotificacionPushService,
    private platform: Platform
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

  async login() {
    if (this.validarCampos()) {
      this.disabledBtn = true;
      this.authService.signIn(this.data.email, this.data.password).then((res) => {
        console.log(res)
        this.disabledBtn = false;
        if (res.data.id_status == 1) {
          localStorage.setItem('token', String(res.data.token));
          localStorage.setItem('has_membership', res.data.has_membership);
          localStorage.setItem('id_rol', res.data.id_rol);
          localStorage.setItem('id_status', res.data.id_status);
          localStorage.setItem('id_user', res.data.id_user);
          if (this.platform.is('android')) {
            this.notificacionPushService.configuracionInicial();
          }
          if (res.data.id_rol == 2) {
            this.router.navigate(['/employee']);
          } else if (res.data.id_rol == 3) {
            this.router.navigate(['/client']);
          }
        } else if (res.data.id_status == 2) {
          this.notificacionService.presentToast('Your account is pending verification.');
        } else {
          this.notificacionService.presentToast('Your account is deactivated.');
        }
      }).catch(() => {
        this.disabledBtn = false;
        this.notificacionService.presentToast('Error registering user, please try again.');
      });
    }
  }

  validarCampos(): boolean {
    if (this.data.email === '' || this.data.email === undefined) {
      this.notificacionService.presentToast('Email is required.');
      return false;
    }
    if (this.data.password === '' || this.data.password === undefined) {
      this.notificacionService.presentToast('Password is required.');
      return false;
    }
    return true;
  }
}
