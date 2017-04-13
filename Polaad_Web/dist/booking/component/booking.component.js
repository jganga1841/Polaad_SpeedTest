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
var quota_information_1 = require("app/quota_declaration/model/quota_information");
var common_services_1 = require("app/common/services/common.services");
var common_Information_1 = require("app/common/model/common_Information");
var agents_services_1 = require("app/agent/services/agents_services");
var address_information_1 = require("app/agent/model/address_information");
var booking_information_1 = require("../model/booking_information");
var booking_information_2 = require("../model/booking_information");
var booking_information_3 = require("../model/booking_information");
var quota_declaration_service_1 = require("app/quota_declaration/services/quota_declaration_service");
var booking_service_1 = require("../services/booking_service");
var errorMessage_1 = require("app/error/errorMessage");
var BookingComponent = (function () {
    function BookingComponent(commonServices, agentServices, quotaDeclareservices, bookingServices) {
        this.commonServices = commonServices;
        this.agentServices = agentServices;
        this.quotaDeclareservices = quotaDeclareservices;
        this.bookingServices = bookingServices;
        // commonFunc:CommonFunctions;
        //@ViewChild(CommonFunctions) private commonFunc:CommonFunctions;
        this.bookingTO = new booking_information_2.BookingTO();
        this.compQuotaRateBand = new quota_information_1.QuotaInformation;
        this.globalBookingQty = 0;
    }
    BookingComponent.prototype.onSelect = function (dealerId) {
        var commonInfo = {};
        commonInfo.Value = dealerId;
        commonInfo.Text = null;
        this.getDealerInfoOnBooking(dealerId);
    };
    BookingComponent.prototype.getMaterialList = function () {
        var _this = this;
        this.commonServices.getMaterial()
            .subscribe(function (materialList) { return _this.materialList = materialList; }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    BookingComponent.prototype.getDealerInfoOnBooking = function (selDealerId) {
        var _this = this;
        //this.dealerBookingHistLst = this.agentServices.getLastFourBookingHist();
        this.agentServices.getLastFourBookingHist(selDealerId).subscribe(function (p) { return _this.dealerBookingHistLst = p; }, function (err) { console.log(err); });
        if (this.dealerAddrInfo == null) {
            this.dealerAddrInfo = new address_information_1.AddressTO();
        }
        this.agentServices.getDealerAddrInfo(selDealerId).subscribe(function (p) { return _this.dealerAddrInfo = p; }, function (err) { console.log(err); });
        //this.dealerAddrInfo = [{PlotNo:'s-102', PinCode:123330, StreetName:'-', DistrictName:'Pune', StateName:'Maha', StateId:1, CountryId:1
        //, CountryName:'India', VillageName:'Shivane', TalukaName:'Pune', TalukaId:1, AreaName:'Garden Colney', DistrictId:1}]
        //return this.dealerAddrInfo;
        // alert(this.dealerAddrInfo.PlotNo);
    };
    BookingComponent.prototype.getDealerBookingHist = function (dealerId) {
        // this.agentServices.getLastFourBookingHist(dealerId,4).subscribe(
        //     p=>this.dealerBookingHistLst =p,
        //     err=>{console.log(err)}
        // )
    };
    BookingComponent.prototype.getDealerAddrInfo = function (dealerId) {
        // this.agentServices.getDealerAddrInfo(dealerId).subscribe(
        //     p=>this.dealerAddrInfo=p,
        //     err=>{console.log(err)}
        // )
    };
    BookingComponent.prototype.getDealerList = function () {
        //  this.commonServices.getDealerList()
        //                    .subscribe(
        //                       dealerList => this.dealerList = dealerList,
        //                      err => {
        //                     // Log errors if any
        //                     console.log(err);
        //                 });
    };
    BookingComponent.prototype.ngOnInit = function () {
        var _this = this;
        //this.dealerList = this.commonFunc.getOrgList(2);
        this.getOrgList(2);
        // this.compQuotaRateBand = 
        this.quotaDeclareservices.getCompanyQuota(3).subscribe(function (p) { return _this.compQuotaRateBand = p; }, function (err) { console.log(err); });
        //= this.quotaDeclareservices.getCompanyQuota(cnfId : number=0);
        // this.dealerAddrInfo = {PlotNo:'-', PinCode:0, StreetName:'-', DistrictName:'-', StateName:'-', StateId:1, CountryId:1
        // , CountryName:'-', VillageName:'-', TalukaName:'-', TalukaId:1, AreaName:'-', DistrictId:1 };
        this.orderDetailsTO = new booking_information_3.OrderDetailsTO(); //{OrderItem:'', orderQty:0, OrderRate:0};
        this.OrderDetailsLst = [];
        this.deliveryAddress = new booking_information_1.DeliveryAddressTO(); //{Address:'',VillageName:'', TalukaName:'', DistrictName:'', PinCode:0};
        this.deliveryAddressLst = [];
        this.getMaterialList();
        this.cdStructureList = this.commonServices.getCdstructureList();
        this.bookingTO = new booking_information_2.BookingTO();
        this.dealerAddrInfo = new address_information_1.AddressTO();
        this.materialTO = new common_Information_1.CommonInformation();
    };
    BookingComponent.prototype.getOrgList = function (OrgTypeId) {
        var _this = this;
        this.dealerList = [];
        this.commonServices.getOrgList(OrgTypeId)
            .subscribe(function (commonInfoList) { return _this.dealerList = commonInfoList; }, function (err) {
            // Log errors if any
            console.log(err);
        });
        // return this.commonInfoList;
    };
    BookingComponent.prototype.addNewOrder = function (orderDetails, materialTO) {
        this.OrderDetailsLst.push({
            'BookedItem': materialTO.Text,
            'BookedQty': orderDetails.BookedQty,
            'Rate': orderDetails.Rate,
            'MaterialId': materialTO.Value
        });
        this.orderDetailsTO = new booking_information_3.OrderDetailsTO();
        this.globalBookingQty = +this.globalBookingQty + +orderDetails.BookedQty;
    };
    BookingComponent.prototype.addNewDeliveryAddr = function (deliveryAddr) {
        this.deliveryAddressLst.push({
            'Address': deliveryAddr.Address,
            'VillageName': deliveryAddr.VillageName,
            'DistrictName': deliveryAddr.DistrictName,
            'TalukaName': deliveryAddr.TalukaName,
            'Pincode': deliveryAddr.Pincode
        });
        this.deliveryAddress = new booking_information_1.DeliveryAddressTO();
    };
    BookingComponent.prototype.bookingOrder = function () {
        var _this = this;
        var BookingOperation;
        //Promise.apply(this.errorMsg.showErrorMessage("Order Booked Successfully", "Informtion"));  
        //this.errorMsg.showErrorMessage("new order booking", "Error");      
        //alert('confirmation result : ' + this.errorMsg.isConfirmed);
        //debugger
        //alert("Infor : " + this.bookingTO.IsConfirmed + ":" +this.bookingTO.IsJointDelivery+ ":"+this.bookingTO.DeliveryDays)
        this.bookingTO.IsConfirmed = (this.bookingTO.IsConfirmed) ? 1 : 0;
        this.bookingTO.IsJointDelivery = (this.bookingTO.IsJointDelivery) ? 1 : 0;
        this.bookingTO.OrderDetailsLst = this.OrderDetailsLst;
        this.bookingTO.DeliveryAddressLst = this.deliveryAddressLst;
        this.bookingTO.BookingQty = this.globalBookingQty;
        BookingOperation = this.bookingServices.addBooking(this.bookingTO);
        BookingOperation.subscribe(function (booking) {
            if (booking == 1)
                _this.errorMsg.showErrorMessage("Order Booked Successfully", "Informtion");
            else
                _this.errorMsg.showErrorMessage("Order not Booked", "Error");
            //        alert( '<div class="alert alert-success">'+
            // '<strong>Success!</strong> Indicates a successful or positive action.</div>')
        }, function (err) { });
        // alert('count order item : ' + this.bookingTO.deliveryAddressLst.length)
    };
    return BookingComponent;
}());
__decorate([
    core_1.ViewChild(errorMessage_1.ErrorMessage),
    __metadata("design:type", errorMessage_1.ErrorMessage)
], BookingComponent.prototype, "errorMsg", void 0);
BookingComponent = __decorate([
    core_1.Component({
        selector: 'my-booking',
        //template:'<measurement_spinner></measurement_spinner>'
        templateUrl: 'app/booking/booking.html'
    }),
    __metadata("design:paramtypes", [common_services_1.CommonServices,
        agents_services_1.AgentsServices,
        quota_declaration_service_1.QuotaDeclarationService,
        booking_service_1.bookingServices])
], BookingComponent);
exports.BookingComponent = BookingComponent;
//# sourceMappingURL=booking.component.js.map