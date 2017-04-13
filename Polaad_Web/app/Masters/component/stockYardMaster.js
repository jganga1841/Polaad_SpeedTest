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
var stockYardInfo_1 = require("app/Masters/model/stockYardInfo");
var stockYardService_1 = require("app/Masters/services/stockYardService");
var errorMessage_1 = require("app/error/errorMessage");
var confirm_service_1 = require("app/error/confirm.service");
var StockYardMaster = (function () {
    function StockYardMaster(_confirmService, stockYardServiceObj) {
        this._confirmService = _confirmService;
        this.stockYardServiceObj = stockYardServiceObj;
        this.stockYardObj = new stockYardInfo_1.StockYardInfo();
    }
    StockYardMaster.prototype.ngOnInit = function () {
        this.GetAllStockYardList();
    };
    StockYardMaster.prototype.GetAllStockYardList = function () {
        var _this = this;
        this.stockYardServiceObj.getStockYardList().subscribe(function (p) { return _this.stockYardInfoList = p; }, function (err) { console.log(err); });
    };
    StockYardMaster.prototype.SaveNewStockYard = function () {
        var _this = this;
        var BookingOperation;
        BookingOperation = this.stockYardServiceObj.AddStockYard(this.stockYardObj);
        BookingOperation.subscribe(function (result) {
            if (result == 1) {
                _this.errorMsg.showErrorMessage("Record Saved Successfully", "Information");
            }
            else
                _this.errorMsg.showErrorMessage("Record not Saved", "Error");
        }, function (err) { });
    };
    return StockYardMaster;
}());
__decorate([
    core_1.ViewChild(errorMessage_1.ErrorMessage),
    __metadata("design:type", errorMessage_1.ErrorMessage)
], StockYardMaster.prototype, "errorMsg", void 0);
StockYardMaster = __decorate([
    core_1.Component({
        selector: 'my-stockYard',
        // template:'<h1>Hello</h1>'
        templateUrl: 'app/Masters/stockYard.component.html'
    }),
    __metadata("design:paramtypes", [confirm_service_1.ConfirmService,
        stockYardService_1.stockYardService])
], StockYardMaster);
exports.StockYardMaster = StockYardMaster;
//# sourceMappingURL=stockYardMaster.js.map