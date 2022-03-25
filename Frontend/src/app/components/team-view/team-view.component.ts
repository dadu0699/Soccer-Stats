import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';


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

  constructor() {
    this.labels = ['no.', 'name', 'foundation date', 'country', 'actions'];
    this.dataTable = [];
    this.dataSource = new MatTableDataSource<any>();

    this.team = new Team();
    this.allTeams = [
      { id: 1, name: 'Equipo 1', foundation_date: '21/01/2021', photo: 'NA', id_country: 1, country: 'Country 1' },
      { id: 2, name: 'Equipo 2', foundation_date: '22/02/2022', photo: 'NA', id_country: 2, country: 'Country 2' }
    ]

    this.readonly = false;
  }

  ngOnInit(): void {
  }

  public done() {
    console.log(this.team);
    this.fillTable();
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

  public selectCountry(id_country: any) {
    this.team.id_country = id_country;
  }

  public selectPicture(base64: any) {
    this.team.photo = base64;
  }

  public selectTeam(id_team: any) {
    this.readonly = true;
    let team: Team = this.allTeams.find(el => el.id === id_team) || new Team();
    this.team = team;
  }

  public create() {
    this.team = new Team();
    this.readonly = false;
    console.log('Creando');
  }

  public edit() {
    this.readonly = false;
    console.log('Editando');
  }

  public delete() {
    console.log('Eliminando');
  }
}
