import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-stadium',
  templateUrl: './modal-stadium.component.html',
  styleUrls: ['./modal-stadium.component.scss'],
})
export class ModalStadiumComponent implements OnInit {

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() { }

  //CERRAR MODAL
  closeModal() {
    this.modalController.dismiss();
  }

}
