import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Option } from 'src/app/models/option.model';

import { User } from 'src/app/models/user.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: User;

  public edit: boolean;
  public genders: Option[];

  public readonly: boolean;

  constructor(
    private _snackBar: MatSnackBar,
    private _customerService: CustomerService
  ) {
    this.user = new User();

    this.genders = [
      { id: 1, description: 'Male', char: 'M' },
      { id: 2, description: 'Female', char: 'F' },
      { id: 3, description: 'Other', char: 'U' },
    ];
    this.edit = false;
    this.readonly = true;
  }

  async ngOnInit(): Promise<void> {
    await this.getProfile();
  }

  public async getProfile(): Promise<void>{
    try {
      const response = await this._customerService.getProfile();
      if (response['status'] === 200) {
        this.user = response['data'][0];
        this.user.id_gender = this.genders.find(el => el.char == this.user.gender)?.id || 2
        this.showSnackbar(response['msg']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async editUser(user: any): Promise<void> {
    try {
      const response = await this._customerService.updateProfile(user);
      if (response['status'] === 200) {
        this.showSnackbar(response['msg']);
      }
    } catch (error) {
      console.log(error);
    }
    this.edit = false
    this.readonly = true;
  }

  public allowEditing() {
    this.getProfile();
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

  private showSnackbar(message: string = 'Something went wrong :c') {
    this._snackBar.open(message, 'CLOSE', { duration: 5000 });
  }
}
