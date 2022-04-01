import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Team } from 'src/app/models/team.model';
import { CustomerService } from 'src/app/services/customer.service';

import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-field',
  templateUrl: './team-field.component.html',
  styleUrls: ['./team-field.component.css']
})
export class TeamFieldComponent implements OnInit {

  @Input('isFavoriteTeams') isFavoriteTeams: boolean;

  @Input('team') commingTeam!: number;
  @Output('selectTeam') selectTeam: EventEmitter<number>;

  public teams: Team[];
  public favoriteTeams: Team[];

  constructor(
    private _teamService: TeamService,
    private _customerService: CustomerService
  ) {
    this.isFavoriteTeams = false;

    this.teams = [];
    this.favoriteTeams = [];

    this.selectTeam = new EventEmitter<number>();
  }

  async ngOnInit(): Promise<void> {
    await this.getTeams();
    await this.getFavoriteTeams();
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

  async getFavoriteTeams(): Promise<void> {
    try {
      const response = await this._customerService.getfavoriteTeams();
      if (response['status'] === 200) {
        this.favoriteTeams = response['data']
      }
    } catch (error) {
      console.log(error);
    }
  }

  public select(id: number) {
    this.selectTeam.emit(id)
  }

}
