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
var booking_service_1 = require("../services/booking_service");
var common_services_1 = require("app/common/services/common.services");
var ViewBookinComponent = (function () {
    function ViewBookinComponent(commonServices, bookingServices) {
        this.commonServices = commonServices;
        this.bookingServices = bookingServices;
        this.cnfOrgId = 0;
    }
    ViewBookinComponent.prototype.viewPendingBookingList = function (dealerId, cnfId) {
        var _this = this;
        if (cnfId === void 0) { cnfId = 0; }
        this.bookingServices.viewBooking(cnfId, dealerId).subscribe(function (p) { return _this.bookingToLst = p; }, function (err) {
            console.log(err);
        });
    };
    ViewBookinComponent.prototype.getDealerList = function (orgTypeId) {
        var _this = this;
        this.commonServices.getOrgList(orgTypeId)
            .subscribe(function (commonInfoList) { return _this.dealerList = commonInfoList; }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    ViewBookinComponent.prototype.getcnfList = function (orgTypeId) {
        var _this = this;
        this.commonServices.getOrgList(orgTypeId)
            .subscribe(function (commonInfoList) { return _this.cnfList = commonInfoList; }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    ViewBookinComponent.prototype.onddlDelaerChage = function (dealerId) {
        this.viewPendingBookingList(dealerId, this.cnfOrgId);
    };
    ViewBookinComponent.prototype.ngOnInit = function () {
        this.getDealerList(2);
        this.getcnfList(1);
        this.bookingToLst = [];
    };
    return ViewBookinComponent;
}());
ViewBookinComponent = __decorate([
    core_1.Component({
        selector: 'view-booking',
        //template:'<measurement_spinner></measurement_spinner>'
        templateUrl: 'app/booking/viewBooking.html'
    }),
    __metadata("design:paramtypes", [common_services_1.CommonServices,
        booking_service_1.bookingServices])
], ViewBookinComponent);
exports.ViewBookinComponent = ViewBookinComponent;
//# sourceMappingURL=viewBooking.component.js.map