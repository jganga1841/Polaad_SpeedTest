"use strict";
var BookingTO = (function () {
    function BookingTO() {
        this.IdBooking = 0;
        this.CnFOrgId = 0;
        this.OrderDetailsLst = [];
        this.DeliveryAddressLst = [];
        this.IsConfirmed = 0;
        this.IsJointDelivery = 0;
        this.IsSpecialRequirement = 0;
        this.CdStructure = 0;
        this.CdStructureId = 0;
        this.BalQty = 0;
    }
    return BookingTO;
}());
exports.BookingTO = BookingTO;
var OrderDetailsTO = (function () {
    function OrderDetailsTO() {
    }
    return OrderDetailsTO;
}());
exports.OrderDetailsTO = OrderDetailsTO;
var DeliveryAddressTO = (function () {
    function DeliveryAddressTO() {
    }
    return DeliveryAddressTO;
}());
exports.DeliveryAddressTO = DeliveryAddressTO;
var LoadingMaterialSequenceTO = (function () {
    function LoadingMaterialSequenceTO() {
    }
    return LoadingMaterialSequenceTO;
}());
exports.LoadingMaterialSequenceTO = LoadingMaterialSequenceTO;
var BookingActionsTO = (function () {
    function BookingActionsTO() {
    }
    return BookingActionsTO;
}());
exports.BookingActionsTO = BookingActionsTO;
var BookingHistoryTO = (function () {
    function BookingHistoryTO() {
    }
    return BookingHistoryTO;
}());
exports.BookingHistoryTO = BookingHistoryTO;
//# sourceMappingURL=booking_information.js.map