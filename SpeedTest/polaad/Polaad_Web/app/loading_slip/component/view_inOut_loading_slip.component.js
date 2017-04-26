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
var confirm_service_1 = require("app/error/confirm.service");
var errorMessage_1 = require("app/error/errorMessage");
var myGlobalVal = require("app/global");
var sharedService_1 = require("app/common/services/sharedService");
var login_services_1 = require("app/login/login.services");
var ViewInOutLoadingComponent = (function () {
    function ViewInOutLoadingComponent(ss, loadingServices, _confirmService, loginService) {
        this.ss = ss;
        this.loadingServices = loadingServices;
        this._confirmService = _confirmService;
        this.loginService = loginService;
        this.loadingSlipList = [];
        this.isGateInOut = true;
        this.isVehicleIn = true;
        this.userTO = this.loginService.getUserTOFromLocalStorage();
        this.loginUserId = this.userTO.IdUser;
    }
    ViewInOutLoadingComponent.prototype.ngOnInit = function () {
        this.ss.showLoader();
        //this.loadingSlipList = [];
        if (this.isGateInOut) {
            this.status = myGlobalVal.LoadingStatus.LOADING_CONFIRM + ',' + myGlobalVal.LoadingStatus.LOADING_REPORTED_FOR_LOADING;
            this.getLoadingSlipList(this.status);
            this.action = "In";
        }
        else {
            this.status = myGlobalVal.LoadingStatus.LOADING_CONFIRM + ',' + myGlobalVal.LoadingStatus.LOADING_COMPLETED;
            this.getLoadingSlipList(this.status);
            this.getSuperwisorListForDropDown();
            this.supervisorInfo = 0;
            this.action = "Out";
        }
    };
    ViewInOutLoadingComponent.prototype.getLoadingSlipList = function (status) {
        var _this = this;
        //alert('view Loading');
        this.loadingServices.getInOutloadingSlipList(status)
            .subscribe(function (p) {
            _this.loadingSlipList = p;
            _this.ss.hideLoader();
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
    ViewInOutLoadingComponent.prototype.postGetInLoadingSlip = function (loadingTO, flag) {
        var _this = this;
        debugger;
        var postGetInOperation;
        if (this.isGateInOut && flag == 2) {
            loadingTO.TranStatusE = myGlobalVal.LoadingStatus.LOADING_GATE_IN;
            loadingTO.StatusId = myGlobalVal.LoadingStatus.LOADING_GATE_IN;
            loadingTO.StatusReason = "Vehicle Entered In The Premises";
        }
        else if (!this.isGateInOut && flag == 2) {
            loadingTO.TranStatusE = myGlobalVal.LoadingStatus.DELIVERED;
            loadingTO.StatusId = myGlobalVal.LoadingStatus.DELIVERED;
            loadingTO.StatusReason = "Order Delivered";
        }
        else if (this.isVehicleIn && flag == 1) {
            loadingTO.TranStatusE = myGlobalVal.LoadingStatus.LOADING_REPORTED_FOR_LOADING;
            loadingTO.StatusId = myGlobalVal.LoadingStatus.LOADING_REPORTED_FOR_LOADING;
            loadingTO.StatusReason = "Vehicle Reported ";
        }
        else if (!this.isVehicleIn && flag == 1) {
            loadingTO.TranStatusE = myGlobalVal.LoadingStatus.LOADING_COMPLETED;
            loadingTO.StatusId = myGlobalVal.LoadingStatus.LOADING_COMPLETED;
            loadingTO.StatusReason = "Loading Completed";
        }
        postGetInOperation = this.loadingServices.postStatusReasonService(loadingTO, this.loginUserId);
        postGetInOperation.subscribe(function (getIn) {
            if (getIn.MessageType == myGlobalVal.ResultMessageE.Information && getIn.Result == 1) {
                _this.errorMsg.showErrorMessage("Record Updated Successfully", "Information");
                if (_this.isGateInOut) {
                    _this.getLoadingSlipList(_this.status);
                }
                else {
                    _this.getLoadingSlipList(_this.status);
                }
            }
            else
                _this.errorMsg.showErrorMessage("Error,Record Could Not Be Updated", "Error");
        }, function (err) { });
    };
    ViewInOutLoadingComponent.prototype.showConfirmDialogToGetInLoadingSlip = function (loadingTO, flag, value) {
        var _this = this;
        if (value) {
            this.callStatus(flag);
            this._confirmService.activate("Are You Sure To " + this.msg, "Confirmation")
                .then(function (res) {
                if (res) {
                    _this.postGetInLoadingSlip(loadingTO, flag);
                }
                else {
                }
            });
            return false;
        }
    };
    ViewInOutLoadingComponent.prototype.getGateInLoadingList = function (isGateIn) {
        this.ss.showLoader();
        if (isGateIn) {
            this.action = "In";
            this.isGateInOut = true;
            this.isVehicleIn = true;
            this.status = myGlobalVal.LoadingStatus.LOADING_CONFIRM + ' ,' + myGlobalVal.LoadingStatus.LOADING_REPORTED_FOR_LOADING;
        }
        else {
            this.action = "Out";
            this.isGateInOut = false;
            this.isVehicleIn = false;
            this.status = myGlobalVal.LoadingStatus.LOADING_GATE_IN + ',' + myGlobalVal.LoadingStatus.LOADING_COMPLETED;
            this.getSuperwisorListForDropDown();
        }
        this.getLoadingSlipList(this.status);
    };
    ViewInOutLoadingComponent.prototype.checkStatus = function (statusId) {
        if (this.isGateInOut) {
            if (statusId == myGlobalVal.LoadingStatus.LOADING_REPORTED_FOR_LOADING) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            if (statusId == myGlobalVal.LoadingStatus.LOADING_COMPLETED) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    ViewInOutLoadingComponent.prototype.changeColor = function (statusId) {
        if (this.isGateInOut) {
            if (statusId == myGlobalVal.LoadingStatus.LOADING_REPORTED_FOR_LOADING) {
                return 'darkseagreen';
            }
            else {
                return 'white';
            }
        }
        else {
            if (statusId == myGlobalVal.LoadingStatus.LOADING_COMPLETED) {
                return 'darkseagreen';
            }
            else {
                return 'white';
            }
        }
    };
    ViewInOutLoadingComponent.prototype.getSuperwisorListForDropDown = function () {
        var _this = this;
        this.loadingServices.getSuperwisorListForDropDown()
            .subscribe(function (supervisorList) { return _this.supervisorList = supervisorList; }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    ViewInOutLoadingComponent.prototype.showConfirmDialogToAllocateSupervisor = function (loadingTO) {
        var _this = this;
        this._confirmService.activate("Are You Sure To Allocate This Supervisor?", "Confirmation")
            .then(function (res) {
            if (res) {
                _this.postAllocateSupervisor(loadingTO);
            }
            else {
            }
        });
        return false;
    };
    ViewInOutLoadingComponent.prototype.postAllocateSupervisor = function (loadingTO) {
        var _this = this;
        loadingTO.SuperwisorName = this.supervisorList.filter(function (c) { return c.Value == loadingTO.SuperwisorId; })[0].Text;
        var postAllocateSupervisorOperation;
        postAllocateSupervisorOperation = this.loadingServices.postAllocateSupervisor(loadingTO, this.loginUserId);
        postAllocateSupervisorOperation.subscribe(function (allocate) {
            if (allocate.MessageType == myGlobalVal.ResultMessageE.Information && allocate.Result == 1) {
                _this.errorMsg.showErrorMessage("Supervisor Allocate Successfully", "Information");
                if (!_this.isGateInOut) {
                    _this.getLoadingSlipList(_this.status);
                }
            }
            else
                _this.errorMsg.showErrorMessage("Error,Record Could Not Be Updated", "Error");
        }, function (err) { });
    };
    ViewInOutLoadingComponent.prototype.callStatus = function (flag) {
        if (this.isGateInOut && flag == 2) {
            this.msg = "In This Vehicle";
        }
        else if (!this.isGateInOut && flag == 2) {
            this.msg = "Out This Vehicle";
        }
        else if (this.isVehicleIn && flag == 1) {
            this.msg = "Mark This Vehicle As Reported? ";
        }
        else if (!this.isVehicleIn && flag == 1) {
            this.msg = "Loading Completed";
        }
        return this.msg;
    };
    ViewInOutLoadingComponent.prototype.checkAllocationOfSupervisor = function (loadingToInfo) {
        if (loadingToInfo.SuperwisorId != 0 && loadingToInfo.SuperwisorName != null && loadingToInfo.StatusId !== myGlobalVal.LoadingStatus.LOADING_COMPLETED) {
            return false;
        }
        else {
            return true;
        }
    };
    return ViewInOutLoadingComponent;
}());
__decorate([
    core_1.ViewChild(errorMessage_1.ErrorMessage),
    __metadata("design:type", errorMessage_1.ErrorMessage)
], ViewInOutLoadingComponent.prototype, "errorMsg", void 0);
ViewInOutLoadingComponent = __decorate([
    core_1.Component({
        selector: 'view-loadingSlip',
        //template:'<measurement_spinner></measurement_spinner>'
        templateUrl: 'app/loading_slip/view_inOut_loading_slip.html',
        providers: [confirm_service_1.ConfirmService]
    }),
    __metadata("design:paramtypes", [sharedService_1.sharedService,
        loading_service_1.LoadingServices,
        confirm_service_1.ConfirmService,
        login_services_1.AuthenticationService])
], ViewInOutLoadingComponent);
exports.ViewInOutLoadingComponent = ViewInOutLoadingComponent;
//# sourceMappingURL=view_inOut_loading_slip.component.js.map