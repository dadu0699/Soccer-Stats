import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Competition } from 'src/app/models/competition.model';

import { CompetitionService } from 'src/app/services/competition.service';

@Component({
  selector: 'app-competition-field',
  templateUrl: './competition-field.component.html',
  styleUrls: ['./competition-field.component.css']
})
export class CompetitionFieldComponent implements OnInit {
  @Input('competition') commingCompetition!: number;
  @Output('selectCompetition') selectCompetition: EventEmitter<number>;

  public competitions: Competition[];

  constructor(
    private _competitionService: CompetitionService
  ) {
    this.competitions = [
      { id: 1, name: 'Equipo 1', year: 2021, id_country: 1, country: 'Country 1', type: 3, id_champion_team: 1, champion_team: 'Equipo ganador 1' },
      { id: 2, name: 'Equipo 2', year: 2022, id_country: 2, country: 'Country 2', type: 5, id_champion_team: 1, champion_team: 'Equipo ganador 1' }
    ];
    this.selectCompetition = new EventEmitter<number>();
  }

  async ngOnInit(): Promise<void> {
    //await this.getCompetitions();
  }

  async getCompetitions(): Promise<void> {
    try {
      const response = await this._competitionService.get();
      if (response['status'] === 200){
        this.competitions = response['data']
      }
    } catch (error) {
      console.log(error);
    }
  }

  public select(id: number) {
    this.selectCompetition.emit(id)
  }

}
