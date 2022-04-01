import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HasMembershipGuard implements CanActivate {
  constructor(private _router: Router) {}

  canActivate(_next: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    const hasMembership = localStorage.getItem('has_membership');
    if (
      hasMembership == undefined ||
      hasMembership == null ||
      hasMembership == '0'
    ) {
      this._router.navigateByUrl('/access-denied');
      return false;
    }

    return true;
  }
}
