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
var stock_services_1 = require('app/stock_details/services/stock_services');
var stockTO_1 = require('app/stock_details/model/stockTO');
var stockTO_2 = require('app/stock_details/model/stockTO');
var errorMessage_1 = require('app/error/errorMessage');
var confirm_service_1 = require('app/error/confirm.service');
var sharedService_1 = require('app/common/services/sharedService');
var platform_browser_1 = require("@angular/platform-browser");
var login_services_1 = require('app/login/login.services');
var StockDetailsComponent = (function () {
    function StockDetailsComponent(ss, commonServices, _sanitizer, stockServices, authLoginServices, _confirmService) {
        var _this = this;
        this.ss = ss;
        this.commonServices = commonServices;
        this._sanitizer = _sanitizer;
        this.stockServices = stockServices;
        this.authLoginServices = authLoginServices;
        this._confirmService = _confirmService;
        this.userTo = {};
        this.locationTO = 0;
        this.materialTO = 0;
        this.locationTo = {};
        this.comparmentTo = {};
        this.materialSpecAndCatList = [];
        this.stockSummaryTo = new stockTO_1.StockSummaryTO();
        this.stockDetailTO = { LocationId: 0, ProdCatId: 0, CompartmentId: 0 };
        this.stockDetailsTOList = [];
        this.runningStockDetailsTOList = [];
        this.stockSummaryList = [];
        this.productSpec = [];
        this.groupedStockList = [];
        this.runningStockDetailTO = {};
        this.stockDate = null;
        this.isvalidateMaterialAction = false;
        this.resultMessage = new common_Information_1.ResultMessage();
        this.stockSpec = [];
        this.MaterialSizeSpecLst = [];
        this.productSizeSpecGroupedStockList = {};
        this.productMaterialSpecAndCatList = [];
        this.totalStraightQty = 0;
        this.totalBendQty = 0;
        this.totalRKShortQty = 0;
        this.totalRKLongQty = 0;
        this.totalTukadaQty = 0;
        this.totalCoilQty = 0;
        this.isUpdate = false;
        this.runningSizeStockDate = null;
        this.isShow = false;
        this.selectedCompartment = null;
        this.isConfirmed = false;
        this.autocompleListFormatter = function (data) {
            var html = "<span>" + data.Text + "</span>";
            return _this._sanitizer.bypassSecurityTrustHtml(html);
        };
        this.userTo = authLoginServices.getUserTOFromLocalStorage();
    }
    StockDetailsComponent.prototype.ngOnInit = function () {
        componentHandler.upgradeDom();
        this.stockUpdateCall();
    };
    StockDetailsComponent.prototype.stockUpdateCall = function () {
        this.ss.showLoader();
        this.getLocationList();
        this.getProductCatList();
        this.stockSpec = [];
    };
    StockDetailsComponent.prototype.stockSummaryCall = function () {
        this.ss.showLoader();
        this.getStockSummaryList();
        this.stockSummaryList = [];
        this.stockSpec = [];
        // this.IsLoadingQuotaDeclaredForTheDate();
    };
    StockDetailsComponent.prototype.runningSizeCall = function () {
        this.getMaterialList();
        this.getDailyRunningSizeList();
        this.runningStockDetailsTOList = [];
        this.stockSpec = [];
    };
    StockDetailsComponent.prototype.getLocationList = function () {
        var _this = this;
        this.commonServices.getLocationtList().subscribe(function (data) {
            _this.locationList = data;
        }, function (error) {
            console.log(error);
        });
    };
    StockDetailsComponent.prototype.getCompartmentList = function (LocationId) {
        var _this = this;
        this.compartmentList = [];
        this.stockDetailTO.CompartmentId = 0;
        this.validateProdAndLoc();
        if (LocationId != 0 && LocationId != undefined) {
            this.commonServices.getCompartmentList(LocationId).subscribe(function (data1) {
                _this.compartmentList = data1;
            }, function (error) {
                console.log(error);
            });
        }
    };
    StockDetailsComponent.prototype.getProductCatList = function () {
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
    StockDetailsComponent.prototype.getMaterialAndConfigure = function () {
        var _this = this;
        this.selectedCompartment = this.compartmentList.filter(function (c) { return c.Value == _this.stockDetailTO.CompartmentId; })[0].Text;
        this.stockDetailsTOList = [];
        this.materialSpecAndCatList = [];
        this.productSpec = [];
        this.groupedStockList = {};
        this.stockServices.getProductStockList(this.stockDetailTO).subscribe(function (data) {
            debugger;
            _this.stockDetailsTOList = data;
            _this.configureProdSpecAndCat();
        });
    };
    StockDetailsComponent.prototype.configureProdSpecAndCat = function () {
        var _this = this;
        var uniqueLayerIds = this.stockDetailsTOList.map(function (p) { return p.ProdSpecDesc; }).filter(function (value, index, self) { return self.indexOf(value) === index; });
        uniqueLayerIds.forEach(function (element) {
            _this.productSpec.push(element);
        });
        //this.productSpec.push('Quota')
        var i = 0;
        for (var i = 0; i < this.stockDetailsTOList.length; ++i) {
            var obj = this.stockDetailsTOList[i];
            //If a property for this DtmStamp does not exist yet, create
            if (this.groupedStockList[obj.MaterialDesc] === undefined)
                this.groupedStockList[obj.MaterialDesc] = [{ 'key': obj.MaterialDesc, value: [obj.MaterialDesc] }];
            //x will always be the array corresponding to the current DtmStamp. Push a value the current value to it.
            this.groupedStockList[obj.MaterialDesc].push({ 'key': obj.ProdSpecDesc, 'value': obj.NoOfBundles });
        }
        this.materialSpecAndCatList = [];
        debugger;
        for (var k in this.groupedStockList) {
            var i_1 = 0;
            var materialTO = new stockTO_2.StockProdSpecTO();
            if (this.groupedStockList.hasOwnProperty(k)) {
                //alert('val : ' + this.groupedStockList[k])
                var matval2 = this.groupedStockList[k][2];
                var matval4 = this.groupedStockList[k][4];
                var matval6 = this.groupedStockList[k][6];
                materialTO.MaterialCategory = this.groupedStockList[k][0];
                materialTO.StraightQty = this.groupedStockList[k][1];
                materialTO.BendQty = matval2;
                materialTO.RKShortQty = this.groupedStockList[k][3];
                materialTO.RKLongQty = matval4;
                materialTO.TukadaQty = this.groupedStockList[k][5];
                materialTO.CoilQty = matval6;
                this.materialSpecAndCatList.push(materialTO);
                this.groupedStockList[k].forEach(function (ele) {
                });
            }
        }
        this.firstKey = this.groupedStockList.first;
        this.keys = Object.keys(this.groupedStockList);
        //this.pushQuotaForSize();
    };
    StockDetailsComponent.prototype.pushQuotaForSize = function () {
        var _this = this;
        this.keys.forEach(function (ele) {
            _this.groupedStockList[ele].push({ 'key': 'Quota', 'value': '0' });
        });
    };
    StockDetailsComponent.prototype.submitStockAvialability = function () {
        var _this = this;
        debugger;
        this.keys.forEach(function (ele) {
            _this.groupedStockList[ele].forEach(function (element) {
                //alert("Key : " + element.key + "Val : " + element.value)
                if (element.key != ele) {
                    _this.stockDetailsTOList.filter(function (p) { return p.MaterialDesc == ele
                        && p.ProdSpecDesc == element.key; })[0].NoOfBundles = element.value;
                }
            });
        });
    };
    StockDetailsComponent.prototype.validateProdAndLoc = function () {
        if (this.stockDetailTO.ProdCatId != 0
            && this.stockDetailTO.LocationId != 0 && this.stockDetailTO.CompartmentId != 0)
            this.isvalidateMaterialAction = true;
        else
            this.isvalidateMaterialAction = false;
    };
    StockDetailsComponent.prototype.postStockCatAndSpecDetails = function () {
        var _this = this;
        debugger;
        this.submitStockAvialability();
        this.stockSummaryTo.StockDetailsTOList = this.stockDetailsTOList;
        this._confirmService.activate("Have you confirm to load Stock details?", "Confirmation")
            .then(function (res) {
            if (res) {
                _this.ss.showLoader();
                _this.stockServices.postStockCatAndSpecDetails(_this.stockSummaryTo, _this.userTo.IdUser)
                    .subscribe(function (postData) {
                    _this.resultMessage = postData;
                    _this.ss.hideLoader();
                    if (_this.resultMessage.Result == 1) {
                        _this.errorMsg.showErrorMessage("Stock details updated successfully", "Information");
                        _this.stockDetailTO = { LocationId: 0, ProdCatId: 0, CompartmentId: 0 };
                        _this.stockDetailsTOList = [];
                        _this.materialSpecAndCatList = [];
                        _this.productSpec = [];
                        _this.groupedStockList = {};
                        _this.validateProdAndLoc();
                        _this.getStockSummaryList();
                    }
                    else
                        _this.errorMsg.showErrorMessage(_this.resultMessage.Text, "Error");
                }, function (err) {
                    console.log('Server side error : ' + err);
                    _this.ss.hideLoader();
                });
            }
        });
    };
    StockDetailsComponent.prototype.getMaterialList = function () {
        var _this = this;
        this.commonServices.getMaterial()
            .subscribe(function (materialList) { return _this.materialList = materialList; }, function (err) {
            _this.ss.hideLoader();
            // Log errors if any
            console.log(err);
        });
    };
    StockDetailsComponent.prototype.getDailyRunningSizeList = function () {
        var _this = this;
        this.stockServices.getDailyRunningSizeList(this.runningSizeStockDate)
            .subscribe(function (dailyRunningStockDetailsTOList) { return _this.dailyRunningStockDetailsTOList = dailyRunningStockDetailsTOList; }, function (err) {
            _this.ss.hideLoader();
            // Log errors if any
            console.log(err);
        });
    };
    StockDetailsComponent.prototype.addRunningMaterial = function (locationTO, materialTO, runningStockDetailTO) {
        if (runningStockDetailTO.TotalStock == 0) {
            return;
        }
        else {
            this.runningStockDetailsTOList.push({
                'LocationName': locationTO.Text,
                'LocationId': locationTO.Value,
                'MaterialId': materialTO.Value,
                'MaterialDesc': materialTO.Text,
                'TotalStock': runningStockDetailTO.TotalStock,
            });
        }
    };
    StockDetailsComponent.prototype.deleteMaterial = function (event, runningstock) {
        event.preventDefault();
        var index = this.runningStockDetailsTOList.indexOf(runningstock);
        this.runningStockDetailsTOList.splice(index, 1);
    };
    StockDetailsComponent.prototype.getStockSummaryList = function () {
        var _this = this;
        this.stockSpec = [];
        this.stockSummaryList = [];
        this.MaterialSizeSpecLst = [];
        this.productSizeSpecGroupedStockList = {};
        this.stockServices.getStockSummaryDetails(this.stockDate)
            .subscribe(function (stockSummaryList) {
            debugger;
            _this.stockSummaryList = stockSummaryList;
            if (_this.stockSummaryList != null) {
                _this.isUpdate = true;
                debugger;
                _this.configureStockSpecAndCat();
            }
            else {
                _this.isUpdate = false;
            }
            _this.ss.hideLoader();
        }, function (err) {
            _this.ss.hideLoader();
            // Log errors if any
            console.log(err);
        });
    };
    StockDetailsComponent.prototype.configureStockSpecAndCat = function () {
        var _this = this;
        this.MaterialSizeSpecLst = [];
        debugger;
        var uniqueLayerIds = this.stockSummaryList.map(function (p) { return p.ProdSpecDesc; }).filter(function (value, index, self) { return self.indexOf(value) === index; });
        uniqueLayerIds.forEach(function (element) {
            _this.stockSpec.push(element);
        });
        var i = 0;
        for (var i = 0; i < this.stockSummaryList.length; ++i) {
            var obj = this.stockSummaryList[i];
            //If a property for this DtmStamp does not exist yet, create
            if (this.productSizeSpecGroupedStockList[obj.MaterialDesc] === undefined)
                this.productSizeSpecGroupedStockList[obj.MaterialDesc] = [obj.MaterialDesc];
            //x will always be the array corresponding to the current DtmStamp. Push a value the current value to it.
            this.productSizeSpecGroupedStockList[obj.MaterialDesc].push(obj.TotalStock);
        }
        //debugger;
        for (var k in this.productSizeSpecGroupedStockList) {
            var i_2 = 0;
            var materialTO = new stockTO_2.StockProdSpecTO();
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
                this.MaterialSizeSpecLst.push(materialTO);
                this.calculateTotal();
            }
        }
    };
    StockDetailsComponent.prototype.calculateTotal = function () {
        var _this = this;
        this.totalStraightQty = 0;
        this.totalBendQty = 0;
        this.totalRKShortQty = 0;
        this.totalRKLongQty = 0;
        this.totalTukadaQty = 0;
        this.totalCoilQty = 0;
        this.MaterialSizeSpecLst.forEach(function (element) {
            _this.totalStraightQty += +element.StraightQty;
            _this.totalBendQty += +element.BendQty;
            _this.totalRKShortQty += +element.RKShortQty;
            _this.totalRKLongQty += +element.RKLongQty;
            _this.totalTukadaQty += +element.TukadaQty;
            _this.totalCoilQty += +element.CoilQty;
            _this.total = _this.totalStraightQty + _this.totalBendQty + _this.totalRKShortQty + _this.totalRKLongQty + _this.totalTukadaQty + _this.totalCoilQty;
        });
    };
    StockDetailsComponent.prototype.selectOnClick = function ($event) {
        $event.target.select();
    };
    StockDetailsComponent.prototype.getStockSummary = function () {
        var _this = this;
        if (this.MaterialSizeSpecLst.length == 0)
            return;
        //     this.materialSpecAndCatList.forEach(ele=>{
        //         this.stockDetailsTOList.filter(
        //             p=>{
        //                 (p.MaterialDesc == ele.MaterialCategory && p.ProdSpecDesc == this.productSpec[0])[0].NoOfBundles = ele.StraightQty
        //                 ,(p.MaterialDesc == ele.MaterialCategory && p.ProdSpecDesc == this.productSpec[1])[0].NoOfBundles = ele.BendQty
        //             ,(p.MaterialDesc == ele.MaterialCategory && p.ProdSpecDesc == this.productSpec[2])[0].NoOfBundles = ele.RKShortQty
        //         ,(p.MaterialDesc == ele.MaterialCategory && p.ProdSpecDesc == this.productSpec[3])[0].NoOfBundles = ele.RKLongQty
        //     ,(p.MaterialDesc == ele.MaterialCategory && p.ProdSpecDesc == this.productSpec[4])[0].NoOfBundles = ele.TukadaQty
        // ,(p.MaterialDesc == ele.MaterialCategory && p.ProdSpecDesc == this.productSpec[5])[0].NoOfBundles = ele.CoilQty})
        //     })
        this.MaterialSizeSpecLst.forEach(function (ele) {
            _this.stockSummaryList.filter(function (p) { return p.MaterialDesc == ele.MaterialCategory; })[0].TotalStock = ele.StraightQty
                , _this.stockSummaryList.filter(function (p) { return p.MaterialDesc == ele.MaterialCategory; })[1].TotalStock = ele.BendQty
                , _this.stockSummaryList.filter(function (p) { return p.MaterialDesc == ele.MaterialCategory; })[2].TotalStock = ele.RKShortQty
                , _this.stockSummaryList.filter(function (p) { return p.MaterialDesc == ele.MaterialCategory; })[3].TotalStock = ele.RKLongQty
                , _this.stockSummaryList.filter(function (p) { return p.MaterialDesc == ele.MaterialCategory; })[4].TotalStock = ele.TukadaQty
                , _this.stockSummaryList.filter(function (p) { return p.MaterialDesc == ele.MaterialCategory; })[5].TotalStock = ele.CoilQty;
        });
        //alert('after change : ' + JSON.stringify(this.stockDetailsTOList))
    };
    StockDetailsComponent.prototype.postStockSummaryDetails = function () {
        var _this = this;
        this.getStockSummary();
        this._confirmService.activate("Have you confirm to load Stock Summary?", "Confirmation")
            .then(function (res) {
            if (res) {
                _this.ss.showLoader();
                _this.stockServices.postStockSummaryDetails(_this.stockSummaryList, _this.userTo.IdUser)
                    .subscribe(function (postData) {
                    _this.resultMessage = postData;
                    _this.ss.hideLoader();
                    if (_this.resultMessage.Result == 1) {
                        _this.errorMsg.showErrorMessage("Stock Summary Details Confirmed successfully", "Information");
                        _this.stockDetailTO = { LocationId: 0, ProdCatId: 0, CompartmentId: 0 };
                        _this.stockDetailsTOList = [];
                        _this.stockSummaryList = [];
                        _this.materialSpecAndCatList = [];
                        _this.productSpec = [];
                        _this.stockSpec = [];
                        _this.groupedStockList = {};
                        _this.getStockSummaryList();
                    }
                    else
                        _this.errorMsg.showErrorMessage("Stock Summary Details Not Confirmed .", "Error");
                }, function (err) {
                    console.log('Server side error : ' + err);
                    _this.ss.hideLoader();
                });
            }
        });
    };
    StockDetailsComponent.prototype.postRunningSizeDetails = function () {
        var _this = this;
        this._confirmService.activate("Have You Confirm To Add Running Sizes?", "Confirmation")
            .then(function (res) {
            if (res) {
                _this.ss.showLoader();
                _this.stockServices.postRunningSizeDetails(_this.runningStockDetailsTOList, _this.userTo.IdUser)
                    .subscribe(function (postData) {
                    _this.resultMessage = postData;
                    _this.ss.hideLoader();
                    if (_this.resultMessage.Result == 1) {
                        _this.errorMsg.showErrorMessage("Running Size Details Saved Successfully", "Information");
                        _this.runningStockDetailsTOList = [];
                    }
                    else
                        _this.errorMsg.showErrorMessage("Running Size Details Not Saved .", "Error");
                }, function (err) {
                    console.log('Server side error : ' + err);
                    _this.ss.hideLoader();
                });
            }
        });
    };
    StockDetailsComponent.prototype.getLastUpdatedStockDate = function () {
        var _this = this;
        this.isShow = true;
        this.stockServices.getLastUpdatedStockDate(this.stockDetailTO).subscribe(function (lastUpdatedstockDate) {
            _this.lastUpdatedstockDate = lastUpdatedstockDate;
        }, function (err) {
            console.log('Server side error : ' + err);
            _this.ss.hideLoader();
        });
    };
    __decorate([
        core_1.ViewChild(errorMessage_1.ErrorMessage), 
        __metadata('design:type', errorMessage_1.ErrorMessage)
    ], StockDetailsComponent.prototype, "errorMsg", void 0);
    StockDetailsComponent = __decorate([
        core_1.Component({
            selector: 'loading-slip',
            // template:'<h1>Hello</h1>'
            templateUrl: 'app/stock_details/stock_details.html',
            providers: [confirm_service_1.ConfirmService]
        }), 
        __metadata('design:paramtypes', [sharedService_1.sharedService, common_services_1.CommonServices, platform_browser_1.DomSanitizer, stock_services_1.StockDetailsServices, login_services_1.AuthenticationService, confirm_service_1.ConfirmService])
    ], StockDetailsComponent);
    return StockDetailsComponent;
}());
exports.StockDetailsComponent = StockDetailsComponent;
//# sourceMappingURL=stock_component.js.map