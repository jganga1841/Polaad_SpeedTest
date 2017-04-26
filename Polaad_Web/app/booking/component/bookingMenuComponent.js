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
var common_services_1 = require('app/common/services/common.services');
var booking_information_1 = require('app/booking/model/booking_information');
var errorMessage_1 = require('app/error/errorMessage');
var userTO_1 = require('app/user/model/userTO');
var myGlobalVal = require('app/global');
var confirm_service_1 = require('app/error/confirm.service');
var login_services_1 = require('app/login/login.services');
var booking_service_1 = require('../services/booking_service');
var sharedService_1 = require('app/common/services/sharedService');
var BookingMenuComponent = (function () {
    function BookingMenuComponent(commonServices, _confirmService, loginService, bookingServices, ss) {
        this.commonServices = commonServices;
        this._confirmService = _confirmService;
        this.loginService = loginService;
        this.bookingServices = bookingServices;
        this.ss = ss;
        this.bookingActionsTO = new booking_information_1.BookingActionsTO();
        this.userTO = new userTO_1.UserTO();
        this.isDirector = false;
        this.isShowForCnF = false;
        this.isClosed = false;
    }
    BookingMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ss.showLoader();
        debugger;
        this.userTO = this.loginService.getUserTOFromLocalStorage();
        if (this.userTO != null || this.userTO != undefined) {
            this.userTO.UserRoleList.forEach(function (c) {
                debugger;
                if (c.RoleId == myGlobalVal.UserRole.C_AND_F_AGENT) {
                    _this.isShowForCnF = true;
                    _this.ss.hideLoader();
                }
                else {
                    _this.isShowForCnF = false;
                    _this.ss.hideLoader();
                }
                if (c.RoleId == myGlobalVal.UserRole.DIRECTOR || c.RoleId == myGlobalVal.UserRole.SYSTEM_ADMIN) {
                    _this.isDirector = true;
                    _this.getBookingOpenCloseInfo();
                }
                else {
                    _this.isDirector = false;
                }
            });
        }
    };
    BookingMenuComponent.prototype.closeBooking = function () {
        var _this = this;
        var BookingCloseOperation;
        this.bookingActionsTO.BookingStatus = "CLOSE";
        this.bookingActionsTO.StatusBy = this.userTO.IdUser;
        this.loginUserId = this.userTO.IdUser;
        BookingCloseOperation = this.commonServices.closeBooking(this.bookingActionsTO, this.loginUserId);
        this.ss.showLoader();
        BookingCloseOperation.subscribe(function (bookingClose) {
            if (bookingClose.Result == 1 && bookingClose.MessageType == myGlobalVal.ResultMessageE.Information) {
                _this.errorMsg.showErrorMessage("Booking  Closed Successfully", "Information");
                _this.ss.hideLoader();
            }
            else {
                _this.errorMsg.showErrorMessage("Booking  Not Closed", "Error");
                _this.ss.hideLoader();
            }
        }, function (err) { _this.ss.hideLoader(); });
    };
    BookingMenuComponent.prototype.showConfirmDialog = function () {
        var _this = this;
        var warningmsg;
        warningmsg = "Do You Want To Close The Booking?";
        this._confirmService.activate(warningmsg, "Confirmation")
            .then(function (res) {
            if (res) {
                _this.closeBooking();
            }
            else {
            }
        });
        return false;
    };
    BookingMenuComponent.prototype.getBookingOpenCloseInfo = function () {
        var _this = this;
        this.bookingServices.getBookinOpenCloseInfo()
            .subscribe(function (bookingActionsTO) {
            _this.bookingActionsTO = bookingActionsTO;
            if (_this.bookingActionsTO != null || _this.bookingActionsTO != undefined) {
                if (_this.bookingActionsTO.BookingStatus == "CLOSE") {
                    _this.isClosed = true;
                    _this.ss.hideLoader();
                }
                else {
                    _this.isClosed = false;
                }
            }
        }, function (err) {
            _this.ss.hideLoader();
            // Log errors if any
            console.log(err);
        });
        return this.isClosed;
    };
    __decorate([
        core_1.ViewChild(errorMessage_1.ErrorMessage), 
        __metadata('design:type', errorMessage_1.ErrorMessage)
    ], BookingMenuComponent.prototype, "errorMsg", void 0);
    BookingMenuComponent = __decorate([
        core_1.Component({
            selector: 'my-bookingMenus',
            templateUrl: 'app/booking/bookingMenuUI.html'
        }), 
        __metadata('design:paramtypes', [common_services_1.CommonServices, confirm_service_1.ConfirmService, login_services_1.AuthenticationService, booking_service_1.bookingServices, sharedService_1.sharedService])
    ], BookingMenuComponent);
    return BookingMenuComponent;
}());
exports.BookingMenuComponent = BookingMenuComponent;
//# sourceMappingURL=bookingMenuComponent.js.map