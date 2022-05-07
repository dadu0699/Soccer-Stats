import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Option } from 'src/app/models/option.model';

import { User } from 'src/app/models/user.model';
import { CustomerService } from 'src/app/services/customer.service';
import { ConfirmationDialogComponent } from 'src/app/components/dialogs/confirmation-dialog/confirmation-dialog.component';

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
  public hasMembership: boolean;

  constructor(
    private _router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _customerService: CustomerService
  ) {
    this.user = new User();

    this.genders = [
      { id: 0, description: 'Female', char: 'F' },
      { id: 1, description: 'Male', char: 'M' },
      { id: 2, description: 'Other', char: 'U' },
    ];
    this.edit = false;
    this.readonly = true;
    this.hasMembership = false;
  }

  async ngOnInit(): Promise<void> {
    await this.getProfile();
    this.hasMembership = Boolean(parseInt(localStorage.getItem('has_membership')!));
  }

  public async getProfile(): Promise<void> {
    try {
      const response = await this._customerService.getProfile();
      console.log(response);
      if (response['status'] === 200) {
        this.user = response['data'][0];
        this.user.id_gender = this.genders.find(el => el.char == this.user.gender)?.id;
        this.showSnackbar(response['msg']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async editUser(user: any): Promise<void> {
    try {
      const response = await this._customerService.updateProfile(user);
      console.log(response);
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
    this.edit = true;
    this.readonly = false;
  }

  public async delete(): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {});

    dialogRef.afterClosed().subscribe(async (status) => {
      if (status)
        try {
          const response = await this._customerService.deleteAccount();
       console.log(response);
          if (response['status'] === 200) {
            this.showSnackbar(response['msg']);
            localStorage.removeItem('token');
            localStorage.removeItem('has_membership');
            localStorage.removeItem('id_user');
            localStorage.removeItem('id_rol');
            this._router.navigate(['/auth/login']);
          }
        } catch (error) {
          console.log(error);
        }
    });

  }

  public async getMembership(): Promise<void> {
    try {
      const response = await this._customerService.getMembership();
      console.log(response);
      if (response['status'] === 200) {
        this.hasMembership = true;
        localStorage.setItem(
          'has_membership',
          '1'
        );
        this._router.navigate(['/auth/login']);
        this.showSnackbar(response['msg']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async cancelMembership(): Promise<void> {
    try {
      const response = await this._customerService.cancelMembership();
      console.log(response);
      if (response['status'] === 200) {
        this.hasMembership = false;
        localStorage.setItem(
          'has_membership',
          '0'
        );
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
