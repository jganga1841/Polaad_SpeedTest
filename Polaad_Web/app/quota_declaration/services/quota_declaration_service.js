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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
// Import RxJs required methods
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var myGlobalKey = require('app/global');
var QuotaDeclarationService = (function () {
    // Resolve HTTP using the constructor
    function QuotaDeclarationService(http) {
        this.http = http;
    }
    //Vijaymala added to get companyquota
    QuotaDeclarationService.prototype.getCompanyQuotaList = function (fromDate, toDate) {
        return this.http.get(myGlobalKey.gnGetRateDeclartionHist + fromDate + "&toDate=" + toDate)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    //  getCompanyQuota():Observable<QuotaInformation>{
    QuotaDeclarationService.prototype.getCompanyQuota = function (OrganizationId) {
        return this.http.get(myGlobalKey.gnGetTodayQuotaAndRateInfo + OrganizationId)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    //Vijaymala added to get competitor Quota
    QuotaDeclarationService.prototype.getCompetitorQuotaList = function () {
        return this.http.get(myGlobalKey.gnGetOrgList + 3 /* COMPETITORID */)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    //Vijaymala added to get C&F Quota
    QuotaDeclarationService.prototype.getCFQuotaList = function () {
        return this.http.get(myGlobalKey.gnGetOrgList + 1 /* CNFTYPEID */)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    // ijaymala added to announce C&F Quota
    QuotaDeclarationService.prototype.announceQuota = function (loginUserId, cnfannouncementQuotaLst, declaredRate, comments, rateReasonId, rateReasonDesc) {
        //alert('quota'+cnfannouncementQuotaLst.length);
        var data = {
            cnfList: cnfannouncementQuotaLst,
            declaredRate: declaredRate,
            loginUserId: loginUserId,
            comments: comments,
            rateReasonId: rateReasonId,
            rateReasonDesc: rateReasonDesc
        };
        //let bodyString = JSON.stringify(cnfannouncementQuotaLst); // Stringify payload
        var bodyString = JSON.stringify(data); // Stringify payload
        var headers = new http_1.Headers({ 'Content-Type': 'application/json;charset=utf-8' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(myGlobalKey.gnAnnounceRateAndQuota, bodyString, options) // ...using post request
            .map(function (res) { return res.json(); }) // ...and calling .json() on the response to return data
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); }); //...errors if any
    };
    QuotaDeclarationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], QuotaDeclarationService);
    return QuotaDeclarationService;
}());
exports.QuotaDeclarationService = QuotaDeclarationService;
//# sourceMappingURL=quota_declaration_service.js.map