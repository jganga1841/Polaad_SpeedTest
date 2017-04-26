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
// Imports
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
// Import RxJs required methods
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var QuotaDeclarationService = (function () {
    // Resolve HTTP using the constructor
    function QuotaDeclarationService(http) {
        this.http = http;
        // private instance variable to hold base url
        this.CommonUrl = 'http://salestrackerapi20170215061336.azurewebsites.net/api/';
    }
    QuotaDeclarationService.prototype.getCompanyQuotaList = function () {
        return this.http.get(this.CommonUrl + 'QuotaAndRate/GetRateDeclarationHistory')
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    //  getCompanyQuota():QuotaInformation{
    QuotaDeclarationService.prototype.getCompanyQuota = function (cnfId) {
        return this.http.get(this.CommonUrl + 'QuotaAndRate/GetLatestQuotaAndRateInfo?cnfId=' + cnfId)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    //service to get competitor data
    QuotaDeclarationService.prototype.getCompetitorQuotaList = function () {
        return this.http.get(this.CommonUrl + 'Organization/GetOrganizationList?orgTypeId=3')
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    QuotaDeclarationService.prototype.getCFQuotaList = function () {
        return this.http.get(this.CommonUrl + 'Organization/GetOrganizationList?orgTypeId=1')
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    // Add a new comment
    QuotaDeclarationService.prototype.announceQuota = function (cnfannouncementQuotaLst) {
        //alert('quota'+cnfannouncementQuotaLst.length);
        var data = {
            cnfList: cnfannouncementQuotaLst,
            declaredRate: 100,
            loginUserId: 1
        };
        //let bodyString = JSON.stringify(cnfannouncementQuotaLst); // Stringify payload
        var bodyString = JSON.stringify(data); // Stringify payload
        var headers = new http_1.Headers({ 'Content-Type': 'application/json;charset=utf-8' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.CommonUrl + 'QuotaAndRate/AnnounceRateAndQuota', bodyString, options) // ...using post request
            .map(function (res) { return res.json(); }) // ...and calling .json() on the response to return data
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); }); //...errors if any
    };
    return QuotaDeclarationService;
}());
QuotaDeclarationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], QuotaDeclarationService);
exports.QuotaDeclarationService = QuotaDeclarationService;
//# sourceMappingURL=quota_declaration_service.js.map