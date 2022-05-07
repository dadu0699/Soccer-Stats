import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import OneSignal from 'onesignal-cordova-plugin';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificacionPushService {
  userID: string = '';
  notificacion: any = {
    notificacion: ''
  };

  constructor(
    private router: Router
  ) { }

  configuracionInicial() {
    OneSignal.setAppId(environment.appId);

    OneSignal.setNotificationOpenedHandler((jsonData: any) => {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      this.notificacionRecibida(JSON.parse(JSON.stringify(jsonData)));
    });

    OneSignal.setNotificationWillShowInForegroundHandler((notificationReceivedEvent: any) => {
      console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
      let notification = notificationReceivedEvent.getNotification();

      let notificacion = notification.additionalData.notificacion;
      console.log("NOTIFICACION ACÁ")
      console.log(notificacion)
      this.notificacion.notificacion = notificacion;

      if (localStorage.getItem('notificaciones') === null) {
        let notifications: any[] = [];
        notifications.push(this.notificacion);
        localStorage.setItem('notificaciones', JSON.stringify(notifications));
      } else {
        let notifications: any[] = JSON.parse(localStorage.getItem('notificaciones'));
        notifications.push(this.notificacion);
        localStorage.setItem('notificaciones', JSON.stringify(notifications));
      }
      //Silence notification by calling complete() with no argument
      notificationReceivedEvent.complete(notification);
    });

    OneSignal.promptForPushNotificationsWithUserResponse((accepted: any) => {
      console.log("User accepted notifications: " + accepted);
    });

    /**
     * SETEAR ID DEL SUBSCRITOR
     */
    OneSignal.setExternalUserId(String(localStorage.getItem('id_user')));
  }

  logOut() {
    OneSignal.removeExternalUserId();
  }

  async notificacionRecibida(data: any) {


    await this.navigate();
  }

  async navigate() {
    console.log(JSON.stringify(this.notificacion))


    await this.router.navigate([`/client/notification`])
  }
}
