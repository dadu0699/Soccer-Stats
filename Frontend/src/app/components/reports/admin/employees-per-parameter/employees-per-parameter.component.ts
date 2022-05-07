import { Component, Input, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from 'src/app/models/user.model';
import { Option } from 'src/app/models/option.model';

import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-employees-per-parameter',
  templateUrl: './employees-per-parameter.component.html',
  styleUrls: ['./employees-per-parameter.component.css']
})
export class EmployeesPerParameterComponent implements OnInit {

  @Input('perTeam') perTeam: boolean;

  public users: User[];
  public options: Option[];
  public currentOption: number;

  public dataTable: any;
  public labels: Array<string>;
  public dataSource: MatTableDataSource<any>;


  constructor(
    private _snackBar: MatSnackBar,
    private _adminService: AdminService
  ) {
    this.perTeam = false;

    this.labels = ['no.', 'photo', 'name', 'lastname', 'nationality', 'birth date', 'quantity', 'age'];
    this.dataTable = [];
    this.dataSource = new MatTableDataSource<any>();

    this.users = [];

    this.options = [
      { id: 0, description: 'Most' },
      { id: 1, description: 'Less' },
    ];
    this.currentOption = 0;
  }

  ngOnInit(): void {
  }

  private fillTable() {
    this.dataTable = [];
    this.users.forEach((element: User) => {

      this.dataTable.push({
        no: element.id,
        photo: element.photo,
        name: element.name,
        lastname: element.lastname,
        nationality: element.nationality,
        quantity: element.count,
      });

      this.labels = Object.keys(this.dataTable[0]);
      this.dataSource.data = this.dataTable;
    });
  }

  public async selectOption(id_option: any):Promise<void> {
    if(!this.perTeam){
      this.currentOption = id_option
      try {
        const response = await this._adminService.report8(id_option);
       console.log(response);
        if (response['status'] === 200) {
          this.users = response['data']
          this.fillTable();
          this.showSnackbar(response['msg']);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  public async selectTeam(id_team: any): Promise<void> {
    try {
      const response = await this._adminService.report9(this.currentOption, id_team);
      console.log(response);
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
