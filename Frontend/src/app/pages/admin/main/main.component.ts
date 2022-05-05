import { Component, OnInit } from '@angular/core';

import { Option } from 'src/app/models/option.model';

import { AdminService } from 'src/app/services/admin.service';
import { CustomerService } from 'src/app/services/customer.service';
import { AuthService } from 'src/app/services/auth.service';


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
    private _adminServices: AdminService,
    private _customerServices: CustomerService,
    private _auth: AuthService
  ) {
    this.opened = false;
    this.showReports = false;

    this.reports = [
      { id: 1, description: 'User', link: 'user-reports' },
      { id: 2, description: 'Employee', link: 'employee-reports' },
      { id: 2, description: 'Logs', link: 'logs' },
    ]
    this.esbs = [{ id: 0, description: 'A', link: '' },
    { id: 1, description: 'B', link: '35.226.118.223:3000' },
    { id: 2, description: 'C', link: '34.132.88.81:7050' },
    { id: 3, description: 'D', link: '' },
    { id: 4, description: 'E', link: '' },
    { id: 5, description: 'F', link: '34.71.127.255:80' },
    { id: 6, description: 'G', link: '' },
    { id: 7, description: 'H', link: '' },
    { id: 8, description: 'I', link: '34.125.81.45:3000' },
    { id: 9, description: 'J', link: '3.15.227.171:3000' },
    { id: 10, description: 'K', link: '' },];
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
    console.log(value)
  }

}
