import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import * as Feather from 'feather-icons';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, AfterViewInit {

  @Input('whichPage') whichPage: number;
  @Output('toggleSidNav') show: EventEmitter<boolean>;

  public opened: boolean;

  constructor(
    private _router: Router,
  ) {
    this.whichPage = 0;
    this.show = new EventEmitter<boolean>();
    this.opened = false;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    Feather.replace();
  }

  public logOut() {
    localStorage.clear();
    this._router.navigate(['/auth/login']);
  }

  public toggleMenu() {
    this.opened = !this.opened;
    this.show.emit(this.opened);
  }

}
