import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/team.model';
import { CustomerService } from 'src/app/services/customer.service';
import { NotificacionService } from 'src/app/services/notification.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {
  public selectItem: string = 'all';
  public teams = [];
  public favorites = [];

  constructor(
    private teamService: TeamService,
    private customerService: CustomerService,
    private notificacionService: NotificacionService
  ) { }

  ngOnInit() {
    this.getAllTeams();
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.selectItem = ev.detail.value;
    if (this.selectItem === 'favorites') {
      this.getFavorites();
    }
  }

  getAllTeams = () => {
    this.teamService.get()
      .then((res) => {
        console.log(res)
        this.teams = [];
        this.teams = res.data;
      });
  }

  getFavorites = () => {
    this.customerService.getfavoriteTeams()
      .then((res) => {
        console.log(res)
        this.favorites = [];
        this.favorites = res.data;
      });
  }

  addFavorite = (team: Team) => {
    this.customerService.followTeam(team.id)
      .then((res) => {
        console.log(res)
        this.getFavorites();
        this.notificacionService.presentToast('Added to favorites team ' + team.name);

      })
      .catch((err) => {
        this.notificacionService.presentToast('An error has ocurred, please try again.');
      });
  }

}
