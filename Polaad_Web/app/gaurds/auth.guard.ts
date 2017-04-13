import {Component, Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from 'app/login/login.services';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authServices: AuthenticationService) {
     }

    //canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            //this.router.navigate(['Dashboard'], { queryParams: { returnUrl: state.url }});
            this.authServices.isLogin();
            return true;
        }
        //alert('login flase');
        // not logged in so redirect to login page with the return url
        this.router.navigate(['Login'], { queryParams: { returnUrl: state.url }});
        this.authServices.isNotLogin();
        return false;
    }

    
}
export function isLoggedin() {
  return !!localStorage.getItem('currentUser');
    }