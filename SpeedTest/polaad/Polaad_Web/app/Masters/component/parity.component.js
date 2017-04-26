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
var errorMessage_1 = require("app/error/errorMessage");
var confirm_service_1 = require("app/error/confirm.service");
var login_services_1 = require("app/login/login.services");
var sharedService_1 = require("app/common/services/sharedService");
var parityTO_1 = require("app/Masters/model/parityTO");
var parityService_1 = require("app/Masters/services/parityService");
var common_Information_1 = require("app/common/model/common_Information");
var parityComponent = (function () {
    function parityComponent(ss, parityService, authLoginServices, _confirmService) {
        this.ss = ss;
        this.parityService = parityService;
        this.authLoginServices = authLoginServices;
        this._confirmService = _confirmService;
        this.userTo = {};
        this.paritySummaryTOObj = {};
        this.parityList = [];
        this.allParityList = [];
        this.parityDetailsTo = new parityTO_1.ParityDetailsTO();
        this.resultMessage = new common_Information_1.ResultMessage();
        this.userTo = authLoginServices.getUserTOFromLocalStorage();
    }
    parityComponent.prototype.ngOnInit = function () {
        componentHandler.upgradeDom();
        this.getParityList();
    };
    parityComponent.prototype.getParityList = function () {
        var _this = this;
        debugger;
        this.ss.showLoader();
        this.allParityList = {};
        //debugger;
        this.parityService.getParityList().subscribe(function (data) {
            _this.parityList = data;
            // console.log(JSON.stringify(this.parityList));
            if (_this.parityList.length > 0 && _this.parityList != undefined) {
                _this.configureParity();
            }
            else
                _this.errorMsg.showErrorMessage("Data not found for Loading configuration.", "Error");
            // this.lblMessage = "Data not found for Loading configuration."
            _this.ss.hideLoader();
        }, function (err) {
            _this.ss.hideLoader();
            console.log("Server error : " + err);
        });
    };
    parityComponent.prototype.configureParity = function () {
        var i = 0;
        this.lastUpdatedParityDate = this.parityList[0].CreatedOnStr;
        for (var i = 0; i < this.parityList.length; ++i) {
            var obj = this.parityList[i];
            //If a property for this DtmStamp does not exist yet, create
            if (this.allParityList[obj.MaterialDesc] === undefined)
                this.allParityList[obj.MaterialDesc] = [{ 'key': obj.MaterialDesc, value: [obj.MaterialDesc] }];
            //x will always be the array corresponding to the current DtmStamp. Push a value the current value to it.
            this.allParityList[obj.MaterialDesc].push({ 'key': 'ParityAmt_' + obj.ProdCatDesc, 'value': obj.ParityAmt });
            this.allParityList[obj.MaterialDesc].push({ 'key': 'NonConfParityAmt_' + obj.ProdCatDesc, 'value': obj.NonConfParityAmt });
        }
        this.keys = Object.keys(this.allParityList);
    };
    parityComponent.prototype.submitParityValues = function () {
        var _this = this;
        this.keys.forEach(function (ele) {
            _this.allParityList[ele].forEach(function (element) {
                if (element.key != ele) {
                    var str = element.key;
                    var n = str.lastIndexOf('_');
                    var result = str.substring(n + 1);
                    var i = 0;
                    for (var i = 0; i < _this.parityList.length; ++i) {
                        var obj = _this.parityList[i];
                        if (obj.ProdCatDesc == result && obj.MaterialDesc.toString() == ele) {
                            if (element.key == 'ParityAmt_TMT') {
                                obj.ParityAmt = element.value;
                            }
                            if (element.key == 'ParityAmt_PLAIN') {
                                obj.ParityAmt = element.value;
                            }
                            if (element.key == 'NonConfParityAmt_TMT') {
                                obj.NonConfParityAmt = element.value;
                            }
                            if (element.key == 'NonConfParityAmt_PLAIN') {
                                obj.NonConfParityAmt = element.value;
                            }
                        }
                    }
                }
            });
        });
    };
    parityComponent.prototype.setParityDetails = function () {
        var _this = this;
        this.parityDetailsTo = this.parityList;
        this.paritySummaryTOObj.ParityDetailList = this.parityList;
        this.submitParityValues();
        if (this.paritySummaryTOObj.Remark == null || this.paritySummaryTOObj.Remark == null) {
            this.errorMsg.showErrorMessage("Please enter Comment", "Error");
            return;
        }
        else {
            this._confirmService.activate("Have you confirm to load Stock details?", "Confirmation")
                .then(function (res) {
                if (res) {
                    _this.ss.showLoader();
                    _this.parityService.postParityDetails(_this.paritySummaryTOObj, _this.userTo.IdUser)
                        .subscribe(function (postData) {
                        _this.resultMessage = postData;
                        _this.ss.hideLoader();
                        if (_this.resultMessage.Result == 1) {
                            _this.errorMsg.showErrorMessage(_this.resultMessage.Text, "Information");
                            _this.parityList = [];
                            _this.allParityList = {};
                            _this.getParityList();
                        }
                        else
                            _this.errorMsg.showErrorMessage(_this.resultMessage.Text, "Error");
                    }, function (err) {
                        console.log('Server side error : ' + err);
                        _this.ss.hideLoader();
                    });
                }
            });
        }
    };
    parityComponent.prototype.updateValues = function (keyValue, aValue) {
        if (aValue.key == 'ParityAmt_TMT' || aValue.key == 'NonConfParityAmt_TMT') {
            var tempTMT;
            var tempPlain;
            this.allParityList[keyValue].forEach(function (element) {
                if (element.value == null || element.value == '') {
                    element.value = 0;
                }
                if (element.key == 'ParityAmt_TMT' && aValue.key == 'ParityAmt_TMT') {
                    tempTMT = element.value;
                }
                if (element.key == 'ParityAmt_PLAIN' && aValue.key == 'ParityAmt_TMT') {
                    element.value = tempTMT;
                }
                if (element.key == 'NonConfParityAmt_TMT' && aValue.key == 'NonConfParityAmt_TMT') {
                    tempPlain = element.value;
                }
                if (element.key == 'NonConfParityAmt_PLAIN' && aValue.key == 'NonConfParityAmt_TMT') {
                    element.value = tempPlain;
                }
            });
        }
    };
    return parityComponent;
}());
__decorate([
    core_1.ViewChild(errorMessage_1.ErrorMessage),
    __metadata("design:type", errorMessage_1.ErrorMessage)
], parityComponent.prototype, "errorMsg", void 0);
parityComponent = __decorate([
    core_1.Component({
        selector: 'parity',
        templateUrl: 'app/Masters/parity.html',
        providers: [confirm_service_1.ConfirmService]
    }),
    __metadata("design:paramtypes", [sharedService_1.sharedService,
        parityService_1.ParityService,
        login_services_1.AuthenticationService,
        confirm_service_1.ConfirmService])
], parityComponent);
exports.parityComponent = parityComponent;
//# sourceMappingURL=parity.component.js.map