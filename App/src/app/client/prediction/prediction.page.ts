import { Component, OnInit } from '@angular/core';
import { NotificacionService } from 'src/app/services/notification.service';
import { PredictionService } from 'src/app/services/prediction.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.page.html',
  styleUrls: ['./prediction.page.scss'],
})
export class PredictionPage implements OnInit {
  public filter = [];
  public teams1 = [];
  public teams2 = [];
  data = {
    id_teamLocal: '',
    id_teamVisitor: '',
    goals1: null,
    goals2: null
  }
  goalLocal: number = 0;
  goalVisitor: number = 0;

  constructor(
    private teamService: TeamService,
    private predictionService: PredictionService,
    private notificacionService: NotificacionService
  ) { }

  ngOnInit() {
    this.getAllTeams();
  }

  /**
   * Obtener todos los equipos
   */
  getAllTeams() {
    this.teamService.get()
      .then((res) => {
        this.teams1 = [];
        this.teams2 = [];
        this.teams1 = res.data;
        this.teams2 = res.data;
      });
  }

  prediction() {
    this.predictionService.prediction(this.data)
      .then((res) => {
        this.goalLocal = res.data[0].goalsLocal;
        this.goalVisitor = res.data[0].goalsVisitor;
        if (this.goalLocal == this.data.goals1 && this.goalVisitor == this.data.goals2) {
          this.notificacionService.presentAlert('Prediction', 'You won 2 months of additional membership.');
        } else {
          this.notificacionService.presentToast('You lost the prediction.');
        }
      })
      .catch((err) => {
        this.notificacionService.presentToast('An error has ocurred, please try again.');
      });
  }

}
