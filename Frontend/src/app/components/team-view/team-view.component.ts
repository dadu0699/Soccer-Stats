import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Team } from 'src/app/models/team.model';

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
  ) {
    this.labels = ['no.', 'name', 'foundation date', 'country', 'actions'];
    this.dataTable = [];
    this.dataSource = new MatTableDataSource<any>();

    this.team = new Team();
    this.allTeams = [
      { id: 1, name: 'Equipo 1', foundation_date: '2021-05-23', photo: 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg', id_country: 1, country: 'Country 1' },
      { id: 2, name: 'Equipo 2', foundation_date: '2022-01-25', photo: 'NA', id_country: 2, country: 'Country 2' }
    ]; //TODO Delete Info

    this.readonly = false;
    this.allowEditing = false;
  }

  ngOnInit(): void {
    this.fillTable(); //TODO Read
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
    }else{
      console.log(this.team, 'Create new'); //TODO Create
    }
  }

  public updateExisting() {
    console.log('Update', this.team); //TODO Update
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
    this.readonly = true;
    this.allowEditing = false;
    let team: Team = this.allTeams.find(el => el.id === id) || new Team();
    this.team = team;
  }

  public create() {
    this.team = new Team();
    this.readonly = false;
    this.allowEditing = false;
  }

  public edit() {
    this.readonly = false;
    this.allowEditing = true;
  }

  public delete() {
    console.log(this.team.id); //TODO Delete
  }

  showSnackbar(message: string = 'Something went wrong :c') {
    this._snackBar.open(message, 'CLOSE', { duration: 5000 });
  }
}
