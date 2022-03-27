import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Team } from 'src/app/models/team.model';

import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-field',
  templateUrl: './team-field.component.html',
  styleUrls: ['./team-field.component.css']
})
export class TeamFieldComponent implements OnInit {

  @Input('team') commingTeam!: number;
  @Output('selectTeam') selectTeam: EventEmitter<number>;

  public teams: Team[];

  constructor(
    private _teamService: TeamService
  ) {
    this.teams = [];
    this.selectTeam = new EventEmitter<number>();
  }

  async ngOnInit(): Promise<void> {
    await this.getTeams();
  }

  async getTeams(): Promise<void> {
    try {
      const response = await this._teamService.get();
      if (response['status'] === 200) {
        this.teams = response['data']
      }
    } catch (error) {
      console.log(error);
    }
  }

  public select(id: number) {
    this.selectTeam.emit(id)
  }

}
