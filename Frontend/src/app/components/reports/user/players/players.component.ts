import { Component, Input, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Option } from 'src/app/models/option.model';
import { Player } from 'src/app/models/player.model';
import { CustomerService } from 'src/app/services/customer.service';


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  @Input('report1') report1: boolean;
  @Input('report2') report2: boolean;
  @Input('report3') report3: boolean;
  @Input('report12') report12: boolean;
  @Input('report13') report13: boolean;

  public dataTable: any;
  public labels: Array<string>;
  public dataSource: MatTableDataSource<any>;

  public players: Player[];
  public incidenceType: Option[];
  public personType: Option[];

  public competitionType: number[];
  public competition!: number;
  public incidence!: number;
  public year!: number;
  public age!: number;
  public team!: number;
  public whichPerson!: number;
  public id_team!: number;

  constructor(
    private _snackBar: MatSnackBar,
    private _customerService: CustomerService
  ) {
    this.report1 = false;
    this.report2 = false;
    this.report3 = false;
    this.report12 = false;
    this.report13 = false;

    this.labels = ['no.', 'photo', 'name', 'lastname', 'nationality', 'position', 'competition', 'count'];
    this.dataTable = [];
    this.dataSource = new MatTableDataSource<any>();

    this.players = [];
    this.incidenceType = [
      { id: 1, description: 'Gol' },
      { id: 2, description: 'Autogol' },
      { id: 3, description: 'Tarjeta Amarilla' },
      { id: 4, description: 'Tarjeta Roja' },
    ];
    this.personType = [
      { id: 0, description: 'Player' },
      { id: 1, description: 'Technical Director' },
    ];

    this.competitionType = [];

  }

  ngOnInit(): void {
  }

  private fillTable() {
    this.dataTable = [];
    this.players.forEach((element: Player) => {
      if(this.report1 || this.report2 || this.report3){
        this.dataTable.push({
          no: element.id,
          photo: element.photo,
          name: element.name,
          lastname: element.lastname,
          nationality: element.nationality,
          position: element.position,
          age: element.age
        });
      } else{
        this.dataTable.push({
          no: element.id,
          photo: element.photo,
          name: element.name,
          lastname: element.lastname,
          nationality: element.nationality,
          position: element.position,
          competition: element.competition,
          count: element.count
        });
      }
      this.labels = Object.keys(this.dataTable[0]);
      this.dataSource.data = this.dataTable;
    });
  }

  public pushCompetitionType(id_competition: number) {
    const index = this.competitionType.indexOf(id_competition);
    if (this.report13 && index == -1) this.competitionType.push(id_competition);
    this.competition = id_competition;
  }

  public popCompetitionType(competition: any) {
    const index = this.competitionType.indexOf(competition);
    if (index) this.competitionType.splice(index, 1);
    if(this.competitionType.length == 1) this.competitionType.pop();
  }

  public setIncidence(id_incidence: number) {
    this.incidence = id_incidence;
  }

  public setPersonType(id_person: number) {
    this.whichPerson = id_person;
  }

  public selectTeam(id_team: number) {
    this.id_team = id_team;
  }

  public async getReport1(): Promise<void> {
    try {
      const response = await this._customerService.report1(this.id_team, this.whichPerson);
      console.log(response);
      if (response['status'] === 200) {
        this.players = response['data'];
        this.fillTable();
        this.showSnackbar(response['msg']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async getReport2_3(): Promise<void> {
    let response;
    try {
      if (this.report2) {
        response = await this._customerService.report2(this.age, this.whichPerson);
       console.log(response);
      } else {
        response = await this._customerService.report3(this.age, this.whichPerson);
       console.log(response);
      }
      if (response['status'] === 200) {
        this.players = response['data'];
        this.fillTable();
        this.showSnackbar(response['msg']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async getReport12(): Promise<void> {
    try {
      const response = await this._customerService.report12(this.incidence, this.competition);
      console.log(response);
      if (response['status'] === 200) {
        this.players = response['data'];
        this.fillTable();
        this.showSnackbar(response['msg']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async getReport13(): Promise<void> {
    try {
      const response = await this._customerService.report13(this.incidence, this.year, this.competitionType);
      console.log(response);
      if (response['status'] === 200) {
        this.players = response['data'];
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
