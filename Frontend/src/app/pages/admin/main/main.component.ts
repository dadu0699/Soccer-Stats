import { Component, OnInit } from '@angular/core';

import { Option } from 'src/app/models/option.model';

import { AdminService } from 'src/app/services/admin.service';
import { CustomerService } from 'src/app/services/customer.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public opened: boolean;
  public showReports: boolean;

  public reports: Option[];
  public esbs: Option[];

  constructor(
    private _router: Router
  ) {
    this.opened = false;
    this.showReports = false;

    this.reports = [
      { id: 1, description: 'User', link: 'user-reports' },
      { id: 2, description: 'Employee', link: 'employee-reports' },
      { id: 2, description: 'Logs', link: 'logs' },
    ]
    this.esbs = [{ id: 0, description: 'A', },
    { id: 1, description: 'B', },
    { id: 2, description: 'C', },
    { id: 3, description: 'D', },
    { id: 4, description: 'E', },
    { id: 5, description: 'F', },
    { id: 6, description: 'G', },
    { id: 7, description: 'H', },
    { id: 8, description: 'I', },
    { id: 9, description: 'J', },
    { id: 10, description: 'K', },
    { id: 11, description: 'F2', },];
  }

  ngOnInit(): void {
  }

  public show() {
    this.showReports = !this.showReports;
  }

  public showSideNav(opened: any) {
    this.opened = opened;
  }

  public selectESB(value: any) {

    localStorage.setItem('id_esb', value);
    localStorage.removeItem('token');
    localStorage.removeItem('has_membership');
    localStorage.removeItem('id_user');
    localStorage.removeItem('id_rol');
    window.location.reload();
  }

}
