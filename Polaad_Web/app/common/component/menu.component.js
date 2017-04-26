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
var router_1 = require('@angular/router');
var login_services_1 = require('app/login/login.services');
var myGlobalVal = require('app/global');
var MenuComponent = (function () {
    function MenuComponent(current, router, loginService) {
        this.current = current;
        this.router = router;
        this.loginService = loginService;
    }
    MenuComponent.prototype.getlist = function () {
        //to get list from service
        // Get all comments
        //  this.commonService.getMenu()
        //  .subscribe(
        //   mySet => this.mySet = mySet, //Bind to view
        //   err => {
        //   // Log errors if any
        //    console.log(err);
        // });
        var _this = this;
        this.mySet = [
            //  {MenuId:0,MenuName:'Home',ParentId:0, SubMenuList : this.getSubMenuList(0),Path:'',MenuClass:'fa fa-bars fa-fw i-menu '}  ,   
            { MenuId: 1, MenuName: 'Dashboard', ParentId: 0, SubMenuList: this.getSubMenuList(1), Path: 'Dashboard', MenuClass: 'fa fa-dashboard fa-fw i-menu ' },
            { MenuId: 2, MenuName: 'Quota', ParentId: 0, SubMenuList: this.getSubMenuList(2), Path: 'QuotaDeclaration', MenuClass: 'fa fa-flask fa-fw i-menu ' },
            { MenuId: 3, MenuName: 'Booking', ParentId: 0, SubMenuList: this.getSubMenuList(3), Path: 'Booking', MenuClass: 'fa fa-pencil-square-o fa-fw i-menu ' },
            { MenuId: 4, MenuName: 'Loading Slips', ParentId: 0, SubMenuList: this.getSubMenuList(4), Path: 'LoadingSlips', MenuClass: 'fa fa-cart-arrow-down fa-fw i-menu ' },
            { MenuId: 5, MenuName: 'Stock Update', ParentId: 0, SubMenuList: this.getSubMenuList(5), Path: 'StockUpdate', MenuClass: 'fa fa-archive fa-fw i-menu ' },
            { MenuId: 6, MenuName: 'Market Trend', ParentId: 0, SubMenuList: this.getSubMenuList(6), Path: 'MarketTrend', MenuClass: 'fa fa fa-line-chart fa-fw i-menu ' },
            { MenuId: 7, MenuName: 'Freight Update', ParentId: 0, SubMenuList: this.getSubMenuList(7), Path: 'FreightUpdate', MenuClass: 'fa fa-road fa-fw i-menu ' },
            { MenuId: 8, MenuName: 'Masters Setting', ParentId: 0, SubMenuList: this.getSubMenuList(8), Path: 'MasterSetting', MenuClass: 'fa fa-cogs fa-fw i-menu ' },
            { MenuId: 9, MenuName: 'Help', ParentId: 0, SubMenuList: this.getSubMenuList(9), Path: 'Help', MenuClass: 'fa fa-info-circle fa-fw i-menu ' },
            { MenuId: 10, MenuName: 'Feedback', ParentId: 0, SubMenuList: this.getSubMenuList(10), Path: 'Feedback', MenuClass: 'fa fa-comments-o fa-fw i-menu ' },
        ];
        this.userTO = this.loginService.getUserTOFromLocalStorage();
        if (this.userTO != null) {
            this.userTO.UserRoleList.forEach(function (c) {
                if (c.RoleId == myGlobalVal.UserRole.C_AND_F_AGENT) {
                    _this.mySet = _this.mySet.filter(function (c) { return c.MenuId != 2 && c.MenuId != 5 && c.MenuId != 7 && c.MenuId != 8; });
                }
                if (c.RoleId == myGlobalVal.UserRole.LOADING_PERSON) {
                    _this.mySet = _this.mySet.filter(function (c) { return c.MenuId != 2; });
                }
            });
        }
    };
    MenuComponent.prototype.getSubMenuList = function (ParentId) {
        this.mySubMenu = [];
        return this.mySubMenu = this.mySubMenu.filter(function (s) { return s.ParentId === ParentId; });
    };
    MenuComponent.prototype.ngOnInit = function () {
        // Load comments
        this.getlist();
    };
    MenuComponent = __decorate([
        core_1.Component({
            selector: 'my-menu',
            template: '<ul  >' +
                '<li class="has-subnav" *ngFor="let myMenu of mySet" attr.id ="{{myMenu.MenuId}}">' +
                '<a [routerLink]="[myMenu.Path]" >' +
                '<i class="{{myMenu.MenuClass}}"></i>' +
                '<span class="nav-text">{{myMenu.MenuName}}</span>' +
                '<b class="arrow fa fa-angle-right" style="padding-top: 12px;"></b> ' +
                '</a>' +
                '<b class="arrow"></b>' +
                '<ul>' +
                '<li *ngFor="let mySubMenu of myMenu.SubMenuList" attr.id ="{{mySubMenu.MenuId}}">' +
                ' <a [routerLink]="[mySubMenu.Path]">' +
                '<i class="{{mySubMenu.MenuClass}}"></i>' +
                '<span class="nav-text">{{mySubMenu.MenuName}}</span>' +
                '</a>' +
                '<b class="arrow"></b>' +
                '</li>' +
                '</ul>' +
                '</li></ul>'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, login_services_1.AuthenticationService])
    ], MenuComponent);
    return MenuComponent;
}());
exports.MenuComponent = MenuComponent;
//# sourceMappingURL=menu.component.js.map