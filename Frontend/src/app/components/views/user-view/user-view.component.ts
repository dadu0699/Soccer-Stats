import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from 'src/app/models/user.model';
import { Option } from 'src/app/models/option.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  public dataTable: any;
  public labels: Array<string>;
  public dataSource: MatTableDataSource<any>;

  public user: User;
  public allUsers: User[];
  public genders: Option[];
  public roles: Option[];
  public status: Option[];

  public readonly: boolean;
  public allowEditing: boolean;
  public manage: boolean;

  constructor(
    private _snackBar: MatSnackBar,
    private _adminService: AdminService,
  ) {
    this.labels = ['no.', 'name', 'lastname', 'email', 'age', 'rol', 'status', 'actions'];
    this.dataTable = [];
    this.dataSource = new MatTableDataSource<any>();

    this.user = new User();
    this.allUsers = [];

    this.genders = [
      { id: 1, description: 'Male', char: 'M' },
      { id: 2, description: 'Female', char: 'F' },
      { id: 3, description: 'Other', char: 'U' },
    ];
    this.roles = [
      { id: 1, description: 'Admin' },
      { id: 2, description: 'Employee' },
      { id: 3, description: 'Customer' },
    ];
    this.status = [
      { id: 1, description: 'Activa' },
      { id: 2, description: 'Congelada' },
      { id: 3, description: 'Eliminada' },
    ];

    this.readonly = false;
    this.allowEditing = false;
    this.manage = false;
  }

  ngOnInit(): void {
    this.getAll();
  }

  public async getAll(): Promise<void> {
    try {
      const response = await this._adminService.getUsers();
      if (response['status'] === 200) {
        this.allUsers = response['data']
        this.allUsers.forEach(us => {
          us.id_gender = this.genders.find(el => el.char == us.gender)?.id || 2
        });
        this.fillTable();
        this.showSnackbar(response['msg']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  private fillTable() {
    this.dataSource = new MatTableDataSource<any>();
    this.dataTable = [];

    this.allUsers.forEach((element: User) => {
      this.dataTable.push({
        no: element.id,
        name: element.name,
        lastname: element.lastname,
        email: element.email,
        age: element.age,
        rol: this.roles[element.id_rol - 1].description,
        status: this.status[element.id_status - 1].description,
      });
      this.labels = Object.keys(this.dataTable[0]);
      this.labels.push('actions')
      this.dataSource.data = this.dataTable;
    });
  }

  public async done(user: any): Promise<void> {
    this.user = user;
    this.user.gender = this.genders[Number(this.user.gender) - 1].char || 'U';
    if (this.allowEditing) {
      this.updateExisting();
    } else {
      try {
        const response = await this._adminService.createUser(this.user);
        if (response['status'] === 200) {
        }
        this.showSnackbar(response['msg']);
      } catch (error) {
        console.log(error);
      }
    }
  }

  public async updateExisting(): Promise<void> {
    try {
      const response = await this._adminService.updateUser(this.user);
      if (response['status'] === 200) {
      }
      this.showSnackbar(response['msg']);
    } catch (error) {
      console.log(error);
    }
    this.readonly = true;
    this.allowEditing = false;
  }

  public allowAccountManagement() {
    this.manage = true;
  }

  public async manageAccount(info: any): Promise<void> {
    this.manage = false;
    try {
      const response = await this._adminService.manageAccount(this.user.id, info.id, info.description);
      this.showSnackbar(response['msg']);
    } catch (error) {
      console.log(error);
    }
  }

  public selectUser(id: any) {
    this.readonly = true;
    this.allowEditing = false;
    let user: User = this.allUsers.find(el => el.id === id) || new User();
    this.user = user;
  }

  public create() {
    this.user = new User();
    this.readonly = false;
    this.manage = false;
    this.allowEditing = false;
  }

  public edit() {
    this.readonly = false;
    this.allowEditing = true;
  }

  public delete() {
  }

  showSnackbar(message: string = 'Something went wrong :c') {
    this._snackBar.open(message, 'CLOSE', { duration: 5000 });
  }
}
