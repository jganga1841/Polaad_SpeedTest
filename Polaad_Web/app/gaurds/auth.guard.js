"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var login_services_1 = require("app/login/login.services");
var AuthGuard = (function () {
    function AuthGuard(router, authServices) {
        this.router = router;
        this.authServices = authServices;
    }
    //canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    AuthGuard.prototype.canActivate = function (route, state) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            //this.router.navigate(['Dashboard'], { queryParams: { returnUrl: state.url }});
            this.authServices.isLogin();
            return true;
        }
        //alert('login flase');
        // not logged in so redirect to login page with the return url
        this.router.navigate(['Login'], { queryParams: { returnUrl: state.url } });
        this.authServices.isNotLogin();
        return false;
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router, login_services_1.AuthenticationService])
], AuthGuard);
exports.AuthGuard = AuthGuard;
function isLoggedin() {
    return !!localStorage.getItem('currentUser');
}
exports.isLoggedin = isLoggedin;
//# sourceMappingURL=auth.guard.js.map