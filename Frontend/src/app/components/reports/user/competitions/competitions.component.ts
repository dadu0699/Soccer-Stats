import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Team } from 'src/app/models/team.model';
import { Option } from 'src/app/models/option.model';
import { CustomerService } from 'src/app/services/customer.service';



@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {

  public dataTable: any;
  public labels: Array<string>;
  public dataSource: MatTableDataSource<any>;

  public teams: Team[];

  public competitionType: number[];
  public id_team!: number;
  public types: Option[];


  constructor(
    private _snackBar: MatSnackBar,
    private _customerService: CustomerService
  ) {
    this.labels = ['no.', 'photo', 'team', 'competition', 'type', 'vitories'];
    this.dataTable = [];
    this.dataSource = new MatTableDataSource<any>();

    this.teams = [];

    this.competitionType = [];

    this.types = [
      { id: 1, description: 'Liga' },
      { id: 2, description: 'Eliminatoria' },
      { id: 3, description: 'Copa' },
      { id: 4, description: 'SuperCopa' },
      { id: 5, description: 'Cuadrangular' },
      { id: 6, description: 'Triangular' },
    ];
   }

  ngOnInit(): void {
  }

  private fillTable() {
    this.dataTable = [];
    this.teams.forEach((element: Team) => {
        this.dataTable.push({
          no: element.id_team,
          photo: element.photo,
          team: element.team,
          competition: element.competition,
          type: element.type? this.types[element.type -1].description : '',
          victories: element.count,
        });
      this.labels = Object.keys(this.dataTable[0]);
      this.dataSource.data = this.dataTable;
    });
  }

  public pushCompetitionType(id_competition: number) {
    const index = this.competitionType.indexOf(id_competition);
    if (index == -1) this.competitionType.push(id_competition);
  }

  public popCompetitionType(competition: any) {
    const index = this.competitionType.indexOf(competition);
    if (index) this.competitionType.splice(index, 1);
    if(this.competitionType.length == 1) this.competitionType.pop();
  }

  public selectTeam(id_team: number) {
    this.id_team = id_team;
  }

  public async getReport14(): Promise<void> {
    try {
      const response = await this._customerService.report14(this.id_team, this.competitionType);
      if (response['status'] === 200) {
        this.teams = response['data'];
        this.fillTable();
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
