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
var LoadingServices = (function () {
    function LoadingServices(http) {
        this.http = http;
    }
    LoadingServices.prototype.addLoading = function (loadingTO, loginUserID) {
        debugger;
        var params = {
            loadingSlipTO: loadingTO,
            loginUserId: loginUserID
        };
        var bodyString = JSON.stringify(params);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobalVal.gnNewLoadingSlip, bodyString, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(alert(error.json().error), error.json().error || 'Server error'); });
    };
    LoadingServices.prototype.loadingSlipList = function (cnfId, loadingStatusId, fromDate, toDate) {
        //alert('v S : ' + myGlobalVal.gnLoadingSlipList)
        //return this.http.get(myGlobalVal.gnLoadingSlipList +cnfId+"&loadingStatusId=" +loadingStatusId+"&fromDate​ ="+fromDate​+"&toDate="+toDate)
        //return this.http.get(myGlobalVal.gnLoadingSlipList + cnfId + "&loadingStatusId=" + loadingStatusId + "&fromDate="+fromDate +"&toDate="+toDate)
        return this.http.get(myGlobalVal.gnGetLoadingSlipList + cnfId + "&loadingStatusId=" + loadingStatusId + "&fromDate=" + fromDate + "&toDate=" + toDate)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    LoadingServices.prototype.todaysLoadingSlipList = function (cnfId, loadingStatusId) {
        //alert('v S : ' + myGlobalVal.gnLoadingSlipList)
        //return this.http.get(myGlobalVal.gnLoadingSlipList +cnfId+"&loadingStatusId=" +loadingStatusId)
        return this.http.get(myGlobalVal.gnGetLoadingSlipList + cnfId + "&loadingStatusId=" + loadingStatusId)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    LoadingServices.prototype.getLoadingToById = function (idLoading) {
        return this.http.get(myGlobalVal.gnLoadingToById + idLoading)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    /*[GJ]@20170307 : Get the the Loading Status Reasons*/
    LoadingServices.prototype.getLoadStatusReason = function (statusId) {
        return this.http.get(myGlobalVal.gnGetStatusReasons + statusId)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    LoadingServices.prototype.postStatusReasonService = function (loadingTo, loginUserId) {
        var params = {
            loadingTO: loadingTo,
            loginUserId: loginUserId
        };
        var bodyString = JSON.stringify(params);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobalVal.gnPostStatusWithReason, bodyString, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(alert(error.json().error), error.json().error || 'Server error'); });
    };
    LoadingServices.prototype.getDeliveryAddrById = function (OrderId) {
        return this.http.get(myGlobalVal.gnDeliveryAddrList + OrderId)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    LoadingServices.prototype.getLoadingQuota = function (ProdSpecId, ProdCatId) {
        return this.http.get(myGlobalVal.gnGetLoadingQuota + ProdSpecId + "&prodCatId=" + ProdCatId)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    LoadingServices.prototype.postLoadingQuotaDeclaration = function (listLoadingQuota, loginId) {
        var params = {
            loadingQuotaDeclarationTOList: listLoadingQuota,
            loginUserId: loginId
        };
        var bodyString = JSON.stringify(params);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobalVal.gnPostLoadingQuotaDeclaration, bodyString, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(alert(error.json().error), error.json().error || 'Server error'); });
    };
    LoadingServices.prototype.isLoadingQuotaDeclaredToday = function () {
        return this.http.get(myGlobalVal.gnIsLoadingQuotaDeclaredToday)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    LoadingServices.prototype.isDelaredTodayLoadingQuota = function () {
        return this.http.get(myGlobalVal.gnIsDeclaredTodayLoadingQuota)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    LoadingServices.prototype.getStockSummaryDet = function (ProdSpecId, ProdCatId) {
        return this.http.get(myGlobalVal.gnGetStockSummaryAgainestCatSpec + ProdSpecId + "&prodCatId=" + ProdCatId)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    LoadingServices.prototype.isLoadingQuotaConfirmed = function () {
        return this.http.get(myGlobalVal.gnIsLoadingQuotaConfirmed)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    LoadingServices.prototype.getProductStockList = function (loadingSlipTO, proCategoryID, prodSpecId) {
        return this.http.get(myGlobalVal.gnGetLoadingSlipExtList
            + loadingSlipTO.TblLoadingSlipDtlTO.IdBooking + '&prodCatId=' + proCategoryID + '&prodSpecId=' + prodSpecId)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    LoadingServices.prototype.getCnfDeclaredLoadingQuota = function (cnfOrgId) {
        return this.http.get(myGlobalVal.gnGetCnfDecLoadingQuota + cnfOrgId)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    LoadingServices.prototype.getInOutloadingSlipList = function (statusId) {
        //alert('v S : ' + myGlobalVal.gnLoadingSlipList)
        return this.http.get(myGlobalVal.getInOutloadingSlipList + statusId)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    LoadingServices.prototype.getSuperwisorListForDropDown = function () {
        return this.http.get(myGlobalVal.gnGetSuperwisorListForDropDown)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    LoadingServices.prototype.postAllocateSupervisor = function (loadingTo, loginUserId) {
        var params = {
            loadingTO: loadingTo,
            loginUserId: loginUserId
        };
        var bodyString = JSON.stringify(params);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobalVal.gnPostAllocateSupervisor, bodyString, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(alert(error.json().error), error.json().error || 'Server error'); });
    };
    LoadingServices.prototype.getVehicleNoList = function () {
        return this.http.get(myGlobalVal.gnGetVehicleNumberList)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    return LoadingServices;
}());
LoadingServices = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], LoadingServices);
exports.LoadingServices = LoadingServices;
var _a;
//# sourceMappingURL=loading_service.js.map