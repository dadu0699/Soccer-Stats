import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from '../../models/user.model';
import { Option } from 'src/app/models/option.model';

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

  constructor(
    private _snackBar: MatSnackBar,
  ) {
    this.labels = ['no.', 'name', 'lastname', 'email', 'age', 'rol', 'status', 'actions'];
    this.dataTable = [];
    this.dataSource = new MatTableDataSource<any>();

    this.user = new User();
    this.allUsers = [
      {
        id_user: 1, name: 'nombre 1', lastname: 'apellido 1', email: 'mail 1',
        password: 'contraseña 1', phone: 'telefono 1', birth_date: '1998-11-11',
        address: 'Direccion 1', id_country: 1, id_gender: 1, gender: 'Male',
        id_rol: 1, photo: 'NA 1', id_status: 1, age: 111,
      },
      {
        id_user: 2, name: 'nombre 2', lastname: 'apellido 2', email: 'mail 2',
        password: 'contraseña 2', phone: 'telefono 2', birth_date: '2022-02-22',
        address: 'Direccion 2', id_country: 2, id_gender: 2, gender: 'Female',
        id_rol: 2, photo: 'NA 2', id_status: 2, age: 222,
      },
    ];

    this.genders = [
      { id: 1, description: 'Male' },
      { id: 2, description: 'Female' },
      { id: 3, description: 'Other' },
    ];
    this.roles = [
      { id: 1, description: 'Admin' },
      { id: 2, description: 'Employee' },
    ];
    this.status = [
      { id: 1, description: 'Activa' },
      { id: 2, description: 'Congelada' },
      { id: 3, description: 'Eliminada' },
    ];

    this.readonly = false;
    this.allowEditing = false;
  }

  ngOnInit(): void {
    this.fillTable();
  }

  private fillTable() {
    this.allUsers.forEach((element: User) => {
      this.dataTable.push({
        no: element.id_user,
        name: element.name,
        lastname: element.lastname,
        email: element.email,
        age: element.age,
        rol: this.roles[element.id_rol-1].description,
        status: this.status[element.id_status - 1].description,
      });
      this.labels = Object.keys(this.dataTable[0]);
      this.labels.push('actions')
      this.dataSource.data = this.dataTable;
    });
  }

  public done(user: any) {
    this.user = user;
    if (this.allowEditing) {
      this.updateExisting();
    } else {
      console.log(this.user, 'Create new');
    }
  }

  public updateExisting() {
    console.log('Update', this.user);
    this.readonly = true;
    this.allowEditing = false;
  }

  public selectUser(id_team: any) {
    this.readonly = true;
    this.allowEditing = false;
    let user: User = this.allUsers.find(el => el.id_user === id_team) || new User();
    this.user = user;
  }

  public create() {
    this.user = new User();
    this.readonly = false;
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
