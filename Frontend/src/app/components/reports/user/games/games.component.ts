import { Component, Input, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CustomerService } from 'src/app/services/customer.service';
import { Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  @Input('report9') report9: boolean;
  @Input('report11') report11: boolean;
  @Input('report15') report15: boolean;
  @Input('report16') report16: boolean;
  @Input('report17') report17: boolean;

  public dataTable: any;
  public labels: Array<string>;
  public dataSource: MatTableDataSource<any>;

  public games: Game[];

  public year!: number;
  public goals!: number;
  public teamX!: number;
  public teamY!: number;

  constructor(
    private _snackBar: MatSnackBar,
    private _customerService: CustomerService
  ) {
    this.report9 = false;
    this.report11 = false;
    this.report15 = false;
    this.report16 = false;
    this.report17 = false;

    this.labels = ['no.', 'date',
    'photoTL','teamL', 'resultsL',
    'photoTV', 'teamV', 'resultsV',
    'atendees', 'status', 'stadium', 'competition'] ;
    this.dataTable = [];
    this.dataSource = new MatTableDataSource<any>();

    this.games = [];
  }

  ngOnInit(): void {
  }

  private fillTable() {
    this.dataTable = [];
    this.games.forEach((element: Game) => {
        this.dataTable.push({
          no: element.id,
          date: element.game_date,
          photoTL: element.photo_local,
          teamL: element.team_local,
          resultsL: element.result_local,
          photoTV: element.photo_visiting,
          teamV: element.team_visiting,
          resultsV: element.result_visiting,
          atendees: element.attendees,
          status: element.status,
          stadium: element.stadium,
          competition: element.competition,
        });
      this.labels = Object.keys(this.dataTable[0]);
      this.dataSource.data = this.dataTable;
    });
  }

  public getReports() {
    if(this.report11){
      this.getReport11()
    }else if(this.report15){
      this.getReport15();
    }else{
      this.getReport16()
    }
  }

  public selectTeamX(id_team: number) {
    this.teamX = id_team;
    if(this.report9){
      this.getReport9()
    }else if(this.report17){
      this.getReport17();
    }
  }

  public selectTeamY(id_team: number) {
    this.teamY = id_team;
  }

  public async getReport9(): Promise<void> {
    try {
      const response = await this._customerService.report9(this.teamX);
      if (response['status'] === 200) {
        this.games = response['data'];
        this.fillTable();
        this.showSnackbar(response['msg']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async getReport11(): Promise<void> {
    try {
      const response = await this._customerService.report11(this.goals);
      if (response['status'] === 200) {
        this.games = response['data'];
        this.fillTable();
        this.showSnackbar(response['msg']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async getReport15(): Promise<void> {
    try {
      const response = await this._customerService.report15(this.year);
      if (response['status'] === 200) {
        this.games = response['data'];
        this.fillTable();
        this.showSnackbar(response['msg']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async getReport16(): Promise<void> {
    try {
      const response = await this._customerService.report16(this.teamX, this.teamY);
      if (response['status'] === 200) {
        this.games = response['data'];
        this.fillTable();
        this.showSnackbar(response['msg']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async getReport17(): Promise<void> {
    try {
      const response = await this._customerService.report17(this.teamX);
      if (response['status'] === 200) {
        this.games = response['data'];
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
