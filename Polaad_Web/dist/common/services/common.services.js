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
var CommonServices = (function () {
    function CommonServices(http) {
        this.http = http;
        this.CommonUrl = 'http://salestrackerapi20170215061336.azurewebsites.net/api/';
    }
    //getDealerList():CommonInformation[]{   
    CommonServices.prototype.getOrgList = function (orgTypeId) {
        return this.http.get(this.CommonUrl + 'Organization/GetOrganizationDropDownList?orgTypeId=' + orgTypeId)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
        // return this.dealerList = [
        //     {Text :'Select Dealer', Value:0}
        //     , {Text :'Prakash K.', Value:1}
        //     , {Text :'Jayesh K.', Value:2}
        //     ]; 
    };
    CommonServices.prototype.getCdstructureList = function () {
        return [{ Value: 1, Text: '1' }, { Value: 1, Text: '2' }, { Value: 1, Text: '3' }, { Value: 1, Text: '4' }, { Value: 1, Text: '5' },
            { Value: 1, Text: '6' }, { Value: 1, Text: '7' }, { Value: 1, Text: '8' }, { Value: 1, Text: '9' }, { Value: 1, Text: '10' }, { Value: 1, Text: '11' },
            { Value: 1, Text: '12' }, { Value: 1, Text: '13' }, { Value: 1, Text: '14' }, { Value: 1, Text: '15' }, { Value: 1, Text: '16' }, { Value: 1, Text: '17' },
            { Value: 1, Text: '18' }, { Value: 1, Text: '19' }, { Value: 1, Text: '20' }];
    };
    CommonServices.prototype.getMaterial = function () {
        return this.http.get(this.CommonUrl + 'Material/GetMaterialDropDownList')
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
    return CommonServices;
}());
CommonServices = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CommonServices);
exports.CommonServices = CommonServices;
//# sourceMappingURL=common.services.js.map