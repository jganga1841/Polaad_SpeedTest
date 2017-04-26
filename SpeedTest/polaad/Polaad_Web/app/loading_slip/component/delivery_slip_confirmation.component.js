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
var loading_information_1 = require("../model/loading_information");
// import 'rxjs/add/operator/filter'; 
var router_1 = require("@angular/router");
var confirm_service_1 = require("app/error/confirm.service");
var errorMessage_1 = require("app/error/errorMessage");
var myGlobalVal = require("app/global");
var sharedService_1 = require("app/common/services/sharedService");
var login_services_1 = require("app/login/login.services");
var DeliverySlipConfComponent = (function () {
    function DeliverySlipConfComponent(ss, router, _confirmService, loadingServices, loginService, route) {
        this.ss = ss;
        this.router = router;
        this._confirmService = _confirmService;
        this.loadingServices = loadingServices;
        this.loginService = loginService;
        this.loadingToById = new loading_information_1.LoadingTO();
        this.lblMessage = undefined;
        this.dealerNameList = [];
        this.listNotConfirmReason = [];
        this.listWaitingReason = [];
        this.waitingReasonId = 0;
        this.notConfirmReasonId = 0;
        this.confirmDateTime = new Date();
        //confirmDateTime : Date 
        this.isConfirmed = false;
        this.todayDate = new Date().toLocaleDateString();
        this.strMessage = "";
        //this.ScreenName = route.snapshot.data[0]['ScreenName'];
        this.userTO = this.loginService.getUserTOFromLocalStorage();
        this.loginUserId = this.userTO.IdUser;
    }
    DeliverySlipConfComponent.prototype.ngOnInit = function () {
        this.ss.showLoader();
        this.getLoadingSlipList();
        this.getLoadingStatusReason();
    };
    DeliverySlipConfComponent.prototype.getLoadingSlipList = function () {
        //alert('view Loading');
        var _this = this;
        this.loadingToById.IdLoading = Number(localStorage.getItem("IdLoading"));
        // this.lblMessage = "Not able to find data againest to selected loading.";
        //  return ;
        if (this.loadingToById.IdLoading == undefined) {
            this.lblMessage = " Not able to find data againest to selected loading.";
            return;
        }
        this.loadingServices.getLoadingToById(this.loadingToById.IdLoading)
            .subscribe(function (p) {
            _this.loadingToById = p;
            _this.dealerNames = _this.loadingToById.LoadingSlipList.map(function (p) { return p.DealerOrgId; }).filter(function (value, index, self) { return self.indexOf(value) === index; });
            _this.dealerNames = _this.dealerNames.forEach(function (element) {
                //    this.loadingToById.LoadingSlipList.filter(p1=>p1.DealerOrgId == element).forEach(dealerName=>{
                //       this.dealerNameList.push(dealerName.DealerOrgName)
                //    })
                _this.dealerNameList.push(_this.loadingToById.LoadingSlipList.filter(function (p1) { return p1.DealerOrgId == element; })[0].DealerOrgName);
                _this.cnfName = _this.loadingToById.CnfOrgName;
            });
            //    this.loadingToById.LoadingSlipList.forEach(ele=>{
            //        ele.LoadingSlipExtTOList
            //    })
        }, function (err) {
            // Log errors if any
            alert('err :' + err);
            console.log(err);
        }, function () {
            console.log("Done");
            //this.ss.hideLoader();
        });
    };
    DeliverySlipConfComponent.prototype.getLoadingStatusReason = function () {
        var _this = this;
        this.loadingServices.getLoadStatusReason(myGlobalVal.LoadingStatus.LOADING_NOT_CONFIRM)
            .subscribe(function (element) { _this.listNotConfirmReason = element; }, function (err) {
            alert('Server error :' + err);
            _this.ss.hideLoader();
            console.log(err);
        });
        this.loadingServices.getLoadStatusReason(myGlobalVal.LoadingStatus.LOADING_WAITING)
            .subscribe(function (element) { _this.listWaitingReason = element; }, function (err) {
            alert('Server error :' + err);
            _this.ss.hideLoader();
            console.log(err);
        }, function () {
            console.log("Done");
            _this.ss.hideLoader();
        });
    };
    DeliverySlipConfComponent.prototype.validateDateBeforeConfrimation = function () {
        if (this.confirmDateTime > new Date())
            this.isConfirmed = true;
        else if (this.confirmDateTime < new Date(new Date().setMinutes(new Date().getMinutes() - 1))) {
            this.errorMsg.showErrorMessage("The Date and Time you have selected is before the Current Date and Time.", "Warning");
            this.isConfirmed = false;
        }
    };
    DeliverySlipConfComponent.prototype.passConfirmationDate = function (event) {
        this.loadingToById.StatusId = myGlobalVal.LoadingStatus.LOADING_CONFIRM;
        this.loadingToById.LoadingDatetime = this.confirmDateTime;
        this.loadingToById.TranStatusE = myGlobalVal.LoadingStatus.LOADING_CONFIRM;
        this.loadingToById.StatusReason = "Loading Confirmed";
        this.strMessage = "Have you confirm the loading date and time?";
        this.postStatusReason(this.strMessage);
    };
    DeliverySlipConfComponent.prototype.updateNotConfirmStatus = function () {
        var _this = this;
        this.loadingToById.StatusId = myGlobalVal.LoadingStatus.LOADING_NOT_CONFIRM;
        this.loadingToById.StatusReasonId = this.notConfirmReasonId;
        this.loadingToById.StatusReason = this.listNotConfirmReason.filter(function (p) { return p.Value == _this.notConfirmReasonId; })[0].Text;
        this.loadingToById.TranStatusE = myGlobalVal.LoadingStatus.LOADING_NOT_CONFIRM;
        this.strMessage = "Are you sure to change the status as not confirm?";
        this.postStatusReason(this.strMessage);
    };
    DeliverySlipConfComponent.prototype.updateWaitingReason = function () {
        var _this = this;
        this.loadingToById.StatusId = myGlobalVal.LoadingStatus.LOADING_WAITING;
        this.loadingToById.StatusReasonId = this.waitingReasonId;
        this.loadingToById.StatusReason = this.listWaitingReason.filter(function (p) { return p.Value == _this.waitingReasonId; })[0].Text;
        this.loadingToById.TranStatusE = myGlobalVal.LoadingStatus.LOADING_WAITING;
        this.strMessage = "Are you sure to change the status as waiting?";
        this.postStatusReason(this.strMessage);
    };
    DeliverySlipConfComponent.prototype.postStatusReason = function (strMessage) {
        var _this = this;
        this._confirmService.activate(strMessage, "Confirmation")
            .then(function (res) {
            if (res) {
                _this.loadingServices.postStatusReasonService(_this.loadingToById, _this.loginUserId).subscribe(function (element) {
                    if (element == 1) {
                        _this.errorMsg.showErrorMessage("Status reason updated successfully", "Information");
                        _this.router.navigate(['ViewLoadingSlip']);
                    }
                    else
                        _this.errorMsg.showErrorMessage("Status reason not updated.", "Error");
                }, function (err) { });
            }
            else { }
        });
    };
    DeliverySlipConfComponent.prototype.backToViewLoading = function () {
        this.ScreenName = localStorage.getItem("ScreenName");
        if (this.ScreenName == myGlobalVal.ScreenName.DELIVERY.toString())
            this.router.navigate(['Delivery']);
        else
            this.router.navigate(['ViewLoadingSlip']);
    };
    DeliverySlipConfComponent.prototype.toggleDatePicker = function (status) {
        this.showDatePicker = status;
    };
    return DeliverySlipConfComponent;
}());
__decorate([
    core_1.ViewChild(errorMessage_1.ErrorMessage),
    __metadata("design:type", errorMessage_1.ErrorMessage)
], DeliverySlipConfComponent.prototype, "errorMsg", void 0);
DeliverySlipConfComponent = __decorate([
    core_1.Component({
        selector: 'delivery-slipConfirm',
        //template:'<measurement_spinner></measurement_spinner>'
        templateUrl: 'app/loading_slip/delivery_slip_confirmation.html',
        providers: [confirm_service_1.ConfirmService]
    }),
    __metadata("design:paramtypes", [sharedService_1.sharedService, typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, confirm_service_1.ConfirmService,
        loading_service_1.LoadingServices,
        login_services_1.AuthenticationService, typeof (_b = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _b || Object])
], DeliverySlipConfComponent);
exports.DeliverySlipConfComponent = DeliverySlipConfComponent;
var _a, _b;
//# sourceMappingURL=delivery_slip_confirmation.component.js.map