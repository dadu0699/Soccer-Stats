import { Component, Input, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from 'src/app/models/user.model';
import { Option } from 'src/app/models/option.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-users-per-parameter',
  templateUrl: './users-per-parameter.component.html',
  styleUrls: ['./users-per-parameter.component.css']
})
export class UsersPerParameterComponent implements OnInit {

  @Input('perCountry') perCountry: boolean;
  @Input('perGender') perGender: boolean;
  @Input('perAge') perAge: boolean;

  @Input('perTeam') perTeam: boolean;
  @Input('perMembershipStatus') perMembershipStatus: boolean;
  @Input('perMembershipCount') perMembershipCount: boolean;
  @Input('perMoneySpent') perMoneySpent: boolean;

  public dataTable: any;
  public labels: Array<string>;
  public dataSource: MatTableDataSource<any>;

  public users: User[];
  public genders: Option[];
  public age!: number;
  public membershipStatus: Option[];


  constructor(
    private _snackBar: MatSnackBar,
    private _adminService: AdminService
  ) {
    this.perCountry = false;
    this.perGender = false;
    this.perAge = false;
    this.perTeam = false;
    this.perMembershipStatus = false;
    this.perMembershipCount = false;
    this.perMoneySpent = false;

    this.labels = ['no.', 'photo', 'name', 'lastname', 'nationality', 'birth date', 'quantity', 'age'];
    this.dataTable = [];
    this.dataSource = new MatTableDataSource<any>();

    this.users = [];

    this.genders = [
      { id: 1, description: 'Male', char: 'M' },
      { id: 2, description: 'Female', char: 'F' },
      { id: 3, description: 'Other', char: 'U' },
    ];

    this.membershipStatus = [
      { id: 0, description: 'None' },
      { id: 1, description: 'Active' },
    ];
  }

  async ngOnInit(): Promise<void> {
    if (this.perMembershipCount) {
      try {
        const response = await this._adminService.report3();
        if (response['status'] === 200) {
          this.users = response['data']
          this.fillTable();
          this.showSnackbar(response['msg']);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (this.perMoneySpent) {
      try {
        const response = await this._adminService.report4();
        if (response['status'] === 200) {
          this.users = response['data']
          this.fillTable();
          this.showSnackbar(response['msg']);
        }
      } catch (error) {
        console.log(error);
      }
    }

    this.fillTable();
  }

  private fillTable() {
      this.dataSource = new MatTableDataSource<any>();
      this.dataTable = [];
    this.users.forEach((element: User) => {
      if (this.perCountry)
        this.dataTable.push({
          no: element.id,
          photo: element.photo,
          name: element.name,
          lastname: element.lastname,
        });
      if (this.perGender || this.perTeam || this.perMembershipStatus)
        this.dataTable.push({
          no: element.id,
          photo: element.photo,
          name: element.name,
          lastname: element.lastname,
          nationality: element.nationality,
        });
      if (this.perMembershipCount || this.perMoneySpent)
        this.dataTable.push({
          no: element.id,
          photo: element.photo,
          name: element.name,
          lastname: element.lastname,
          nationality: element.nationality,
          quantity: element.count ? element.count : element.amount,
        });
      if (this.perAge)
        this.dataTable.push({
          no: element.id,
          photo: element.photo,
          name: element.name,
          lastname: element.lastname,
          nationality: element.nationality,
          birth_date: element.birth_date,
          age: element.age
        });
      this.labels = Object.keys(this.dataTable[0]);
      this.dataSource.data = this.dataTable;
    });
  }

  public async selectCountry(id_country: any): Promise<void> {
    try {
      const response = await this._adminService.report1(id_country);
      if (response['status'] === 200) {
        this.users = response['data'];
        this.fillTable();
        this.showSnackbar(response['msg']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async selectGender(id_gender: any): Promise<void>{
    try {
      const response = await this._adminService.report6(this.genders[id_gender-1].char || 'M');
      if (response['status'] === 200) {
        this.users = response['data']
        this.fillTable();
        this.showSnackbar(response['msg']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async selectAge(): Promise<void> {
    try {
      const response = await this._adminService.report7(this.age);
      if (response['status'] === 200) {
        this.users = response['data']
        this.fillTable();
        this.showSnackbar(response['msg']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async selectTeam(id_team: any): Promise<void> {
    try {
      const response = await this._adminService.report1(id_team);
      if (response['status'] === 200) {
        this.users = response['data']
        this.fillTable();
        this.showSnackbar(response['msg']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async selectMembershipStatus(id_status: any): Promise<void> {
    try {
      const response = await this._adminService.report2(id_status);
      if (response['status'] === 200) {
        this.users = response['data']
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
