import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import * as Feather from 'feather-icons';

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
  ) {
    this.email = '';
    this.password = '';

  }

  ngOnInit(): void {
  }

  public async signin(): Promise<void> {
    console.log(this.email, this.password)
    this._router.navigate(['/soccer-stats']);
  }

  ngAfterViewInit() {
    Feather.replace();
  }

  showSnackbar(message: string = 'Something went wrong :c') {
    this._snackBar.open(message, 'CLOSE', { duration: 5000 });
  }

}
