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
var Rx_1 = require("rxjs/Rx");
var myGlobalVal = require("app/global");
var LoadingConfiguratorService = (function () {
    function LoadingConfiguratorService(http) {
        this.http = http;
    }
    LoadingConfiguratorService.prototype.getLoadingConfigurator = function (prodSpecId, prodCatId) {
        return this.http.get(myGlobalVal.gnLoadingConfiguratorList + prodSpecId + "&prodCatId=" + prodCatId)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    LoadingConfiguratorService.prototype.postStockCatAndSpecDetails = function (listLoadingConfig, loginId) {
        var params = {
            loadingQuotaConfigList: listLoadingConfig,
            loginUserId: loginId
        };
        var bodyString = JSON.stringify(params);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobalVal.gnPostLoadingQuotaConfig, bodyString, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(alert(error.json().error), error.json().error || 'Server error'); });
    };
    return LoadingConfiguratorService;
}());
LoadingConfiguratorService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], LoadingConfiguratorService);
exports.LoadingConfiguratorService = LoadingConfiguratorService;
var _a;
//# sourceMappingURL=loading_configurator.service.js.map