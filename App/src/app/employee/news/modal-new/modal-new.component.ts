import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Post } from 'src/app/models/post.model';
import { NewService } from 'src/app/services/new.service';
import { NotificacionService } from 'src/app/services/notification.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-modal-new',
  templateUrl: './modal-new.component.html',
  styleUrls: ['./modal-new.component.scss'],
})
export class ModalNewComponent implements OnInit {
  public post: Post;
  public teams = [];
  public disabledBtn = false;

  constructor(
    private modalController: ModalController,
    private teamService: TeamService,
    private newService: NewService,
    private notificacionService: NotificacionService
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
    if (this.validateForm()) {
      this.disabledBtn = true;
      this.newService.create(this.post)
        .then((res) => {
          this.disabledBtn = false;
          this.modalController.dismiss(res)
        })
        .catch((err) => {
          this.disabledBtn = false;
          this.notificacionService.presentToast('An error has ocurred, please try again.');
        });
    }
  }

  validateForm = () => {
    if (this.post.title === '' || this.post.title === undefined) {
      this.notificacionService.presentToast('Title is required.');
      return false;
    }
    if (this.post.description === '' || this.post.description === undefined) {
      this.notificacionService.presentToast('Description is required.');
      return false;
    }
    if (this.post.id_team === 0 || this.post.id_team === undefined) {
      this.notificacionService.presentToast('Team is required.');
      return false;
    }
    return true;
  }


}
