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
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
var myGlobalVal = require('app/global');
// Import RxJs required methods
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var OrganizationService = (function () {
    function OrganizationService(http) {
        this.http = http;
    }
    OrganizationService.prototype.GetStatesForDDL = function (countryId) {
        alert("In state Service");
        return this.http.get(myGlobalVal.gnGetStateListForDDL + countryId)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(alert(error.json().error), error.json().error || 'Server error'); });
    };
    OrganizationService.prototype.GetDistrictForDDL = function (stateId) {
        return this.http.get(myGlobalVal.gnGetDistrictList + stateId)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    OrganizationService.prototype.GetTalukaForDDL = function (districtId) {
        return this.http.get(myGlobalVal.gnGetTalukaListForDDL + districtId)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    OrganizationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], OrganizationService);
    return OrganizationService;
}());
exports.OrganizationService = OrganizationService;
//# sourceMappingURL=organizationService.js.map