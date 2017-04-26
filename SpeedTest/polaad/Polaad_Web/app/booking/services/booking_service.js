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
    bookingServices.prototype.addBooking = function (bookingTO, loginUserId) {
        //debugger
        var params = {
            bookingTO: bookingTO,
            loginUserId: loginUserId
        };
        var bodyString = JSON.stringify(params);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobalVal.gnOrderBooking, bodyString, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(alert(error.json().error), error.json().error || 'Server error'); });
    };
    bookingServices.prototype.viewBooking = function (cnfID, dealerId, statusId) {
        return this.http.get(myGlobalVal.gnGetAllBooking + '?cnfId=' + cnfID + '&dealerId=' + dealerId + '&statusId=' + statusId)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(alert(error.json().error), error.json().error || 'Server error'); });
    };
    //Vijaymala Added to getbooking data for loading slip[2017/02/14]
    bookingServices.prototype.getDealersBookingList = function (dealerId) {
        return this.http.get(myGlobalVal.gnGetPendingBookingList + dealerId)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    //[27/02/2017]Vijaymala added to get booking list beyond quota and rate band for director confirmation
    bookingServices.prototype.viewConfirmationBooking = function () {
        return this.http.get(myGlobalVal.gnViewConfirmationBooking)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(alert(error.json().error), error.json().error || 'Server error'); });
    };
    //[27/02/2017]Vijaymala added to submit  for director confirmation/C&F approved beyond quota and rate band 
    bookingServices.prototype.addConfirmationBooking = function (bookingTO, loginUserId) {
        //debugger
        var params = {
            bookingTO: bookingTO,
            loginUserId: loginUserId
        };
        var bodyString = JSON.stringify(params);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobalVal.gnBookingConfirmation, bodyString, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(alert(error.json().error), error.json().error || 'Server error'); });
    };
    //[28/02/2017]Vijaymala added to get booking list beyond quota and rate band for C&F confirmation
    bookingServices.prototype.getPendingBookingsForAcceptance = function (OrganizationId) {
        return this.http.get(myGlobalVal.gnViewConfirmationBookingByCF + '?cnfId=' + OrganizationId)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(alert(error.json().error), error.json().error || 'Server error'); });
    };
    //Vijaymala Added to getbooking data for loading slip[2017/02/14]
    bookingServices.prototype.getBookingListAccToBookingId = function (bookingId) {
        return this.http.get(myGlobalVal.gnBookingListById + '?bookingId=' + bookingId)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    bookingServices.prototype.deleteBookingOrder = function (bookingTO, loginUserId) {
        var params = {
            bookingTO: bookingTO,
            loginUserId: loginUserId
        };
        var bodyString = JSON.stringify(params);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobalVal.gnDeleteBookingOrder, bodyString, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(alert(error.json().error), error.json().error || 'Server error'); });
    };
    bookingServices.prototype.editBookingOrder = function (bookingTO, loginUserId) {
        //debugger
        var params = {
            bookingTO: bookingTO,
            loginUserId: loginUserId
        };
        var bodyString = JSON.stringify(params);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(myGlobalVal.gnEditOrderBooking, bodyString, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(alert(error.json().error), error.json().error || 'Server error'); });
    };
    //Vijaymala Added to getbooking data for loading slip[2017/02/14]
    bookingServices.prototype.getBookinOpenCloseInfo = function () {
        return this.http.get(myGlobalVal.gnGetBookinOpenCloseInfo)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    //Vijaymala Added to getbooking data for loading slip[2017/02/14]
    bookingServices.prototype.gnGetBookingMaterialExtList = function (prodCatId) {
        return this.http.get(myGlobalVal.gnGetBookingMaterialExtList + '?prodCatId=' + prodCatId)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    return bookingServices;
}());
bookingServices = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], bookingServices);
exports.bookingServices = bookingServices;
var _a;
//# sourceMappingURL=booking_service.js.map