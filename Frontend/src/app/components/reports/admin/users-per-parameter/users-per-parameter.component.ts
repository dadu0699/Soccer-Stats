import { Component, Input, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from 'src/app/models/user.model';
import { Option } from 'src/app/models/option.model';

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
  ) {
    this.perCountry = false;
    this.perGender = false;
    this.perAge = false;
    this.perTeam = false;
    this.perMembershipStatus = false;
    this.perMembershipCount = false;
    this.perMoneySpent = false;

    this.labels = ['no.', 'photo', 'name', 'lastname', 'nationality', 'bith date', 'quantity', 'age'];
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
        id_status: 2, age: 222, nationality: 'Pais 2',  amount: 12,
      },
    ]; //TODO Delete info

    this.genders = [
      { id: 1, description: 'Male' },
      { id: 2, description: 'Female' },
      { id: 3, description: 'Other' },
    ];

    this.membershipStatus = [
      { id: 0, description: 'None' },
      { id: 1, description: 'Active' },
    ];
  }

  ngOnInit(): void {
    if (this.perMembershipCount) {
      //TODO get users with the most membership subs
      //TODO This.users = new info
    }
    if (this.perMoneySpent) {
      //TODO get Users with most money spent
      //TODO This.users = new info
    }

    this.fillTable();
  }

  private fillTable() {
    this.dataTable = []; //TODO clean other tables
    this.users.forEach((element: User) => {

      if (this.perCountry)
        this.dataTable.push({
          no: element.id,
          photo: element.photo,
          name: element.name,
          lastname: element.name,
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
          lastname: element.name,
          nationality: element.nationality,
          birth_date: element.birth_date,
          age: element.age
        });

      this.labels = Object.keys(this.dataTable[0]);
      this.dataSource.data = this.dataTable;
    });
  }

  public selectCountry(id_country: any) {
    console.log(id_country)// TODO get users of x country
    //TODO This.users = new info
    this.fillTable();
  }

  public selectGender(id_gender: any) {
    console.log(id_gender) //TODO get all users of x gender
    //TODO This.users = new info
    this.fillTable();
  }

  public selectAge() {
    console.log(this.age) //TODO get all users at least x age
    //TODO This.users = new info
    this.fillTable();
  }

  public selectTeam(id_team: any) {
    console.log(id_team) //TODO get all users following x team
    //TODO This.users = new info
    this.fillTable();
  }

  public selectMembershipStatus(id_status: any) {
    console.log(id_status) //TODO get all users with active/none membership
    //TODO This.users = new info
    this.fillTable();
  }


  private showSnackbar(message: string = 'Something went wrong :c') {
    this._snackBar.open(message, 'CLOSE', { duration: 5000 });
  }

}
