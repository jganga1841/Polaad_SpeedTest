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
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
// import {MarketTrendTO} from '../model/market_trend_information'
var myGlobalVal = require('app/global');
var MarketTrendServices = (function () {
    function MarketTrendServices(http) {
        this.http = http;
    }
    MarketTrendServices.prototype.addMarketTrendUpdate = function (competitorUpdatesTOList, loginUserId) {
        //debugger
        var params = {
            competitorUpdatesTOList: competitorUpdatesTOList,
            loginUserId: loginUserId,
        };
        var bodyString = JSON.stringify(params);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobalVal.gnPostMarketTrend, bodyString, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(alert(error.json().error), error.json().error || 'Server error'); });
    };
    //Vijaymala Added to get market update to director[2017/03/23]
    MarketTrendServices.prototype.getMarketUpdate = function (fromDate, toDate) {
        return this.http.get(myGlobalVal.gnGetMarketUpdate + fromDate + "&toDate=" + toDate)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    MarketTrendServices = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], MarketTrendServices);
    return MarketTrendServices;
}());
exports.MarketTrendServices = MarketTrendServices;
//# sourceMappingURL=market_trend_service.js.map