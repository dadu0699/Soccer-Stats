import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (localStorage.getItem('id_rol') === '3') {
      return true;
    } else if (localStorage.getItem('id_rol') === '2') {
      this.router.navigateByUrl('/employee');
      return false;
    } else {
      this.router.navigateByUrl('/tabs');
      return false;
    }
  }

}