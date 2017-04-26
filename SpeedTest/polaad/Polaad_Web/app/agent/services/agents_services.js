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
var Rx_1 = require("rxjs/Rx");
var http_1 = require("@angular/http");
var myGlobalConst = require("app/global");
var AgentsServices = (function () {
    function AgentsServices(http) {
        this.http = http;
    }
    //getDealerAddrInfo(dealerId : number):AddressTO{
    AgentsServices.prototype.getDealerAddrInfo = function (dealerId) {
        var params = { orgId: dealerId };
        var bodyString = JSON.stringify(params);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(myGlobalConst.gnGetOrgAddrInfo + dealerId)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
        // this.dealerAddrInfo.AreaName = "Garden Colney";
        // this.dealerAddrInfo.StreetName = "NH Highway";
        // this.dealerAddrInfo.PinCode = 123456;
        // this.dealerAddrInfo.CountryName = "India";
        // this.dealerAddrInfo.StateName = "Maharshtra";
        // this.dealerAddrInfo.TalukaName = "Pune";
        // this.dealerAddrInfo.DistrictName = "Pune";
        // this.dealerAddrInfo.VillageName = "Shivane";
        // this.dealerAddrInfo.StateId = 1;
        // this.dealerAddrInfo.CountryId = 2;
        // this.dealerAddrInfo.PlotNo = "Shivane";
        // this.dealerAddrInfo.TalukaId = 3;
        // this.dealerAddrInfo.DistrictId = 2;        
        // return this.dealerAddrInfo;
    };
    //getLastFourBookingHist() :BookingTO[]{
    AgentsServices.prototype.getLastFourBookingHist = function (dealerId, lastNRecords) {
        if (lastNRecords === void 0) { lastNRecords = 4; }
        var params = { lastNRecords: lastNRecords, dealerId: dealerId };
        var bodyString = JSON.stringify(params);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(myGlobalConst.gnGetDealerBookingHist + dealerId + '&lastNRecords=' + lastNRecords)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
        // return this.bookingInfoList = [];
        //     return this.bookingInfoList = [
        //         {DealerId :1, BookingDate: new Date(), BookingQty:100, BookingRate:450, DeliveryDays:10, NoOfDeliveries:1}
        //         , {DealerId :2, BookingDate: new Date(), BookingQty:120, BookingRate:470, DeliveryDays:10, NoOfDeliveries:1,OrderDetailsInfo: null}
        //         , {DealerId :3, BookingDate: new Date(), BookingQty:140, BookingRate:450, DeliveryDays:10, NoOfDeliveries:1,OrderDetailsInfo: null}
        //         , {DealerId :4, BookingDate: new Date(), BookingQty:10, BookingRate:460, DeliveryDays:10, NoOfDeliveries:1,OrderDetailsInfo: null}
        //         ];
    };
    return AgentsServices;
}());
AgentsServices = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], AgentsServices);
exports.AgentsServices = AgentsServices;
var _a;
//# sourceMappingURL=agents_services.js.map