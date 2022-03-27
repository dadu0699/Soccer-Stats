import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as Feather from 'feather-icons';
import { ForgotPasswordDialogComponent } from 'src/app/components/dialogs/forgot-password-dialog/forgot-password-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  public email: string;
  public password: string;

  constructor(
    private _router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
    this.email = '';
    this.password = '';
  }

  ngOnInit(): void {
  }

  public async signin(): Promise<void> {
    console.log(this.email, this.password) //TODO signin
    this._router.navigate(['/soccer-stats/']);
  }

  public async signup(new_user: any): Promise<void> {
    console.log(new_user); // TODO Register customer user
  }

  public recoverPassword(){
    const dialogRef = this.dialog.open(ForgotPasswordDialogComponent, {});

    dialogRef.afterClosed().subscribe( async (email) =>{
      console.log(email); //TODO recover password
    });
  }

  ngAfterViewInit() {
    Feather.replace();
  }

  showSnackbar(message: string = 'Something went wrong :c') {
    this._snackBar.open(message, 'CLOSE', { duration: 5000 });
  }

}
