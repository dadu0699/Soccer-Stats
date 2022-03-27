import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: User;

  public edit: boolean;
  public readonly: boolean;

  constructor() {
    this.user = new User;

    this.edit = false;
    this.readonly = true;
  }

  ngOnInit(): void {
    //TODO Read customer profile
    this.user = {
      id: 2, name: 'nombre 2', lastname: 'apellido 2', email: 'mail 2',
      password: 'contraseña 2', phone: 'telefono 2', birth_date: '2022-02-22',
      address: 'Direccion 2', id_country: 2, id_gender: 1, gender: 'Male',
      id_rol: 2, photo: 'https://mn2s-content.s3.eu-west-2.amazonaws.com/wp-content/uploads/2021/03/19174550/Chris-Wood.png', id_status: 2, age: 222,
    }; //TODO delete info
  }

  public editUser(user: any) {
    console.log(user) //TODO Update customer
    this.edit = false
    this.readonly = true;
  }

  public allowEditing() {
    this.edit = true;
    this.readonly = false;
  }

  public delete() {
    console.log(this.user.id) //TODO delete account
  }

  public getMembership() {
    console.log(this.user.id) //TODO get Membership
  }

  public cancelMembership() {
    console.log(this.user.id) //TODO cancel Membership
  }

}
