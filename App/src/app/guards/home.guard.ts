import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class HomeGuard implements CanActivate {

    constructor(
        private router: Router
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {

        if (localStorage.getItem('id_rol') === '3') {
            this.router.navigateByUrl('/client');
            return false;
        } else if (localStorage.getItem('id_rol') === '2') {
            this.router.navigateByUrl('/employee');
            return false;
        } else {
            return true;
        }
    }

}