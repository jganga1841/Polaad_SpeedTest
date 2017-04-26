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
var core_1 = require('@angular/core');
var auth_guard_1 = require("app/gaurds/auth.guard");
var sharedService_1 = require('app/common/services/sharedService');
var login_services_1 = require('app/login/login.services');
var userTO_1 = require('app/user/model/userTO');
var AppComponent = (function () {
    //    private get _hideTopbar() : boolean {
    //        return this._data.get('hideTopbar');
    //     };
    function AppComponent(ss, loginService) {
        this.ss = ss;
        this.loginService = loginService;
        this.loader = this.ss.loader;
        this.login = this.loginService.Ilogin;
        //this.ss.showLoader()
    } //private _data:RouteData
    AppComponent.prototype.ngOnInit = function () {
        //alert('first');
        this.imageUrl = "/images/polaad_logo.png";
        this.isloggedIn = auth_guard_1.isLoggedin();
        this.userTO = new userTO_1.UserTO();
        this.userTO = this.loginService.getUserTOFromLocalStorage();
        //   if(this.userTO !=null)
        //   {
        //   this.username=this.userTO.UserLogin; 
        //   }
        //   else
        //   {
        //       this.username==null;
        //   }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            //[GJ] : Call the login component on first call
            templateUrl: './app/app.component.html'
        }), 
        __metadata('design:paramtypes', [sharedService_1.sharedService, login_services_1.AuthenticationService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map