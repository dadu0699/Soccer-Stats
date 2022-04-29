import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewService } from 'src/app/services/new.service';
import { ModalNewComponent } from './modal-new/modal-new.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  public news = [];

  constructor(
    private newService: NewService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.getAll()
  }

  getAll() {
    this.newService.get()
      .then((res) => {
        console.log(res)
        this.news = res.data.reverse();
      })
  }

  async presentModal(id?: number) {
    const modal = await this.modalController.create({
      component: ModalNewComponent,
    });

    modal.onDidDismiss().then((data: any) => {
      if (data.data) {
        this.getAll();
      }
    });

    return await modal.present();
  }

}
