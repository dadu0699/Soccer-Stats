import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Post } from 'src/app/models/post.model';
import { NewService } from 'src/app/services/new.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-modal-new',
  templateUrl: './modal-new.component.html',
  styleUrls: ['./modal-new.component.scss'],
})
export class ModalNewComponent implements OnInit {
  public post: Post;
  public teams = [];

  constructor(
    private modalController: ModalController,
    private teamService: TeamService,
    private newService: NewService
  ) { }

  ngOnInit() {
    this.post = new Post();
    this.getAllTeams();
  }

  //CERRAR MODAL
  closeModal() {
    this.modalController.dismiss();
  }

  /**
   * Obtener todos los equipos
   */
  getAllTeams = () => {
    this.teamService.get()
      .then((res) => {
        console.log(res)
        this.teams = [];
        this.teams = res.data;
      });
  }

  /**
   * Guardar noticia
   */
  saveChanges = () => {
    this.post.date = new Date().toISOString().split('T')[0];
    this.post.id_user = Number(localStorage.getItem('id_user'));
    this.newService.create(this.post)
      .then((res) => {
        console.log(res);
        this.modalController.dismiss(res);
      })
      .catch((error) => {
        console.log(error)
      });
  }


}
