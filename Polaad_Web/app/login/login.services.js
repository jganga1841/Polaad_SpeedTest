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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var router_1 = require("@angular/router");
require("rxjs/add/operator/map");
var myGlobal = require("app/global");
var userTO_1 = require("app/user/model/userTO");
var AuthenticationService = (function () {
    function AuthenticationService(http, router) {
        this.http = http;
        this.router = router;
        this.storageUserTO = new userTO_1.UserTO();
        this.Ilogin = { isLogin: false };
    }
    //JSON.parse(localStorage.getItem('currentUser'));
    AuthenticationService.prototype.login = function (userTo) {
        var bodyString = userTo;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobal.gnLoginApi, bodyString, options) //JSON.stringify({ username: username, password: password })
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var user = response.json();
            // If you want ot store the token , then use the user.token condition
            //if (user && user.token) {
            debugger;
            if (user) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
        })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || "Server Error"); });
        //  let user = JSON.stringify({username : username,password : password});
        //return localStorage.setItem('currentUser', user);;
    };
    AuthenticationService.prototype.logout = function () {
        var _this = this;
        // remove user from local storage to log user out
        this.storageUserTO = JSON.parse(localStorage.getItem('currentUser'));
        var bodyString = JSON.stringify(this.storageUserTO); //JSON.stringify(userTo);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobal.gnLogoutApi, bodyString, options) //JSON.stringify({ username: username, password: password })
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var user = response.json();
            _this.isNotLogin();
            localStorage.removeItem('currentUser');
        })
            .catch(function (error) {
            Observable_1.Observable.throw(error.json().error || "Server Error");
            _this.isNotLogin();
            localStorage.removeItem('currentUser');
        });
    };
    AuthenticationService.prototype.isLogin = function () {
        this.Ilogin.isLogin = true;
    };
    AuthenticationService.prototype.isNotLogin = function () {
        this.Ilogin.isLogin = false;
    };
    AuthenticationService.prototype.getClientIPLocation = function () {
        var data$ = this.http.request(myGlobal.gnIpInfo) //JSON.stringify({ username: username, password: password })
            .map(function (response) { return response.json(); });
        //.catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));   
        return data$;
    };
    AuthenticationService.prototype.getUserTOFromLocalStorage = function () {
        var userTo = {};
        userTo = JSON.parse(localStorage.getItem('currentUser'));
        if (userTo == undefined || userTo == null)
            this.router.navigate(['Login']);
        this.isLogin();
        return userTo;
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        router_1.Router])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=login.services.js.map