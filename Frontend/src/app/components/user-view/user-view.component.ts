import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from '../../models/user.model';
import { Option } from 'src/app/models/option.model';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  public user: User;
  public genders: Option[];


  constructor(
    private _snackBar: MatSnackBar,
  ) {
    this.user = new User();
    this.genders = [
      { id: 1, description: 'Male' },
      { id: 2, description: 'Female' },
      { id: 3, description: 'Other' },
    ];
  }

  ngOnInit(): void {
  }

  public async done(): Promise<void> {
    console.log(this.user);
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

  showSnackbar(message: string = 'Something went wrong :c') {
    this._snackBar.open(message, 'CLOSE', { duration: 5000 });
  }
}
