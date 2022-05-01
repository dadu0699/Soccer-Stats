import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { CustomerService } from 'src/app/services/customer.service';
import { NotificacionPushService } from 'src/app/services/notificacion-push.service';
import { NotificacionService } from 'src/app/services/notification.service';
import { CommonService } from 'src/app/services/observable.service';
import { ModalProfileComponent } from './modal-profile/modal-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public hasMembership = localStorage.getItem('has_membership');

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private notificacionService: NotificacionService,
    private modalController: ModalController,
    public alertController: AlertController,
    private commonService: CommonService,
    private notificacionPushService: NotificacionPushService,
    private platform: Platform,
  ) { }
  ngOnInit() {
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/tabs/tab3']);
    if (this.platform.is('android')) {
      this.notificacionPushService.logOut();
    }
  }

  goToRoute(route: string) {
    this.router.navigate([route]);
  }

  public async getMembership(): Promise<void> {
    this.customerService.getMembership()
      .then((res) => {
        console.log(res);
        localStorage.setItem('has_membership', '1');
        this.hasMembership = localStorage.getItem('has_membership');
        this.commonService.sendUpdate('Has membership');
      }).catch((error) => {
        this.notificacionService.presentToast('An error has ocurred, please try again.');
      });
  }

  public async cancelMembership(): Promise<void> {
    this.customerService.cancelMembership()
      .then((res) => {
        console.log(res);
        localStorage.setItem('has_membership', '0');
        this.hasMembership = localStorage.getItem('has_membership');
        this.commonService.sendUpdate('Has membership');
      }).catch((error) => {
        this.notificacionService.presentToast('An error has ocurred, please try again.');
      });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalProfileComponent,
    });

    return await modal.present();
  }


  /**
   * Eliminar cuenta
   */
  async deleteAccount() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete account',
      message: 'Are you sure you want to delete your account?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          id: 'confirm-button',
          handler: () => {
            this.delete();
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * Eliminar cuenta
   */
  delete = () => {
    this.customerService.deleteAccount()
      .then((res) => {
        console.log(res);
        this.logOut();
      }).catch((error) => {
        this.notificacionService.presentToast('An error has ocurred, please try again.');
      });
  }

}
