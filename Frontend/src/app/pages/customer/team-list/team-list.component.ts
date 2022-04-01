import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Team } from 'src/app/models/team.model';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  public teams: Team[];

  constructor(
    private _snackBar: MatSnackBar,
    private _teamService: TeamService
  ) {
    this.teams = []
   }

  async ngOnInit():Promise<void> {
    await this.getTeams();
  }

  public async getTeams(): Promise<void>{
    try {
      const response = await this._teamService.get();
      if (response['status'] === 200) {
        this.teams = response['data'];
        this.showSnackbar(response['msg']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  private showSnackbar(message: string = 'Something went wrong :c') {
    this._snackBar.open(message, 'CLOSE', { duration: 5000 });
  }
}
