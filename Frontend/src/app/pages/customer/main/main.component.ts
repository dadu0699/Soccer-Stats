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
      {id: 1, description: 'Players & Teams', link: 'players-teams'},
      {id: 2, description: 'Games & Competitions', link: 'games-competitions'},
      {id: 2, description: 'Stadiums', link: 'stadiums' },
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
