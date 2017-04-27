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
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
var myGlobalVal = require("app/global");
// Import RxJs required methods
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var bookingServices = (function () {
    function bookingServices(http) {
        this.http = http;
    }
    bookingServices.prototype.addBooking = function (bookingTO) {
        //debugger
        var params = {
            bookingTO: bookingTO,
            loginUserId: 1
        };
        var bodyString = JSON.stringify(params);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        alert('Enum Val : ' + 1 /* AGENTTYPEID */);
        return this.http.post(myGlobalVal.gnOrderBooking, bodyString, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(alert(error.json().error), error.json().error || 'Server error'); });
    };
    bookingServices.prototype.viewBooking = function (cnfID, dealerId) {
        //  var params ={
        //     bookingTO : bookingTO,
        //     loginUserId : 1
        // };
        return this.http.get(myGlobalVal.gnViewBooking + '?cnfId=' + cnfID + '&dealerId=' + dealerId)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(alert(error.json().error), error.json().error || 'Server error'); });
    };
    //Vijaymala Added to getbooking data for loading slip[2017/02/14]
    bookingServices.prototype.getDealersBookingList = function (dealerId) {
        var params = { dealerId: dealerId };
        var bodyString = JSON.stringify(params);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(myGlobalVal.gnGetPendingBookingList + dealerId)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    return bookingServices;
}());
bookingServices = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], bookingServices);
exports.bookingServices = bookingServices;
//# sourceMappingURL=booking_service.js.map