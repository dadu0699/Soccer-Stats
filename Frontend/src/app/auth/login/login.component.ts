import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as Feather from 'feather-icons';
import { AuthService } from 'src/app/services/auth.service';
import { ForgotPasswordDialogComponent } from '../../components/dialogs/forgot-password-dialog/forgot-password-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  public email: string;
  public password: string;

  constructor(
    private _router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _authService: AuthService
  ) {
    this.email = '';
    this.password = '';
  }

  ngOnInit(): void {}

  public async signin(): Promise<void> {
    try {
      const response = await this._authService.signIn(
        this.email,
        this.password
      );

      if (response['status'] == 200) {
        localStorage.setItem('user', JSON.stringify(response['data']));
        this._router.navigate(['/soccer-stats/']);
      }
    } catch (error: any) {
      this.showSnackbar();
    }
  }

  public async signup(new_user: any): Promise<void> {
    try {
      const response = await this._authService.signUp(new_user);

      if (response['status'] == 200) {
        this.showSnackbar(
          'Te hemos enviado un correo para que verificar tu cuenta'
        );
      }

      this._router.navigate(['/auth/login']);
    } catch (error: any) {
      this.showSnackbar();
    }
  }

  public recoverPassword() {
    const dialogRef = this.dialog.open(ForgotPasswordDialogComponent, {});

    dialogRef.afterClosed().subscribe(async (email) => {
      await this._authService.recoverPassword(email);
    });
  }

  ngAfterViewInit() {
    Feather.replace();
  }

  showSnackbar(message: string = 'Something went wrong :c') {
    this._snackBar.open(message, 'CLOSE', { duration: 5000 });
  }
}
