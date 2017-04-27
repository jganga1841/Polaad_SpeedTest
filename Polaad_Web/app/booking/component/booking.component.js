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
var agents_services_1 = require("app/agent/services/agents_services");
var address_information_1 = require("app/agent/model/address_information");
var booking_information_1 = require("../model/booking_information");
var booking_information_2 = require("../model/booking_information");
var booking_information_3 = require("../model/booking_information");
var quota_declaration_service_1 = require("app/quota_declaration/services/quota_declaration_service");
var booking_service_1 = require("../services/booking_service");
var commonFunctions_1 = require("app/common/commonFunctions");
var errorMessage_1 = require("app/error/errorMessage");
var confirm_service_1 = require("app/error/confirm.service");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var booking_information_4 = require("../model/booking_information");
var myGlobalVal = require("app/global");
var login_services_1 = require("app/login/login.services");
var sharedService_1 = require("app/common/services/sharedService");
var loading_information_1 = require("app/loading_slip/model/loading_information");
var BookingComponent = (function () {
    function BookingComponent(commonServices, agentServices, quotaDeclareservices, bookingServices, _confirmService, activatedroute, _sanitizer, loginService, ss) {
        var _this = this;
        this.commonServices = commonServices;
        this.agentServices = agentServices;
        this.quotaDeclareservices = quotaDeclareservices;
        this.bookingServices = bookingServices;
        this._confirmService = _confirmService;
        this.activatedroute = activatedroute;
        this._sanitizer = _sanitizer;
        this.loginService = loginService;
        this.ss = ss;
        this.bookingTO = new booking_information_2.BookingTO();
        this.lblMessage = undefined;
        this.deliveryDays = 7;
        this.compQuotaRateBand = new quota_information_1.QuotaInformation;
        this.compQuotaRateBandList = [];
        this.bookingActionsTO = new booking_information_4.BookingActionsTO();
        this.OrderDetailsLst = [];
        this.deliveryAddress = new booking_information_1.DeliveryAddressTO();
        this.globalBookingQty = 0;
        this.isQuotaGreater = false;
        this.isRateGreater = false;
        this.isBookedQtyGreater = false;
        this.isEditBooking = false;
        this.isCollapse = true;
        this.isEdit = false;
        this.editText = "Edit";
        this.isPreviousExist = false;
        this.isClosed = false;
        this.editDeliveryAddrText = "Edit";
        this.isShowCnFLst = false;
        this.isDealerSelect = false;
        this.isQuotaSelect = false;
        this.isDisplay = false;
        this.productSpec = [];
        this.ProdCatVal = false;
        this.productCategoryId = 0;
        this.productSizeSpecGroupedStockList = {};
        this.productMaterialSpecAndCatList = [];
        this.totalStraightQty = 0;
        this.totalBendQty = 0;
        this.totalRKShortQty = 0;
        this.totalRKLongQty = 0;
        this.totalTukadaQty = 0;
        this.totalCoilQty = 0;
        this.isShowModal = false;
        this.title = "Notifier!!!";
        this.autocompleListFormatter = function (dealerList) {
            var html = "<span>" + dealerList.Text + "</span>";
            return _this._sanitizer.bypassSecurityTrustHtml(html);
        };
        this.bookingTO = new booking_information_2.BookingTO();
    }
    BookingComponent.prototype.onSelect = function (dealerId) {
        this.clearAll();
        if (dealerId != 0) {
            this.isDealerSelect = true;
        }
        var commonInfo = {};
        commonInfo.Value = dealerId;
        commonInfo.Text = null;
        this.bookingTO.NoOfDeliveries = 1;
        this.getDealerInfoOnBooking(dealerId);
    };
    BookingComponent.prototype.getCompanyQuotaList = function (cnfId) {
        var _this = this;
        this.quotaDeclareservices.getCompanyQuota(cnfId)
            .subscribe(function (c) {
            _this.compQuotaRateBandList = c;
            if (_this.compQuotaRateBandList.length > 1) {
                var currentquotadate = moment(_this.compQuotaRateBandList[0].CreatedOn);
                var min = (_this.compQuotaRateBandList[1].ValidUpto);
                var validUpto = (moment(currentquotadate).add(min, 'minutes'));
                _this.validUpTo = moment(validUpto).format("DD-MM-YYYY HH:mm A");
                _this.isPreviousExist = true;
                _this.isDisplay = false;
                _this.isQuotaSelect = false;
            }
            else {
                _this.isQuotaSelect = true;
                _this.isDisplay = true;
                _this.isPreviousExist = false;
                _this.compQuotaRateBandList.forEach(function (c) {
                    _this.compQuotaRateBand.RateBand = c.RateBand;
                    _this.compQuotaRateBand.DeclaredRate = c.DeclaredRate,
                        _this.compQuotaRateBand.BalanceQty = c.BalanceQty;
                    _this.compQuotaRateBand.IdQuotaDeclaration = _this.compQuotaRateBandList[0].IdQuotaDeclaration,
                        _this.compQuotaRateBand.GlobalRateId = _this.compQuotaRateBandList[0].GlobalRateId,
                        _this.bookingTO.BookingRate = _this.compQuotaRateBandList[0].DeclaredRate;
                });
            }
        }, function (err) {
            // Log errors if any
            console.log(err);
        });
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
        this.agentServices.getLastFourBookingHist(selDealerId).subscribe(function (p) {
            _this.dealerBookingHistLst = p;
        }, function (err) { console.log(err); });
        if (this.dealerAddrInfo.PlotNo == null) {
            this.dealerAddrInfo = new address_information_1.AddressTO();
            this.dealerAddrInfo.PlotNo = "null";
        }
        this.agentServices.getDealerAddrInfo(selDealerId).subscribe(function (p) {
            _this.dealerAddrInfo = p;
            if (!_this.isEditBooking) {
                if (_this.dealerAddrInfo != undefined) {
                    _this.addToDeliveryAddress(_this.dealerAddrInfo);
                }
            }
        }, function (err) { console.log(err); });
    };
    BookingComponent.prototype.addToDeliveryAddress = function (dealerAddrInfo) {
        if (dealerAddrInfo.PlotNo == null) {
            dealerAddrInfo.PlotNo = "";
        }
        if (dealerAddrInfo.StreetName == null) {
            dealerAddrInfo.StreetName = "";
        }
        if (dealerAddrInfo.AreaName == null) {
            dealerAddrInfo.AreaName = "";
        }
        if (dealerAddrInfo.VillageName == null) {
            dealerAddrInfo.VillageName = "";
        }
        if (dealerAddrInfo.DistrictName == null) {
            dealerAddrInfo.DistrictName = "";
        }
        if (dealerAddrInfo.TalukaName == null) {
            dealerAddrInfo.TalukaName = "";
        }
        this.deliveryAddressLst.push({
            'Address': dealerAddrInfo.PlotNo + dealerAddrInfo.StreetName + dealerAddrInfo.AreaName,
            'VillageName': dealerAddrInfo.VillageName,
            'DistrictName': dealerAddrInfo.DistrictName,
            'TalukaName': dealerAddrInfo.TalukaName,
            'Pincode': 0,
            'IdBookingDelAddr': 0
        });
    };
    BookingComponent.prototype.getcnfList = function (orgTypeId) {
        var _this = this;
        this.commonServices.getOrgList(orgTypeId)
            .subscribe(function (commonInfoList) { return _this.cnfList = commonInfoList; }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    //[7/3/2017]Vijaymala added to get dealerlist of specific C&F
    BookingComponent.prototype.onddlCnFChage = function (cnfOrgId) {
        this.isRateGreater = false;
        this.getCompanyQuotaList(cnfOrgId);
        this.getDealerList(cnfOrgId);
        this.clearAll();
        this.bookingTO.DealerOrgId = 0;
    };
    BookingComponent.prototype.clearAll = function () {
        this.dealerBookingHistLst = [];
        this.productMaterialSpecAndCatList = [];
        this.OrderDetailsLst = [];
        this.deliveryAddressLst = [];
        this.dealerAddrInfo = new address_information_1.AddressTO();
        this.globalBookingQty = 0;
        this.bookingTO.DeliveryDays = 7;
        if (this.bookingTO.CnFOrgId == 0) {
            this.bookingTO.BookingRate = 0;
            this.compQuotaRateBand = new quota_information_1.QuotaInformation();
        }
        this.isQuotaGreater = false;
    };
    BookingComponent.prototype.ngOnInit = function () {
        this.ss.showLoader();
        this.orderDetailsTO = new booking_information_3.OrderDetailsTO();
        this.bookingTO.CdStructureId = 1;
        this.getBookingOpenCloseInfo();
    };
    BookingComponent.prototype.ngOnDestroy = function () {
        localStorage.removeItem('bookingId');
    };
    BookingComponent.prototype.callBookingOpenInfo = function () {
        this.bookingId = JSON.parse(localStorage.getItem('bookingId'));
        this.compQuotaRateBandList = [];
        this.noOfDeliveriesList = this.commonServices.getNoOfDeliveries();
        if (this.bookingId > 0) {
            this.deliveryAddress = new booking_information_1.DeliveryAddressTO(),
                this.editBookingList();
            this.ss.hideLoader();
        }
        else {
            this.isEditBooking = false;
            componentHandler.upgradeDom();
            this.OrderDetailsLst = [];
            this.deliveryAddressLst = [];
            this.getMaterialList();
            this.getCdstructureList();
            this.getDeliveryPeriodList();
            this.isQuotaGreater = false;
            this.bookingTO.IsConfirmed = '';
            this.bookingTO.DeliveryDays = 7;
            this.ss.hideLoader();
        }
    };
    BookingComponent.prototype.getBookingOpenCloseInfo = function () {
        var _this = this;
        this.bookingServices.getBookinOpenCloseInfo()
            .subscribe(function (bookingActionsTO) {
            _this.bookingActionsTO = bookingActionsTO;
            debugger;
            if (_this.bookingActionsTO != null || _this.bookingActionsTO != undefined) {
                if (_this.bookingActionsTO.BookingStatus == "CLOSE") {
                    _this.isClosed = true;
                    _this.lblMessage = "Bookings Are Closed .";
                }
                else {
                    _this.isClosed = false;
                    _this.userTO = _this.loginService.getUserTOFromLocalStorage();
                    if (_this.userTO != null || _this.userTO != undefined) {
                        _this.userTO.UserRoleList.forEach(function (c) {
                            if (c.RoleId == myGlobalVal.UserRole.C_AND_F_AGENT) {
                                _this.isShowCnFLst = false;
                                _this.getDealerList(_this.userTO.OrganizationId);
                                _this.getCompanyQuotaList(_this.userTO.OrganizationId);
                                _this.bookingTO.CnFOrgId = _this.userTO.OrganizationId;
                            }
                            else {
                                _this.isShowCnFLst = true;
                                _this.getcnfList(1 /* CNFTYPEID */);
                            }
                        });
                    }
                    _this.callBookingOpenInfo();
                }
            }
            _this.ss.hideLoader();
        }, function (err) {
            _this.ss.hideLoader();
            // Log errors if any
            console.log(err);
        });
        return this.isClosed;
    };
    BookingComponent.prototype.getDealerList = function (OrganizationId) {
        var _this = this;
        this.dealerList = [];
        this.commonServices.getDealerList(OrganizationId)
            .subscribe(function (commonInfoList) { return _this.dealerList = commonInfoList; }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    BookingComponent.prototype.onkey = function (event) {
        if (this.globalBookingQty > this.compQuotaRateBand.BalanceQty) {
            this.isQuotaGreater = true;
        }
        else {
            this.isQuotaGreater = false;
        }
    };
    BookingComponent.prototype.onchange = function () {
        if (!this.isEditBooking) {
            if (this.globalBookingQty > this.compQuotaRateBand.BalanceQty) {
                this.isQuotaGreater = true;
            }
            else {
                this.isQuotaGreater = false;
            }
        }
    };
    BookingComponent.prototype.getStyle = function () {
        if (this.isQuotaGreater) {
            return "red";
        }
        else {
            return "white";
        }
    };
    BookingComponent.prototype.getRateStyle = function () {
        if (this.isRateGreater) {
            return "red";
        }
        else {
            return "white";
        }
    };
    BookingComponent.prototype.onratechange = function () {
        if (!this.isEditBooking) {
            if (this.bookingTO.BookingRate < (this.compQuotaRateBand.DeclaredRate - this.compQuotaRateBand.RateBand)) {
                this.isRateGreater = true;
            }
            else {
                this.isRateGreater = false;
            }
            if (this.bookingTO.BookingRate == null) {
                this.isRateGreater = false;
            }
        }
    };
    BookingComponent.prototype.getBookedQtyStyle = function (orderDetails) {
        if (orderDetails.BookedQty == 0) {
            return "red";
        }
        else if (orderDetails.BookedQty == undefined || orderDetails.BookedQty != 0) {
            return "white";
        }
    };
    BookingComponent.prototype.isNumber = function (evt) {
        return this.commonServices.isNumber(evt);
    };
    BookingComponent.prototype.confirmAndAddOrder = function (orderDetails, materialTO) {
        if (orderDetails.BookedQty == null || orderDetails.BookedQty == 0) {
            return;
        }
        // if (this.globalBookingQty >= + this.tempOrderQty + +orderDetails.BookedQty) {
        if (this.globalBookingQty >= materialTO.TotalValue) {
            //  this.addNewOrder(orderDetails, materialTO);
            return "white";
        }
        else {
            this.errorMsg.showErrorMessage("Entered order Quantity can not be greater than main quantity.", "Warning");
            return "red";
        }
    };
    //tempOrderQty: number = 0;
    // addNewOrder(materialTO: MaterialProdSpecsvsSizeTO) {
    //     this.OrderDetailsLst.push({
    //         'MaterialSubType': materialTO.MaterialCategory,
    //         'BookedQty': materialTO.BookedQty,
    //         'Rate': orderDetails.Rate,
    //         'MaterialId': materialTO.Value
    //     });
    //     this.tempOrderQty = +this.tempOrderQty + +orderDetails.BookedQty;
    //     this.orderDetailsTO = new OrderDetailsTO()
    // }
    BookingComponent.prototype.addNewDeliveryAddr = function (deliveryAddr) {
        if (deliveryAddr.Address == undefined) {
            return;
        }
        this.deliveryAddressLst.push({
            'Address': deliveryAddr.Address,
            'VillageName': deliveryAddr.VillageName,
            'DistrictName': deliveryAddr.DistrictName,
            'TalukaName': deliveryAddr.TalukaName,
            'Pincode': 0,
            'IdBookingDelAddr': deliveryAddr.IdBookingDelAddr
        });
        // this.deliveryAddress = new DeliveryAddressTO()
    };
    BookingComponent.prototype.bookingOrder = function () {
        var _this = this;
        var msg;
        var pendingmsg;
        var BookingOperation;
        this.bookingTO.QuotaDeclarationId = this.compQuotaRateBand.IdQuotaDeclaration;
        this.bookingTO.GlobalRateId = this.compQuotaRateBand.GlobalRateId;
        this.bookingTO.IsConfirmed = (this.bookingTO.IsConfirmed) ? 1 : 0;
        this.bookingTO.IsJointDelivery = (this.bookingTO.IsJointDelivery) ? 1 : 0;
        this.bookingTO.OrderDetailsLst = this.OrderDetailsLst;
        this.bookingTO.DeliveryAddressLst = this.deliveryAddressLst;
        this.bookingTO.BookingQty = this.globalBookingQty;
        this.loginUserId = this.userTO.IdUser;
        this.bookingTO.CdStructure = this.cdStructureList.filter(function (c) { return c.Value == _this.bookingTO.CdStructureId; })[0].Text;
        if (this.bookingTO.BookingRate == undefined) {
            this.bookingTO.BookingRate = this.bookingRate;
        }
        if (!this.isEditBooking) {
            msg = "Booked";
            BookingOperation = this.bookingServices.addBooking(this.bookingTO, this.loginUserId);
        }
        else {
            BookingOperation = this.bookingServices.editBookingOrder(this.bookingTO, this.loginUserId);
            msg = "Updated";
        }
        if (this.isQuotaGreater || this.isRateGreater || this.bookingTO.DeliveryDays > 7) {
            pendingmsg = "This Booking Order pending for approval";
        }
        else {
            pendingmsg = "Order " + msg + " Successfully";
        }
        this.ss.showLoader();
        BookingOperation.subscribe(function (booking) {
            if (booking.Result == 1) {
                if (_this.isEditBooking == true || _this.isEditBooking == false) {
                    pendingmsg = booking.Text;
                }
                if (_this.isQuotaGreater || _this.isRateGreater || _this.bookingTO.DeliveryDays > 7) {
                    var fields = booking.Text.split(' ');
                    var bookingId = (fields[2] + " " + fields[3] + " " + fields[4]);
                    pendingmsg = "booking Order " + bookingId + " pending for approval";
                }
                _this.ss.hideLoader();
                _this.errorMsg.showErrorMessage(pendingmsg, "Information");
                _this.deliveryAddressLst = [];
                _this.OrderDetailsLst = [];
                // this.bookingTO = new BookingTO();
                _this.bookingTO.BookingQty = 0;
                _this.globalBookingQty = 0;
                _this.bookingTO.CdStructureId = 1;
                _this.isQuotaGreater = false;
                _this.isRateGreater = false;
                _this.getBookingOpenCloseInfo();
                if (_this.userTO.UserRoleList[0].RoleId == myGlobalVal.UserRole.C_AND_F_AGENT) {
                    _this.getCompanyQuotaList(_this.userTO.OrganizationId);
                }
                else {
                    _this.getCompanyQuotaList(_this.bookingTO.CnFOrgId);
                }
            }
            else {
                _this.ss.hideLoader();
                _this.errorMsg.showErrorMessage("Order not Booked", "Error");
            }
        }, function (err) {
            _this.ss.hideLoader();
        });
    };
    BookingComponent.prototype.showConfirmDialog = function (isValid) {
        var _this = this;
        var warningmsg;
        if (this.globalBookingQty <= 0) {
            this.errorMsg.showErrorMessage("Order Quantity Must Be Greater Than Zero.", "Warning");
            this.isShowModal = false;
            return;
        }
        else if (this.bookingTO.NoOfDeliveries != this.deliveryAddressLst.length) {
            this.errorMsg.showErrorMessage("Number OF Deliveries and  Delivery Address are not matching.", "Warning");
        }
        else {
            if (!this.isEditBooking) {
                warningmsg = "Have You Confirm The Order Details?";
            }
            else {
                warningmsg = "Do You Want To Update The Order?";
            }
            this._confirmService.activate(warningmsg, "Confirmation")
                .then(function (res) {
                if (res) {
                    _this.bookingOrder();
                }
                else {
                }
            });
            return false;
        }
    };
    BookingComponent.prototype.ValidateQtyWithGlobal = function (val) {
        alert('enter value first' + val);
    };
    //Vijaymala added to get booking list for EditedbookingTO
    BookingComponent.prototype.editBookingList = function () {
        var _this = this;
        this.orderDetailsTO = new booking_information_3.OrderDetailsTO();
        this.isEditBooking = true;
        this.bookingServices.getBookingListAccToBookingId(this.bookingId)
            .subscribe(function (bookingTO) {
            _this.isShowCnFLst = false;
            _this.isQuotaSelect = true;
            _this.isDisplay = true;
            _this.bookingTO = bookingTO,
                _this.deliveryAddress = new booking_information_1.DeliveryAddressTO(),
                _this.deliveryAddressLst = bookingTO.DeliveryAddressLst;
            _this.dealerAddrInfo = new address_information_1.AddressTO();
            _this.dealerAddrInfo.PlotNo = "null";
            _this.getDealerInfoOnBooking(bookingTO.DealerOrgId);
            _this.OrderDetailsLst = bookingTO.OrderDetailsLst;
            _this.globalBookingQty = bookingTO.BookingQty;
            _this.compQuotaRateBand.IdQuotaDeclaration = _this.bookingTO.QuotaDeclarationId,
                _this.compQuotaRateBand.GlobalRateId = _this.bookingTO.GlobalRateId,
                _this.getMaterialList();
            _this.getCdstructureList();
            _this.getDeliveryPeriodList();
            if (_this.bookingTO.IsConfirmed == 1) {
                _this.bookingTO.IsConfirmed = true;
            }
            else {
                _this.bookingTO.IsConfirmed = false;
            }
            if (_this.bookingTO.IsJointDelivery == 1) {
                _this.bookingTO.IsJointDelivery = true;
            }
            else {
                _this.bookingTO.IsJointDelivery = false;
            }
        }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    BookingComponent.prototype.deleteMaterial = function (event, orderDetails) {
        event.preventDefault();
        var index = this.OrderDetailsLst.indexOf(orderDetails);
        this.OrderDetailsLst.splice(index, 1);
        if (this.deliveryAddressLst.length > 0) {
            this.editText = "Edit";
        }
    };
    BookingComponent.prototype.editMaterial = function (event, orderDetails) {
        event.preventDefault();
        this.IdBookingExt = orderDetails.IdBookingExt;
        if (this.editText == "Update") {
            var orglist = this.OrderDetailsLst.find(function (c) { return c.IdBookingExt === orderDetails.IdBookingExt; });
            if (orglist) {
                orglist.BookedQty = orderDetails.BookedQty;
                this.isEdit = true;
            }
        }
        if (this.isEdit) {
            this.editText = "Edit";
        }
        else {
            this.editText = "Update";
        }
    };
    BookingComponent.prototype.deleteDeliveryAddress = function (event, deliveryAddr) {
        event.preventDefault();
        var i = this.deliveryAddressLst.indexOf(deliveryAddr);
        this.deliveryAddressLst.splice(i, 1);
    };
    BookingComponent.prototype.editDeliveryAddress = function (index) {
        this.selectedRow = index;
        event.preventDefault();
        // this.idBookingDelAddr = deliveryAddr.IdBookingDelAddr;
        this.editDeliveryAddrText = "Update";
        this.isEdit = true;
        // if (this.editDeliveryAddrText == "Update") {
        //     const deliverylist = this.deliveryAddressLst.find(c => c.IdBookingDelAddr === this.idBookingDelAddr);
        //     if (deliverylist) {
        //         this.isEdit = true;
        //         deliverylist.Address = deliveryAddr.Address;
        //         deliverylist.TalukaName = deliveryAddr.TalukaName;
        //         deliverylist.DistrictName = deliveryAddr.DistrictName;
        //         deliverylist.VillageName = deliveryAddr.VillageName;
        //     }
        //     if (!this.isEdit) {
        //         this.editDeliveryAddrText = "Edit";
        //     }
        //     else {
        //         this.editDeliveryAddrText = "Update"
        //     }
        // }
    };
    BookingComponent.prototype.selectOnClick = function ($event) {
        $event.target.select();
    };
    BookingComponent.prototype.isRateBetween = function () {
        this.ismin = this.compQuotaRateBand.DeclaredRate + -499;
        this.ismax = this.compQuotaRateBand.DeclaredRate + +499;
        if ((this.bookingTO.BookingRate < this.ismin) || (this.bookingTO.BookingRate > this.ismax)) {
            this.errorMsg.showErrorMessage(" Booking Rate Must Be In Between " + (this.ismin) + " and " + (this.ismax), "Warning");
            this.bookingTO.BookingRate = null;
            this.isRateGreater = false;
        }
    };
    BookingComponent.prototype.colorstyle = function () {
        if (this.isRateGreater) {
            return "white";
        }
        else {
            return "black";
        }
    };
    BookingComponent.prototype.qtycolorstyle = function () {
        if (this.isQuotaGreater) {
            return "white";
        }
        else {
            return "black";
        }
    };
    BookingComponent.prototype.onSelectionChange = function (companyQuotaRate) {
        this.isQuotaSelect = true;
        this.isDisplay = true;
        this.compQuotaRateBand.BalanceQty = companyQuotaRate.BalanceQty;
        this.compQuotaRateBand.DeclaredRate = companyQuotaRate.DeclaredRate;
        this.compQuotaRateBand.RateBand = companyQuotaRate.RateBand;
        this.bookingTO.BookingRate = companyQuotaRate.DeclaredRate;
        this.compQuotaRateBand.IdQuotaDeclaration = companyQuotaRate.IdQuotaDeclaration;
        this.compQuotaRateBand.GlobalRateId = companyQuotaRate.GlobalRateId;
    };
    //[17/03/2017]Vijaya added to get cdStructure list,delivery period list,district list
    BookingComponent.prototype.getCdstructureList = function () {
        var _this = this;
        this.commonServices.getCdstructureList()
            .subscribe(function (cdStructureList) { return _this.cdStructureList = cdStructureList; }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    BookingComponent.prototype.getDeliveryPeriodList = function () {
        var _this = this;
        this.commonServices.getDeliveryPeriodList()
            .subscribe(function (deliveryPeriodList) {
            _this.deliveryPeriodList = deliveryPeriodList,
                _this.ss.hideLoader();
        }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    BookingComponent.prototype.CollectProductSpecif = function (proCategoryVal) {
        var _this = this;
        this.isBookedQtyGreater = false;
        this.ss.showLoader();
        this.ProdCatVal = proCategoryVal == 2 ? true : false;
        // this.ProdCatVal == true?  this.productCategoryId = myGlobalVal.ProductCatE.Plain 
        // : this.productCategoryId = myGlobalVal.ProductCatE.TMT         
        this.productCategoryId = this.ProdCatVal ? myGlobalVal.ProductCatE.Plain
            : myGlobalVal.ProductCatE.TMT;
        this.bookingServices.gnGetBookingMaterialExtList(this.productCategoryId).subscribe(function (data) {
            _this.OrderDetailsLst = data;
            _this.generateListSizevsSpecs();
            _this.ss.hideLoader();
        }, function (err) {
            console.log("Server Error : " + err);
            _this.ss.hideLoader();
        });
    };
    BookingComponent.prototype.generateListSizevsSpecs = function () {
        var _this = this;
        this.productSpec = [];
        this.productSizeSpecGroupedStockList = {};
        this.productMaterialSpecAndCatList = [];
        var uniqueLayerIds = this.OrderDetailsLst.map(function (p) { return p.ProdSpecDesc; }).filter(function (value, index, self) { return self.indexOf(value) === index; });
        uniqueLayerIds.forEach(function (element) {
            _this.productSpec.push(element);
        });
        var i = 0;
        for (var i = 0; i < this.OrderDetailsLst.length; ++i) {
            var obj = this.OrderDetailsLst[i];
            //If a property for this DtmStamp does not exist yet, create
            if (this.productSizeSpecGroupedStockList[obj.MaterialSubType] === undefined)
                this.productSizeSpecGroupedStockList[obj.MaterialSubType] = [obj.MaterialSubType];
            //x will always be the array corresponding to the current DtmStamp. Push a value the current value to it.
            this.productSizeSpecGroupedStockList[obj.MaterialSubType].push(obj.BookedQty);
        }
        //debugger;
        for (var k in this.productSizeSpecGroupedStockList) {
            var i_1 = 0;
            var materialTO = new loading_information_1.MaterialProdSpecsvsSizeTO();
            if (this.productSizeSpecGroupedStockList.hasOwnProperty(k)) {
                //alert('val : ' + this.groupedStockList[k])
                var matval2 = this.productSizeSpecGroupedStockList[k][2];
                var matval4 = this.productSizeSpecGroupedStockList[k][4];
                var matval6 = this.productSizeSpecGroupedStockList[k][6];
                materialTO.MaterialCategory = this.productSizeSpecGroupedStockList[k][0];
                materialTO.StraightQty = this.productSizeSpecGroupedStockList[k][1];
                materialTO.BendQty = matval2;
                materialTO.RKShortQty = this.productSizeSpecGroupedStockList[k][3];
                materialTO.RKLongQty = matval4;
                materialTO.TukadaQty = this.productSizeSpecGroupedStockList[k][5];
                materialTO.CoilQty = matval6;
                materialTO.TotalValue = materialTO.StraightQty + +materialTO.BendQty + +materialTO.RKShortQty
                    + +materialTO.RKLongQty + +materialTO.TukadaQty + +materialTO.CoilQty;
                this.productMaterialSpecAndCatList.push(materialTO);
            }
        }
    };
    BookingComponent.prototype.addBookingQtyInExtTOList = function () {
        var _this = this;
        debugger;
        // if (this.globalBookingQty >= + this.tempOrderQty + +orderDetails.BookedQty) {
        this.productMaterialSpecAndCatList.forEach(function (ele) {
            _this.OrderDetailsLst.filter(function (p) { return p.MaterialSubType == ele.MaterialCategory; })[0].BookedQty = ele.StraightQty
                , _this.OrderDetailsLst.filter(function (p) { return p.MaterialSubType == ele.MaterialCategory; })[1].BookedQty = ele.BendQty
                , _this.OrderDetailsLst.filter(function (p) { return p.MaterialSubType == ele.MaterialCategory; })[2].BookedQty = ele.RKShortQty
                , _this.OrderDetailsLst.filter(function (p) { return p.MaterialSubType == ele.MaterialCategory; })[3].BookedQty = ele.RKLongQty
                , _this.OrderDetailsLst.filter(function (p) { return p.MaterialSubType == ele.MaterialCategory; })[4].BookedQty = ele.TukadaQty
                , _this.OrderDetailsLst.filter(function (p) { return p.MaterialSubType == ele.MaterialCategory; })[5].BookedQty = ele.CoilQty;
        });
        this.OrderDetailsLst = this.OrderDetailsLst.filter(function (p) { return p.BookedQty > 0; });
    };
    BookingComponent.prototype.calculateTotal = function () {
        var _this = this;
        this.totalStraightQty = 0;
        this.totalBendQty = 0;
        this.totalRKShortQty = 0;
        this.totalRKLongQty = 0;
        this.totalTukadaQty = 0;
        this.totalCoilQty = 0;
        this.productMaterialSpecAndCatList.forEach(function (element) {
            _this.totalStraightQty += +element.StraightQty;
            _this.totalBendQty += +element.BendQty;
            _this.totalRKShortQty += +element.RKShortQty;
            _this.totalRKLongQty += +element.RKLongQty;
            _this.totalTukadaQty += +element.TukadaQty;
            _this.totalCoilQty += +element.CoilQty;
            _this.total = _this.totalStraightQty + _this.totalBendQty + _this.totalRKShortQty + _this.totalRKLongQty + _this.totalTukadaQty + _this.totalCoilQty;
            if (_this.total > _this.globalBookingQty) {
                _this.isBookedQtyGreater = true;
            }
            else {
                _this.isBookedQtyGreater = false;
            }
        });
    };
    BookingComponent.prototype.clearList = function () {
        this.total = 0;
        this.OrderDetailsLst = [];
    };
    BookingComponent.prototype.checkBookingQty = function () {
        if (this.globalBookingQty <= 0) {
            this.errorMsg.showErrorMessage("Order Quantity Must Be Greater Than Zero.", "Warning");
            this.isShowModal = false;
            return;
        }
        else {
            this.isShowModal = true;
            this.CollectProductSpecif(1);
        }
    };
    return BookingComponent;
}());
__decorate([
    core_1.ViewChild(errorMessage_1.ErrorMessage),
    __metadata("design:type", errorMessage_1.ErrorMessage)
], BookingComponent.prototype, "errorMsg", void 0);
__decorate([
    core_1.ViewChild(commonFunctions_1.CommonFunctions),
    __metadata("design:type", commonFunctions_1.CommonFunctions)
], BookingComponent.prototype, "commonFunc", void 0);
BookingComponent = __decorate([
    core_1.Component({
        selector: 'my-booking',
        templateUrl: 'app/booking/booking.html'
    }),
    __metadata("design:paramtypes", [common_services_1.CommonServices,
        agents_services_1.AgentsServices,
        quota_declaration_service_1.QuotaDeclarationService,
        booking_service_1.bookingServices,
        confirm_service_1.ConfirmService,
        router_1.ActivatedRoute,
        platform_browser_1.DomSanitizer,
        login_services_1.AuthenticationService,
        sharedService_1.sharedService])
], BookingComponent);
exports.BookingComponent = BookingComponent;
//# sourceMappingURL=booking.component.js.map