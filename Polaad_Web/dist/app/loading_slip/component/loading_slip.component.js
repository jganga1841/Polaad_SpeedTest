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
var common_services_1 = require("app/common/services/common.services");
var booking_service_1 = require("app/booking/services/booking_service");
var booking_information_1 = require("app/booking/model/booking_information");
var LoadingSlipComponent = (function () {
    function LoadingSlipComponent(commonServices, bookingServices) {
        this.commonServices = commonServices;
        this.bookingServices = bookingServices;
    }
    LoadingSlipComponent.prototype.ngOnInit = function () {
        this.getOrgList(2);
        this.getCdStructurelist();
        this.getMaterialList();
        this.loadingMaterialSequenceTO = new booking_information_1.LoadingMaterialSequenceTO();
        this.loadingMaterialSequenceTOList = [];
    };
    LoadingSlipComponent.prototype.onSelect = function (dealerId) {
        var commonInfo = {};
        commonInfo.Value = dealerId;
        commonInfo.Text = null;
        this.getDealerLoadingInfo(commonInfo);
    };
    LoadingSlipComponent.prototype.getDealerLoadingInfo = function (commonInfo) {
        var _this = this;
        this.bookingServices.getDealersBookingList(commonInfo.Value).subscribe(function (p) { return _this.dealerBookingList = p; }, function (err) { console.log(err); });
    };
    LoadingSlipComponent.prototype.getCdStructurelist = function () {
        this.cdStructurelist = [
            { StatusDate: null, Rate: null, Confirmed: null, LoadingQty: null, CdStructure: 10 },
            { StatusDate: null, Rate: null, Confirmed: null, LoadingQty: null, CdStructure: 20 },
            { StatusDate: null, Rate: null, Confirmed: null, LoadingQty: null, CdStructure: 30 },
            { StatusDate: null, Rate: null, Confirmed: null, LoadingQty: null, CdStructure: 40 },
            { StatusDate: null, Rate: null, Confirmed: null, LoadingQty: null, CdStructure: 50 },
        ];
    };
    LoadingSlipComponent.prototype.getOrgList = function (OrgTypeId) {
        var _this = this;
        this.dealerList = [];
        this.commonServices.getOrgList(OrgTypeId)
            .subscribe(function (commonInfoList) { return _this.dealerList = commonInfoList; }, function (err) {
            // Log errors if any
            console.log(err);
        });
        // return this.commonInfoList;
    };
    LoadingSlipComponent.prototype.getMaterialList = function () {
        var _this = this;
        this.commonServices.getMaterial()
            .subscribe(function (materialList) { return _this.materialList = materialList; }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    LoadingSlipComponent.prototype.addNewLoadingSeqQty = function (loadingMaterialSequenceTO, MaterialTO) {
        this.loadingMaterialSequenceTOList.push({
            'LoadingItem': MaterialTO.Text,
            'SeqLoadingQty': loadingMaterialSequenceTO.SeqLoadingQty,
            'MaterialId': MaterialTO.Value,
            'SequenceNo': loadingMaterialSequenceTO.SequenceNo,
        });
    };
    return LoadingSlipComponent;
}());
LoadingSlipComponent = __decorate([
    core_1.Component({
        selector: 'loading-slip',
        // template:'<h1>Hello</h1>'
        templateUrl: 'app/loading_slip/loading_slip.html'
    }),
    __metadata("design:paramtypes", [common_services_1.CommonServices, booking_service_1.bookingServices])
], LoadingSlipComponent);
exports.LoadingSlipComponent = LoadingSlipComponent;
//# sourceMappingURL=loading_slip.component.js.map