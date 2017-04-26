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
var organizationInfo_1 = require('app/Masters/model/organizationInfo');
var addressInfo_1 = require('app/Masters/model/addressInfo');
var organizationService_1 = require('app/Masters/services/organizationService');
var errorMessage_1 = require('app/error/errorMessage');
var OrganizationComponent = (function () {
    function OrganizationComponent(
        //private _confirmService:ConfirmService,
        orgServiceObj) {
        this.orgServiceObj = orgServiceObj;
        this.newOrgInfo = new organizationInfo_1.OrganizationInfo();
        this.addressInfo = new addressInfo_1.AddressInfo();
    }
    OrganizationComponent.prototype.ngOnInit = function () {
        this.GetStatesForDropDown();
    };
    OrganizationComponent.prototype.GetStatesForDropDown = function () {
        var _this = this;
        debugger;
        this.orgServiceObj.GetStatesForDDL(1)
            .subscribe(function (element) { _this.stateList = element; }, function (err) {
            alert('Server error :' + err);
            console.log(err);
        }, function () {
            console.log("Done");
        });
    };
    OrganizationComponent.prototype.SaveNewOrganization = function () {
        // let BookingOperation:Observable<number>;
        // BookingOperation = this.stockYardServiceObj.AddStockYard(this.org);
        //     BookingOperation.subscribe(result=>{            
        //         if(result==1)
        //             {
        //                 this.errorMsg.showErrorMessage("Record Saved Successfully", "Information");
        //             }
        //         else
        //             this.errorMsg.showErrorMessage("Record not Saved", "Error");
        //     },
        //     err=>{});
    };
    __decorate([
        core_1.ViewChild(errorMessage_1.ErrorMessage), 
        __metadata('design:type', errorMessage_1.ErrorMessage)
    ], OrganizationComponent.prototype, "errorMsg", void 0);
    OrganizationComponent = __decorate([
        core_1.Component({
            selector: 'my-org',
            // template:'<h1>Hello</h1>'
            templateUrl: 'app/Masters/organizationGui.html'
        }), 
        __metadata('design:paramtypes', [organizationService_1.OrganizationService])
    ], OrganizationComponent);
    return OrganizationComponent;
}());
exports.OrganizationComponent = OrganizationComponent;
//# sourceMappingURL=organization.component.js.map