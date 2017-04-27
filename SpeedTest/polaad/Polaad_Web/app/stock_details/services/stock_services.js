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
var StockDetailsServices = (function () {
    function StockDetailsServices(http) {
        this.http = http;
    }
    StockDetailsServices.prototype.getProductStockList = function (stockDetailTO) {
        return this.http.get(myGlobalVal.gnStockMatAndSpecList + stockDetailTO.CompartmentId + '&prodCatId=' + stockDetailTO.ProdCatId)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    StockDetailsServices.prototype.postStockCatAndSpecDetails = function (stockSummaryTo, loginId) {
        var params = {
            stockSummaryTO: stockSummaryTo,
            loginUserId: loginId
        };
        var bodyString = JSON.stringify(params);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobalVal.gnPostMateAndSpecsList, bodyString, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(alert(error.json().error), error.json().error || 'Server error'); });
    };
    StockDetailsServices.prototype.getStockSummaryDetails = function (stockDate) {
        return this.http.get(myGlobalVal.gnGetStockSummaryDetails + stockDate)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    StockDetailsServices.prototype.postStockSummaryDetails = function (stockSummaryToList, loginId) {
        var params = {
            sizeSpecWiseStockTOList: stockSummaryToList,
            loginUserId: loginId
        };
        var bodyString = JSON.stringify(params);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobalVal.gnPostStockSummaryConfirmation, bodyString, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(alert(error.json().error), error.json().error || 'Server error'); });
    };
    StockDetailsServices.prototype.postRunningSizeDetails = function (runningSizesTOList, loginId) {
        var params = {
            runningSizesTOList: runningSizesTOList,
            loginUserId: loginId
        };
        var bodyString = JSON.stringify(params);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobalVal.gnPostRunningSizeList, bodyString, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(alert(error.json().error), error.json().error || 'Server error'); });
    };
    StockDetailsServices.prototype.getDailyRunningSizeList = function (runningSizestockDate) {
        return this.http.get(myGlobalVal.gnGetDatewiseRunningSizeDtls + runningSizestockDate)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    StockDetailsServices.prototype.getLastUpdatedStockDate = function (stockDetailTO) {
        return this.http.get(myGlobalVal.gnGetLastUpdatedStockDate + stockDetailTO.CompartmentId + '&prodCatId=' + stockDetailTO.ProdCatId)
            .map(function (o) { return o.text(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    StockDetailsServices.prototype.IsLoadingQuotaDeclaredForTheDate = function () {
        return this.http.get(myGlobalVal.gnIsLoadingQuotaConfirmed)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    return StockDetailsServices;
}());
StockDetailsServices = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], StockDetailsServices);
exports.StockDetailsServices = StockDetailsServices;
//# sourceMappingURL=stock_services.js.map