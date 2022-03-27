import { Component, OnInit } from '@angular/core';
import { Option } from 'src/app/models/option.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public opened: boolean;
  public showReports: boolean;

  public reports: Option[];

  constructor() {
    this.opened = false;
    this.showReports = false;

    this.reports = [
      {id: 1, description: 'User', link: 'user-reports'},
      {id: 2, description: 'Employee', link: 'employee-reports'},
      {id: 2, description: 'Logs', link: 'logs'},
    ]
  }

  ngOnInit(): void {
  }

  public show() {
    this.showReports = !this.showReports;
  }

  public showSideNav(opened: any) {
    this.opened = opened;
  }

}
