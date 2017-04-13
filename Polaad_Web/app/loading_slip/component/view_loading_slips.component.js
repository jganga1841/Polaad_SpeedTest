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
var loading_service_1 = require("../services/loading_service");
// import 'rxjs/add/operator/filter'; 
var router_1 = require("@angular/router");
var confirm_service_1 = require("app/error/confirm.service");
var myGlobalVal = require("app/global");
var sharedService_1 = require("app/common/services/sharedService");
var login_services_1 = require("app/login/login.services");
var common_services_1 = require("app/common/services/common.services");
var ViewLoadingComponent = (function () {
    function ViewLoadingComponent(ss, router, loadingServices, route, loginService, commonServices) {
        this.ss = ss;
        this.router = router;
        this.loadingServices = loadingServices;
        this.loginService = loginService;
        this.commonServices = commonServices;
        this.isShowCnFLst = false;
        this.fromDt = new Date();
        this.toDt = new Date();
        this.toDate = new Date();
        this.fromDate = new Date();
        this.headMessage = "";
        this.isLoading = false;
        this.isDelivery = false;
        this.loadingSlipList = [];
        this.deliverySlipList = [];
        this.ProdCatVal = false;
        this.ignoredFirstEvent = false;
        this.initvalue = this.fromDate;
        this.ScreenName = route.snapshot.data[0]['ScreenName'];
        this.initializePage();
    }
    ViewLoadingComponent.prototype.ngOnInit = function () {
        this.ss.showLoader();
        //this.loadingSlipList = [];
        this.userTO = this.loginService.getUserTOFromLocalStorage();
        debugger;
        if (this.userTO.UserRoleList != null || this.userTO.UserRoleList != undefined) {
            if (this.userTO.UserRoleList[0].RoleId == myGlobalVal.UserRole.C_AND_F_AGENT) {
                this.isShowCnFLst = false;
                this.cnfOrgId = (this.userTO.OrganizationId);
            }
            else {
                this.cnfOrgId = 0;
                this.statusId = 0;
                this.getcnfList(1 /* CNFTYPEID */);
                this.isShowCnFLst = true;
                this;
            }
        }
        this.getStatusList();
        this.getLoadingSlipList();
    };
    ViewLoadingComponent.prototype.initializePage = function () {
        switch (this.ScreenName) {
            case myGlobalVal.ScreenName.DELIVERY.toString():
                this.headMessage = "Delivery Loading Slip";
                this.isDelivery = true;
                break;
            case myGlobalVal.ScreenName.LOADINGSLIP.toString():
                this.isLoading = true;
                this.headMessage = "View Loading Slip";
                break;
            default:
                this.headMessage = "View Loading Slip";
                break;
        }
    };
    ViewLoadingComponent.prototype.getLoadingSlipList = function () {
        var _this = this;
        //alert('view Loading');
        if (this.cnfOrgId == undefined) {
            this.cnfOrgId = 0;
        }
        if (this.statusId == undefined) {
            this.statusId = 0;
        }
        this.loadingServices.todaysLoadingSlipList(this.cnfOrgId, this.statusId)
            .subscribe(function (p) {
            _this.loadingSlipList = p;
            if (_this.isDelivery) {
                _this.deliverySlipList = _this.loadingSlipList.filter(function (element) { return element.StatusId == myGlobalVal.LoadingStatus.LOADING_CONFIRM; });
                _this.loadingSlipList = _this.loadingSlipList.filter(function (element) { return element.StatusId == myGlobalVal.LoadingStatus.LOADING_NEW || element.StatusId == myGlobalVal.LoadingStatus.LOADING_NOT_CONFIRM || element.StatusId == myGlobalVal.LoadingStatus.LOADING_WAITING; });
            }
        }, function (err) {
            // Log errors if any
            alert('Server error :' + err);
            _this.ss.hideLoader();
            console.log(err);
        }, function () {
            console.log("Done");
            _this.ss.hideLoader();
        });
    };
    ViewLoadingComponent.prototype.ViewLoadingSlipDetails = function (loadingTo) {
        //alert('view details : ' + loadingTo);
        localStorage.setItem("IdLoading", loadingTo.IdLoading.toString());
        localStorage.setItem("ScreenName", this.isLoading ? myGlobalVal.ScreenName.LOADINGSLIP.toString()
            : myGlobalVal.ScreenName.DELIVERY.toString());
        this.router.navigate(['DeliverySlipConfirmation']);
        // if(this.isLoading)
        //     this.router.navigate(['DeliverySlipConfirmation'],{  "ScreenName": 'pageNum'  });
        // else if(this.isDelivery)
        //     this.router.navigate(['DeliverySlipConfirmation'],{ queryParams : { ScreenName: 'pageNum' } });
    };
    ViewLoadingComponent.prototype.getcnfList = function (orgTypeId) {
        var _this = this;
        this.commonServices.getOrgList(orgTypeId)
            .subscribe(function (commonInfoList) { return _this.cnfList = commonInfoList; }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    ViewLoadingComponent.prototype.getStatusList = function () {
        var _this = this;
        this.commonServices.getBookingStatus(2 /* LOADING */)
            .subscribe(function (commonInfoList) { return _this.txnTypeList = commonInfoList; }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    ViewLoadingComponent.prototype.getListAccToDate = function (fromDate, toDate) {
        if (this.ignoredFirstEvent || this.initvalue === undefined) {
            if (this.loadingSlipList == null) {
                return null;
            }
            this.loadingSlipList = ((this.loadingSlipList.filter(function (element) { return moment(element.CreatedOn).toDate() >= moment(fromDate).toDate() && moment(element.CreatedOn).toDate() <= moment(toDate).toDate(); })));
            return this.loadingSlipList;
        }
        this.ignoredFirstEvent = true;
    };
    ViewLoadingComponent.prototype.onddlCnFChage = function () {
        this.getLoadingSlipListByDate();
    };
    ViewLoadingComponent.prototype.onddlstatusChage = function () {
        this.getLoadingSlipListByDate();
    };
    ViewLoadingComponent.prototype.onDateSelection = function () {
        this.getLoadingSlipListByDate();
    };
    ViewLoadingComponent.prototype.getLoadingSlipListByDate = function () {
        var _this = this;
        //alert('view Loading');
        if (this.ignoredFirstEvent || this.initvalue === undefined) {
            if (this.cnfOrgId == undefined) {
                this.cnfOrgId = 0;
            }
            if (this.statusId == undefined) {
                this.statusId = 0;
            }
            this.loadingServices.loadingSlipList(this.cnfOrgId, this.statusId, this.fromDate.toString(), this.toDate.toString())
                .subscribe(function (p) {
                _this.loadingSlipList = p;
                if (_this.isDelivery) {
                    _this.deliverySlipList = _this.loadingSlipList.filter(function (element) { return element.StatusId == myGlobalVal.LoadingStatus.LOADING_CONFIRM; });
                    _this.loadingSlipList = _this.loadingSlipList.filter(function (element) { return element.StatusId == myGlobalVal.LoadingStatus.LOADING_NEW || element.StatusId == myGlobalVal.LoadingStatus.LOADING_NOT_CONFIRM; });
                }
            }, function (err) {
                // Log errors if any
                alert('Server error :' + err);
                _this.ss.hideLoader();
                console.log(err);
            }, function () {
                console.log("Done");
                _this.ss.hideLoader();
            });
        }
        this.ignoredFirstEvent = true;
    };
    return ViewLoadingComponent;
}());
ViewLoadingComponent = __decorate([
    core_1.Component({
        selector: 'view-loadingSlip',
        //template:'<measurement_spinner></measurement_spinner>'
        templateUrl: 'app/loading_slip/view_loading_slip.html',
        providers: [confirm_service_1.ConfirmService]
    }),
    __metadata("design:paramtypes", [sharedService_1.sharedService,
        router_1.Router,
        loading_service_1.LoadingServices,
        router_1.ActivatedRoute,
        login_services_1.AuthenticationService,
        common_services_1.CommonServices])
], ViewLoadingComponent);
exports.ViewLoadingComponent = ViewLoadingComponent;
//# sourceMappingURL=view_loading_slips.component.js.map