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
var myGlobalVal = require("app/global");
var userTO_1 = require("app/user/model/userTO");
var login_services_1 = require("app/login/login.services");
var LoadingMenuComponent = (function () {
    function LoadingMenuComponent(loginService) {
        this.loginService = loginService;
        // @ViewChild(MenuComponent)
        // public menuComponent:MenuComponent;
        this.isShowForCnF = false;
        this.isShowLoadingQuota = false;
        this.userTO = new userTO_1.UserTO();
    }
    LoadingMenuComponent.prototype.ngOnInit = function () {
        debugger;
        // this.menuComponent.getlist();
        this.userTO = this.loginService.getUserTOFromLocalStorage();
        if (this.userTO.UserRoleList[0].RoleId == myGlobalVal.UserRole.C_AND_F_AGENT) {
            this.isShowForCnF = true;
        }
        else {
            this.isShowForCnF = false;
        }
    };
    return LoadingMenuComponent;
}());
LoadingMenuComponent = __decorate([
    core_1.Component({
        selector: 'my-loadingMenus',
        // template:'<h1>Hello</h1>'
        templateUrl: 'app/loading_slip/loadingMenuUI.html'
    }),
    __metadata("design:paramtypes", [login_services_1.AuthenticationService])
], LoadingMenuComponent);
exports.LoadingMenuComponent = LoadingMenuComponent;
//# sourceMappingURL=loadingMenuComponent.js.map