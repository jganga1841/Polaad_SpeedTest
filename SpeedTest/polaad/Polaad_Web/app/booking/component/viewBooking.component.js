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
var booking_information_1 = require("../model/booking_information");
var common_services_1 = require("app/common/services/common.services");
var router_1 = require("@angular/router");
var confirm_service_1 = require("app/error/confirm.service");
var errorMessage_1 = require("app/error/errorMessage");
var myGlobalVal = require("app/global");
var contextMenu_service_1 = require("angular2-contextmenu/src/contextMenu.service");
var common_1 = require("@angular/common");
var login_services_1 = require("app/login/login.services");
var sharedService_1 = require("app/common/services/sharedService");
var ViewBookinComponent = (function () {
    function ViewBookinComponent(router, commonServices, bookingServices, _confirmService, contextMenuService, loginService, ss, route) {
        var _this = this;
        this.router = router;
        this.commonServices = commonServices;
        this.bookingServices = bookingServices;
        this._confirmService = _confirmService;
        this.contextMenuService = contextMenuService;
        this.loginService = loginService;
        this.ss = ss;
        this.fullurl = (window.location.href);
        this.defaultStr = 'Select ';
        this.isDirector = false;
        this.isCF = false;
        this.isVisible = false;
        this.isReject = false;
        this.isBookingBack = false;
        this.isView = false;
        this.dealerId = 0;
        this.cnfOrgId = 0;
        this.statusId = 0;
        this.toDate = new Date();
        this.fromDate = new Date();
        this.ignoredFirstEvent = false;
        this.isShowCnFLst = false;
        this.isQtyReason = false;
        this.isRateReason = false;
        this.isDeliveryDays = false;
        this.menuOptions = [
            {
                html: function () { return 'View'; },
                click: function (bookingTO, $event) {
                    //   this.router.navigate(['./ViewParticularBooking']);
                    localStorage.setItem('bookingTO', JSON.stringify(bookingTO));
                    _this.isBookingBack = true;
                    _this.isView = true;
                    localStorage.setItem('isBookingBack', JSON.stringify(_this.isBookingBack));
                },
            },
            {
                html: function () { return 'Edit'; },
                click: function (bookingTO, $event) {
                    _this.editBooking(bookingTO);
                    false;
                    _this.isBookingBack = true;
                    localStorage.setItem('bookingId', JSON.stringify(bookingTO.IdBooking));
                },
            },
            {
                html: function () { return 'Delete'; },
                click: function (bookingTO, $event) {
                    _this.showConfirmDialogToDeleteBookingOrder(bookingTO);
                },
            },
        ];
        this.bookingmenuOptions = [
            {
                html: function () { return 'Accept'; },
                click: function (bookingTO, $event) {
                    _this.isReject = false;
                    _this.showConfirmDialog(bookingTO, _this.isReject);
                },
            },
            {
                html: function () { return 'Reject'; },
                click: function (bookingTO, $event) {
                    _this.isReject = true;
                    _this.showConfirmDialog(bookingTO, _this.isReject);
                },
            },
        ];
        this.initvalue = this.fromDate;
        this.ScreenName = route.snapshot.data[0]['ScreenName'],
            this.userTO = this.loginService.getUserTOFromLocalStorage();
        if (this.userTO != null || this.userTO != undefined) {
            this.loginUserId = this.userTO.IdUser;
        }
        this.initializePage();
    }
    ViewBookinComponent.prototype.initializePage = function () {
        var _this = this;
        switch (this.ScreenName) {
            case myGlobalVal.ScreenName.ViewBooking.toString():
                this.ss.showLoader();
                this.isDirector = false;
                this.isCF = false;
                this.userTO = this.loginService.getUserTOFromLocalStorage();
                if (this.userTO != null || this.userTO != undefined) {
                    this.userTO.UserRoleList.forEach(function (c) {
                        if (c.RoleId == myGlobalVal.UserRole.C_AND_F_AGENT) {
                            _this.isShowCnFLst = false;
                            _this.cnfOrgId = _this.userTO.OrganizationId;
                        }
                        else {
                            _this.getcnfList(1 /* CNFTYPEID */);
                            _this.isShowCnFLst = true;
                        }
                    });
                }
                this.viewPendingBookingList(this.cnfOrgId, this.dealerId, this.statusId);
                break;
            case myGlobalVal.ScreenName.BookingConfirmation.toString():
                this.ss.showLoader();
                if (this.userTO != null || this.userTO != undefined) {
                    this.userTO.UserRoleList.forEach(function (c) {
                        if (c.RoleId == myGlobalVal.UserRole.DIRECTOR || c.RoleId == myGlobalVal.UserRole.SYSTEM_ADMIN) {
                            _this.isDirector = true;
                            _this.isCF = false;
                            _this.isShowCnFLst = true;
                            _this.getcnfList(1 /* CNFTYPEID */);
                            _this.viewConfirmationBookingList();
                        }
                    });
                }
                break;
            case myGlobalVal.ScreenName.BookingConfirmationByCnF.toString():
                this.ss.showLoader();
                if (this.userTO != null || this.userTO != undefined) {
                    this.userTO.UserRoleList.forEach(function (c) {
                        if (c.RoleId == myGlobalVal.UserRole.C_AND_F_AGENT) {
                            _this.isShowCnFLst = false;
                            _this.isDirector = false;
                            _this.isCF = true;
                            _this.viewPendingBookingsForAcceptance(_this.userTO.OrganizationId);
                        }
                    });
                }
                break;
            default:
                // this.headMessage = "View Loading Slip";
                break;
        }
    };
    ViewBookinComponent.prototype.isnull = function (cnfOrgId, dealerId, statusId) {
        if (dealerId == null) {
            this.dealerId = 0;
        }
        if (cnfOrgId == null) {
            this.cnfOrgId = 0;
        }
        if (statusId == null) {
            this.statusId = 0;
        }
    };
    ViewBookinComponent.prototype.viewPendingBookingList = function (cnfOrgId, dealerId, statusId) {
        var _this = this;
        this.isnull(cnfOrgId, dealerId, statusId);
        this.bookingServices.viewBooking(cnfOrgId, dealerId, statusId).subscribe(function (p) {
            debugger;
            _this.bookingToLst = p;
            _this.tempbookingToLst = p;
            if (_this.userTO.UserRoleList[0].RoleId == myGlobalVal.UserRole.C_AND_F_AGENT) {
                _this.tempbookingToLst = p.filter(function (c) { return c.StatusId == 2 /* Approved */ && c.CnFOrgId == _this.userTO.OrganizationId; });
            }
            else {
                _this.tempbookingToLst = p.filter(function (c) { return c.StatusId == 2 /* Approved */; });
            }
            _this.dealerId = dealerId;
            _this.ss.hideLoader();
        }, function (err) {
            _this.ss.hideLoader();
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
    //[7/3/2017]Vijaymala added to fill booking status dropdown
    ViewBookinComponent.prototype.getBookingStatusList = function (txnTypeId) {
        var _this = this;
        this.commonServices.getBookingStatus(txnTypeId)
            .subscribe(function (commonInfoList) { return _this.txnTypeList = commonInfoList; }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    ViewBookinComponent.prototype.onddlDelaerChage = function (dealerId) {
        this.dealerId = dealerId;
        this.callBookingListFilter(this.dealerId, this.cnfOrgId, this.statusId);
    };
    ViewBookinComponent.prototype.callBookingListFilter = function (dealerId, cnfOrgId, statusId) {
        this.isnull(cnfOrgId, dealerId, statusId);
        if (cnfOrgId == 0 && dealerId == 0 && statusId == 0)
            this.tempbookingToLst = this.bookingToLst;
        else if (cnfOrgId > 0 && dealerId == 0 && statusId == 0)
            this.tempbookingToLst = this.bookingToLst.filter(function (c) { return c.CnFOrgId == cnfOrgId; });
        else if (dealerId > 0 && cnfOrgId == 0 && statusId == 0)
            this.tempbookingToLst = this.bookingToLst.filter(function (c) { return c.DealerOrgId == dealerId; });
        else if (dealerId == 0 && cnfOrgId == 0 && statusId > 0)
            this.tempbookingToLst = this.bookingToLst.filter(function (c) { return c.StatusId == statusId; });
        else if (cnfOrgId > 0 && dealerId > 0 && statusId == 0)
            this.tempbookingToLst = this.bookingToLst.filter(function (c) { return c.CnFOrgId == cnfOrgId && c.DealerOrgId == dealerId; });
        else if (cnfOrgId == 0 && dealerId > 0 && statusId > 0)
            this.tempbookingToLst = this.bookingToLst.filter(function (c) { return c.DealerOrgId == dealerId && c.StatusId == statusId; });
        else if (cnfOrgId > 0 && dealerId == 0 && statusId > 0)
            this.tempbookingToLst = this.bookingToLst.filter(function (c) { return c.CnFOrgId == cnfOrgId && c.StatusId == statusId; });
        else if (cnfOrgId > 0 && dealerId > 0 && statusId > 0)
            this.tempbookingToLst = this.bookingToLst.filter(function (c) { return c.CnFOrgId == cnfOrgId && c.DealerOrgId == dealerId && c.StatusId == statusId; });
    };
    //[7/3/2017]Vijaymala added to get dealerlist of specific C&F
    ViewBookinComponent.prototype.onddlCnFChage = function (cnfOrgId) {
        this.cnfOrgId = cnfOrgId;
        this.getDealerListAccToCnF(cnfOrgId);
        this.callBookingListFilter(this.dealerId, cnfOrgId, this.statusId);
    };
    //[7/3/2017]Vijaymala added to get dealerlist of specific C&F
    ViewBookinComponent.prototype.getDealerListAccToCnF = function (cnfId) {
        var _this = this;
        this.commonServices.getDealerList(cnfId)
            .subscribe(function (commonInfoList) { return _this.dealerList = commonInfoList; }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    //[7/3/2017]Vijaymala added to get pending bookinglist
    ViewBookinComponent.prototype.onddlstatusChage = function (statusId) {
        this.statusId = statusId;
        this.callBookingListFilter(this.dealerId, this.cnfOrgId, this.statusId);
    };
    ViewBookinComponent.prototype.onddlConfirmstatusChage = function (isConfirmed) {
        this.callBookingListFilter(this.dealerId, this.cnfOrgId, this.statusId);
        this.tempbookingToLst = this.tempbookingToLst.filter(function (c) { return c.IsConfirmed == isConfirmed; });
    };
    ViewBookinComponent.prototype.ngOnInit = function () {
        debugger;
        this.fromDate.setHours(12, 0, 0, 0);
        this.bookingTo = new booking_information_1.BookingTO();
        this.bookingTo.DealerOrgId = this.dealerId;
        this.getDealerListAccToCnF(this.userTO.OrganizationId);
        this.txnTypeId = 1 /* BOOKING */;
        this.getBookingStatusList(this.txnTypeId);
        this.bookingToLst = [];
        if (this.isDirector || this.isCF) {
            this.isVisible = true;
        }
    };
    ViewBookinComponent.prototype.getListAccToDate = function (fromDate, toDate) {
        if (this.ignoredFirstEvent || this.initvalue === undefined) {
            this.callBookingListFilter(this.dealerId, this.cnfOrgId, this.statusId);
            if (this.tempbookingToLst == null) {
                return null;
            }
            this.tempbookingToLst = ((this.tempbookingToLst.filter(function (element) { return moment(element.CreatedOn).toDate() >= moment(fromDate).toDate() && moment(element.CreatedOn).toDate() <= moment(toDate).toDate(); })));
            return this.tempbookingToLst;
        }
        this.ignoredFirstEvent = true;
    };
    //[27/02/2017]Vijaymala added to get booking list beyond quota and rate band for director confirmation
    ViewBookinComponent.prototype.viewConfirmationBookingList = function () {
        var _this = this;
        this.bookingServices.viewConfirmationBooking().subscribe(function (p) {
            _this.bookingToLst = p;
            _this.tempbookingToLst = p;
            _this.tempbookingToLst = _this.tempbookingToLst.sort(function (c) { return c.IdBooking; });
            _this.ss.hideLoader();
        }, function (err) {
            _this.ss.hideLoader();
            console.log(err);
        });
    };
    //[27/02/2017]Vijaymala added to submit  for director confirmation/C&F approved beyond quota and rate band 
    ViewBookinComponent.prototype.ConfirmBooking = function (bookingTO, isReject) {
        var _this = this;
        var BookingOperation;
        if (!isReject) {
            if (this.isDirector) {
                bookingTO.TranStatusE = 3 /* ApprovedByDirectors */;
                bookingTO.StatusId = 3 /* ApprovedByDirectors */;
                this.msg = "Approved";
            }
            if (this.isCF) {
                bookingTO.TranStatusE = 11 /* AcceptedByCAndF */;
                bookingTO.StatusId = 11 /* AcceptedByCAndF */;
                this.msg = "Accepted";
            }
        }
        else if (isReject) {
            if (this.isDirector) {
                bookingTO.TranStatusE = 8 /* RejectedByDirectors */;
                bookingTO.StatusId = 8 /* RejectedByDirectors */;
                this.msg = "Rejected";
            }
            if (this.isCF) {
                bookingTO.TranStatusE = 12 /* RejectedByCAndF */;
                bookingTO.StatusId = 12 /* RejectedByCAndF */;
                this.msg = "Rejected";
            }
        }
        BookingOperation = this.bookingServices.addConfirmationBooking(bookingTO, this.loginUserId);
        BookingOperation.subscribe(function (booking) {
            if (booking == 1) {
                _this.errorMsg.showErrorMessage("Order    " + _this.msg + "   Successfully", "Information");
                if (_this.isDirector) {
                    _this.viewConfirmationBookingList();
                }
                if (_this.isCF) {
                    _this.viewPendingBookingsForAcceptance(_this.userTO.OrganizationId);
                }
            }
            else
                _this.errorMsg.showErrorMessage("Order Not   " + _this.msg, "Error");
        }, function (err) { });
    };
    //[27/02/2017]Vijaymala added to submit  for director confirmation/C&F approved beyond quota and rate band 
    ViewBookinComponent.prototype.showConfirmDialog = function (bookingTO, isReject) {
        var _this = this;
        var msg;
        if (!isReject)
            msg = "Do You Want To Confirm ?";
        else
            msg = "Are You Sure  To Reject This Order?";
        this._confirmService.activate(msg, "Confirmation")
            .then(function (res) {
            if (res) {
                _this.ConfirmBooking(bookingTO, isReject);
            }
            else {
            }
        });
        return false;
    };
    //[28/02/2017]Vijaymala added to get booking list beyond quota and rate band for C&F confirmation
    ViewBookinComponent.prototype.viewPendingBookingsForAcceptance = function (OrganizationId) {
        var _this = this;
        this.bookingServices.getPendingBookingsForAcceptance(OrganizationId).subscribe(function (p) {
            _this.bookingToLst = p,
                _this.tempbookingToLst = p;
            _this.ss.hideLoader();
        }, function (err) {
            console.log(err);
            _this.ss.hideLoader();
        });
    };
    ViewBookinComponent.prototype.onContextMenu = function ($event, item) {
        this.contextMenuService.show.next({
            actions: this.menuOptions,
            event: $event,
            item: item,
        });
        $event.preventDefault();
    };
    ViewBookinComponent.prototype.showConfirmDialogToDeleteBookingOrder = function (bookingTO) {
        var _this = this;
        this._confirmService.activate("Are You Sure To Delete This Order?", "Confirmation")
            .then(function (res) {
            if (res) {
                _this.deleteBookingOrder(bookingTO);
            }
            else {
            }
        });
        return false;
    };
    ViewBookinComponent.prototype.deleteBookingOrder = function (bookingTO) {
        var _this = this;
        var deleteBookingOrderOperation;
        bookingTO.TranStatusE = 13 /* Delete */;
        bookingTO.StatusId = 13 /* Delete */;
        bookingTO.IsDeleted = 1;
        deleteBookingOrderOperation = this.bookingServices.deleteBookingOrder(bookingTO, this.loginUserId);
        deleteBookingOrderOperation.subscribe(function (booking) {
            if (booking == 1) {
                _this.errorMsg.showErrorMessage("Order Deleted Successfully", "Information");
                _this.viewPendingBookingList(bookingTO.DealerOrgId, bookingTO.CnFOrgId, _this.statusId);
            }
            else
                _this.errorMsg.showErrorMessage("Order not deleted", "Error");
        }, function (err) { });
    };
    ViewBookinComponent.prototype.editBooking = function (bookingTO) {
        this.router.navigate(['/EditBooking']);
    };
    ViewBookinComponent.prototype.onBookingContextMenu = function ($event, item) {
        $event.preventDefault();
        this.contextMenuService.show.next({
            actions: this.bookingmenuOptions,
            event: $event,
            item: item,
        });
    };
    ViewBookinComponent.prototype.redirectViewBooking = function () {
        debugger;
        this.isView = false;
        this.ignoredFirstEvent = false;
        this.initvalue = this.fromDate;
    };
    ViewBookinComponent.prototype.getRateStyle = function (AuthReasons) {
        var fields = AuthReasons.split('|');
        if (fields.length == 0) {
            return "white";
        }
        else {
            for (var i = 0; i <= fields.length; i++) {
                if (fields[i] == "RATE") {
                    return "red";
                }
            }
        }
    };
    ViewBookinComponent.prototype.getQtyStyle = function (AuthReasons) {
        var fields = AuthReasons.split('|');
        if (fields.length == 0) {
            return "white";
        }
        else {
            for (var i = 0; i <= fields.length; i++) {
                if (fields[i] == "QTY") {
                    return "red";
                }
            }
        }
    };
    ViewBookinComponent.prototype.getDaysStyle = function (AuthReasons) {
        var fields = AuthReasons.split('|');
        if (fields.length == 0) {
            return "white";
        }
        else {
            for (var i = 0; i <= fields.length; i++) {
                if (fields[i] == "DELIVERY") {
                    return "red";
                }
            }
        }
    };
    ViewBookinComponent.prototype.ratecolorstyle = function (AuthReasons) {
        var fields = AuthReasons.split('|');
        for (var i = 0; i <= fields.length; i++) {
            if (fields[i] == "RATE") {
                return "white";
            }
        }
    };
    ViewBookinComponent.prototype.qtycolorstyle = function (AuthReasons) {
        var fields = AuthReasons.split('|');
        for (var i = 0; i <= fields.length; i++) {
            if (fields[i] == "QTY") {
                return "white";
            }
        }
    };
    ViewBookinComponent.prototype.dayscolorstyle = function (AuthReasons) {
        var fields = AuthReasons.split('|');
        for (var i = 0; i <= fields.length; i++) {
            debugger;
            if (fields[i] == "DELIVERY") {
                return "white";
            }
        }
    };
    return ViewBookinComponent;
}());
__decorate([
    core_1.ViewChild(errorMessage_1.ErrorMessage),
    __metadata("design:type", errorMessage_1.ErrorMessage)
], ViewBookinComponent.prototype, "errorMsg", void 0);
ViewBookinComponent = __decorate([
    core_1.Component({
        selector: 'view-booking',
        templateUrl: 'app/booking/viewBooking.html',
        providers: [confirm_service_1.ConfirmService, contextMenu_service_1.ContextMenuService]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, common_services_1.CommonServices,
        booking_service_1.bookingServices,
        confirm_service_1.ConfirmService,
        contextMenu_service_1.ContextMenuService,
        login_services_1.AuthenticationService,
        sharedService_1.sharedService, typeof (_b = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _b || Object])
], ViewBookinComponent);
exports.ViewBookinComponent = ViewBookinComponent;
var ViewParticularBooking = (function () {
    function ViewParticularBooking(route, router, _location) {
        this.route = route;
        this.router = router;
        this._location = _location;
    }
    ViewParticularBooking.prototype.ngOnInit = function () {
        this.bookingTO = JSON.parse(localStorage.getItem('bookingTO'));
    };
    return ViewParticularBooking;
}());
__decorate([
    core_1.ViewChild(errorMessage_1.ErrorMessage),
    __metadata("design:type", errorMessage_1.ErrorMessage)
], ViewParticularBooking.prototype, "errorMsg", void 0);
ViewParticularBooking = __decorate([
    core_1.Component({
        selector: 'view-ParticularBooking',
        templateUrl: 'app/booking/viewParticularBooking.html',
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _c || Object, typeof (_d = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _d || Object, typeof (_e = typeof common_1.Location !== "undefined" && common_1.Location) === "function" && _e || Object])
], ViewParticularBooking);
exports.ViewParticularBooking = ViewParticularBooking;
var _a, _b, _c, _d, _e;
//# sourceMappingURL=viewBooking.component.js.map