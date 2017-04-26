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
var myGlobalVal = require('app/global');
var CommonServices = (function () {
    function CommonServices(http) {
        this.http = http;
    }
    //getDealerList():CommonInformation[]{   
    CommonServices.prototype.getOrgList = function (orgTypeId) {
        return this.http.get(myGlobalVal.gnGetOrgListForDDL + orgTypeId)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    /*[GJ]@20170307 : get the dealer list againest*/
    CommonServices.prototype.getDealerList = function (cnfId) {
        return this.http.get(myGlobalVal.gnDealerList + cnfId)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    CommonServices.prototype.getNoOfDeliveries = function () {
        return [{ Value: 1, Text: '1' }, { Value: 2, Text: '2' }, { Value: 3, Text: '3' }, { Value: 4, Text: '4' },
            { Value: 5, Text: '5' }];
    };
    CommonServices.prototype.getMaterial = function () {
        return this.http.get(myGlobalVal.gnGetMaterilaForDDL)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    CommonServices.prototype.getQuotaInfo = function () {
        this.quotaInfo.QuotaAllocDate = new Date();
        this.quotaInfo.RateBand = 122;
        return this.quotaInfo;
    };
    CommonServices.prototype.getDealerAddressDetails = function () {
        return "";
    };
    CommonServices.prototype.getMaterialList = function () {
        return this.materialList = [
            { Text: 'Select Material', Value: 0 },
            { Text: '8 MM', Value: 1 },
            { Text: '12 MM', Value: 2 }
        ];
        //   return this.http.get(this.CommonUrl + 'task/GetProjects')
        //                  .map((res:Response)=>res.json())
        //                  //...errors if any
        //                  .catch((error:any)=>Observable.throw(error.json().error|| 'Server error'));
    };
    CommonServices.prototype.getQuotaValidDurationList = function () {
        return [{ Value: 1, Text: '0' }, { Value: 1, Text: '15' }, { Value: 2, Text: '30' }, { Value: 3, Text: '45' }, { Value: 4, Text: '60' }];
    };
    CommonServices.prototype.isNumber = function (evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode != 46 && (charCode < 48 || charCode > 57))) {
            return false;
        }
        else {
            return true;
        }
    };
    CommonServices.prototype.getBookingStatus = function (txnTypeId) {
        return this.http.get(myGlobalVal.gnGetBookingStatus + '?txnTypeId=' + txnTypeId)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    //[08-03-2017]Vijaymala Added to get Rate Reason List
    //  getCompanyQuota():QuotaInformation{
    CommonServices.prototype.getRateReason = function () {
        return this.http.get(myGlobalVal.gnGetReasonList)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    //[14-03-2017]Vijaymala Added to display Delivery Days List
    //   getDeliveryPeriodList():CommonInformation[]{
    //     return [{Value:1, Text:"1"},{Value:2, Text:"2"},{Value:3, Text:"3"},{Value:4, Text:"4"},{Value:5, Text:"5"}
    //     ,{Value:6, Text:"6"},{Value:7, Text:"7"},{Value:7, Text:"8"},{Value:7, Text:"9"},{Value:7, Text:"10"}];
    // }
    //[17/03/2017]Vijaya added to get cdStructure list,delivery period list,district list
    CommonServices.prototype.getCdstructureList = function () {
        return this.http.get(myGlobalVal.gnGetCdStructureList)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    CommonServices.prototype.getDeliveryPeriodList = function () {
        return this.http.get(myGlobalVal.gnGetDeliveryPeriodList)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    //[27/02/2017]Vijaymala added to submit  for director confirmation/C&F approved beyond quota and rate band 
    CommonServices.prototype.closeBooking = function (bookingActionsTO, loginUserId) {
        //debugger
        var params = {
            bookingActionsTO: bookingActionsTO,
            loginUserId: loginUserId
        };
        var bodyString = JSON.stringify(params);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobalVal.gnPostBookingClosure, bodyString, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(alert(error.json().error), error.json().error || 'Server error'); });
    };
    CommonServices.prototype.getLocationtList = function () {
        return this.getListForDropDown(myGlobalVal.gnLocationList);
    };
    CommonServices.prototype.getCompartmentList = function (locationId) {
        return this.getListForDropDown(myGlobalVal.gnCompartmentList + locationId);
    };
    CommonServices.prototype.getProductCatList = function () {
        return this.getListForDropDown(myGlobalVal.gnMaterialTypeList);
    };
    CommonServices.prototype.getMaterialSepc = function () {
        return this.getListForDropDown(myGlobalVal.gnMaterialSpecList);
    };
    CommonServices.prototype.getListForDropDown = function (apiUrl) {
        return this.http.get(apiUrl)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    CommonServices = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CommonServices);
    return CommonServices;
}());
exports.CommonServices = CommonServices;
//# sourceMappingURL=common.services.js.map