import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-competition',
  templateUrl: './modal-competition.component.html',
  styleUrls: ['./modal-competition.component.scss'],
})
export class ModalCompetitionComponent implements OnInit {

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() { }

  //CERRAR MODAL
  closeModal() {
    this.modalController.dismiss();
  }

}
