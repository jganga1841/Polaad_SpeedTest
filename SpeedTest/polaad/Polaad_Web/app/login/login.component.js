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
var login_services_1 = require("./login.services");
var userTO_1 = require("app/user/model/userTO");
var loginTO_1 = require("app/user/model/loginTO");
var auth_guard_1 = require("app/gaurds/auth.guard");
//import { GeolocationService } from 'app/common/services/geolocation.service';
//import { MapsService } from 'app/common/services/maps.service';
//import { GeocodingService } from 'app/common/services/geocoding.service';
var LoginComponent = (function () {
    //position: google.maps.LatLng;
    function LoginComponent(route, router, authenticationService) {
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        //model: any = {};
        //center: google.maps.LatLng;
        this.loading = false;
        this.isloggedIn = false;
        this.isError = false;
        this.errorMessage = "";
    }
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        if (localStorage.getItem('currentUser') != undefined) {
            this.authenticationService.logout().subscribe(function (element) {
            });
        }
        this.authenticationService.isNotLogin();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.userTo = new userTO_1.UserTO();
        this.loginTO = new loginTO_1.LoginTO();
        // get return url from route parameters or default to '/'       
        this.isloggedIn = auth_guard_1.isLoggedin();
    };
    LoginComponent.prototype.login = function () {
        this.isError = false;
        this.loading = true;
        this.getClientIPLocation();
    };
    LoginComponent.prototype.callLoginService = function () {
        var _this = this;
        this.userTo.LoginTO = this.loginTO;
        this.authenticationService.login(this.userTo)
            .subscribe(function (data) {
            _this.authenticationService.isLogin();
            _this.router.navigate([_this.returnUrl]);
            //this.router.navigate(["Dashboard"]);
        }, function (error) {
            _this.errorMessage = "Error from server side.Please try after some time. ";
            _this.loading = false;
            _this.authenticationService.isNotLogin();
            _this.isError = true;
        }, function () {
            _this.isError = true;
            _this.errorMessage = "Invalid User ID or Password";
            _this.loading = false;
        });
    };
    LoginComponent.prototype.getClientIPLocation = function () {
        var _this = this;
        this.authenticationService.getClientIPLocation().subscribe(function (data) {
            _this.locationDetails = data;
            /*Data returns beelow property : ip, hostname, loc //Latitude and Longitude
            data.org //organization, data.city, data.region, data.country, data.phone*/
            //   alert('ip : '+ this.locationDetails.ip + ' loc : ' + this.locationDetails.loc
            //   + ' city : '+ this.locationDetails.city + ' Country : ' + this.locationDetails.country)
            _this.loginTO.LoginIP = _this.locationDetails.ip;
            _this.callLoginService();
        }, function (error) {
            _this.loginTO.LoginIP = '0.0.0.0';
            _this.callLoginService();
        }, function () { });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: "login",
        templateUrl: 'app/login/login.component.html',
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _a || Object, typeof (_b = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _b || Object, login_services_1.AuthenticationService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
var _a, _b;
//# sourceMappingURL=login.component.js.map