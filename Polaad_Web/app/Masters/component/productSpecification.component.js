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
var confirm_service_1 = require('app/error/confirm.service');
var errorMessage_1 = require('app/error/errorMessage');
var common_services_1 = require('app/common/services/common.services');
var sharedService_1 = require('app/common/services/sharedService');
var productSpecificationService_1 = require('../services/productSpecificationService');
var login_services_1 = require('app/login/login.services');
var productSpecificationInfo_1 = require('../model/productSpecificationInfo');
var myGlobalVal = require('app/global');
var ProductSpecificationMaster = (function () {
    function ProductSpecificationMaster(ss, _confirmService, commonServices, productSpecService, loginService) {
        this.ss = ss;
        this._confirmService = _confirmService;
        this.commonServices = commonServices;
        this.productSpecService = productSpecService;
        this.loginService = loginService;
        this.isOpen = false;
        this.productSpec = [];
        this.productSpecInfoList = [];
        this.materialId = 0;
        this.productCatId = 0;
        this.avgBundleWt = 0;
        this.isShow = false;
        //this.prodSpecTo = new ProductSpecInfoTO();
        this.userTO = loginService.getUserTOFromLocalStorage();
        this.loginUserId = this.userTO.IdUser;
    }
    ProductSpecificationMaster.prototype.ngOnInit = function () {
        this.prodSpecTo = new productSpecificationInfo_1.ProductSpecInfoTO();
        this.getMaterialList();
        this.getProductCatList();
    };
    //  onMaterialSelect(materialId:number)
    // {
    //  this.materialId=materialId;
    // }
    ProductSpecificationMaster.prototype.onProductCatSelect = function () {
        this.getProductSpecList(this.materialId, this.productCatId);
        if (this.productCatId != 0) {
            this.isOpen = true;
        }
        else {
            this.isOpen = false;
        }
    };
    ProductSpecificationMaster.prototype.getMaterialList = function () {
        var _this = this;
        this.commonServices.getMaterial()
            .subscribe(function (materialList) { return _this.materialList = materialList; }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    ProductSpecificationMaster.prototype.getProductCatList = function () {
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
    ProductSpecificationMaster.prototype.getProductSpecList = function (materialId, productCatId) {
        var _this = this;
        if (materialId != 0 && productCatId != 0) {
            this.isShow = true;
            this.productSpecInfoList = [];
            this.productSpecService.getProductSpecificationList(productCatId).subscribe(function (data) {
                debugger;
                _this.productSpecInfoList = data,
                    _this.productSpecInfoList = _this.productSpecInfoList.filter(function (c) { return c.MaterialId == materialId; });
                _this.productSpecInfoList.forEach(function (ele) {
                    ele.AvgBundleWt = ele.AvgSecWt * ele.StdLength * ele.NoOfPcs;
                });
                _this.prodSpecTo.SecWt = _this.productSpecInfoList[0].SecWt;
                _this.ss.hideLoader();
            }, function (error) {
                _this.ss.hideLoader();
                console.log(error);
            }, function () {
                _this.ss.hideLoader();
            });
        }
    };
    ProductSpecificationMaster.prototype.saveProductSpecification = function (SecWt) {
        var _this = this;
        var ProductSpecOperation;
        this.productSpecInfoList.forEach(function (c) { return c.SecWt = SecWt; });
        ProductSpecOperation = this.productSpecService.addProductSpecification(this.productSpecInfoList, this.loginUserId);
        ProductSpecOperation.subscribe(function (result) {
            if (result.Result == 1 || result.MessageType == myGlobalVal.ResultMessageE.Information) {
                _this.errorMsg.showErrorMessage("Record Saved Successfully", "Information");
            }
            else
                _this.errorMsg.showErrorMessage("Record not Saved", "Error");
        }, function (err) { });
    };
    ProductSpecificationMaster.prototype.showConfirmDialog = function (SecWt) {
        var _this = this;
        var warningmsg;
        warningmsg = "Do You Want To Add The Product Specification?";
        this._confirmService.activate(warningmsg, "Confirmation")
            .then(function (res) {
            if (res) {
                _this.saveProductSpecification(SecWt);
            }
            else {
            }
        });
        return false;
    };
    ProductSpecificationMaster.prototype.calculateAvgBundleWt = function (prodSpecTo) {
        var _this = this;
        var avgSecWt = prodSpecTo.AvgSecWt;
        var stdLength = prodSpecTo.StdLength;
        var noOfPcs = prodSpecTo.NoOfPcs;
        if (avgSecWt == undefined) {
            avgSecWt = 0;
        }
        this.avgBundleWt = (avgSecWt * stdLength * noOfPcs);
        this.productSpecInfoList.filter(function (c) { return c.MaterialId == prodSpecTo.MaterialId && c.ProdCatId == prodSpecTo.ProdCatId && c.ProdSpecId == prodSpecTo.ProdSpecId; }).forEach(function (c) { return c.AvgBundleWt = _this.avgBundleWt; });
    };
    ProductSpecificationMaster.prototype.selectOnClick = function ($event) {
        $event.target.select();
    };
    __decorate([
        core_1.ViewChild(errorMessage_1.ErrorMessage), 
        __metadata('design:type', errorMessage_1.ErrorMessage)
    ], ProductSpecificationMaster.prototype, "errorMsg", void 0);
    ProductSpecificationMaster = __decorate([
        core_1.Component({
            selector: 'my-productSpecification',
            // template:'<h1>Hello</h1>'
            templateUrl: 'app/Masters/productSpecification.html'
        }), 
        __metadata('design:paramtypes', [sharedService_1.sharedService, confirm_service_1.ConfirmService, common_services_1.CommonServices, productSpecificationService_1.productSpecService, login_services_1.AuthenticationService])
    ], ProductSpecificationMaster);
    return ProductSpecificationMaster;
}());
exports.ProductSpecificationMaster = ProductSpecificationMaster;
//# sourceMappingURL=productSpecification.component.js.map