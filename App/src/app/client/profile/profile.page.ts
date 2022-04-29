import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CustomerService } from 'src/app/services/customer.service';
import { NotificacionService } from 'src/app/services/notification.service';
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
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/tabs']);
  }

  public async getMembership(): Promise<void> {
    this.customerService.getMembership()
      .then((res) => {
        console.log(res);
        localStorage.setItem('has_membership', '1');
        this.hasMembership = localStorage.getItem('has_membership');
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

}
