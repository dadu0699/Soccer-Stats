import { Component, Input, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from 'src/app/models/user.model';
import { Option } from 'src/app/models/option.model';

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


  constructor() {
    this.perTeam = false;

    this.labels = ['no.', 'photo', 'name', 'lastname', 'nationality', 'birth date', 'quantity', 'age'];
    this.dataTable = [];
    this.dataSource = new MatTableDataSource<any>();

    this.users = [];
    this.users = [
      {
        id: 1, name: 'nombre 1', lastname: 'apellido 1', email: 'mail 1',
        password: 'contraseña 1', phone: 'telefono 1', birth_date: '1998-11-11',
        address: 'Direccion 1', id_country: 1, id_gender: 1, gender: 'Male',
        id_rol: 1, photo: 'https://www.latercera.com/resizer/Bh3lioSDt8GrjOEVcLSjSbYfRok=/900x600/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/6DKKPSIWJJFZNGNYFBVRLKIT6E.jpg',
        id_status: 1, age: 111, nationality: 'Pais 1', count: 8,
      },
      {
        id: 2, name: 'nombre 2', lastname: 'apellido 2', email: 'mail 2',
        password: 'contraseña 2', phone: 'telefono 2', birth_date: '2022-02-22',
        address: 'Direccion 2', id_country: 2, id_gender: 2, gender: 'Female',
        id_rol: 2, photo: 'https://mn2s-content.s3.eu-west-2.amazonaws.com/wp-content/uploads/2021/03/19174550/Chris-Wood.png',
        id_status: 2, age: 222, nationality: 'Pais 2', amount: 12,
      },
    ]; //TODO Delete info

    this.options = [
      { id: 0, description: 'Most' },
      { id: 1, description: 'Less' },
    ];
    this.currentOption = 0;
  }

  ngOnInit(): void {
  }

  private fillTable() {
    this.dataTable = []; //TODO clean other tables
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

  public selectOption(id_option: any) {
    this.currentOption = id_option //TODO get all employees more/less news posted
    console.log(id_option);
    //TODO This.users = new info
    this.fillTable();
  }

  public selectTeam(id_team: any) {
    console.log(id_team, this.currentOption)//TODO get all employees more/less news posted per team
    //TODO This.users = new info
    this.fillTable();
  }

}
