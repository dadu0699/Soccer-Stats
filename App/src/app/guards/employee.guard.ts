import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {

    constructor(
        private router: Router
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {

        if (localStorage.getItem('id_rol') === '2') {
            return true;
        } else if (localStorage.getItem('id_rol') === '3') {
            this.router.navigateByUrl('/client');
            return false;
        } else {
            this.router.navigateByUrl('/tabs');
            return false;
        }
    }

}