import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from '../../models/user.model';
import { Option } from 'src/app/models/option.model';

@Component({
  selector: 'app-user-register-form',
  templateUrl: './user-register-form.component.html',
  styleUrls: ['./user-register-form.component.css']
})
export class UserRegisterFormComponent implements OnInit {

  @Input('readonly') readonly: boolean;
  @Input('allowEditing') allowEditing: boolean;
  @Input('customer_side') customer_side: boolean;

  @Input('user') user: User;
  @Output('sendUser') sendUser: EventEmitter<User>;

  @Output('manageAccount') manage: EventEmitter<any>;

  public genders: Option[];
  public roles: Option[];

  constructor(
    private _snackBar: MatSnackBar,
  ) {
    this.user = new User();
    this.genders = [
      { id: 1, description: 'Male' },
      { id: 2, description: 'Female' },
      { id: 3, description: 'Other' },
    ];
    this.roles = [
      { id: 1, description: 'Admin' },
      { id: 2, description: 'Employee' },
    ];

    this.readonly = false;
    this.allowEditing = false;

    this.customer_side = true;
    this.sendUser = new EventEmitter<User>();

    this.manage = new EventEmitter<User>();

  }

  ngOnInit(): void {
  }

  public async done(): Promise<void> {
    this.sendUser.emit(this.user)
  }

  public setDate(date: any) {
    this.user.birth_date = date;
  }

  public selectCountry(id_country: any) {
    this.user.id_country = id_country;
  }

  public selectPicture(base64: any) {
    this.user.photo = base64;
  }

  public selectGender(id_gender: any) {
    this.user.gender = id_gender;
  }

  public selectRol(id_rol: any) {
    this.user.id_rol = id_rol;
  }

  public manageAccount() {
    this.manage.emit();
  }

  showSnackbar(message: string = 'Something went wrong :c') {
    this._snackBar.open(message, 'CLOSE', { duration: 5000 });
  }
}
