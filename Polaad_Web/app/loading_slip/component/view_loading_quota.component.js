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
var loading_service_1 = require('../services/loading_service');
var myGlobalVal = require('app/global');
var sharedService_1 = require('app/common/services/sharedService');
var login_services_1 = require('app/login/login.services');
var common_services_1 = require('app/common/services/common.services');
var stockTO_1 = require('app/stock_details/model/stockTO');
var ViewLoadingQuota = (function () {
    function ViewLoadingQuota(ss, loadingServices, loginService, commonServices) {
        this.ss = ss;
        this.loadingServices = loadingServices;
        this.loginService = loginService;
        this.commonServices = commonServices;
        this.isShowCnFLst = false;
        this.loadingQuotaList = [];
        this.stockSpec = [];
        this.MaterialSizeSpecLst = [];
        this.productSizeSpecGroupedStockList = {};
    }
    ViewLoadingQuota.prototype.ngOnInit = function () {
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
                this.getcnfList(1 /* CNFTYPEID */);
                this.isShowCnFLst = true;
            }
        }
        this.getLoadingQuotaList();
    };
    ViewLoadingQuota.prototype.getLoadingQuotaList = function () {
        var _this = this;
        this.stockSpec = [];
        this.loadingQuotaList = [];
        this.MaterialSizeSpecLst = [];
        this.productSizeSpecGroupedStockList = {};
        this.loadingServices.getCnfDeclaredLoadingQuota(this.cnfOrgId)
            .subscribe(function (p) {
            _this.loadingQuotaList = p;
            if (_this.loadingQuotaList.length != 0) {
                _this.configureStockSpecAndCat();
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
    ViewLoadingQuota.prototype.getcnfList = function (orgTypeId) {
        var _this = this;
        this.commonServices.getOrgList(orgTypeId)
            .subscribe(function (commonInfoList) { return _this.cnfList = commonInfoList; }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    ViewLoadingQuota.prototype.onddlCnFChage = function () {
        this.stockSpec = [];
        this.getLoadingQuotaList();
    };
    ViewLoadingQuota.prototype.configureStockSpecAndCat = function () {
        var _this = this;
        this.MaterialSizeSpecLst = [];
        var uniqueLayerIds = this.loadingQuotaList.map(function (p) { return p.ProdSpecDesc; }).filter(function (value, index, self) { return self.indexOf(value) === index; });
        uniqueLayerIds.forEach(function (element) {
            _this.stockSpec.push(element);
        });
        var i = 0;
        for (var i = 0; i < this.loadingQuotaList.length; ++i) {
            var obj = this.loadingQuotaList[i];
            //If a property for this DtmStamp does not exist yet, create
            if (this.productSizeSpecGroupedStockList[obj.MaterialDesc] === undefined)
                this.productSizeSpecGroupedStockList[obj.MaterialDesc] = [obj.MaterialDesc];
            //x will always be the array corresponding to the current DtmStamp. Push a value the current value to it.
            //debugger;
            var result = obj.AllocQuota + "/" + obj.BalanceQuota;
            this.productSizeSpecGroupedStockList[obj.MaterialDesc].push(result);
        }
        debugger;
        for (var k in this.productSizeSpecGroupedStockList) {
            var i_1 = 0;
            var materialTO = new stockTO_1.StockProdSpecTO();
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
                // materialTO.TotalValue = materialTO.StraightQty + +materialTO.BendQty + +materialTO.RKShortQty
                //     + +materialTO.RKLongQty + +materialTO.TukadaQty + +materialTO.CoilQty
                this.MaterialSizeSpecLst.push(materialTO);
            }
        }
    };
    ViewLoadingQuota = __decorate([
        core_1.Component({
            selector: 'view-loadingSlip',
            templateUrl: 'app/loading_slip/view_loading_quota.html',
        }), 
        __metadata('design:paramtypes', [sharedService_1.sharedService, loading_service_1.LoadingServices, login_services_1.AuthenticationService, common_services_1.CommonServices])
    ], ViewLoadingQuota);
    return ViewLoadingQuota;
}());
exports.ViewLoadingQuota = ViewLoadingQuota;
//# sourceMappingURL=view_loading_quota.component.js.map