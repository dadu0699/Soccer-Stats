import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Team } from 'src/app/models/team.model';
import { CustomerService } from 'src/app/services/customer.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  public teams: Team[];
  public favoriteTeams: Team[];

  constructor(
    private _snackBar: MatSnackBar,
    private _teamService: TeamService,
    private _customerService: CustomerService
  ) {
    this.teams = []
    this.favoriteTeams = []
  }

  async ngOnInit(): Promise<void> {
    await this.getTeams();
  }

  public async getTeams(): Promise<void> {
    try {
      const response = await this._customerService.getfavoriteTeams();
      console.log(response);
      if (response['status'] === 200) {
        this.favoriteTeams = response['data']
        this.teams = [];
        const responseAll = await this._teamService.get();
        console.log(response);
        if (response['status'] === 200) {
          responseAll['data'].forEach((team: Team) => {
            if (this.favoriteTeams.findIndex((el) => el.id == team.id) == -1) {
              this.teams.push(team);
            }
          });
          this.showSnackbar(responseAll['msg']);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  private showSnackbar(message: string = 'Something went wrong :c') {
    this._snackBar.open(message, 'CLOSE', { duration: 5000 });
  }
}
