import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class NotificacionService {
    //PROPIEDADES
    private isLoading = false;

    constructor(
        public toastController: ToastController,
        public loadingController: LoadingController,
        public alertController: AlertController
    ) { }

    async presentToast(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2500
        });
        toast.present();
    }

    async presentAlert(title: string, msg: string) {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: title,
            message: msg,
            buttons: ['OK']
        });

        await alert.present();
    }

    async presentLoading(msg: string) {
        this.isLoading = true;
        return await this.loadingController.create({
            message: msg,
            duration: 1000
        }).then(a => {
            a.present().then(() => {
                if (!this.isLoading) {
                    a.dismiss();
                }
            });
        });
    }

    async dismissLoading() {
        return await this.loadingController.getTop().then(v => {
            if (v) {
                this.isLoading = false;
                this.loadingController.dismiss();
            }
        });
    }
}