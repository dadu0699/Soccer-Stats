import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';

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

}
