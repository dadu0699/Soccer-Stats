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
      {id: 1, description: 'Report 1'},
      {id: 2, description: 'Report 2'},
      {id: 2, description: 'Report 3'},
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
