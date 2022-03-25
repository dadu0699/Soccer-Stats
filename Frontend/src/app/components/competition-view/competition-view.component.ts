import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Competition } from 'src/app/models/competition.model';
import { Option } from 'src/app/models/option.model';

@Component({
  selector: 'app-competition-view',
  templateUrl: './competition-view.component.html',
  styleUrls: ['./competition-view.component.css']
})
export class CompetitionViewComponent implements OnInit {
  public dataTable: any;
  public labels: Array<string>;
  public dataSource: MatTableDataSource<any>;

  public competition: Competition;
  public allCompetitions: Competition[];
  public types: Option[];

  public readonly: boolean;
  public allowEditing: boolean;

  constructor(
    private _snackBar: MatSnackBar,
  ) {
    this.labels = ['no.', 'name', 'year', 'type', 'champion', 'country', 'actions'];
    this.dataTable = [];
    this.dataSource = new MatTableDataSource<any>();

    this.competition = new Competition();
    this.allCompetitions = [
      { id: 1, name: 'Equipo 1', year: 2021, id_country: 1, country: 'Country 1', type: 3, id_champion_team: 1, champion_team: 'Equipo ganador 1' },
      { id: 2, name: 'Equipo 2', year: 2022, id_country: 2, country: 'Country 2', type: 5, id_champion_team: 1, champion_team: 'Equipo ganador 1' }
    ]
    this.types = [
      { id: 1, description: 'Liga' },
      { id: 2, description: 'Eliminatoria' },
      { id: 3, description: 'Copa' },
      { id: 4, description: 'SuperCopa' },
      { id: 5, description: 'Cuadrangular' },
      { id: 6, description: 'Triangular' },
    ]

    this.readonly = false;
    this.allowEditing = false;
  }

  ngOnInit(): void {
    this.fillTable();
  }

  public done() {
    if (this.allowEditing) {
      this.updateExisting();
    }else{
      console.log(this.competition, 'Create new');
    }
  }

  public updateExisting() {
    console.log('Update', this.competition);
    this.readonly = true;
    this.allowEditing = false;
  }

  private fillTable() {
    this.allCompetitions.forEach((element: Competition) => {
      this.dataTable.push({
        no: element.id,
        name: element.name,
        year: element.year,
        type: element.type,
        champion: element.champion_team,
        country: element.country,
      });
      this.labels = Object.keys(this.dataTable[0]);
      this.labels.push('actions')
      this.dataSource.data = this.dataTable;
    });
  }

  public selectType(id: any) {
    this.competition.type = id;
  }

  public selectCountry(id_country: any) {
    this.competition.id_country = id_country;
  }

  public selectTeam(id_team: any) {
    this.competition.id_champion_team = id_team;
    console.log(this.competition.id_champion_team);
  }

  public selectCompetition(id_competition: any) {
    this.readonly = true;
    this.allowEditing = false;
    let competition: Competition = this.allCompetitions.find(el => el.id === id_competition) || new Competition();
    this.competition = competition;
    console.log(this.competition)
  }

  public create() {
    this.competition = new Competition();
    this.readonly = false;
    this.allowEditing = false;
  }

  public edit() {
    this.readonly = false;
    this.allowEditing = true;
  }

  public delete() {
  }

  showSnackbar(message: string = 'Something went wrong :c') {
    this._snackBar.open(message, 'CLOSE', { duration: 5000 });
  }

}
