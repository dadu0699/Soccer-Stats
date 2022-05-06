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
    if (localStorage.getItem('token') !== null) {
      this._router.navigate(['/soccer-stats/']);
    }

    this.email = '';
    this.password = '';
  }

  ngOnInit(): void { }

  public async signin(): Promise<void> {
    try {
      const response = await this._authService.signIn(
        this.email,
        this.password
      );
      console.log(response);

      if (response['status'] == 200) {
        const data = response['data'];
        console.log(response['msg']);
        //TODO remove true & console.logs
        if (data['id_status'] == 1 || true) {
          localStorage.setItem('token', String(data['token']));
          localStorage.setItem('id_user', String(data['id_user']));
          localStorage.setItem('id_rol', String(data['id_rol']));
          localStorage.setItem(
            'has_membership',
            String(data['has_membership'])
          );

          if (data['id_rol'] == 1) {
            this._router.navigate(['/soccer-stats/admin']);
          } else if (data['id_rol'] == 2) {
            this._router.navigate(['/soccer-stats/employee']);
          } else {
            this._router.navigate(['/soccer-stats']);
          }
        } else if (data['id_status'] == 2) {
          this.showSnackbar('Tu cuenta está desactivada');
        } else {
          this.showSnackbar('Tu cuenta esta pendiente de verificación');
        }
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
