import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as Feather from 'feather-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  public email: string;
  public password: string;

  constructor() {
    this.email = '';
    this.password = '';

  }

  ngOnInit(): void {
  }

  public async signin(): Promise<void> {
    console.log(this.email, this.password)
  }


  ngAfterViewInit() {
    Feather.replace();
  }

}
