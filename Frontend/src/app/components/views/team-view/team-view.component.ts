import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Team } from 'src/app/models/team.model';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.css']
})
export class TeamViewComponent implements OnInit {
  public dataTable: any;
  public labels: Array<string>;
  public dataSource: MatTableDataSource<any>;

  public team: Team;
  public allTeams: Team[];

  public readonly: boolean;
  public allowEditing: boolean;

  constructor(
    private _snackBar: MatSnackBar,
    private teamService: TeamService
  ) {
    this.labels = ['no.', 'name', 'foundation date', 'country', 'actions'];
    this.dataTable = [];
    this.dataSource = new MatTableDataSource<any>();

    this.team = new Team();
    this.allTeams = []

    this.readonly = false;
    this.allowEditing = false;
  }

  ngOnInit(): void {
    this.getAll();
  }

  /**
   * Obtener todos los equipos
   */
  getAll = () => {
    this.teamService.get()
      .then((response) => {
        this.allTeams = [];
        this.dataTable = [];
        this.allTeams = response.data;
        this.fillTable();
      });
  }

  private fillTable() {
    this.allTeams.forEach((element: Team) => {
      this.dataTable.push({
        no: element.id,
        name: element.name,
        foundationDate: element.foundation_date,
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
      console.log(this.team, 'Create new');
    }
  }

  public updateExisting() {
    this.readonly = true;
    this.allowEditing = false;
  }

  public setDate(date: any) {
    this.team.foundation_date = date;
  }

  public selectCountry(id_country: any) {
    this.team.id_country = id_country;
  }

  public selectPicture(base64: any) {
    this.team.photo = base64;
  }

  public selectTeam(id: any) {
    this.readonly = false;
    this.allowEditing = false;
    let team: Team = this.allTeams.find(el => el.id === id) || new Team();
    this.team = team;
  }

  public create() {
    this.teamService.create(this.team)
      .then((response) => {
        this.showSnackbar('Team created successfully');
        this.getAll();
      })
      .catch((error) => {
        this.showSnackbar(error.error.message);
      });
    this.team = new Team();
    this.readonly = false;
    this.allowEditing = false;
  }

  public edit() {
    this.teamService.update(this.team)
      .then((response) => {
        this.showSnackbar('Team updated successfully');
        this.getAll();
      })
      .catch((error) => {
        this.showSnackbar(error.error.message);
      });
    this.team = new Team();
    this.readonly = false;
    this.allowEditing = true;
  }

  public delete() {
    this.teamService.delete(this.team)
      .then((response) => {
        this.showSnackbar('Team deleted successfully');
        this.getAll();
      })
      .catch((error) => {
        this.showSnackbar(error.error.message);
      });
    this.team = new Team();
    this.readonly = false;
    this.allowEditing = true;
  }

  showSnackbar(message: string = 'Something went wrong :c') {
    this._snackBar.open(message, 'CLOSE', { duration: 5000 });
  }
}
