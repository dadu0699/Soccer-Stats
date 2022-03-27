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
    this.competitions = [];
    this.selectCompetition = new EventEmitter<number>();
  }

  async ngOnInit(): Promise<void> {
    await this.getCompetitions();
  }

  async getCompetitions(): Promise<void> {
    try {
      const response = await this._competitionService.get();
      if (response['status'] === 200) {
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
