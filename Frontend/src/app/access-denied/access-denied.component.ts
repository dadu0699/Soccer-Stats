import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css'],
})
export class AccessDeniedComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {}

  public home() {
    if (localStorage.getItem('id_rol') == '1') {
      this._router.navigate(['/soccer-stats/admin']);
    } else if (localStorage.getItem('id_rol') == '2') {
      this._router.navigate(['/soccer-stats/employee']);
    } else {
      this._router.navigate(['/soccer-stats']);
    }
  }
}
