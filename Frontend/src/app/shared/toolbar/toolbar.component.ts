import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';

import * as Feather from 'feather-icons';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  @Input('whichPage') whichPage: number;
  @Output('toggleSidNav') show: EventEmitter<boolean>;

  public opened: boolean;

  constructor(private _router: Router) {
    this.whichPage = 0;
    this.show = new EventEmitter<boolean>();
    this.opened = false;
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    Feather.replace();
  }

  public menuIsVisible(): boolean {
    if (this.whichPage != 2) return false;

    if (localStorage.getItem('id_rol') == '2') return false;

    return true;
  }

  public logOut() {
    if (this.whichPage != 0) {
      localStorage.clear();
      this._router.navigate(['/auth/login']);
    } else {
      if (localStorage.getItem('id_rol') == '1') {
        this._router.navigate(['/soccer-stats/admin']);
      } else if (localStorage.getItem('id_rol') == '2') {
        this._router.navigate(['/soccer-stats/employee']);
      } else {
        this._router.navigate(['/soccer-stats']);
      }
    }
  }

  public toggleMenu() {
    this.opened = !this.opened;
    this.show.emit(this.opened);
  }
}
