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
var common_Information_1 = require('app/common/model/common_Information');
var loading_configurator_service_1 = require('app/Masters/services/loading_configurator.service');
var loading_configuratorTO_1 = require('app/Masters/model/loading_configuratorTO');
var errorMessage_1 = require('app/error/errorMessage');
var confirm_service_1 = require('app/error/confirm.service');
var sharedService_1 = require('app/common/services/sharedService');
var login_services_1 = require('app/login/login.services');
var LoadingConfiguratorComponent = (function () {
    function LoadingConfiguratorComponent(ss, loadingConfiguratorServices, authLoginServices, _confirmService, commonServices) {
        this.ss = ss;
        this.loadingConfiguratorServices = loadingConfiguratorServices;
        this.authLoginServices = authLoginServices;
        this._confirmService = _confirmService;
        this.commonServices = commonServices;
        this.userTo = {};
        this.resultMessage = new common_Information_1.ResultMessage;
        this.listLoadingConfig = [];
        this.MaterialSpce = [];
        this.groupedLoadingConfigList = {};
        this.MaterialCatVsCnfList = [];
        this.totalSixmm = 0;
        this.totalEightmm = 0;
        this.totalTenmm = 0;
        this.totalOneTwomm = 0;
        this.totalOneSixmm = 0;
        this.totalTwo0mm = 0;
        this.totalTwo5mm = 0;
        this.totalTwo8mm = 0;
        this.totalThreeTwomm = 0;
        this.specificationList = [];
        this.productCatList = [];
        this.ProdSpecId = 0;
        this.ProdCatId = 0;
        this.ProdCatVal = false;
        this.isDisplayConfigList = false;
        this.isModifiedData = false;
        this.userTo = authLoginServices.getUserTOFromLocalStorage();
    }
    ;
    LoadingConfiguratorComponent.prototype.ngOnInit = function () {
        componentHandler.upgradeDom();
        this.getDropdownList();
        //this.getMaterialAndConfigure();
    };
    LoadingConfiguratorComponent.prototype.getDropdownList = function () {
        var _this = this;
        this.ss.showLoader();
        this.commonServices.getMaterialSepc().subscribe(function (data) {
            _this.specificationList = data;
        }, function (err) {
            _this.ss.hideLoader();
            console.log("Server Error : " + err);
        });
        this.commonServices.getProductCatList().subscribe(function (data1) {
            _this.ss.hideLoader();
            _this.productCatList = data1;
        }, function (err) {
            _this.ss.hideLoader();
            console.log("Server Error : " + err);
        });
    };
    LoadingConfiguratorComponent.prototype.checkModifiedAndDisplayConfigList = function () {
        var _this = this;
        if (!this.isModifiedData) {
            this.displayConfiguratorList();
            return;
        }
        this._confirmService.activate("Do you want to submit modified values from below Loading Configuratio?", "Confirmation")
            .then(function (res) {
            _this.ss.showLoader();
            if (res) {
                _this.postLoaderConfigToServer();
            }
            else {
                _this.displayConfiguratorList();
            }
            _this.isModifiedData = false;
            _this.ss.hideLoader();
        });
    };
    LoadingConfiguratorComponent.prototype.assignCatValue = function (ProdCatVal) {
        ProdCatVal == true ? this.ProdCatId = 2 : this.ProdCatId = 1;
        this.ProdCatVal = ProdCatVal;
        this.checkModifiedAndDisplayConfigList();
    };
    LoadingConfiguratorComponent.prototype.displayConfiguratorList = function () {
        this.ProdCatVal == true ? this.ProdCatId = 2 : this.ProdCatId = 1;
        if (this.ProdSpecId != 0 && this.ProdCatId != 0) {
            this.groupedLoadingConfigList = {};
            this.MaterialCatVsCnfList = [];
            this.listLoadingConfig = [];
            this.MaterialSpce = [];
            this.getMaterialAndConfigure();
        }
        else
            this.isDisplayConfigList = false;
    };
    LoadingConfiguratorComponent.prototype.getMaterialAndConfigure = function () {
        var _this = this;
        debugger;
        this.ss.showLoader();
        // if (this.listLoadingConfig.length > 0)
        //     return;
        this.loadingConfiguratorServices.getLoadingConfigurator(this.ProdSpecId, this.ProdCatId).subscribe(function (data) {
            _this.listLoadingConfig = data;
            if (_this.listLoadingConfig.length > 0 && _this.listLoadingConfig != undefined) {
                _this.configureCnfAndCat();
                _this.calculatePercentageTotal();
                _this.isDisplayConfigList = true;
            }
            else
                _this.lblMessage = "Data not found for Loading configuration.";
            _this.ss.hideLoader();
        }, function (err) {
            _this.ss.hideLoader();
            console.log("Server error : " + err);
        });
    };
    LoadingConfiguratorComponent.prototype.configureCnfAndCat = function () {
        var _this = this;
        var uniqueLayerIds = this.listLoadingConfig.map(function (p) { return p.MaterialDesc; }).filter(function (value, index, self) { return self.indexOf(value) === index; });
        uniqueLayerIds.forEach(function (element) {
            _this.MaterialSpce.push(element);
        });
        var i = 0;
        for (var i = 0; i < this.listLoadingConfig.length; ++i) {
            var obj = this.listLoadingConfig[i];
            //If a property for this CngOrgID does not exist yet, create
            if (this.groupedLoadingConfigList[obj.CnfOrgId] === undefined)
                this.groupedLoadingConfigList[obj.CnfOrgId] = [obj.CnfOrgId];
            //x will always be the array corresponding to the current DtmStamp. Push a value the current value to it.
            this.groupedLoadingConfigList[obj.CnfOrgId].push(obj.AllocPct);
        }
        this.MaterialCatVsCnfList = [];
        for (var k in this.groupedLoadingConfigList) {
            var i_1 = 0;
            var loaderConfigPercTO = new loading_configuratorTO_1.MaterialCatConfigPerc();
            if (this.groupedLoadingConfigList.hasOwnProperty(k)) {
                //alert('val : ' + this.groupedStockList[k])
                var matval2 = this.groupedLoadingConfigList[k][2];
                var matval4 = this.groupedLoadingConfigList[k][4];
                var matval6 = this.groupedLoadingConfigList[k][6];
                loaderConfigPercTO.cnfId = this.groupedLoadingConfigList[k][0];
                loaderConfigPercTO.cnfName = this.listLoadingConfig.filter(function (p) { return p.CnfOrgId == _this.groupedLoadingConfigList[k][0]; })[0].CnfOrgName;
                loaderConfigPercTO.SixMM = this.groupedLoadingConfigList[k][1];
                loaderConfigPercTO.EightMM = this.groupedLoadingConfigList[k][2];
                loaderConfigPercTO.TenMM = this.groupedLoadingConfigList[k][3];
                loaderConfigPercTO.TweleveMM = this.groupedLoadingConfigList[k][4];
                loaderConfigPercTO.OneSixMM = this.groupedLoadingConfigList[k][5];
                loaderConfigPercTO.TwoZeroMM = this.groupedLoadingConfigList[k][6];
                loaderConfigPercTO.TwoFiveMM = this.groupedLoadingConfigList[k][7];
                loaderConfigPercTO.TwoEightMM = this.groupedLoadingConfigList[k][8];
                loaderConfigPercTO.ThreeTwoMM = this.groupedLoadingConfigList[k][9];
                this.MaterialCatVsCnfList.push(loaderConfigPercTO);
                this.groupedLoadingConfigList[k].forEach(function (ele) {
                    //alert(ele)
                });
            }
        }
    };
    LoadingConfiguratorComponent.prototype.postLoaderQuotaConfig = function () {
        var _this = this;
        this.submitStockAvialability();
        this._confirmService.activate("Have you confirm to load loading configuration Quota?", "Confirmation")
            .then(function (res) {
            if (res) {
                _this.postLoaderConfigToServer();
            }
        });
    };
    LoadingConfiguratorComponent.prototype.postLoaderConfigToServer = function () {
        var _this = this;
        this.ss.showLoader();
        this.loadingConfiguratorServices.postStockCatAndSpecDetails(this.listLoadingConfig, this.userTo.IdUser).subscribe(function (postData) {
            _this.ss.hideLoader();
            _this.resultMessage = postData;
            if (_this.resultMessage.Result == 1) {
                _this.errorMsg.showErrorMessage("Loading Quota configured successfully", "Information");
            }
            else
                _this.errorMsg.showErrorMessage("Loading Quota not configured.", "Error");
        }, function (err) {
            console.log('Server side error : ' + err);
            _this.ss.hideLoader();
        });
    };
    LoadingConfiguratorComponent.prototype.submitStockAvialability = function () {
        var _this = this;
        debugger;
        if (this.listLoadingConfig.length == 0)
            return;
        this.MaterialCatVsCnfList.forEach(function (ele) {
            _this.listLoadingConfig.filter(function (p) { return p.CnfOrgId == ele.cnfId; })[0].AllocPct = ele.SixMM
                , _this.listLoadingConfig.filter(function (p) { return p.CnfOrgId == ele.cnfId; })[1].AllocPct = ele.EightMM
                , _this.listLoadingConfig.filter(function (p) { return p.CnfOrgId == ele.cnfId; })[2].AllocPct = ele.TenMM
                , _this.listLoadingConfig.filter(function (p) { return p.CnfOrgId == ele.cnfId; })[3].AllocPct = ele.TweleveMM
                , _this.listLoadingConfig.filter(function (p) { return p.CnfOrgId == ele.cnfId; })[4].AllocPct = ele.OneSixMM
                , _this.listLoadingConfig.filter(function (p) { return p.CnfOrgId == ele.cnfId; })[5].AllocPct = ele.TwoZeroMM
                , _this.listLoadingConfig.filter(function (p) { return p.CnfOrgId == ele.cnfId; })[6].AllocPct = ele.TwoFiveMM
                , _this.listLoadingConfig.filter(function (p) { return p.CnfOrgId == ele.cnfId; })[7].AllocPct = ele.TwoEightMM
                , _this.listLoadingConfig.filter(function (p) { return p.CnfOrgId == ele.cnfId; })[8].AllocPct = ele.ThreeTwoMM;
        });
        //alert('after change : ' + JSON.stringify(this.stockDetailsTOList))
    };
    LoadingConfiguratorComponent.prototype.calculatePercentageTotal = function () {
        var _this = this;
        this.totalSixmm = 0;
        this.totalEightmm = 0;
        this.totalTenmm = 0;
        this.totalOneTwomm = 0;
        this.totalOneSixmm = 0;
        this.totalTwo0mm = 0;
        this.totalTwo5mm = 0;
        this.totalTwo8mm = 0;
        this.totalThreeTwomm = 0;
        this.MaterialCatVsCnfList.forEach(function (element) {
            _this.totalSixmm += +element.SixMM;
            _this.totalEightmm += +element.EightMM;
            _this.totalTenmm += +element.TenMM;
            _this.totalOneTwomm += +element.TweleveMM;
            _this.totalOneSixmm += +element.OneSixMM;
            _this.totalTwo0mm += +element.TwoZeroMM;
            _this.totalTwo5mm += +element.TwoFiveMM;
            _this.totalTwo8mm += +element.TwoEightMM;
            _this.totalThreeTwomm += +element.ThreeTwoMM;
        });
    };
    LoadingConfiguratorComponent.prototype.validateConfigPerc = function ($event, loaderConfigPerTo) {
        this.isModifiedData = true;
        this.calculatePercentageTotal();
        if (this.totalSixmm > 100 || this.totalEightmm > 100 || this.totalTenmm > 100 || this.totalOneTwomm > 100 ||
            this.totalOneSixmm > 100 || this.totalTwo0mm > 100 || this.totalTwo5mm > 100 || this.totalTwo8mm > 100 || this.totalThreeTwomm > 100) {
            this.errorMsg.showErrorMessage("Single Size for all cnf should not exceed 100% .", "Warning");
            this.calculateTotalConfigPerc($event.target.value, loaderConfigPerTo);
            $event.target.value = 0;
        }
    };
    LoadingConfiguratorComponent.prototype.ValidateAndPostLoadingQuotaConfig = function () {
        this.calculatePercentageTotal();
        if (this.totalSixmm < 100 || this.totalEightmm < 100 || this.totalTenmm < 100 || this.totalOneTwomm < 100 ||
            this.totalOneSixmm < 100 || this.totalTwo0mm < 100 || this.totalTwo5mm < 100 || this.totalTwo8mm < 100 || this.totalThreeTwomm < 100) {
            this.errorMsg.showErrorMessage("Single Size for all cnf should not less than 100% .", "Warning");
            return;
        }
        this.postLoaderQuotaConfig();
    };
    LoadingConfiguratorComponent.prototype.calculateTotalConfigPerc = function (entereVal, loaderConfigPerTo) {
        if (this.totalSixmm > 100) {
            this.MaterialCatVsCnfList.filter(function (p) { return p.cnfId == loaderConfigPerTo.cnfId; })[0].SixMM = 0;
            this.totalSixmm += -entereVal;
        }
        else if (this.totalEightmm > 100) {
            this.MaterialCatVsCnfList.filter(function (p) { return p.cnfId == loaderConfigPerTo.cnfId; })[0].EightMM = 0;
            this.totalEightmm += -entereVal;
        }
        else if (this.totalTenmm > 100) {
            this.MaterialCatVsCnfList.filter(function (p) { return p.cnfId == loaderConfigPerTo.cnfId; })[0].TenMM = 0;
            this.totalTenmm += -entereVal;
        }
        else if (this.totalOneTwomm > 100) {
            this.MaterialCatVsCnfList.filter(function (p) { return p.cnfId == loaderConfigPerTo.cnfId; })[0].TweleveMM = 0;
            this.totalOneTwomm += -entereVal;
        }
        else if (this.totalOneSixmm > 100) {
            this.MaterialCatVsCnfList.filter(function (p) { return p.cnfId == loaderConfigPerTo.cnfId; })[0].OneSixMM = 0;
            this.totalOneSixmm += -entereVal;
        }
        else if (this.totalTwo0mm > 100) {
            this.MaterialCatVsCnfList.filter(function (p) { return p.cnfId == loaderConfigPerTo.cnfId; })[0].TwoZeroMM = 0;
            this.totalTwo0mm += - -entereVal;
        }
        else if (this.totalTwo5mm > 100) {
            this.MaterialCatVsCnfList.filter(function (p) { return p.cnfId == loaderConfigPerTo.cnfId; })[0].TwoFiveMM = 0;
            this.totalTwo5mm += -entereVal;
        }
        else if (this.totalTwo8mm > 100) {
            this.MaterialCatVsCnfList.filter(function (p) { return p.cnfId == loaderConfigPerTo.cnfId; })[0].TwoEightMM = 0;
            this.totalTwo8mm += -entereVal;
        }
        else if (this.totalThreeTwomm > 100) {
            this.MaterialCatVsCnfList.filter(function (p) { return p.cnfId == loaderConfigPerTo.cnfId; })[0].ThreeTwoMM = 0;
            this.totalThreeTwomm += -entereVal;
        }
    };
    LoadingConfiguratorComponent.prototype.selectOnClick = function ($event) {
        $event.target.select();
    };
    __decorate([
        core_1.ViewChild(errorMessage_1.ErrorMessage), 
        __metadata('design:type', errorMessage_1.ErrorMessage)
    ], LoadingConfiguratorComponent.prototype, "errorMsg", void 0);
    LoadingConfiguratorComponent = __decorate([
        core_1.Component({
            selector: 'loading-configurator',
            // template:'<h1>Hello</h1>'
            templateUrl: 'app/Masters/loading_configurator.html',
            providers: [confirm_service_1.ConfirmService]
        }), 
        __metadata('design:paramtypes', [sharedService_1.sharedService, loading_configurator_service_1.LoadingConfiguratorService, login_services_1.AuthenticationService, confirm_service_1.ConfirmService, common_services_1.CommonServices])
    ], LoadingConfiguratorComponent);
    return LoadingConfiguratorComponent;
}());
exports.LoadingConfiguratorComponent = LoadingConfiguratorComponent;
//# sourceMappingURL=loading_configurator.component.js.map