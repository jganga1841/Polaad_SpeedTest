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
var router_1 = require("@angular/router");
var common_services_1 = require("app/common/services/common.services");
var common_Information_1 = require("app/common/model/common_Information");
var common_Information_2 = require("app/common/model/common_Information");
var loading_service_1 = require("app/loading_slip/services/loading_service");
var loading_configuratorTO_1 = require("app/Masters/model/loading_configuratorTO");
var errorMessage_1 = require("app/error/errorMessage");
var confirm_service_1 = require("app/error/confirm.service");
var sharedService_1 = require("app/common/services/sharedService");
var login_services_1 = require("app/login/login.services");
var LoadingQuotaComponent = (function () {
    function LoadingQuotaComponent(ss, loadingServices, authLoginServices, _confirmService, commonServices, router) {
        this.ss = ss;
        this.loadingServices = loadingServices;
        this.authLoginServices = authLoginServices;
        this._confirmService = _confirmService;
        this.commonServices = commonServices;
        this.router = router;
        this.userTo = {};
        this.resultMessage = new common_Information_2.ResultMessage;
        this.listLoadingQuota = [];
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
        this.stockSummaryToList = [];
        this.isQuotaDeclared = false;
        this.specificationList = [];
        this.productCatList = [];
        this.ProdSpecId = 0;
        this.ProdCatId = 1;
        this.ProdCatTmtVal = false;
        this.isDisplayLoadingQuotaList = false;
        this.isModifiedData = false;
        this.lblConfirmationMsg = "";
        this.totalValBySize = 0;
        //// tO Calculate the Avialable stock summary
        this.totalAvialableSixmm = 0;
        this.totalAvialableEightmm = 0;
        this.totalAvialableTenmm = 0;
        this.totalAvialableOneTwomm = 0;
        this.totalAvialableOneSixmm = 0;
        this.totalAvialableTwo0mm = 0;
        this.totalAvialableTwo5mm = 0;
        this.totalAvialableTwo8mm = 0;
        this.totalAvialableThreeTwomm = 0;
        this.userTo = authLoginServices.getUserTOFromLocalStorage();
    }
    ;
    LoadingQuotaComponent.prototype.ngOnInit = function () {
        componentHandler.upgradeDom();
        this.getDropdownList();
        //this.getLoadingQuota();
        //this.getStockSummaryList();
        this.isLoadingQuotaDeclaredToday();
    };
    LoadingQuotaComponent.prototype.getDropdownList = function () {
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
    LoadingQuotaComponent.prototype.assignRedioButtonVal = function (RedioVal) {
        this.ProdCatId = RedioVal;
        this.checkModifiedAndDisplayConfigList();
    };
    LoadingQuotaComponent.prototype.checkModifiedAndDisplayConfigList = function () {
        var _this = this;
        debugger;
        if (!this.isModifiedData) {
            this.displayConfiguratorList();
            return;
        }
        this._confirmService.activate("Do you want to submit modified values from below Loading Configuratio?", "Confirmation")
            .then(function (res) {
            _this.ss.showLoader();
            if (res) {
                _this.postLoadingQuotaToApi();
            }
            else {
                _this.displayConfiguratorList();
            }
            _this.isModifiedData = false;
            _this.ss.hideLoader();
        });
    };
    LoadingQuotaComponent.prototype.displayConfiguratorList = function () {
        debugger;
        //this.ProdCatTmtVal == true ? this.ProdCatId = myGlobalVal.ProductCatE.Plain : this.ProdCatId = myGlobalVal.ProductCatE.TMT
        if (this.ProdSpecId != 0 && this.ProdCatId != 0) {
            this.groupedLoadingConfigList = {};
            this.MaterialCatVsCnfList = [];
            this.listLoadingQuota = [];
            this.MaterialSpce = [];
            this.getLoadingQuota();
            this.getStockSummaryList();
        }
        else
            this.isDisplayLoadingQuotaList = false;
    };
    LoadingQuotaComponent.prototype.getLoadingQuota = function () {
        var _this = this;
        this.ss.showLoader();
        this.loadingServices.getLoadingQuota(this.ProdSpecId, this.ProdCatId).subscribe(function (data) {
            _this.listLoadingQuota = data;
            debugger;
            //this.listLoadingQuota.sort(ele=>ele.MaterialId)
            if (_this.listLoadingQuota != null && _this.listLoadingQuota.length > 7 && _this.listLoadingQuota != undefined) {
                _this.isDisplayLoadingQuotaList = true;
                _this.configureCnfAndCat();
                _this.calculatePercentageTotal();
                _this.lblMessage = undefined;
            }
            else
                _this.lblMessage = "Data not found for Loading configuration.";
            _this.ss.hideLoader();
        }, function (err) {
            _this.ss.hideLoader();
            console.log("Server error : " + err);
        });
    };
    LoadingQuotaComponent.prototype.configureCnfAndCat = function () {
        var _this = this;
        var uniqueLayerIds = this.listLoadingQuota.map(function (p) { return p.MaterialDesc; }).filter(function (value, index, self) { return self.indexOf(value) === index; });
        uniqueLayerIds.forEach(function (element) {
            _this.MaterialSpce.push(element);
        });
        var i = 0;
        debugger;
        for (var i = 0; i < this.listLoadingQuota.length; ++i) {
            var obj = this.listLoadingQuota[i];
            //If a property for this CngOrgID does not exist yet, create
            if (this.groupedLoadingConfigList[obj.CnfOrgId] === undefined)
                this.groupedLoadingConfigList[obj.CnfOrgId] = [obj.CnfOrgId];
            //x will always be the array corresponding to the current DtmStamp. Push a value the current value to it.
            this.groupedLoadingConfigList[obj.CnfOrgId].push(obj.AllocQuota);
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
                loaderConfigPercTO.cnfName = this.listLoadingQuota.filter(function (p) { return p.CnfOrgId == _this.groupedLoadingConfigList[k][0]; })[0].CnfOrgName;
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
    LoadingQuotaComponent.prototype.selectOnClick = function ($event) {
        $event.target.select();
    };
    //calculatePercentageTotal($event : Event, materialSizr : string , loadingQuotaTo : MaterialCatConfigPerc) {
    LoadingQuotaComponent.prototype.calculatePercentageTotal = function () {
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
        //isNaN(Number(this.totalThreeTwomm))?this.totalThreeTwomm = 0
    };
    LoadingQuotaComponent.prototype.validateConfigPerc = function ($event, materialSizr, loadingQuotaTo) {
        //this.calculatePercentageTotal($event, materialSizr, loadingQuotaTo);
        this.calculatePercentageTotal();
        if (materialSizr != undefined) {
            this.validateLoadingQuota($event, materialSizr, loadingQuotaTo);
            this.calculatePercentageTotal();
        }
    };
    LoadingQuotaComponent.prototype.postLoadingQuotaDeclaration = function () {
        var _this = this;
        this.submitStockAvialability();
        this._confirmService.activate("Have you confirm to declare the loading Quota?", "Confirmation")
            .then(function (res) {
            if (res) {
                _this.postLoadingQuotaToApi();
            }
        });
    };
    LoadingQuotaComponent.prototype.postLoadingQuotaToApi = function () {
        var _this = this;
        this.ss.showLoader();
        this.loadingServices.postLoadingQuotaDeclaration(this.listLoadingQuota, this.userTo.IdUser).subscribe(function (postData) {
            _this.ss.hideLoader();
            _this.resultMessage = postData;
            if (_this.resultMessage.Result == 1) {
                _this.errorMsg.showErrorMessage("Loading Quota declared successfully", "Information");
            }
            else
                _this.errorMsg.showErrorMessage("Loading Quota not declared.", "Error");
        }, function (err) {
            console.log('Server side error : ' + err);
            _this.ss.hideLoader();
        });
    };
    LoadingQuotaComponent.prototype.submitStockAvialability = function () {
        var _this = this;
        debugger;
        if (this.listLoadingQuota.length == 0)
            return;
        this.MaterialCatVsCnfList.forEach(function (ele) {
            _this.listLoadingQuota.filter(function (p) { return p.CnfOrgId == ele.cnfId; })[0].AllocQuota = ele.SixMM
                , _this.listLoadingQuota.filter(function (p) { return p.CnfOrgId == ele.cnfId; })[1].AllocQuota = ele.EightMM
                , _this.listLoadingQuota.filter(function (p) { return p.CnfOrgId == ele.cnfId; })[2].AllocQuota = ele.TenMM
                , _this.listLoadingQuota.filter(function (p) { return p.CnfOrgId == ele.cnfId; })[3].AllocQuota = ele.TweleveMM
                , _this.listLoadingQuota.filter(function (p) { return p.CnfOrgId == ele.cnfId; })[4].AllocQuota = ele.OneSixMM
                , _this.listLoadingQuota.filter(function (p) { return p.CnfOrgId == ele.cnfId; })[5].AllocQuota = ele.TwoZeroMM
                , _this.listLoadingQuota.filter(function (p) { return p.CnfOrgId == ele.cnfId; })[6].AllocQuota = ele.TwoFiveMM
                , _this.listLoadingQuota.filter(function (p) { return p.CnfOrgId == ele.cnfId; })[7].AllocQuota = ele.TwoEightMM
                , _this.listLoadingQuota.filter(function (p) { return p.CnfOrgId == ele.cnfId; })[8].AllocQuota = ele.ThreeTwoMM;
        });
        //alert('after change : ' + JSON.stringify(this.stockDetailsTOList))
    };
    LoadingQuotaComponent.prototype.isLoadingQuotaDeclaredToday = function () {
        var _this = this;
        debugger;
        //let quotaMsg : string = "";
        this.ss.showLoader();
        this.loadingServices.isLoadingQuotaDeclaredToday().subscribe(function (data) {
            debugger;
            if (data) {
                _this.isQuotaDeclared = true;
                _this.errorMsg.showErrorMessage("Today's Loading Quota already declared.", "Warning");
            }
            else {
                debugger;
                _this.isLoadingQuotaConfirmed();
            }
            return data;
        }, function (err) {
            _this.ss.hideLoader();
            console.log("Server Error : " + err);
        });
        return true;
    };
    LoadingQuotaComponent.prototype.isLoadingQuotaConfirmed = function () {
        var _this = this;
        //this.ss.showLoader()
        this.loadingServices.isLoadingQuotaConfirmed().subscribe(function (data) {
            debugger;
            if (!data) {
                _this.lblConfirmationMsg = "Loading Stock is not confirmed yet.";
            }
            _this.isQuotaConfirmed = data;
        }, function (err) {
            _this.ss.hideLoader();
            console.log("Server Error : " + err);
        });
        return true;
    };
    LoadingQuotaComponent.prototype.getStockSummaryList = function () {
        var _this = this;
        this.ss.showLoader();
        this.loadingServices.getStockSummaryDet(this.ProdSpecId, this.ProdCatId).subscribe(function (data) {
            _this.stockSummaryToList = data;
            _this.calcaluteAvialableStock();
            _this.ss.hideLoader();
        }, function (err) {
            _this.ss.hideLoader();
            console.log("Server error : " + err);
        });
    };
    LoadingQuotaComponent.prototype.validateLoadingQuota = function (event, size, loadConfigPerTo) {
        var _this = this;
        this.totalValBySize = 0;
        size = size.replace('|', " ");
        this.stockSummaryToList.filter(function (p) { return p.MaterialDesc == size; }).forEach(function (element) { return _this.totalValBySize += element.TotalStock; });
        //.reduce((a,b)=> a.TotalStock + b.TotalStock);
        var commonInfoVal = {};
        switch (size) {
            case '6 MM':
                commonInfoVal = this.calculateStockValidate(size, this.totalValBySize, this.totalSixmm, event, loadConfigPerTo);
                if (commonInfoVal != undefined && commonInfoVal != null) {
                    this.totalSixmm = commonInfoVal.Value;
                    this.MaterialCatVsCnfList.filter(function (p) { return p.cnfId == loadConfigPerTo.cnfId; })[0].SixMM = 0;
                }
                break;
            case '8 MM':
                commonInfoVal = this.calculateStockValidate(size, this.totalValBySize, this.totalEightmm, event, loadConfigPerTo);
                if (commonInfoVal != undefined && commonInfoVal != null) {
                    this.totalEightmm = commonInfoVal.Value;
                    this.MaterialCatVsCnfList.filter(function (p) { return p.cnfId == loadConfigPerTo.cnfId; })[0].EightMM = 0;
                }
                break;
            case '10 MM':
                commonInfoVal = this.calculateStockValidate(size, this.totalValBySize, this.totalTenmm, event, loadConfigPerTo);
                if (commonInfoVal != undefined && commonInfoVal != null) {
                    this.totalTenmm = commonInfoVal.Value;
                    this.MaterialCatVsCnfList.filter(function (p) { return p.cnfId == loadConfigPerTo.cnfId; })[0].TenMM = 0;
                }
                break;
            case '12 MM':
                commonInfoVal = this.calculateStockValidate(size, this.totalValBySize, this.totalOneTwomm, event, loadConfigPerTo);
                if (commonInfoVal != undefined && commonInfoVal != null) {
                    this.totalOneTwomm = commonInfoVal.Value;
                    this.MaterialCatVsCnfList.filter(function (p) { return p.cnfId == loadConfigPerTo.cnfId; })[0].TweleveMM = 0;
                }
                break;
            case '16 MM':
                commonInfoVal = this.calculateStockValidate(size, this.totalValBySize, this.totalOneSixmm, event, loadConfigPerTo);
                if (commonInfoVal != undefined && commonInfoVal != null) {
                    this.totalOneSixmm = commonInfoVal.Value;
                    this.MaterialCatVsCnfList.filter(function (p) { return p.cnfId == loadConfigPerTo.cnfId; })[0].OneSixMM = 0;
                }
                break;
            case '20 MM':
                commonInfoVal = this.calculateStockValidate(size, this.totalValBySize, this.totalTwo0mm, event, loadConfigPerTo);
                if (commonInfoVal != undefined && commonInfoVal != null) {
                    this.totalTwo0mm = commonInfoVal.Value;
                    this.MaterialCatVsCnfList.filter(function (p) { return p.cnfId == loadConfigPerTo.cnfId; })[0].TwoZeroMM = 0;
                }
                break;
            case '25 MM':
                commonInfoVal = this.calculateStockValidate(size, this.totalValBySize, this.totalTwo5mm, event, loadConfigPerTo);
                if (commonInfoVal != undefined && commonInfoVal != null) {
                    this.totalTwo5mm = commonInfoVal.Value;
                    this.MaterialCatVsCnfList.filter(function (p) { return p.cnfId == loadConfigPerTo.cnfId; })[0].TwoFiveMM = 0;
                }
                break;
            case '28 MM':
                commonInfoVal = this.calculateStockValidate(size, this.totalValBySize, this.totalTwo8mm, event, loadConfigPerTo);
                if (commonInfoVal != undefined && commonInfoVal != null) {
                    this.totalTwo8mm = commonInfoVal.Value;
                    this.MaterialCatVsCnfList.filter(function (p) { return p.cnfId == loadConfigPerTo.cnfId; })[0].TwoEightMM = 0;
                }
                break;
            case '32 MM':
                commonInfoVal = this.calculateStockValidate(size, this.totalValBySize, this.totalThreeTwomm, event, loadConfigPerTo);
                if (commonInfoVal != undefined && commonInfoVal != null) {
                    this.totalThreeTwomm = commonInfoVal.Value;
                    this.MaterialCatVsCnfList.filter(function (p) { return p.cnfId == loadConfigPerTo.cnfId; })[0].ThreeTwoMM = 0;
                }
                break;
        }
    };
    LoadingQuotaComponent.prototype.calculateStockValidate = function (size, StockSummaryTotal, allocTotolStock, event, loadConfigPerTo) {
        var commonInfo = undefined;
        if (StockSummaryTotal < allocTotolStock) {
            commonInfo = new common_Information_1.CommonInformation();
            this.errorMsg.showErrorMessage("Loading Quota should not exceed the Stock (" + StockSummaryTotal + ").", "Warning");
            allocTotolStock += -event.target.value;
            event.target.value = 0;
            commonInfo.Value = allocTotolStock;
            commonInfo.Text = "true";
        }
        return commonInfo;
    };
    LoadingQuotaComponent.prototype.calcaluteAvialableStock = function () {
        var _this = this;
        debugger;
        this.totalAvialableSixmm = 0;
        this.totalAvialableEightmm = 0;
        this.totalAvialableTenmm = 0;
        this.totalAvialableOneTwomm = 0;
        this.totalAvialableOneSixmm = 0;
        this.totalAvialableTwo0mm = 0;
        this.totalAvialableTwo5mm = 0;
        this.totalAvialableTwo8mm = 0;
        this.totalAvialableThreeTwomm = 0;
        this.stockSummaryToList.filter(function (p) { return p.MaterialDesc == "6 MM"; }).forEach(function (ele) { _this.totalAvialableSixmm += +ele.TotalStock; });
        this.stockSummaryToList.filter(function (p) { return p.MaterialDesc == "8 MM"; }).forEach(function (ele) { _this.totalAvialableEightmm += +ele.TotalStock; });
        this.stockSummaryToList.filter(function (p) { return p.MaterialDesc == "10 MM"; }).forEach(function (ele) { _this.totalAvialableTenmm += +ele.TotalStock; });
        this.stockSummaryToList.filter(function (p) { return p.MaterialDesc == "12 MM"; }).forEach(function (ele) { _this.totalAvialableOneTwomm += +ele.TotalStock; });
        this.stockSummaryToList.filter(function (p) { return p.MaterialDesc == "16 MM"; }).forEach(function (ele) { _this.totalAvialableOneSixmm += +ele.TotalStock; });
        this.stockSummaryToList.filter(function (p) { return p.MaterialDesc == "20 MM"; }).forEach(function (ele) { _this.totalAvialableTwo0mm += +ele.TotalStock; });
        this.stockSummaryToList.filter(function (p) { return p.MaterialDesc == "25 MM"; }).forEach(function (ele) { _this.totalAvialableTwo5mm += +ele.TotalStock; });
        this.stockSummaryToList.filter(function (p) { return p.MaterialDesc == "28 MM"; }).forEach(function (ele) { _this.totalAvialableTwo8mm += +ele.TotalStock; });
        this.stockSummaryToList.filter(function (p) { return p.MaterialDesc == "32 MM"; }).forEach(function (ele) { _this.totalAvialableThreeTwomm += +ele.TotalStock; });
    };
    return LoadingQuotaComponent;
}());
__decorate([
    core_1.ViewChild(errorMessage_1.ErrorMessage),
    __metadata("design:type", errorMessage_1.ErrorMessage)
], LoadingQuotaComponent.prototype, "errorMsg", void 0);
LoadingQuotaComponent = __decorate([
    core_1.Component({
        selector: 'loading-configurator',
        // template:'<h1>Hello</h1>'
        templateUrl: 'app/loading_slip/loading_quota_declaration.html',
        providers: [confirm_service_1.ConfirmService]
    }),
    __metadata("design:paramtypes", [sharedService_1.sharedService,
        loading_service_1.LoadingServices,
        login_services_1.AuthenticationService,
        confirm_service_1.ConfirmService,
        common_services_1.CommonServices,
        router_1.Router])
], LoadingQuotaComponent);
exports.LoadingQuotaComponent = LoadingQuotaComponent;
//# sourceMappingURL=loading_quota.component.js.map