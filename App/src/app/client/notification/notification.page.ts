import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  public notifications = [];

  constructor() { }

  ngOnInit() {
    if (localStorage.getItem('notificaciones') === null || localStorage.getItem('notificaciones') === undefined) {
      this.notifications = [];
    } else {
      this.notifications = JSON.parse(localStorage.getItem('notificaciones'));
    }

  }

}
