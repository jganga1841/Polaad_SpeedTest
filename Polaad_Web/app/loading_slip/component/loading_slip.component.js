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
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var common_services_1 = require("app/common/services/common.services");
var common_Information_1 = require("app/common/model/common_Information");
var booking_service_1 = require("app/booking/services/booking_service");
var loading_information_1 = require("../model/loading_information");
var loading_information_2 = require("../model/loading_information");
var booking_information_1 = require("app/booking/model/booking_information");
var loading_information_3 = require("../model/loading_information");
var loading_information_4 = require("../model/loading_information");
var loading_information_5 = require("../model/loading_information");
var loading_service_1 = require("../services/loading_service");
var errorMessage_1 = require("app/error/errorMessage");
var confirm_service_1 = require("app/error/confirm.service");
var booking_information_2 = require("app/booking/model/booking_information");
// import { CustomValidators } from 'ng2-validation';
var sharedService_1 = require("app/common/services/sharedService");
var platform_browser_1 = require("@angular/platform-browser");
var forms_2 = require("@angular/forms");
var login_services_1 = require("app/login/login.services");
var common_Information_2 = require("app/common/model/common_Information");
var myGlobalVal = require("app/global");
var encryptDecrypt = require("app/common/services/myservice");
var LoadingSlipComponent = (function () {
    function LoadingSlipComponent(ss, commonServices, bookingServices, loadingServices, _confirmService, builder, _sanitizer, authLoginServices) {
        var _this = this;
        this.ss = ss;
        this.commonServices = commonServices;
        this.bookingServices = bookingServices;
        this.loadingServices = loadingServices;
        this._confirmService = _confirmService;
        this.builder = builder;
        this._sanitizer = _sanitizer;
        this.authLoginServices = authLoginServices;
        this.userTo = {};
        this.resultMessage = new common_Information_2.ResultMessage;
        this.bottomLoadingMaterialSequenceTOList = [];
        this.middleLoadingMaterialSequenceTOList = [];
        this.middle2LoadingMaterialSequenceTOList = [];
        this.middle3LoadingMaterialSequenceTOList = [];
        this.topLoadingMaterialSequenceTOList = [];
        this.commonLoadingSlipExtToList = [];
        this.dealerBookingList = [];
        this.isDealerSelectedID = false;
        this.loadingSlipTO = new loading_information_3.LoadingSlipTO();
        this.loadingTO = { NoOfDeliveries: 0 };
        this.loadingSlipToList = [];
        this.qtyToLoad = 0;
        this.bookingTo = new booking_information_1.BookingTO();
        this.isVisibleLoadingTab = [];
        this.cnfOrgList = [];
        this.transporterOrgList = [];
        this.listDeliveryAddr = [];
        this.tempListDeliveryAddr = [];
        this.vehicleNo = 0;
        this.selectedDealerID = 0;
        this.cnfTo = {};
        this.transporterTo = {};
        this.noOfDelivery = 0;
        this.isTopLoading = 0;
        this.isMiddle1Loading = 0;
        this.isMiddle2Loading = 0;
        this.isMiddle3Loading = 0;
        this.isBottomLoading = 0;
        this.isExpandOrder = true;
        this.totalQuantitySlipTo = 0;
        this.selectedMaterialLayerId = 1;
        this.isAddrSelected = false;
        this.productMaterialSpecAndCatList = [];
        this.productCategoryId = 0;
        this.productSizeSpecGroupedStockList = [];
        this.isLoginByCnf = false;
        this.ProdCatVal = false;
        this.isValidLoadedQty = false;
        this.isDispMaterialSizess = false;
        this.dealerTo = {};
        this.commonDealerList = [];
        this.isQuotaDeclared = false;
        this.bookingInfoTo = new booking_information_1.BookingTO;
        //Declare varaible for tempOrder
        this.tempOrderQty = 0;
        this.autocompleListFormatter = function (data) {
            var html = "<span>" + data.Text + "</span>";
            return _this._sanitizer.bypassSecurityTrustHtml(html);
        };
        ///// tO Calculate the Avialable stock summary
        this.totalAvialableStraight = 0;
        this.totalAvialableBend = 0;
        this.totalAvialableRKShort = 0;
        this.totalAvialableRKLong = 0;
        this.totalAvialableTukada = 0;
        this.totalAvialableCoil = 0;
        this.loadingQuotaAvailableStock = [];
        this.totalStraight = 0;
        this.totalBend = 0;
        this.totalRKShort = 0;
        this.totalRKLong = 0;
        this.totalTukda = 0;
        this.totalCoil = 0;
        this.userTo = authLoginServices.getUserTOFromLocalStorage();
    }
    LoadingSlipComponent.prototype.ngOnInit = function () {
        this.continent = new forms_1.FormControl('');
        this.ss.showLoader();
        componentHandler.upgradeDom();
        this.isDelaredTodayLoadingQuota();
        //this.getOrgList(myGlobalVal.orgTypeEnum.DEALERTYPEID);
        this.bookingTo = new booking_information_1.BookingTO();
        this.initializeLoadingSeq();
        if (this.userTo.UserRoleList[0].RoleId == myGlobalVal.UserRole.C_AND_F_AGENT) {
            this.isLoginByCnf = true;
            this.selectedCnfId = this.userTo.OrganizationId;
            this.getDealerList(this.selectedCnfId);
        }
        else {
            this.getcnfList();
        }
        this.getCdstructureList();
        this.noOfDeliveriesList = this.commonServices.getNoOfDeliveries();
        this.getProductCatList();
        this.getTransporterList();
        this.getMaterialList();
        this.loadingMaterialSequenceTO = new loading_information_1.LoadingSlipExtTO();
        this.bottomLoadingMaterialSequenceTOList = [];
        this.middleLoadingMaterialSequenceTOList = [];
        this.topLoadingMaterialSequenceTOList = [];
        this.loadingSlipTO = new loading_information_3.LoadingSlipTO();
        this.loadingMaterialSequenceTO = new loading_information_1.LoadingSlipExtTO();
        this.loadingSlipTO.LoadingSlipExtTOList = [];
        this.MaterialTO = new common_Information_1.CommonInformation();
        this.loadingSlipTO.TblLoadingSlipDtlTO = new loading_information_2.LoadingSlipDtlTO();
        //this.loadingSlipTO.LoadingSlipDtlTOList = [];
    };
    LoadingSlipComponent.prototype.initializeLoadingSeq = function () {
        this.isTopLoading = 0;
        this.isMiddle1Loading = 0;
        this.isMiddle2Loading = 0;
        this.isMiddle3Loading = 0;
        this.isBottomLoading = 0;
    };
    LoadingSlipComponent.prototype.onNoOfDeliveryChange = function (deliveryNum) {
        //alert('val : ' + this.selectedCnfId)
        if (this.loadingTO.VehicleNo == null || this.loadingTO.VehicleNo == "") {
            //this.loadingTO.NoOfDeliveries = 0
            this.loadingTO.NoOfDeliveries = "No. of Deliveries";
            this.errorMsg.showErrorMessage("Please enter Vehicle No. first.", "Warning");
            return;
        }
        this.initializeLoadingSeq();
        for (var _i = 1; _i <= deliveryNum; _i++) {
            switch (_i) {
                case 1:
                    this.isBottomLoading = 1;
                    break;
                case 2:
                    this.isTopLoading = 1;
                    break;
                case 3:
                    this.isMiddle1Loading = 1;
                    break;
                case 4:
                    this.isMiddle2Loading = 1;
                    break;
                case 5:
                    this.isMiddle3Loading = 1;
                    break;
            }
        }
    };
    LoadingSlipComponent.prototype.changeLoadingSequence = function (loadingSeq) {
        var _this = this;
        loadingSeq.split('|').forEach(function (p) {
            switch (p) {
                case myGlobalVal.loadingSequenceName.BOTTOM.toString():
                    _this.isBottomLoading = 0;
                    break;
                case myGlobalVal.loadingSequenceName.MIDDLE1.toString():
                    _this.isMiddle1Loading = 0;
                    break;
                case myGlobalVal.loadingSequenceName.MIDDLE2.toString():
                    _this.isMiddle2Loading = 0;
                    break;
                case myGlobalVal.loadingSequenceName.MIDDLE3.toString():
                    _this.isMiddle3Loading = 0;
                    break;
                case myGlobalVal.loadingSequenceName.TOP.toString():
                    _this.isTopLoading = 0;
                    break;
                default:
                    break;
            }
        });
    };
    LoadingSlipComponent.prototype.onSelect = function (dealerId) {
        var _this = this;
        debugger;
        if (this.loadingSlipToList.length > 0 && (!this.isJointDelivery || this.isJointDelivery == undefined)) {
            this.errorMsg.showErrorMessage("You are not able to genrate joint delivery slip.", "Warning");
            var vDealerInf = this.loadingSlipToList.filter(function (p) { return p.LoadingLayerId == _this.selectedMaterialLayerId; })[0];
            this.dealerTo.Value = vDealerInf.DealerOrgId;
            this.dealerTo.Text = vDealerInf.DealerOrgName;
            return;
        }
        var dealerAvl = false;
        this.loadingSlipToList.filter(function (p) { return p.LoadingLayerId == _this.selectedMaterialLayerId; }).forEach(function (ele) {
            if (ele.DealerOrgId != dealerId) {
                _this.errorMsg.showErrorMessage("You are not able to genrate slip for different dealer order in same layer.", "Warning");
                _this.dealerTo.Value = ele.DealerOrgId;
                _this.dealerTo.Text = ele.DealerOrgName;
                return dealerAvl = true;
            }
        });
        if (dealerAvl) {
            return;
        }
        this.listDeliveryAddr = [];
        this.tempListDeliveryAddr = [];
        var commonInfo = {};
        commonInfo.Value = dealerId;
        commonInfo.Text = null;
        this.getDealerLoadingInfo(commonInfo);
        this.loadingSlipTO.DealerOrgId = dealerId;
        this.loadingSlipTO.LoadingLayerId = this.selectedMaterialLayerId;
        //this.pushLoadingSlipChanges();
        //this.isExpandOrder = true;
        this.isDealerSelectedID = false;
    };
    LoadingSlipComponent.prototype.getDealerLoadingInfo = function (commonInfo) {
        var _this = this;
        var dealerListResult = this.commonDealerList.filter(function (p) { return p.DealerOrgId == commonInfo.Value; });
        if (dealerListResult.length == 0 || dealerListResult == undefined) {
            this.bookingServices.getDealersBookingList(commonInfo.Value).subscribe(function (p) {
                if (p == null || p.length == 0) {
                    _this.lblBookingNotFoundMsg = " No pending orders !";
                    return;
                }
                _this.lblBookingNotFoundMsg = undefined;
                p.forEach(function (element) { return element.BalQty = element.PendingQty; });
                debugger;
                if (_this.commonDealerList.length == 0) {
                    _this.commonDealerList = p;
                }
                else {
                    //this.commonDealerList.concat(p)
                    p.forEach(function (element) { return _this.commonDealerList.push(element); });
                }
                _this.dealerBookingList = p;
                _this.isExpandOrder = true;
            }, function (err) { console.log(err); });
        }
        else {
            this.lblBookingNotFoundMsg = "";
            this.dealerBookingList = dealerListResult;
        }
    };
    LoadingSlipComponent.prototype.getOrgList = function (OrgTypeId) {
        var _this = this;
        this.dealerList = [];
        this.commonServices.getOrgList(OrgTypeId)
            .subscribe(function (commonInfoList) { return _this.dealerList = commonInfoList; }, function (err) {
            alert(err);
            _this.ss.hideLoader();
            // Log errors if any
            console.log(err);
        });
        // return this.commonInfoList;
    };
    LoadingSlipComponent.prototype.getMaterialList = function () {
        var _this = this;
        this.commonServices.getMaterial()
            .subscribe(function (materialList) {
            _this.materialList = materialList;
            _this.ss.hideLoader();
        }, function (err) {
            // Log errors if any
            console.log(err);
            alert('Server error : ' + err);
            _this.ss.hideLoader();
        }, function () {
            console.log("Done");
            _this.ss.hideLoader();
        });
    };
    LoadingSlipComponent.prototype.addNewLoadingSeqQty = function (MaterialTO, SequenceNo) {
        this.bookingTo = this.dealerBookingList.filter(function (p) { return p.IsSelect; })[0];
        var isAddrSelected = this.tempListDeliveryAddr.filter(function (p) { return p.IsSelected; });
        if (!this.isDealerSelectedID) {
            this.errorMsg.showErrorMessage("Please select the order from pending list", "Warning");
            return;
        }
        else if (this.bookingTo.LoadingQty < +this.tempOrderQty + +this.loadingMaterialSequenceTO.LoadingQty) {
            this.errorMsg.showErrorMessage("Entered order Quantity can not be greater than loading quantity.", "Warning");
            return;
        }
        else if (this.bookingTo.LoadingQty == null || this.bookingTo.LoadingQty == 0) {
            this.errorMsg.showErrorMessage("Please enter the loading Quantity", "Warning");
            return;
        }
        else if (this.loadingMaterialSequenceTO.LoadingQty == null || this.loadingMaterialSequenceTO.LoadingQty == 0) {
            this.errorMsg.showErrorMessage("Please enter the Quantity first", "Warning");
            return;
        }
        else if (MaterialTO == undefined) {
            this.errorMsg.showErrorMessage("Please enter the Quantity first", "Warning");
            return;
        }
        else if (isAddrSelected == undefined || isAddrSelected.length == 0) {
            this.errorMsg.showErrorMessage("Select the Delivery address first.", "Warning");
            return;
        }
        this.mapLayerDeliveryAddr(SequenceNo);
        var obj = {
            'IdLoadingSlipExt': this.loadingMaterialSequenceTO.IdLoadingSlipExt,
            'BookingId': this.loadingMaterialSequenceTO.BookingId,
            'LoadingSlipId': this.loadingMaterialSequenceTO.LoadingSlipId,
            'LoadingLayerid': SequenceNo,
            'MaterialId': MaterialTO.Value,
            'BookingExtId': this.loadingMaterialSequenceTO.BookingExtId,
            'LoadingQty': this.loadingMaterialSequenceTO.LoadingQty,
            'LoadingItem': MaterialTO.Text
        };
        switch (SequenceNo) {
            case 1:
                this.bottomLoadingMaterialSequenceTOList.push(obj);
                break;
            case 2:
                this.middleLoadingMaterialSequenceTOList.push(obj);
                break;
            case 3:
                this.middle2LoadingMaterialSequenceTOList.push(obj);
                break;
            case 4:
                this.middle3LoadingMaterialSequenceTOList.push(obj);
                break;
            case 5:
                this.topLoadingMaterialSequenceTOList.push(obj);
                break;
            default:
                break;
        }
        this.tempOrderQty = +this.tempOrderQty + +this.loadingMaterialSequenceTO.LoadingQty;
        this.loadingMaterialSequenceTO = new loading_information_1.LoadingSlipExtTO();
    };
    //[GJ] : 20170223 : Generate the Loading Slip
    LoadingSlipComponent.prototype.generateLoadingSlip = function () {
        var vlist = this.bottomLoadingMaterialSequenceTOList.concat(this.middleLoadingMaterialSequenceTOList, this.topLoadingMaterialSequenceTOList, this.middle2LoadingMaterialSequenceTOList, this.middle3LoadingMaterialSequenceTOList);
        this.loadingSlipTO.LoadingSlipExtTOList = vlist;
        //this.loadingSlipTO.LoadingSlipDtlTOList = this.dealerBookingList.filter(p=>p.IsSelect);
        this.loadingSlipTO.DealerOrgId = this.selectedDealerID;
        this.loadingSlipTO.DeliveryAddressTOList = this.listDeliveryAddr.filter(function (p) { return p.IsSelected; });
        this.loadingSlipToList.push(this.loadingSlipTO);
        this.generateAddLoadingLayer(vlist);
        //Clear the data after loading slip generated
        this.changeLoadingSequence(this.loadingSlipTO.SequenceLoading);
        this.listDeliveryAddr = [];
        this.tempListDeliveryAddr = [];
        this.bottomLoadingMaterialSequenceTOList = [];
        this.middleLoadingMaterialSequenceTOList = [];
        this.topLoadingMaterialSequenceTOList = [];
        this.middle2LoadingMaterialSequenceTOList = [];
        this.middle3LoadingMaterialSequenceTOList = [];
        //this.loadingSlipTO = {};
        this.isDealerSelectedID = false;
        /*Commit due to the Change in loading slip*/
        //this.dealerBookingList = this.dealerBookingList.filter(p=>!p.IsSelect);
        this.totalQuantitySlipTo += +this.tempOrderQty;
        this.tempOrderQty = 0;
        this.selectedMaterialLayerId = 0;
    };
    LoadingSlipComponent.prototype.generateAddLoadingLayer = function (listLoadingSlipExt) {
        var _this = this;
        if (listLoadingSlipExt == undefined || listLoadingSlipExt.length === 0) {
            return;
        }
        var uniqueLayerIds = listLoadingSlipExt.map(function (p) { return p.LoadingLayerid; }).filter(function (value, index, self) { return self.indexOf(value) === index; });
        //.forEach(p=>{alert('Sequence Layer ID : ' + p.toString());})
        uniqueLayerIds.forEach(function (element) {
            if (_this.loadingSlipTO.SequenceLoading != null || _this.loadingSlipTO.SequenceLoading != undefined)
                _this.loadingSlipTO.SequenceLoading += "|";
            else
                _this.loadingSlipTO.SequenceLoading = "";
            switch (element) {
                case 1:
                    _this.loadingSlipTO.SequenceLoading += myGlobalVal.loadingSequenceName.BOTTOM;
                    break;
                case 2:
                    _this.loadingSlipTO.SequenceLoading += myGlobalVal.loadingSequenceName.MIDDLE1;
                    break;
                case 3:
                    _this.loadingSlipTO.SequenceLoading += myGlobalVal.loadingSequenceName.MIDDLE2;
                    break;
                case 4:
                    _this.loadingSlipTO.SequenceLoading += myGlobalVal.loadingSequenceName.MIDDLE3;
                    break;
                case 5:
                    _this.loadingSlipTO.SequenceLoading += myGlobalVal.loadingSequenceName.TOP;
                    break;
            }
        });
    };
    LoadingSlipComponent.prototype.onSelectionChange = function (bookingTo) {
        var _this = this;
        this.loadingSlipTO = new loading_information_3.LoadingSlipTO();
        //tblLoadingDtlTO : LoadingSlipDtlTO = {}
        //this.listDeliveryAddr = [];
        //this.tempListDeliveryAddr = [];
        // var v = this.loadingSlipToList.forEach(p => p.TblLoadingSlipDtlTO.IdBooking == bookingTo.IdBooking);
        // if (v != null) {
        //     this.errorMsg.showErrorMessage("Loading slip for this order is already generated.", "Warning");
        //     return;
        // }
        //var v = this.dealerBookingList.filter(p => p.IdBooking == bookingTo.IdBooking).forEach(p1 => p1.IsSelect = true);
        if (!bookingTo.IsSelect) {
            return;
        }
        var tempBookingTo = this.dealerBookingList.filter(function (p) { return p.IdBooking == bookingTo.IdBooking; })[0];
        this.loadingSlipTO.TblLoadingSlipDtlTO = this.returnLoadingDtlTo(tempBookingTo);
        this.loadingSlipTO.DeliveryAddressTOList = this.listDeliveryAddr.filter(function (p) { return p.LoadingLayerId == _this.selectedMaterialLayerId; });
        this.isDealerSelectedID = true;
        this.loadingSlipTO.CdStructure = bookingTo.CdStructure.toString();
        this.loadingSlipTO.CdStructureId = bookingTo.CdStructureId;
        this.getDeliveryAddrById(bookingTo.IdBooking);
        this.loadingSlipTO.LoadingLayerId = this.selectedMaterialLayerId;
        this.addSelectedLayerLoadingSlipTO();
        //this.pushLoadingSlipChanges()
    };
    LoadingSlipComponent.prototype.valuechange = function (keyVal, currentBookingInfo) {
        var _this = this;
        if (!currentBookingInfo.IsSelect) {
            this.dealerBookingList.forEach(function (p1) { return p1.LoadingQty = 0; });
            this.errorMsg.showErrorMessage("Please select order first.", "Warning");
            return;
        }
        else if (keyVal > currentBookingInfo.PendingQty) {
            this.errorMsg.showErrorMessage("Loading quantity must be less than Booking qty.", "Warning");
            this.dealerBookingList.forEach(function (p1) { return p1.LoadingQty = 0; });
            return;
        }
        debugger;
        this.loadingSlipToList.filter(function (p) { return p.LoadingLayerId == _this.selectedMaterialLayerId; }).forEach(function (element) {
            if (element.TblLoadingSlipDtlTO.IdBooking == currentBookingInfo.IdBooking) {
                element.TblLoadingSlipDtlTO = _this.returnLoadingDtlTo(currentBookingInfo);
            }
        });
    };
    LoadingSlipComponent.prototype.getcnfList = function () {
        var _this = this;
        this.commonServices.getOrgList(1 /* CNFTYPEID */)
            .subscribe(function (p) { return _this.cnfOrgList = p; }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    LoadingSlipComponent.prototype.getDeliveryAddrById = function (orderId) {
        var _this = this;
        debugger;
        var res = this.listDeliveryAddr.filter(function (p) { return p.BookingId == orderId; });
        if (res.length == 0 || res == undefined) {
            this.loadingServices.getDeliveryAddrById(orderId).subscribe(function (p) {
                p.forEach(function (ele) {
                    //ele.LoadingLayerId = this.selectedMaterialLayerId
                    ele.IsSelected = false;
                    _this.listDeliveryAddr.push(ele);
                });
                //this.tempListDeliveryAddr = this.listDeliveryAddr.filter(p=>p.LoadingLayerId == this.selectedMaterialLayerId);
                _this.getDeliveryAddr(_this.selectedMaterialLayerId);
                _this.isExpandOrder = false;
            }, function (err) {
                console.log(err);
            });
        }
        else {
            //this.tempListDeliveryAddr = this.listDeliveryAddr.filter(p=>p.LoadingLayerId == this.selectedMaterialLayerId);
            this.getDeliveryAddr(this.selectedMaterialLayerId);
        }
    };
    LoadingSlipComponent.prototype.onDeliveryAddrSelectionChange = function (deliveryAddressTo) {
        var _this = this;
        if (deliveryAddressTo.IsSelected) {
            this.tempListDeliveryAddr.filter(function (p) { return p != deliveryAddressTo; }).forEach(function (ele) { return ele.IsSelected = false; });
        }
        else {
            this.tempListDeliveryAddr.filter(function (p) { return p == deliveryAddressTo; }).forEach(function (ele) { return ele.IsSelected = false; });
        }
        if (deliveryAddressTo.IdBookingDelAddr != undefined && deliveryAddressTo.IdBookingDelAddr != 0) {
            this.tempListDeliveryAddr.filter(function (p) { return p.IdBookingDelAddr == deliveryAddressTo.IdBookingDelAddr && p.IsSelected; }).forEach(function (ele) { ele.IsSelected = undefined; });
            var v = this.tempListDeliveryAddr.filter(function (p) { return p.IdBookingDelAddr == deliveryAddressTo.IdBookingDelAddr; }).forEach(function (p1) {
                p1.IsSelected = true,
                    p1.LoadingLayerId = _this.selectedMaterialLayerId;
            });
        }
        else {
            this.tempListDeliveryAddr.filter(function (p) { return p.LoadingLayerId == deliveryAddressTo.LoadingLayerId && p.IsSelected; }).forEach(function (ele) { ele.IsSelected = undefined; });
            var v = this.tempListDeliveryAddr.filter(function (p) { return p.LoadingLayerId == deliveryAddressTo.LoadingLayerId; }).forEach(function (p1) {
                p1.IsSelected = true;
            });
        }
    };
    LoadingSlipComponent.prototype.validateDeliveryAddrVsLayer = function (layerId) {
        var result = this.tempListDeliveryAddr.filter(function (p) { return p.LoadingLayerId == layerId; });
        if (result == undefined || result.length == 0)
            return false;
        else
            return true;
    };
    LoadingSlipComponent.prototype.mapLayerDeliveryAddr = function (layerId) {
        var _this = this;
        // if(!this.validateCurrentLayer()){
        //     alert('not valid')
        //     return;
        // }
        if (this.selectedMaterialLayerId != undefined && this.selectedMaterialLayerId != 0) {
            var objDeliveryAddr = this.tempListDeliveryAddr.filter(function (p) { return p.IsSelected; })[0];
            if (objDeliveryAddr != undefined) {
                if (objDeliveryAddr.IdBookingDelAddr != 0) {
                    this.listDeliveryAddr.filter(function (element) { return element.IdBookingDelAddr == objDeliveryAddr.IdBookingDelAddr; }).forEach(function (ele) {
                        ele.LoadingLayerId = _this.selectedMaterialLayerId,
                            ele.IsSelected = true;
                    });
                }
                else {
                    //objDeliveryAddr = new DeliveryAddressTO();
                    this.listDeliveryAddr = this.listDeliveryAddr.filter(function (element) { return element.LoadingLayerId != _this.selectedMaterialLayerId; });
                    objDeliveryAddr.LoadingLayerId = this.selectedMaterialLayerId;
                    this.listDeliveryAddr.push(objDeliveryAddr);
                }
            }
        }
        this.addSelectedLayerLoadingSlipTO();
        this.cleartheLayerLoadingSlipData();
        this.tempListDeliveryAddr = this.listDeliveryAddr.filter(function (p) { return p.LoadingLayerId == layerId; }); //p.IsSelected == undefined ||
        this.selectedMaterialLayerId = layerId;
        var addressFromList = this.loadingSlipToList.filter(function (element) { return element.LoadingLayerId == layerId; });
        //[0].DeliveryAddressTOList//.filter(p=>p.LoadingLayerId == layerId)
        if (this.tempListDeliveryAddr.filter(function (p) { return p.LoadingLayerId == layerId; }).length == 0 && addressFromList.length != 0) {
            this.tempListDeliveryAddr = addressFromList[0].DeliveryAddressTOList.filter(function (p) { return p.LoadingLayerId == layerId; });
        }
        this.selectNewLayerOrder(layerId);
        this.getDeliveryAddr(layerId);
        this.calculateBalQty(layerId);
        if (this.tempListDeliveryAddr.filter(function (p) { return p.IsSelected; }) == undefined)
            this.isAddrSelected = false;
        else
            this.isAddrSelected = true;
        //this.loadingSlipTO = this.loadingSlipToList.filter(element => element.LoadingLayerId == layerId)[0];
        // this.loadingSlipTO = this.loadingSlipToList.forEach(ele=>{
        //     ele.LoadingSlipExtTOList.filter(p=>p.LoadingLayerid == layerId)
        // });
        if (this.loadingSlipTO == undefined)
            this.loadingSlipTO = new loading_information_3.LoadingSlipTO();
    };
    /*Validate the layer before going next layer*/
    LoadingSlipComponent.prototype.validateCurrentLayer = function () {
        var _this = this;
        this.loadingSlipToList.filter(function (p) { return p.LoadingLayerId == _this.selectedMaterialLayerId; }).forEach(function (ele) {
            if (ele.LoadingSlipExtTOList.length == 0) {
                _this.errorMsg.showErrorMessage("Sizes Qty not selected yet for Order# " + ele.TblLoadingSlipDtlTO.IdBooking, "Warning");
                return false;
            }
            else if (ele.DeliveryAddressTOList.length == 0) {
                _this.errorMsg.showErrorMessage("Delivery Address for current Layer is not Selected.", "Warning");
                return false;
            }
        });
    };
    LoadingSlipComponent.prototype.selectNewLayerOrder = function (loadingLayerId) {
        var _this = this;
        debugger;
        var dealerOrgId = this.loadingSlipToList.filter(function (q) { return q.LoadingLayerId == loadingLayerId; });
        if (dealerOrgId != undefined && dealerOrgId.length > 0) {
            this.dealerBookingList.forEach(function (element) { return element.IsSelect = false; });
            this.dealerBookingList = this.commonDealerList.filter(function (p) { return p.DealerOrgId == dealerOrgId[0].DealerOrgId; });
            this.loadingSlipToList.filter(function (p) { return p.LoadingLayerId == loadingLayerId; }).forEach(function (element) {
                _this.dealerBookingList.filter(function (p) { return p.IdBooking == element.TblLoadingSlipDtlTO.IdBooking; }).forEach(function (ele) { return ele.IsSelect = true; });
            });
        }
        else {
            this.dealerBookingList.forEach(function (element1) {
                element1.IsSelect = false;
                //element1.LoadingQty = 0
            });
        }
    };
    LoadingSlipComponent.prototype.addNewDeeliveryAddr = function () {
        var objDeliveryAddr = new booking_information_2.DeliveryAddressTO();
        objDeliveryAddr.LoadingLayerId = this.selectedMaterialLayerId;
        objDeliveryAddr.IdBookingDelAddr = 0;
        this.tempListDeliveryAddr.push(objDeliveryAddr);
    };
    LoadingSlipComponent.prototype.getDealerList = function (cnfId) {
        var _this = this;
        this.dealerList = [];
        this.commonServices.getDealerList(cnfId)
            .subscribe(function (commonInfoList) {
            _this.dealerList = commonInfoList;
            _this.dealerList.sort(function (ele) { return ele.Value; });
        }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    LoadingSlipComponent.prototype.ConfirmAndLoadingTO = function () {
        var _this = this;
        debugger;
        this.calculateTotalQtyLayerWise(1);
        this.mergeLoadingSlipAgainestidBooking();
        //this.mapLayerDeliveryAddr(this.selectedMaterialLayerId)
        this.addSelectedLayerLoadingSlipTO();
        //debugger;
        if (this.loadingSlipToList.length == 0) {
            this.errorMsg.showErrorMessage("Loading slips are not generated yet.", "Warning");
            return;
        }
        // else if(this.isBottomLoading !=0 || this.isMiddle1Loading !=0 
        // || this.isMiddle2Loading !=0 || this.isMiddle3Loading !=0 || this.isTopLoading !=0)
        // {
        //     this.errorMsg.showErrorMessage("Laod all layer before generating slip.","Warning")
        //     return;
        // }
        this.loadingTO.Qty = this.totalQuantitySlipTo;
        //   this.loadingSlipToList.forEach(ele=>{
        //     this.loadingTO.Qty += +ele.TblLoadingSlipDtlTO.LoadingQty
        // });
        //this.loadingTO.CnfOrgId = this.cnfTo.Value;
        this.loadingTO.CnfOrgId = this.selectedCnfId;
        this.loadingTO.IsJointDelivery = (this.isJointDelivery) ? 1 : 0;
        this.loadingSlipToList.forEach(function (ele) {
            ele.LoadingSlipExtTOList = ele.LoadingSlipExtTOList.filter(function (p) { return p.LoadingQty > 0; });
        });
        this.loadingTO.loadingSlipList = [];
        this.loadingTO.loadingSlipList = this.loadingSlipToList;
        var LoadingOperation;
        LoadingOperation = this.loadingServices.addLoading(this.loadingTO, this.userTo.IdUser);
        this._confirmService.activate("Have you confirm the loading slip details?", "Confirmation")
            .then(function (res) {
            if (res) {
                _this.ss.showLoader();
                LoadingOperation.subscribe(function (Loading) {
                    _this.resultMessage = Loading;
                    debugger;
                    if (_this.resultMessage.Result == 1 && _this.resultMessage.MessageType == myGlobalVal.ResultMessageE.Information) {
                        _this.errorMsg.showErrorMessage(_this.resultMessage.Text, "Information");
                        _this.loadingTO = new loading_information_4.LoadingTO();
                        _this.dealerList = [];
                        _this.dealerBookingList = [];
                        _this.isExpandOrder = false;
                        _this.loadingSlipToList = [];
                        _this.tempListDeliveryAddr = [];
                        _this.listDeliveryAddr = [];
                        _this.loadingTO = { NoOfDeliveries: 0 };
                        _this.ss.hideLoader();
                    }
                    else {
                        _this.ss.hideLoader();
                        _this.errorMsg.showErrorMessage("Loading Slip not generated.", "Error");
                    }
                }, function (err) {
                    _this.ss.hideLoader();
                    _this.errorMsg.showErrorMessage(err, "Error");
                });
            }
            else {
            }
        });
    };
    LoadingSlipComponent.prototype.OnCnfvalueChanged = function (val) {
        if (val != undefined) {
            if (val.Text == undefined) {
                this.dealerList = [];
            }
            else {
                this.cnfTo.Value = val.Value;
                this.selectedCnfId = val.Value;
                this.getDealerList(this.cnfTo.Value);
            }
        }
    };
    LoadingSlipComponent.prototype.onDealerNameSelection = function (val) {
        if (val != undefined) {
            if (val.Text == undefined) {
                this.dealerBookingList = [];
            }
            else {
                this.dealerTo.Value = val.Value;
                this.dealerTo.Text = val.Text;
                this.selectedDealerID = val.Value;
                this.onSelect(val.Value);
            }
        }
    };
    LoadingSlipComponent.prototype.encryptDecrypt = function () {
        alert('Encrypted Value : ' + encryptDecrypt.encrypted);
        alert('decrypted Value : ' + encryptDecrypt.decrypted);
    };
    //[17/03/2017]Vijaya added to get cdStructure list,delivery period list,district list
    LoadingSlipComponent.prototype.getCdstructureList = function () {
        var _this = this;
        this.commonServices.getCdstructureList()
            .subscribe(function (cdStructureLst) { return _this.cdStructureLst = cdStructureLst; }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    LoadingSlipComponent.prototype.getProductCatList = function () {
        var _this = this;
        this.commonServices.getProductCatList().subscribe(function (data) {
            _this.productCategoryList = data;
            _this.ss.hideLoader();
        }, function (error) {
            _this.ss.hideLoader();
            console.log(error);
        }, function () {
            _this.ss.hideLoader();
        });
    };
    LoadingSlipComponent.prototype.CollectMatvsBookedOrder = function (proCategoryVal, dealerBookingInfo) {
        var _this = this;
        debugger;
        if (dealerBookingInfo != undefined) {
            this.bookingInfoTo = dealerBookingInfo;
        }
        else
            dealerBookingInfo = this.bookingInfoTo;
        this.isDispMaterialSizess = false;
        // if (this.loadingSlipTO.TblLoadingSlipDtlTO.LoadingQty == undefined ||
        //     this.loadingSlipTO.TblLoadingSlipDtlTO.LoadingQty == 0) {
        if (!dealerBookingInfo.IsSelect || dealerBookingInfo.LoadingQty == 0) {
            this.errorMsg.showErrorMessage("Select and enter qty to Load from pending list.", "Warning");
            return;
        }
        this.loadingSlipTO = this.loadingSlipToList.filter(function (p) { return p.LoadingLayerId == _this.selectedMaterialLayerId
            && p.TblLoadingSlipDtlTO.IdBooking == dealerBookingInfo.IdBooking; })[0];
        this.loadingSlipTO.TblLoadingSlipDtlTO = this.returnLoadingDtlTo(dealerBookingInfo);
        this.isDispMaterialSizess = true;
        this.ProdCatVal = proCategoryVal == 2 ? true : false;
        // this.ProdCatVal == true?  this.productCategoryId = myGlobalVal.ProductCatE.Plain 
        // : this.productCategoryId = myGlobalVal.ProductCatE.TMT
        this.productCategoryId = this.ProdCatVal ? myGlobalVal.ProductCatE.Plain
            : myGlobalVal.ProductCatE.TMT;
        var matCatvsSpecBookedList = [];
        matCatvsSpecBookedList = this.loadingSlipToList.filter(function (p) { return p.LoadingLayerId == _this.selectedMaterialLayerId
            && p.TblLoadingSlipDtlTO.IdBooking == dealerBookingInfo.IdBooking; });
        if (matCatvsSpecBookedList.length > 0) {
            matCatvsSpecBookedList = matCatvsSpecBookedList[0].LoadingSlipExtTOList.filter(function (p) { return p.ProdCatId == _this.productCategoryId; });
        }
        if (matCatvsSpecBookedList.length == 0 || matCatvsSpecBookedList == undefined) {
            this.loadingServices.getProductStockList(this.loadingSlipTO, this.productCategoryId).subscribe(function (data) {
                _this.commonLoadingSlipExtToList = data;
                _this.generateListSizevsSpecs();
                //this.calcaluteAvialableStock();
            }, function (err) {
                console.log("Server Error : " + err);
                _this.ss.hideLoader();
            });
        }
        else {
            this.commonLoadingSlipExtToList = matCatvsSpecBookedList;
            this.generateListSizevsSpecs();
        }
    };
    LoadingSlipComponent.prototype.generateListSizevsSpecs = function () {
        var _this = this;
        this.productSpec = [];
        this.productSizeSpecGroupedStockList = [];
        this.productMaterialSpecAndCatList = [];
        var uniqueLayerIds = this.commonLoadingSlipExtToList.map(function (p) { return p.ProdSpecDesc; }).filter(function (value, index, self) { return self.indexOf(value) === index; });
        uniqueLayerIds.forEach(function (element) {
            _this.productSpec.push(element);
        });
        this.productSpec.push('Quota');
        var i = 0;
        for (var i = 0; i < this.commonLoadingSlipExtToList.length; ++i) {
            var obj = this.commonLoadingSlipExtToList[i];
            //If a property for this Material Desc does not exist yet, create
            if (this.productSizeSpecGroupedStockList[obj.MaterialDesc] === undefined)
                this.productSizeSpecGroupedStockList[obj.MaterialDesc] = [{ 'key': obj.MaterialDesc, value: [obj.MaterialDesc] }];
            //x will always be the array corresponding to the Material Desc. Push a value the current value to it.
            this.productSizeSpecGroupedStockList[obj.MaterialDesc].push({ 'key': obj.ProdSpecDesc, 'value': obj.LoadingQty });
        }
        //debugger;
        for (var k in this.productSizeSpecGroupedStockList) {
            var i_1 = 0;
            var materialTO = new loading_information_5.MaterialProdSpecsvsSizeTO();
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
        this.firstKey = this.productSizeSpecGroupedStockList.first;
        this.keys = Object.keys(this.productSizeSpecGroupedStockList);
        this.pushAvlQuotaForSize();
        this.calculateTotalEnterQty();
    };
    LoadingSlipComponent.prototype.pushAvlQuotaForSize = function () {
        var _this = this;
        this.loadingServices.getCnfDeclaredLoadingQuota(this.selectedCnfId).subscribe(function (data) {
            _this.loadingQuotaAvailableStock = data;
            if (_this.loadingQuotaAvailableStock.length > 0) {
                var totalVal = 0;
                _this.keys.forEach(function (ele) {
                    totalVal = 0;
                    _this.loadingQuotaAvailableStock.filter(function (p) { return p.MaterialDesc == ele; }).forEach(function (ele) {
                        totalVal += +ele.BalanceQuota;
                    });
                    _this.productSizeSpecGroupedStockList[ele].push({ 'key': 'Quota', 'value': totalVal });
                });
            }
            else {
                _this.keys.forEach(function (ele) {
                    _this.productSizeSpecGroupedStockList[ele].push({ 'key': 'Quota', 'value': 0 });
                });
            }
        }, function (err) {
            console.log("Server error");
        });
    };
    LoadingSlipComponent.prototype.addLoadingQtyInExtTOList = function () {
        var _this = this;
        var otherCatIDList;
        this.addSelectedLayerLoadingSlipTO();
        this.keys.forEach(function (ele) {
            _this.productSizeSpecGroupedStockList[ele].forEach(function (element) {
                if (element.key != ele && element.key != 'Quota') {
                    _this.commonLoadingSlipExtToList.filter(function (p) { return p.MaterialDesc == ele
                        && p.ProdSpecDesc == element.key; })[0].LoadingQty = element.value;
                }
            });
        });
        //   this.productMaterialSpecAndCatList.forEach(ele => {
        //     this.commonLoadingSlipExtToList.filter(p => p.MaterialDesc == ele.MaterialCategory)[0].LoadingQty = ele.StraightQty
        //         , this.commonLoadingSlipExtToList.filter(p => p.MaterialDesc == ele.MaterialCategory)[1].LoadingQty = ele.BendQty
        //         , this.commonLoadingSlipExtToList.filter(p => p.MaterialDesc == ele.MaterialCategory)[2].LoadingQty = ele.RKShortQty
        //         , this.commonLoadingSlipExtToList.filter(p => p.MaterialDesc == ele.MaterialCategory)[3].LoadingQty = ele.RKLongQty
        //         , this.commonLoadingSlipExtToList.filter(p => p.MaterialDesc == ele.MaterialCategory)[4].LoadingQty = ele.TukadaQty
        //         , this.commonLoadingSlipExtToList.filter(p => p.MaterialDesc == ele.MaterialCategory)[5].LoadingQty = ele.CoilQty
        // })
        this.commonLoadingSlipExtToList.forEach(function (ele) { ele.LoadingLayerid = _this.selectedMaterialLayerId; });
        this.commonLoadingSlipExtToList.forEach(function (ele) { ele.LoadingLayerE = _this.selectedMaterialLayerId; });
        var getLoadingSlip = this.loadingSlipToList.filter(function (p) { return p.LoadingLayerId == _this.selectedMaterialLayerId
            && p.TblLoadingSlipDtlTO.IdBooking == _this.loadingSlipTO.TblLoadingSlipDtlTO.IdBooking; });
        if (getLoadingSlip.length > 0 && getLoadingSlip != undefined) {
            otherCatIDList = this.loadingSlipToList.filter(function (p) { return p.LoadingLayerId == _this.selectedMaterialLayerId
                && p.TblLoadingSlipDtlTO.IdBooking == _this.loadingSlipTO.TblLoadingSlipDtlTO.IdBooking; })[0].LoadingSlipExtTOList;
            if (otherCatIDList != undefined) {
                otherCatIDList.filter(function (p) { return p.ProdCatId != _this.productCategoryId; });
            }
            this.commonLoadingSlipExtToList.concat(otherCatIDList);
        }
        this.commonLoadingSlipExtToList.forEach(function (ele) { return ele.BookingId = _this.loadingSlipTO.TblLoadingSlipDtlTO.IdBooking; });
        this.loadingSlipToList.filter(function (p) { return p.LoadingLayerId == _this.selectedMaterialLayerId
            && p.TblLoadingSlipDtlTO.IdBooking == _this.loadingSlipTO.TblLoadingSlipDtlTO.IdBooking; })[0].LoadingSlipExtTOList = this.commonLoadingSlipExtToList;
        switch (this.selectedMaterialLayerId) {
            case 1:
                this.bottomLoadingMaterialSequenceTOList = [];
                this.loadingSlipToList.filter(function (p) { return p.LoadingLayerId == _this.selectedMaterialLayerId; }).forEach(function (element) {
                    element.LoadingSlipExtTOList.filter(function (p) { return p.LoadingQty > 0; }).forEach(function (ele) {
                        _this.bottomLoadingMaterialSequenceTOList.push(ele);
                    });
                });
                break;
            case 2:
                this.middleLoadingMaterialSequenceTOList = [];
                this.loadingSlipToList.filter(function (p) { return p.LoadingLayerId == _this.selectedMaterialLayerId; }).forEach(function (element) {
                    element.LoadingSlipExtTOList.filter(function (p) { return p.LoadingQty > 0; }).forEach(function (ele) {
                        _this.middleLoadingMaterialSequenceTOList.push(ele);
                    });
                });
                break;
            case 3:
                this.middle2LoadingMaterialSequenceTOList = [];
                this.loadingSlipToList.filter(function (p) { return p.LoadingLayerId == _this.selectedMaterialLayerId; }).forEach(function (element) {
                    element.LoadingSlipExtTOList.filter(function (p) { return p.LoadingQty > 0; }).forEach(function (ele) {
                        _this.middle2LoadingMaterialSequenceTOList.push(ele);
                    });
                });
                break;
            case 4:
                this.middle3LoadingMaterialSequenceTOList = [];
                this.loadingSlipToList.filter(function (p) { return p.LoadingLayerId == _this.selectedMaterialLayerId; }).forEach(function (element) {
                    element.LoadingSlipExtTOList.filter(function (p) { return p.LoadingQty > 0; }).forEach(function (ele) {
                        _this.middle3LoadingMaterialSequenceTOList.push(ele);
                    });
                });
                break;
            case 5:
                this.topLoadingMaterialSequenceTOList = [];
                this.loadingSlipToList.filter(function (p) { return p.LoadingLayerId == _this.selectedMaterialLayerId; }).forEach(function (element) {
                    element.LoadingSlipExtTOList.filter(function (p) { return p.LoadingQty > 0; }).forEach(function (ele) {
                        _this.topLoadingMaterialSequenceTOList.push(ele);
                    });
                });
                break;
            default:
                break;
        }
        // this.loadingSlipTO.LoadingSlipExtTOList = this.loadingSlipToList.filter(p=>p.LoadingLayerId == this.selectedMaterialLayerId)
        //     [0].LoadingSlipExtTOList.filter(p=>p.LoadingQty > 0);
        this.addSelectedLayerLoadingSlipTO();
        this.bookingInfoTo = new booking_information_1.BookingTO();
    };
    LoadingSlipComponent.prototype.getDeclaredLoadQuota = function () {
    };
    LoadingSlipComponent.prototype.selectOnClick = function ($event) {
        $event.target.select();
    };
    LoadingSlipComponent.prototype.addSelectedLayerLoadingSlipTO = function () {
        var _this = this;
        debugger;
        this.loadingSlipTO.DealerOrgId = this.selectedDealerID;
        this.loadingSlipTO.DealerOrgName = this.dealerTo.Text;
        this.loadingSlipTO.DeliveryAddressTOList = this.listDeliveryAddr.filter(function (p) { return p.LoadingLayerId == _this.selectedMaterialLayerId; });
        //var isbookingIdExist =  this.loadingSlipToList.filter(p=>p.TblLoadingSlipDtlTO.IdBooking  == this.loadingSlipTO.TblLoadingSlipDtlTO.IdBooking);
        // if(isbookingIdExist != undefined && isbookingIdExist.length >0 ){
        // this.loadingSlipToList.filter(p=>p.TblLoadingSlipDtlTO.IdBooking  == 
        //     this.loadingSlipTO.TblLoadingSlipDtlTO.IdBooking ).forEach(ele=>{
        //        // ele.LoadingSlipExtTOList = ele.LoadingSlipExtTOList.filter(p=>p.LoadingLayerid != this.selectedMaterialLayerId)
        //         //ele.DeliveryAddressTOList = ele.DeliveryAddressTOList.filter(p=>p.LoadingLayerId != this.selectedMaterialLayerId)
        //     })
        // }
        // else{
        // this.loadingSlipToList = this.loadingSlipToList.filter(p =>( p.LoadingLayerId != this.loadingSlipTO.LoadingLayerId
        // || p.LoadingLayerId == this.loadingSlipTO.LoadingLayerId)   
        // && p.TblLoadingSlipDtlTO.IdBooking != this.loadingSlipTO.TblLoadingSlipDtlTO.IdBooking);
        var loadingSlipTo = this.loadingSlipToList.filter(function (p) { return p.LoadingLayerId == _this.loadingSlipTO.LoadingLayerId
            && p.TblLoadingSlipDtlTO.IdBooking == _this.loadingSlipTO.TblLoadingSlipDtlTO.IdBooking; })[0];
        this.loadingSlipToList = this.loadingSlipToList.filter(function (p) { return p != loadingSlipTo; });
        var isValidToPush = this.loadingSlipTO.TblLoadingSlipDtlTO;
        if (isValidToPush != undefined) {
            this.loadingSlipToList.push(this.loadingSlipTO);
        }
        this.loadingSlipToList.filter(function (p) { return p.LoadingLayerId == _this.selectedMaterialLayerId; }).forEach(function (element) {
            element.DeliveryAddressTOList = _this.tempListDeliveryAddr.filter(function (p) { return p.LoadingLayerId == _this.selectedMaterialLayerId && p.IsSelected == true; });
        });
        //}
        //Clear the data after loading slip generated
    };
    LoadingSlipComponent.prototype.mergeLoadingSlipAgainestidBooking = function () {
        var uniqueBookingIds = this.loadingSlipToList.map(function (p) { return p.TblLoadingSlipDtlTO.IdBooking; }).filter(function (value, index, self) { return self.indexOf(value) === index; });
        uniqueBookingIds.forEach(function (element) {
            //alert(element);
        });
    };
    LoadingSlipComponent.prototype.cleartheLayerLoadingSlipData = function () {
        //this.listDeliveryAddr = []
        this.tempListDeliveryAddr = [];
        this.loadingSlipTO = new loading_information_3.LoadingSlipTO();
        this.isDealerSelectedID = false;
        this.totalQuantitySlipTo += +this.tempOrderQty;
        this.tempOrderQty = 0;
        this.selectedMaterialLayerId = 0;
    };
    LoadingSlipComponent.prototype.postLoadingSlipToList = function () {
        this.addSelectedLayerLoadingSlipTO();
    };
    LoadingSlipComponent.prototype.calcaluteAvialableStock = function () {
        var _this = this;
        this.totalAvialableStraight = 0;
        this.totalAvialableBend = 0;
        this.totalAvialableRKShort = 0;
        this.totalAvialableRKLong = 0;
        this.totalAvialableTukada = 0;
        this.totalAvialableCoil = 0;
        this.loadingServices.getCnfDeclaredLoadingQuota(this.selectedCnfId).subscribe(function (data) {
            _this.loadingQuotaAvailableStock = data;
            if (_this.loadingQuotaAvailableStock.length > 0) {
                _this.loadingQuotaAvailableStock.filter(function (p) { return p.ProdSpecDesc == "Straight"; }).forEach(function (ele) { return _this.totalAvialableStraight += +ele.BalanceQuota; });
                _this.loadingQuotaAvailableStock.filter(function (p) { return p.ProdSpecDesc == "Bend"; }).forEach(function (ele) { return _this.totalAvialableBend += +ele.BalanceQuota; });
                _this.loadingQuotaAvailableStock.filter(function (p) { return p.ProdSpecDesc == "RK Short"; }).forEach(function (ele) { return _this.totalAvialableRKShort += +ele.BalanceQuota; });
                _this.loadingQuotaAvailableStock.filter(function (p) { return p.ProdSpecDesc == "RK Long"; }).forEach(function (ele) { return _this.totalAvialableRKLong += +ele.BalanceQuota; });
                _this.loadingQuotaAvailableStock.filter(function (p) { return p.ProdSpecDesc == "Tukada"; }).forEach(function (ele) { return _this.totalAvialableTukada += +ele.BalanceQuota; });
                _this.loadingQuotaAvailableStock.filter(function (p) { return p.ProdSpecDesc == "Coil"; }).forEach(function (ele) { return _this.totalAvialableCoil += +ele.BalanceQuota; });
            }
        });
    };
    ////
    //// Validate the Loading Qty and entered qty
    LoadingSlipComponent.prototype.validateLoadingQtyAgainestLayer = function (event, specs, loadingQtyTo) {
        debugger;
        this.calculateTotalEnterQty();
        if (!this.calculateLoadingQtyValidation(event, specs)) {
            switch (specs.toString()) {
                case myGlobalVal.ProductSpecsE.BEND.toString():
                    this.productMaterialSpecAndCatList.filter(function (p) { return p.MaterialCategory == loadingQtyTo.MaterialCategory; })[0].BendQty = 0;
                    break;
                case myGlobalVal.ProductSpecsE.COIL.toString():
                    this.productMaterialSpecAndCatList.filter(function (p) { return p.MaterialCategory == loadingQtyTo.MaterialCategory; })[0].CoilQty = 0;
                    break;
                case myGlobalVal.ProductSpecsE.RKLONG.toString():
                    this.productMaterialSpecAndCatList.filter(function (p) { return p.MaterialCategory == loadingQtyTo.MaterialCategory; })[0].RKLongQty = 0;
                    break;
                case myGlobalVal.ProductSpecsE.RKSHORT.toString():
                    this.productMaterialSpecAndCatList.filter(function (p) { return p.MaterialCategory == loadingQtyTo.MaterialCategory; })[0].RKShortQty = 0;
                    break;
                case myGlobalVal.ProductSpecsE.STRAIGHT.toString():
                    this.productMaterialSpecAndCatList.filter(function (p) { return p.MaterialCategory == loadingQtyTo.MaterialCategory; })[0].StraightQty = 0;
                    break;
                case myGlobalVal.ProductSpecsE.TUKADA.toString():
                    this.productMaterialSpecAndCatList.filter(function (p) { return p.MaterialCategory == loadingQtyTo.MaterialCategory; })[0].TukadaQty = 0;
                    break;
            }
            this.calculateTotalEnterQty();
        }
    };
    LoadingSlipComponent.prototype.calculateTotalEnterQty = function () {
        var _this = this;
        this.productSizeSpecGroupedStockList['Total'] = [];
        // if (this.productSizeSpecGroupedStockList['Total'] === undefined)
        this.productSizeSpecGroupedStockList['Total'].push({ 'key': 'Total', value: 'Total' });
        var totalOrderQty = 0;
        for (var i = 0; i < this.productSpec.length; ++i) {
            var totalSumSpec = 0;
            this.keys.forEach(function (ele) {
                _this.productSizeSpecGroupedStockList[ele].forEach(function (element) {
                    var v1 = element.key;
                    if (element.key == _this.productSpec[i] && element.key != 'Quota') {
                        totalSumSpec += +element.value;
                    }
                });
            });
            totalOrderQty += +totalSumSpec;
            //x will always be the array corresponding to the Material Desc. Push a value the current value to it.
            this.productSizeSpecGroupedStockList['Total'].push({ 'key': this.productSpec[i], 'value': totalSumSpec });
        }
        if (totalOrderQty == this.loadingSlipTO.TblLoadingSlipDtlTO.LoadingQty) {
            this.isValidLoadedQty = true;
        }
        else {
            this.isValidLoadedQty = false;
        }
    };
    LoadingSlipComponent.prototype.calculateLoadingQtyValidation = function (event, specs) {
        var totalOrderQty = 0;
        totalOrderQty = +this.totalStraight + +this.totalBend + +this.totalRKShort
            + +this.totalRKLong + +this.totalTukda + +this.totalCoil;
        if (totalOrderQty == this.loadingSlipTO.TblLoadingSlipDtlTO.LoadingQty) {
            this.isValidLoadedQty = true;
        }
        if (totalOrderQty > this.loadingSlipTO.TblLoadingSlipDtlTO.LoadingQty) {
            this.errorMsg.showErrorMessage("Entered Qty should not exceed the total loading Qty (" + this.loadingSlipTO.TblLoadingSlipDtlTO.LoadingQty + ").", "Warning");
            event.target.value = 0;
            return false;
        }
        else
            return true;
    };
    ////
    LoadingSlipComponent.prototype.getTransporterList = function () {
        var _this = this;
        this.commonServices.getOrgList(4 /* TRANSPORTER */)
            .subscribe(function (p) { return _this.transporterOrgList = p; }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    LoadingSlipComponent.prototype.calculateTotalQtyLayerWise = function (layerId) {
        var _this = this;
        var totalQty = 0;
        this.loadingSlipToList.forEach(function (element) {
            var extToList = element.LoadingSlipExtTOList;
            if (extToList.length != 0 || extToList != undefined) {
                extToList.forEach(function (p) { return _this.totalQuantitySlipTo += +p.LoadingQty; });
            }
        });
    };
    LoadingSlipComponent.prototype.calculateBalQty = function (layerId) {
        var _this = this;
        debugger;
        if (this.loadingSlipToList.length == 0) {
            this.dealerBookingList.forEach(function (p) { return p.BalQty = p.PendingQty; });
        }
        else {
            this.dealerBookingList.forEach(function (element) {
                var totalQty = 0;
                debugger;
                _this.loadingSlipToList.filter(function (p) { return p.TblLoadingSlipDtlTO.IdBooking == element.IdBooking; }).forEach(function (ele) {
                    totalQty += +ele.TblLoadingSlipDtlTO.LoadingQty;
                    debugger;
                    if (ele.LoadingLayerId == layerId) {
                        element.LoadingQty = ele.TblLoadingSlipDtlTO.LoadingQty;
                    }
                    // else{
                    //     element.LoadingQty = 0
                    // }
                });
                element.BalQty = element.PendingQty - +totalQty;
            });
        }
        this.dealerBookingList.filter(function (p) { return p.IsSelect == false; }).forEach(function (ele1) { return ele1.LoadingQty = 0; });
    };
    LoadingSlipComponent.prototype.isDelaredTodayLoadingQuota = function () {
        var _this = this;
        //let quotaMsg : string = "";
        this.ss.showLoader();
        this.loadingServices.isDelaredTodayLoadingQuota().subscribe(function (data) {
            if (data) {
                _this.isQuotaDeclared = true;
            }
            else {
                _this.lblConfirmationMsg = "Today's Loading Quota is not declared yet.";
            }
            return data;
        }, function (err) {
            _this.ss.hideLoader();
            console.log("Server Error : " + err);
        });
        return true;
    };
    LoadingSlipComponent.prototype.returnLoadingDtlTo = function (bookingInfo) {
        var loadingDtlTo = new loading_information_2.LoadingSlipDtlTO();
        loadingDtlTo.IdBooking = bookingInfo.IdBooking;
        loadingDtlTo.LoadingQty = bookingInfo.LoadingQty;
        loadingDtlTo.BookingRate = bookingInfo.BookingRate;
        loadingDtlTo.DealerName = bookingInfo.DealerName;
        loadingDtlTo.BookingQty = bookingInfo.BookingQty;
        return loadingDtlTo;
    };
    LoadingSlipComponent.prototype.getDeliveryAddr = function (layerId) {
        var _this = this;
        debugger;
        this.tempListDeliveryAddr = [];
        this.loadingSlipToList.filter(function (p) { return p.LoadingLayerId == layerId; }).forEach(function (ele) {
            var addrResult = _this.listDeliveryAddr.filter(function (p) { return p.BookingId == ele.TblLoadingSlipDtlTO.IdBooking; });
            if (addrResult != undefined && addrResult.length > 0) {
                addrResult.forEach(function (element) {
                    if ((element.IsSelected && element.LoadingLayerId == layerId) || !element.IsSelected) {
                        _this.tempListDeliveryAddr.push(element);
                    }
                });
            }
        });
    };
    return LoadingSlipComponent;
}());
__decorate([
    core_1.ViewChild(errorMessage_1.ErrorMessage),
    __metadata("design:type", errorMessage_1.ErrorMessage)
], LoadingSlipComponent.prototype, "errorMsg", void 0);
LoadingSlipComponent = __decorate([
    core_1.Component({
        selector: 'loading-slip',
        // template:'<h1>Hello</h1>'
        templateUrl: 'app/loading_slip/loading_slip.html'
    }),
    __metadata("design:paramtypes", [sharedService_1.sharedService,
        common_services_1.CommonServices,
        booking_service_1.bookingServices,
        loading_service_1.LoadingServices,
        confirm_service_1.ConfirmService,
        forms_2.FormBuilder,
        platform_browser_1.DomSanitizer,
        login_services_1.AuthenticationService])
], LoadingSlipComponent);
exports.LoadingSlipComponent = LoadingSlipComponent;
//# sourceMappingURL=loading_slip.component.js.map