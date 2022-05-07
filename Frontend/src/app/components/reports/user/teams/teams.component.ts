import { Component, Input, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Team } from 'src/app/models/team.model';
import { Option } from 'src/app/models/option.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  @Input('report4') report4: boolean;
  @Input('report5') report5: boolean;
  @Input('report6') report6: boolean;
  @Input('report10') report10: boolean;

  public dataTable: any;
  public labels: Array<string>;
  public dataSource: MatTableDataSource<any>;

  public personType: Option[];
  public team!: number;
  public year!: number;
  public id_country!: number;
  public id_competition!: number;
  public id_person!: number;
  public whichPerson: number;
  public selectTD: boolean;

  public teams: Team[];

  constructor(
    private _snackBar: MatSnackBar,
    private _customerService: CustomerService
  ) {
    this.report4 = false;
    this.report5 = false;
    this.report6 = false;
    this.report10 = false;

    this.labels = ['no.', 'photo', 'name', 'competition', 'country', 'Foundation Date'];
    this.dataTable = [];
    this.dataSource = new MatTableDataSource<any>();

    this.teams = [];
    this.personType = [
      { id: 0, description: 'Player' },
      { id: 1, description: 'Technical Director' },
    ];
    this.whichPerson = 0;
    this.selectTD = false;
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
        foundationDate: element.foundation_date,
        competition: element.competition,
        country: element.country
      });
      this.labels = Object.keys(this.dataTable[0]);
      if (!this.report6) {
        const index = this.labels.indexOf('foundationDate');
        this.labels.splice(index, 1);
      }
      if (!this.report4) {
        const index = this.labels.indexOf('competition');
        this.labels.splice(index, 1);
      }
      if (this.report4 || this.report10) {
        const index = this.labels.indexOf('country');
        this.labels.splice(index, 1);
      }
      this.dataSource.data = this.dataTable;
    });
  }

  public setPersonType(id_type: number) {
    this.whichPerson = id_type;
    this.selectTD = this.whichPerson == 1 ? true : false;
  }

  public selectPerson(id_person: number) {
    this.id_person = id_person;
  }

  public selectCountry(id_country: number) {
    this.id_country = id_country;
    this.getReport5();
  }

  public selectCompetition(id_competition: number) {
    this.id_competition = id_competition;
    this.getReport4();
  }

  public getReport() {
    if (this.report6) {
      this.getReport6();
    } else {
      this.getReport10();
    }
  }

  public async getReport4(): Promise<void> {
    try {
      const response = await this._customerService.report4(this.id_competition);
      console.log(response);
      if (response['status'] === 200) {
        this.teams = response['data'];
        this.fillTable();
        this.showSnackbar(response['msg']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async getReport5(): Promise<void> {
    try {
      const response = await this._customerService.report5(this.id_country);
      console.log(response);
      if (response['status'] === 200) {
        this.teams = response['data'];
        this.fillTable();
        this.showSnackbar(response['msg']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async getReport6(): Promise<void> {
    try {
      const response = await this._customerService.report6(this.year);
      console.log(response);
      if (response['status'] === 200) {
        this.teams = response['data'];
        this.fillTable();
        this.showSnackbar(response['msg']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async getReport10(): Promise<void> {
    try {
      const response = await this._customerService.report10(this.id_person, this.whichPerson);
      console.log(response);
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
