import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Competition } from 'src/app/models/competition.model';
import { Option } from 'src/app/models/option.model';
import { CompetitionService } from 'src/app/services/competition.service';

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
    private competitionService: CompetitionService,
  ) {
    this.labels = ['no.', 'name', 'year', 'type', 'champion', 'country', 'actions'];
    this.dataTable = [];
    this.dataSource = new MatTableDataSource<any>();

    this.competition = new Competition();
    this.allCompetitions = [];

    this.types = [
      { id: 1, description: 'Liga' },
      { id: 2, description: 'Eliminatoria' },
      { id: 3, description: 'Copa' },
      { id: 4, description: 'SuperCopa' },
      { id: 5, description: 'Cuadrangular' },
      { id: 6, description: 'Triangular' },
    ];

    this.readonly = false;
    this.allowEditing = false;
  }

  ngOnInit(): void {
    this.getAll();
  }

  /**
   * Obtener todos las competiciones
   */
  getAll = () => {
    this.competitionService.get()
      .then((response) => {
        this.allCompetitions = [];
        this.dataTable = [];
        this.allCompetitions = response.data;
        this.fillTable();
      });
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

  public done() {
    if (this.allowEditing) {
      this.updateExisting();
    } else {
      console.log(this.competition);
    }
  }

  public updateExisting() {
    this.readonly = true;
    this.allowEditing = false;
  }

  public selectType(id: any) {
    this.competition.type = id;
  }

  public selectCountry(id_country: any) {
    this.competition.id_country = id_country;
  }

  public selectTeam(id_team: any) {
    this.competition.id_champion_team = id_team;
  }

  public selectCompetition(id: any) {
    this.readonly = false;
    this.allowEditing = false;
    let competition: Competition = this.allCompetitions.find(el => el.id === id) || new Competition();
    this.competition = competition;
  }

  public create() {
    this.competitionService.create(this.competition)
      .then((response) => {
        this.showSnackbar('Competition created successfully');
        this.getAll();
      })
      .catch((error) => {
        this.showSnackbar(error.error.message);
      });
    this.competition = new Competition();
    this.readonly = false;
    this.allowEditing = false;
  }

  public edit() {
    this.competitionService.update(this.competition)
      .then((response) => {
        this.showSnackbar('Competition updated successfully');
        this.getAll();
      })
      .catch((error) => {
        this.showSnackbar(error.error.message);
      });
    this.competition = new Competition();
    this.readonly = false;
    this.allowEditing = true;
  }

  public delete() {
    this.competitionService.delete(this.competition)
      .then((response) => {
        this.showSnackbar('Competition deleted successfully');
        this.getAll();
      })
      .catch((error) => {
        this.showSnackbar(error.error.message);
      });
    this.competition = new Competition();
    this.readonly = false;
    this.allowEditing = true;
  }

  showSnackbar(message: string = 'Something went wrong :c') {
    this._snackBar.open(message, 'CLOSE', { duration: 5000 });
  }

}
